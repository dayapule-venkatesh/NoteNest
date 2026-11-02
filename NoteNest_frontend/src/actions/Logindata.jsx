import axios from "axios";
import { redirect } from "react-router-dom";
import { API_URL } from "../Features/API";

export const Logindata = async ({ request }) => {
  const data = await request.formData();
  const { email, password } = Object.fromEntries(data);

  try {
    const response = await axios.post(
      `${API_URL}/api/auth/login`,
      { email, password },
      { withCredentials: true },
    );

    if (response.data.status) {
      return redirect("/layout");
    }

    return { error: response.data.message || "Unable to log in" };
  } catch (error) {
    return {
      error:
        error?.response?.data?.message ||
        "Unable to log in. Please check your details and try again.",
    };
  }
};
