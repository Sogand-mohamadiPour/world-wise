import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";
import { useEffect } from "react";

function ProtectedRoutes({ children }) {
  const { isAthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAthenticated) navigate("/");
    },
    [isAthenticated, navigate]
  );
  return isAthenticated ? children : null;
}

export default ProtectedRoutes;
