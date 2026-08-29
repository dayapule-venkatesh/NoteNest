import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const authdata = async () => {
      const res = await axios.get("http://localhost:3000/api/auth/valid", {
        withCredentials: true,
      });

      const status = res.data.status;

      if (status) {
        setLoading(false);
      } else {
        alert("login again");
        navigate("/login");
      }
    };
    authdata();
  }, []);

  return <div>{loading ? <h1>loading...</h1> : children}</div>;
};

export default ProtectedRoute;
