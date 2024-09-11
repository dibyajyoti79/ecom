import { useNavigate } from "react-router-dom";

const Failed = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-100 text-red-700">
      <h1 className="text-3xl font-bold mb-4">Payment Failed</h1>
      <p className="mb-4">
        Unfortunately, your payment could not be processed. Please try again.
      </p>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        onClick={() => navigate("/")}
      >
        Go Home
      </button>
    </div>
  );
};

export default Failed;
