import { UserModel } from "../models/Users.js"
import bcrypt from "bcrypt"
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()
export const SignupService = async ({ name, email, password }) => {
  const userDetails = await UserModel.findOne({ email: email });
  if (!userDetails) {
    const hashedpassword = await bcrypt.hash(password, 10);

    const send = new UserModel({ name, email, password: hashedpassword });
    await send.save();

    sendWelcomeEmail(name, email);
    return { name, email };
  }
  throw new Error("user already exists");
};

export const LoginService = async ({ email, password }) => {
  const userdetails = await UserModel.findOne({ email: email });
  if (userdetails) {
    const ismatch = await bcrypt.compare(password, userdetails.password);
    if (ismatch) {
      const token = jwt.sign(
        { name: userdetails.name, email: userdetails.email },
        process.env.SECRET,
        { expiresIn: "5h" },
      );
      return token
    }
    throw new Error("password is incorrect");
  }
  throw new Error("User does not exist");
};

export const ForgotService=async({email, new_password})=>{
   const hashedpassword = await bcrypt.hash(new_password, 10);
    const updata = await UserModel.findOneAndUpdate(
      { email: email },
      { password: hashedpassword },
      {new:true},
    );
    if(!update){
      throw new Error("user does not found")
    }
    
}





    
