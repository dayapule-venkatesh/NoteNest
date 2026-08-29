import { UserModel } from "../models/Users.js";
import { uploadToCloudinary } from "./uploadToCloudinary.js";

export const ProfileImageController = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No image uploaded",
        status: false,
      });
    }
    const result = await uploadToCloudinary(req.file.buffer);
    const dbupdate = await UserModel.findOneAndUpdate(
      { email: req.user.email },
      { profile: result.secure_url },
    );
    dbupdate.save();
    res.json({
      message: "Image uploaded successfully",
      imageUrl: result.secure_url,
      status: true,
    });
  } catch (error) {
    next(error);
  }
};
