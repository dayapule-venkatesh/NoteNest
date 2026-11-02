import axios from "axios";
import { redirect } from "react-router-dom";
import { API_URL } from "../Features/API";
import { toast } from "../utils/toast";

export const Forgotdata = async ({ request }) => {
  const data = await request.formData();
  const { email, new_password, confirm_password } = Object.fromEntries(data);

  if (new_password !== confirm_password) {
    return { error: "The two passwords do not match." };
  }

  if (new_password.length < 8) {
    return { error: "Your new password needs at least 8 characters." };
  }

  try {
    const response = await axios.patch(
      `${API_URL}/api/auth/forgot`,
      { email, new_password },
      { withCredentials: true },
    );

    if (response.data.status) {
      toast.success("Password updated. You can log in now.");
      return redirect("/login");
    }

    return { error: response.data.message || "Could not reset your password." };
  } catch (error) {
    return {
      error:
        error?.response?.data?.message ||
        "Could not reset your password. Please try again.",
    };
  }
};
