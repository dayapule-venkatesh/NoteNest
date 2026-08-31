import {
  SignupService,
  LoginService,
  ForgotService,
} from "../Services/authServices.js";
import cookieParser from "cookie-parser";

export const Signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    await SignupService({ name, email, password });

    res.status(201).json({
      message: "signup successful",
      status: true,
    });
  } catch (error) {
    next(error);
  }
};

export const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await LoginService({ email, password });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 5 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "Login successful",
      status: true,
    });
  } catch (error) {
    next(error);
  }
};

export const Forgot = async (req, res, next) => {
  try {
    const { email, new_password } = req.body;
    await ForgotService({ email, new_password });

    res.status(201).json({
      message: "Password changed successful",
      status: true,
    });
  } catch (error) {
    next(error);
  }
};

export const Logout = async (req, res, next) => {
  try {
    res.clearCookie("token",{
      httpOnly:true,
      secure:true,
      sameSite:"none",
      path:"/"
    });
    res.status(201).json({
      message: "logout successful",
      status: true,
    });
  } catch (error) {
    next(error);
  }
};
