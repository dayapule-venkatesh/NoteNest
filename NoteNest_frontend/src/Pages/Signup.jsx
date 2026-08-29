import React from "react";
import { Form, Link, Navigate, useActionData } from "react-router-dom";
import logo from "../assets/photos/logo.png";
import signup from "../assets/photos/signup.png";
import { FaCheck } from "react-icons/fa";

const Signup = () => {
  return (
    <div className=" h-screen flex flex-row bg-linear-[25deg,#b6a7f1,#efecfe,#b6acdd]">
      <img src={logo} alt="logo" className="size-15" />
      <div className="flex-2 flex flex-col pt-10 pl-10">
        <h1 className="text-6xl">Welcome to NoteNest🖐</h1>
        <h3 className="text-2xl text-[#333333]">
          Create your account <br /> to get started.
        </h3>
        <ul className="list-none p-0">
          <li className=" flex gap-2.5 my-3 text-xl text-gray-500">
            <FaCheck className="text-[#22c55e]" />
            Free forever
          </li>
          <li className=" flex gap-2.5 my-3 text-xl text-gray-500">
            <FaCheck className="text-[#22c55e]" />
            Sync across devices
          </li>
          <li className=" flex gap-2.5 my-3 text-xl text-gray-500">
            <FaCheck className="text-[#22c55e]" />
            Secure and private
          </li>
        </ul>
        <img src={signup} alt="signup" className="w-[60%] h-auto" />
      </div>

      <Form
        method="post"
        className="flex-1 flex flex-col gap-5 p-10 border-gray-500 shadow-md m-10 rounded-xl"
      >
        <h1 className="text-3xl">Create Account</h1>
        <p className="text-xl text-gray-500">Sign up to continue to NoteNest</p>
        <div className="flex flex-col gap-3">
          <label>Full Name:</label>
          <input
            type="text"
            required
            name="name"
            placeholder="Enter your full name"
            className="bg-[#FFFFFF]"
          />
          <label>Email:</label>{" "}
          <input
            type="email"
            required
            name="email"
            placeholder="Enter your email"
            className="bg-[#FFFFFF]"
          />
          <label>Password: </label>
          <input
            type="password"
            required
            name="password"
            placeholder="Create a password"
            className="bg-[#FFFFFF]"
          />
          <label>Confirm Password:</label>{" "}
          <input
            type="password"
            required
            name="confirm_password"
            placeholder="Confirm password"
            className="bg-[#FFFFFF]"
          />
          <button type="submit" className="bg-[#937CF1]">
            Signup
          </button>
        </div>
        <div>
          Already have an account?{" "}
          <Link to={"/login"} className="text-[#6042C9]">
            Login
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default Signup;
