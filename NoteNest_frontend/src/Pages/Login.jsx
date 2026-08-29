import React from "react";
import { Link, Form, useActionData } from "react-router-dom";

import security from "../assets/photos/security.png";
import { FaCheck } from "react-icons/fa";
import logo from "../assets/photos/logo.png";

import hand from "../assets/photos/hand.png";
const Login = () => {
  const data = useActionData();
  return (
    <div className="h-screen flex flex-row  bg-linear-[25deg,#b6a7f1,#efecfe,#b6acdd]">
      <img src={logo} alt="logo" className="h-15 w-15 mt-2.5 ml-2.5" />
      <div className=" flex-2 pt-[40px] pl-[40px]  ">
        <h1 className="text-6xl flex items-center">Welcome Back!🖐</h1>

        <h3 className="text-3xl text-[#333333]">
          Login to continue to your <br />
          NoteNest account.
        </h3>

        <ul className="list-none p-0">
          <li className="flex items-center gap-2.5 my-3 text-2xl text-gray-500">
            <FaCheck className="text-[#22c55e]" />
            Secure Login
          </li>

          <li className="flex items-center gap-2.5 my-3 text-2xl text-gray-500">
            <FaCheck className="text-[#22c55e]" />
            Your data is safe
          </li>

          <li className="flex items-center gap-2.5 my-3 text-2xl text-gray-500">
            <FaCheck className="text-[#22c55e]" />
            Access anywhere
          </li>
        </ul>

        <img src={security} alt="security" className="w-[60%] h-auto" />
      </div>

      <Form method="post" className="flex flex-col gap-5  flex-1 border-gray-500 rounded-xl shadow-md p-5 m-10">
        <h1 className="text-4xl">Login</h1>
        <p  className=" text-gray-500 text-2xl">
          Enter your Credentials <br />
          to access your account
        </p>
        <div className="flex flex-col gap-2.5">
          <label className="text-2xl" > Email:</label>{" "}
          <input
            type="email"
            required
            name="email"
            placeholder="Enter your email"
            className="bg-[#FFFFFF]"
          />
          <label className="text-2xl flex  ">
            Password:
            <Link to={"/forgot"} className="ml-auto text-[#6042C9] text-xl">
            forgot password
            </Link>
          </label>
          <input
            type="password"
            required
            name="password"
            placeholder="Enter your password"
             className="bg-[#FFFFFF]"
          />
          <label className="remember">
            <input type="checkbox" />
            Remember me
          </label>
          <button type="submit" className="bg-[#937CF1]">Login</button>
        </div>
        <div className="loginlink text-gray-500" >
          dont have account?
          <Link to={"/signup"} className="text-[#6042C9]">Signup</Link>
        </div>
      </Form>
      {data && alert("sucessfull")}
    </div>
  );
};

export default Login;
