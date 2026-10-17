import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import { UserModel } from '../models/Users.js';
import { OTPModel } from '../models/OTP.js';



dotenv.config()


export const transpoter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.COMPANY_EMAIL,
        pass: process.env.COMPANY_PASSWORD,
    }
})

transpoter.verify()
    .then(() => { console.log("email is ready") })
    .catch(err => console.log("email is not connected:", err))


export const sendWelcomeEmail = async (name, email) => {
      await transpoter.sendMail({
        from: `"NoteNest" <${process.env.COMPANY_EMAIL}>`,
        to: email,
        subject: "welcome to NoteNest",
        text: "Hi your Account is sucessfully registered",
        html: `
        <h1>welcome to NoteNest</h1>
        <img src='https://res.cloudinary.com/pbiywdmq/image/upload/v1788269790/logo.png' height=120px width=120px/>
        <p>${name} you have sucessfully registerd Notenest account</p>
        <a href="${process.env.FRONTEND_URL}/login"> Login</a>
        `
    })


}



export const SendOtp = async (name, email, hashedpassword) => {

    const otp = Math.floor(
        1000 + Math.random() * 9000
    ).toString();

    if(OTPModel.find({email})){await OTPModel.deleteOne({email})}
    await OTPModel.create({name:name,email:email, password:hashedpassword,otp:otp})
    await transpoter.sendMail({
        from: `"NoteNest" <${process.env.COMPANY_EMAIL}>`,
        to: email,
        subject: "NoteNest OTP",
        text: `Your NoteNest OTP is ${otp}`,

        html: `
            <h2>NoteNest OTP Verification</h2>
            <p>Hi ${name},</p>
            <p>Your OTP is:</p>
            <h1>${otp}</h1>
            <p>This OTP will expire in 5 minutes.</p>
        `
    });


};

export const CheckOTP = async (otp, email) => {
    const storedData = await OTPModel.findOne({email});
    if (!storedData) {
        throw new Error("OTP expired try to signup again");
    }
    if (storedData.otp.toString()!== otp) {
        throw new Error("Invalid OTP");
    }

    else {
         await  UserModel.create({ name:storedData.name, email: storedData.email, password: storedData.password });
        sendWelcomeEmail(storedData.name, storedData.email);
        await OTPModel.deleteOne({email})
    }

};