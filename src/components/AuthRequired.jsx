import { UrlState } from "@/context/context";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";

const AuthRequired = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = UrlState();

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      navigate(`/auth`);
    }
  }, [isAuthenticated, loading]);

  // Return loading spinner or children
  if (loading) return <BarLoader width={"100%"} color="#36d7b7" />;
  if (!isAuthenticated) return null; // or some other fallback UI

  return children;
};


export default AuthRequired;
