import axios from 'axios'
import { redirect } from 'react-router-dom';
export const Forgotdata=async ({request})=>{
    const data= await request.formData();
    const {email,new_password, confirm_password}=Object.fromEntries(data);
    if(new_password==confirm_password){
        const response=await axios.patch('http://localhost:3000/api/auth/forgot',{
     email,new_password
    }, )
    
    const {message,flag}=response.data
    if(flag){
        alert(message);
        return redirect('/login')
    }
    else{return alert(message)}

    }
    else { return alert("confirm password is incorrect")}
    
    

}