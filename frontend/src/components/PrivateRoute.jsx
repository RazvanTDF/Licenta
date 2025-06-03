import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("accesToken");
  if (!token) {
    return <Navigate to="/auth" />;
  }
  return children;
};

export default PrivateRoute;
