import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";

const Offers = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [offerData, setOfferData] = useState({
    discount: 0,
    fromDate: "",
    toDate: "",
  });
  const [modalData, setModalData] = useState({
    discount: 0,
    fromDate: "",
    toDate: "",
  });
  const [errors, setErrors] = useState({
    discount: "",
    dateRange: "",
  });

  // Fetch offer data from the API
  const fetchOffer = async () => {
    try {
      const response = await fetch("/api/v1/offers/special");
      if (!response.ok) {
        throw new Error("Failed to fetch offer data");
      }
      const { data } = await response.json();
      setOfferData({
        discount: data.discount,
        fromDate: data.fromDate,
        toDate: data.toDate,
      });
      setModalData({
        discount: data.discount,
        fromDate: data.fromDate,
        toDate: data.toDate,
      });
    } catch (error) {
      console.error("Failed to fetch offer:", error);
    }
  };

  useEffect(() => {
    fetchOffer();
  }, []);

  // Handle form input changes in modal
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setModalData((prev) => ({ ...prev, [name]: value }));
  };

  // Validate form data
  const validateForm = () => {
    let isValid = true;
    const newErrors = { discount: "", dateRange: "" };

    if (modalData.discount < 1 || modalData.discount > 100) {
      newErrors.discount = "Discount must be between 1 and 100.";
      isValid = false;
    }

    if (new Date(modalData.toDate) <= new Date(modalData.fromDate)) {
      newErrors.dateRange =
        "The 'Valid Until' date must be greater than the 'Valid From' date.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) {
      return; // Do not submit if validation fails
    }
    setLoading(true);
    try {
      const response = await fetch("/api/v1/offers/special", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(modalData),
      });
      if (!response.ok) {
        throw new Error("Failed to update offer");
      }
      const updatedOffer = await response.json();
      setOfferData({
        discount: updatedOffer.discount,
        fromDate: updatedOffer.fromDate,
        toDate: updatedOffer.toDate,
      });
      setIsDialogOpen(false);
      fetchOffer();
    } catch (error: any) {
      toast.error(error.message);
      console.error("Failed to update offer:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <Card className="bg-white shadow-lg rounded-lg overflow-hidden w-[350px]">
        <CardHeader className="p-4 bg-green-600 text-white">
          <CardTitle className="text-2xl font-bold">Special Offer</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-4">
            {offerData.discount ? (
              <>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Discount:</span>
                  <span className="text-gray-800 font-semibold">
                    {offerData.discount}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Valid From:</span>
                  <span className="text-gray-800 font-semibold">
                    {offerData.fromDate}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">
                    Valid Until:
                  </span>
                  <span className="text-gray-800 font-semibold">
                    {offerData.toDate}
                  </span>
                </div>
              </>
            ) : (
              <div className="text-center">
                <p className="text-gray-600">No special offer available</p>
              </div>
            )}
            <div className="flex justify-center mt-6">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger>
                  <Button
                    className="text-white font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out"
                    onClick={() => {
                      setIsDialogOpen(true);
                    }}
                  >
                    {offerData.discount ? "Modify Offer" : "Create Offer"}
                  </Button>
                </DialogTrigger>
                <DialogContent
                  className="p-6 bg-white rounded-lg shadow-md"
                  onInteractOutside={(e) => {
                    e.preventDefault(); // Prevent closing on outside click
                  }}
                >
                  <DialogHeader>
                    <DialogTitle>
                      {offerData.discount ? "Edit Offer" : "Create Offer"}
                    </DialogTitle>
                  </DialogHeader>
                  <form
                    className="space-y-4"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <div>
                      <Label htmlFor="discount">Discount</Label>
                      <Input
                        id="discount"
                        name="discount"
                        type="number"
                        value={modalData.discount}
                        onChange={handleInputChange}
                        className="w-full mt-1"
                        required
                      />
                      {errors.discount && (
                        <p className="text-red-500 text-sm">
                          {errors.discount}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="fromDate">Valid From</Label>
                      <Input
                        id="fromDate"
                        name="fromDate"
                        type="date"
                        value={modalData.fromDate}
                        onChange={handleInputChange}
                        className="w-full mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="toDate">Valid Until</Label>
                      <Input
                        id="toDate"
                        name="toDate"
                        type="date"
                        value={modalData.toDate}
                        onChange={handleInputChange}
                        className="w-full mt-1"
                        required
                      />
                      {errors.dateRange && (
                        <p className="text-red-500 text-sm">
                          {errors.dateRange}
                        </p>
                      )}
                    </div>
                    <div className="flex justify-end">
                      <Button
                        className="bg-green-600 text-white font-bold py-2 px-6 rounded-full"
                        onClick={handleSubmit}
                        disabled={loading}
                      >
                        {loading ? "Saving..." : "Save Changes"}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Offers;
