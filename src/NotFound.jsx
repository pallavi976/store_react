import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/home");
    }, 3000);  // Redirect after 3 seconds
  }, [navigate]);

  return (
    <>
      <h1>404 page not found</h1>
      <img src="404 errorImage.avif" alt="404 Error" />
    </>
  );
}

export default NotFound;
