import axios from "axios"
import { API_URL } from "../Features/API"
import { useState } from "react"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"

const Otp=()=>{
    const navigate=useNavigate()
    const [otp,setOtp]=useState("")
const [searchparam]=useSearchParams();
   const email=searchparam.get("email");
    const handleOtp=async()=>{
        const sendotp=await axios.post(`${API_URL}/api/auth/checkotp`,{otp,email});
        alert(sendotp.data.message)
        sendotp.data.status && navigate('/login')
        

    }

    return (
        <div className="flex flex-col justify-center h-screen items-center border w-full bg-linear-[25deg,#b6a7f1,#efecfe,#b6acdd]">
<div className="flex flex-col border border-[#9cb0f4] rounded-xl gap-7 p-10 shadow-md" >
  <h1 className="text-4xl text-[#1831d3]">OTP</h1>
        <input type="text" placeholder="Enter otp"  onChange={(e)=>{setOtp(e.target.value)}}/>
        <button onClick={handleOtp} className="bg-[#937CF1] rounded-md">Submit</button>
</div>        
        </div>
    )
}

export default Otp