import React from "react";
import { Form, Link } from "react-router-dom";
import logo from "../assets/photos/logo.png";
import forgot from "../assets/photos/forgot.png";

const Forgot = () => {
  return (
    <div className="flex h-screen bg-linear-[25deg,#b6a7f1,#efecfe,#b6acdd]">
      <img src={logo} alt="logo" className="w-15 h-15" />
      <div className="flex-2 m-12  flex flex-col gap-5 ">
        <h1 className="text-6xl">Reset your password </h1>
        <p className="text-3xl text-gray-500">
          Enter your email and create a new password <br /> to securely reset
          your account.{" "}
        </p>
        <img src={forgot} alt="forgot" className="w-[60%] h-auto" />
      </div>
      <Form
        method="post"
        className=" flex-1 flex flex-col gap-5 border-gray-500 rounded-xl shadow-md m-10 p-5"
      >
        <h1 className="text-3xl">Forgot Password</h1>
        <p className="text-gray-500">
          Don't worry! It happens.
          <br />
          Please enter your email.
        </p>
        <div className="flex flex-col gap-4">
          <label className="text-2xl">Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="bg-[#FFFFFF]"
            required
          />
          <label className="text-2xl">New Password</label>
          <input
            type="password"
            name="new_password"
            placeholder="Enter New password"
            className="bg-[#FFFFFF]"
            required
          />
          <label className="text-2xl">Confirm Password</label>
          <input
            type="password"
            name="confirm_password"
            placeholder="Retype your password"
            className="bg-[#FFFFFF]"
            required
          />
          <button type="submit" className="bg-[#937CF1]">
            Reset Password
          </button>
        </div>
        <div className="text-gray-500">
          Remembered your password?
          <Link to={"/login"} className="text-[#6042C9]">
            Login
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default Forgot;
