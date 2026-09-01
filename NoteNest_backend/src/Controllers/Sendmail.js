import dotenv from 'dotenv'
import nodemailer from 'nodemailer'


dotenv.config()
export const transpoter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.COMPANY_EMAIL,
        pass:process.env.COMPANY_PASSWORD,
    }
})

transpoter.verify()
.then(()=>{console.log("email is ready")})
.catch(err=>console.log("email is not connected:",err))


   export const sendWelcomeEmail=async(name,email)=>{
    const info=await transpoter.sendMail({
        from:`"${process.env.COMPANY_EMAIL}" <${process.env.COMPANY_USER}>`,
        to:email,
        subject:"welcome to NoteNest",
        text:"Hi your Account is sucessfully registered",
        html:`
        <h1>welcome to NoteNest</h1>
        <img src='http://localhost:3000/Controllers/logo.png' height=20px width=20px/>
        <p>${name} you have sucessfully registerd Notenest account</p>
        <a href="http://localhost:5173/login"> Login</a>
        `

    }) 
}



// export const SendOtp=async(name,email)=>{
//     const otp=Math.floor(1000 + Math.random() * 9000);
//     const info=await transpoter.sendMail({
//        from:`"${process.env.COMPANY_EMAIL}" <${process.env.COMPANY_USER}>`,
//         to:email,
//         subject:"welcome to NoteNest",
//         text:"",
//     })

// }