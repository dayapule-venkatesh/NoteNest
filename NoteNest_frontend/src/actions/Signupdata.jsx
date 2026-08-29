import { redirect } from "react-router-dom"
import axios from 'axios'
import { API_URL } from "../Features/domain"

export const Signupdata=async({request})=>{
    const data= await request.formData()
    const {name,email,password,confirm_password}=Object.fromEntries(data)
    const regex=/^[\w]+@[\w]+\.com/
    const regex_pass=/[\w $#@%&*!]{8}/

   if(!name.length>2)return alert("greater than 2 characters");
   else if(!regex.test(email))return alert("invalid email");
   else if(!regex_pass.test(password))return alert("password must contain 8 characters")
    else if(!password==confirm_password)return alert("confirm password is wrong")
   
   else{
    const send_data=await axios.post(`${API_URL}/api/auth/signup`,{
      name,email,password
    })
    let obj=send_data.data
    alert(obj.message)
    return obj.status && redirect('/login')

  }

   

}