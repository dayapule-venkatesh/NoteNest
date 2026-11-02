import { NoteModel } from "../models/Notes.js";

const notFound = (message = "Note not found") => {
  const error = new Error(message);
  error.status = 404;
  return error;
};

/**
 * Note service layer.
 * Every read/write is scoped to the authenticated user so one account can
 * never edit or delete another account's notes.
 */

export const NewNoteService = async ({ title, label, note, userid }) => {
  const created = new NoteModel({ title, label, note, userid });
  return created.save();
};

export const AllNotesService = async (id) => {
  const notes = await NoteModel.find({ userid: id }).sort({ updatedAt: -1 });

  if (notes) return notes;
  throw new Error("Notes are not present");
};

export const GetNoteService = async ({ id, userId }) => {
  const note = await NoteModel.findOne({ _id: id, userid: userId });
  if (!note) throw notFound();
  return note;
};

export const FavoriteService = async ({ id, favorite, userId }) => {
  const note = await NoteModel.findOneAndUpdate(
    { _id: id, userid: userId },
    { favorite: Boolean(favorite) },
    { new: true },
  );

  if (note) return note;
  throw notFound("Favorite could not be updated");
};

export const EditService = async ({ id, title, label, note, userId }) => {
  const updated = await NoteModel.findOneAndUpdate(
    { _id: id, userid: userId },
    { title, label, note },
    { new: true },
  );

  if (updated) return updated;
  throw notFound("Note could not be edited");
};

export const TrashService = async ({ id, userId }) => {
  const trashed = await NoteModel.findOneAndUpdate(
    { _id: id, userid: userId },
    { Trash: true },
    { new: true },
  );

  if (trashed) return trashed;
  throw notFound("Note could not be moved to trash");
};

export const RestoreService = async ({ id, userId }) => {
  const restored = await NoteModel.findOneAndUpdate(
    { _id: id, userid: userId },
    { Trash: false },
    { new: true },
  );

  if (restored) return restored;
  throw notFound("Note could not be restored");
};

export const DeleteService = async ({ id, userId }) => {
  const deleted = await NoteModel.findOneAndDelete({
    _id: id,
    userid: userId,
  });

  if (deleted) return deleted;
  throw notFound("Note could not be deleted");
};
