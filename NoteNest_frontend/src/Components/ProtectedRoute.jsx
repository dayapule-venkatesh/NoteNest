import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../Features/API";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const authdata = async () => {
      const res = await axios.get(`${API_URL}/api/auth/valid`, {
        withCredentials: true,
      });

      const status = res.data.status;

      if (status) {
        setLoading(false);
      } else {
        alert(res.data.message);
        navigate("/login");
      }
    };
    authdata();
  }, []);

  return <div>{loading ? <h1>loading...</h1> : children}</div>;
};

export default ProtectedRoute;
