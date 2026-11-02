import axios from "axios";
import { redirect } from "react-router-dom";
import { API_URL } from "../Features/API";
import { toast } from "../utils/toast";

export const Signupdata = async ({ request }) => {
  const data = await request.formData();
  const { name, email, password, confirm_password } = Object.fromEntries(data);

  if (String(name).trim().length < 3) {
    return { error: "Your name needs at least 3 characters." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Please enter a valid email address." };
  }

  if (password.length < 8) {
    return { error: "Your password needs at least 8 characters." };
  }

  if (password !== confirm_password) {
    return { error: "The two passwords do not match." };
  }

  try {
    const response = await axios.post(
      `${API_URL}/api/auth/signup`,
      { name, email, password },
      { withCredentials: true },
    );

    if (response.data.status) {
      toast.success("Verification code sent. Check your email!");
      return redirect(`/otp?email=${encodeURIComponent(email)}`);
    }

    return { error: response.data.message || "Could not create your account." };
  } catch (error) {
    return {
      error:
        error?.response?.data?.message ||
        "Could not create your account. Please try again.",
    };
  }
};
