import React from "react";
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="bg-linear-[25deg,#b6a7f1,#efecfe,#b6acdd] h-screen">
      <Navbar />
      <div className="mt-15 ml-20 flex flex-col gap-2">
       
        <div className="text-6xl font-sans">
          <h1>Your Thoughts, </h1>
          <p>
            <span className="text-[#937CF1]">Beautifully</span> Organised.
          </p>
        </div>
        <p className="text-2xl text-gray-700 py-5">
          NoteNest is a simple and Powerful notes app <br /> that helps you
          capture ideas, stay Organized,
          <br /> and get more done.
        </p>
        <div>
          <Link to={'/signup'} className="text-[#ffffff] bg-[#937CF1] border-gray-800 rounded-xl p-5 mx-2.5 shadow-md">
          Get Started Free
        </Link>
        <Link className="text-[#937CF1] bg-[#ffffff] border-gray-800 rounded-xl p-5 mx-2.5 shadow-md">
          Learn More
        </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
