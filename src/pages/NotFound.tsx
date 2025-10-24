import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-white to-gray-100 px-6 text-center">
      <h1 className="text-[8rem] font-extrabold text-gray-800 leading-none mb-4 animate-bounce">
        404
      </h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">
        Page Not Found
      </h2>
      <p className="text-gray-500 mb-8 max-w-md">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Button variant="hero" size="lg" onClick={() => navigate("/")}>
        Back to Rooms
      </Button>

      <div className="mt-10 text-gray-400 text-sm">
        Error Path:{" "}
        <span className="text-gray-600 font-mono">{location.pathname}</span>
      </div>
    </div>
  );
};

export default NotFound;
