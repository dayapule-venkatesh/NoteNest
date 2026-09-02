import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import { redisClient } from '../config/redis.js';
import { json } from 'express';
import { UserModel } from '../models/Users.js';



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
    const info = await transpoter.sendMail({
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


    await redisClient.set(
        `signup:${email}`,
        JSON.stringify({
            name,
            email,
            password: hashedpassword,
            otp
        }),

        "EX", 60 * 5

    );
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

    const storeddata = await redisClient.get(`signup:${email}`);
    if (!storeddata) {
        throw new Error("OTP expired try to signup again");
    }

    const signupdata = JSON.parse(storeddata)


    if (signupdata.otp !== otp.toString()) {
        throw new Error("Invalid OTP");
    }

    else {
        const send = new UserModel({ name: signupdata.name, email: signupdata.email, password: signupdata.password });
        await send.save();
        sendWelcomeEmail(signupdata.name, signupdata.email);
        await redisClient.del(`signup:${email}`);
    }

};