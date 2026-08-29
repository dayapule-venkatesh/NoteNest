import axios from "axios"
import { redirect } from "react-router-dom"
import { API_URL } from "../Features/domain"


export const Logindata=async ({request})=>{
    const data=await request.formData()
const {email,password}=Object.fromEntries(data)

    const res=await axios.post(`${API_URL}/api/auth/login`, {
        email,password
    },
 {
            withCredentials: true
        })

    if(res.data.status){ return redirect('/layout/profile')}
    else {alert(res.data.message)}
   
}