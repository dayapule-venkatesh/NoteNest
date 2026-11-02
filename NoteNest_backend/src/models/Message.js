import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "noteusers",
      required: true,
      index: true,
    },
    room: {
      type: String,
      default: "community",
      index: true,
    },
    text: {
      type: String,
      required: [true, "Message cannot be empty"],
      trim: true,
      maxlength: [1000, "Message cannot be longer than 1000 characters"],
    },
  },
  { timestamps: true },
);

messageSchema.index({ room: 1, createdAt: -1 });

export const MessageModel = mongoose.model("messages", messageSchema);
