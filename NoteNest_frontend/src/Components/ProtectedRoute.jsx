import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { API_URL } from "../Features/API";
import BrandMark from "./BrandMark";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    let active = true;

    const checkSession = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/auth/valid`, {
          withCredentials: true,
        });

        if (!active) return;

        if (response.data.status) {
          setAllowed(true);
        } else {
          navigate("/login", { replace: true });
        }
      } catch {
        if (active) navigate("/login", { replace: true });
      } finally {
        if (active) setLoading(false);
      }
    };

    checkSession();

    return () => {
      active = false;
    };
  }, [navigate]);

  if (loading) {
    return (
      <div className="app-bg flex min-h-screen flex-col items-center justify-center gap-5">
        <BrandMark className="size-16 rounded-2xl shadow-lg shadow-forest/20" />
        <div className="flex items-center gap-2 text-sm font-semibold text-brand-700">
          <Loader2 className="size-4 animate-spin" />
          Opening your nest…
        </div>
      </div>
    );
  }

  if (!allowed) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
