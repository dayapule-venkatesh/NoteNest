import { useState } from "react";
import axios from "axios";
import { Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../../Features/API";
import { fetchUserNotes } from "../../Features/UserNotes";
import { toast } from "../../utils/toast";

const CustomStar = ({ data, className = "" }) => {
  const dispatch = useDispatch();
  const note = useSelector((state) =>
    state.userNotes.userdata?.find((item) => item._id === data?._id),
  );
  const [busy, setBusy] = useState(false);

  const favorite = Boolean(note?.favorite ?? data?.favorite);

  const toggleFavorite = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!data?._id || busy) return;

    setBusy(true);
    try {
      await axios.patch(
        `${API_URL}/api/note/favorite`,
        { id: data._id, favorite: !favorite },
        { withCredentials: true },
      );
      await dispatch(fetchUserNotes());
    } catch (error) {
      toast.error(error?.response?.data?.message || "Could not update favorite");
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      type="button"
      disabled={busy || !data?._id}
      onClick={toggleFavorite}
      aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      title={favorite ? "Remove from favorites" : "Add to favorites"}
      className={`rounded-lg p-1 transition hover:bg-amber-50 active:scale-90 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      <Star
        className={`size-5 transition ${
          favorite ? "fill-amber-400 text-amber-500" : "text-muted/50 hover:text-amber-500"
        }`}
      />
    </button>
  );
};

export default CustomStar;
