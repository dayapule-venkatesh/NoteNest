import axios from "axios"
import { redirect } from "react-router-dom"


export const Logindata=async ({request})=>{
    const data=await request.formData()
const {email,password}=Object.fromEntries(data)

    const res=await axios.post('http://localhost:3000/api/auth/login', {
        email,password
    },
 {
            withCredentials: true
        })

    if(res.data.status){ return redirect('/layout/profile')}
    else {alert(res.data.message)}
   
}