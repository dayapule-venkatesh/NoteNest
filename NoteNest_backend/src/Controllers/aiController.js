import mongoose from "mongoose";
import { NoteModel } from "../models/Notes.js";
import {
  GenerateSummaryService,
  GetAIStatusService,
} from "../Services/aiServices.js";

export const SummarizeNoteController = async (req, res, next) => {
  try {
    const { noteId } = req.body;

    if (!noteId || !mongoose.isValidObjectId(noteId)) {
      return res.status(400).json({
        status: false,
        message: "A valid noteId is required",
      });
    }

    // Ownership check: users can only summarize their own notes.
    const note = await NoteModel.findOne({
      _id: noteId,
      userid: req.user._id,
    });

    if (!note) {
      return res.status(404).json({
        status: false,
        message: "Note not found",
      });
    }

    const result = await GenerateSummaryService({ note });

    res.status(200).json({
      status: true,
      message: "Summary generated",
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

export const AIStatusController = (req, res) => {
  res.status(200).json({
    status: true,
    ...GetAIStatusService(),
  });
};
