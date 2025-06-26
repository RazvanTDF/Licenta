import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("accessToken"); 
  const role = localStorage.getItem("userRole");
  const isStaff = localStorage.getItem("isStaff") === "true";
  const pathname = window.location.pathname;

  //  if not log → redirect la login
  if (!token) {
    return <Navigate to="/auth" />;
  }

  // protect /workspace → doar dispecer
  if (pathname === "/workspace" && role !== "dispecer") {
    return <Navigate to="/pending" />;
  }

  // protect /admin/dispeceri → doar staff
  if (pathname === "/admin/dispeceri" && !isStaff) {
    return <Navigate to="/pending" />;
  }

  // Totul ok → permite accesul
  return children;
};

export default PrivateRoute;
