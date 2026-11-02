import {
  CreateMessageService,
  DeleteMessageService,
  GetMessagesService,
} from "../Services/chatServices.js";

export const GetMessagesController = async (req, res, next) => {
  try {
    const messages = await GetMessagesService({
      room: req.query.room || "community",
      limit: req.query.limit,
      before: req.query.before,
    });

    res.status(200).json({
      status: true,
      messages,
    });
  } catch (error) {
    next(error);
  }
};

export const CreateMessageController = async (req, res, next) => {
  try {
    const message = await CreateMessageService({
      sender: req.user._id,
      text: req.body.text,
      room: req.body.room || "community",
    });

    res.status(201).json({
      status: true,
      message: "Message sent",
      data: message,
    });
  } catch (error) {
    next(error);
  }
};

export const DeleteMessageController = async (req, res, next) => {
  try {
    await DeleteMessageService({
      id: req.params.id,
      sender: req.user._id,
    });

    res.status(200).json({
      status: true,
      message: "Message deleted",
    });
  } catch (error) {
    next(error);
  }
};
