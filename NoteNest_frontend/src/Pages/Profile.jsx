import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Camera,
  CheckCircle2,
  FileText,
  ImageUp,
  KeyRound,
  Loader2,
  Mail,
  ShieldCheck,
  Star,
  Tag,
  UploadCloud,
  X,
} from "lucide-react";
import PageHeader from "../Components/PageHeader";
import { API_URL } from "../Features/API";
import { fetchUserData } from "../Features/UserDetails";
import { fetchUserNotes } from "../Features/UserNotes";
import { toast } from "../utils/toast";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userDetails.userdata?.message);
  const notes = useSelector((state) => state.userNotes.userdata) || [];

  const fileInput = useRef(null);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [uploading, setUploading] = useState(false);

  const activeNotes = notes.filter((note) => !note.Trash);
  const favorites = activeNotes.filter((note) => note.favorite);
  const labels = new Set(activeNotes.map((note) => note.label || "Unlabeled"));

  const initials = (user?.name || "N")
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  useEffect(() => {
    if (!file) {
      setPreview("");
      return;
    }

    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const openModal = () => {
    setFile(null);
    setShowModal(true);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Choose an image first");
      return;
    }

    const formData = new FormData();
    formData.append("profileImage", file);

    setUploading(true);
    try {
      const response = await axios.post(
        `${API_URL}/api/upload/profileimg`,
        formData,
        { withCredentials: true },
      );

      if (response.data.status) {
        await Promise.all([
          dispatch(fetchUserData()),
          dispatch(fetchUserNotes()),
        ]);
        toast.success("Profile photo updated");
        setShowModal(false);
        setFile(null);
      } else {
        toast.error(response.data.message || "Could not upload the image");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Could not upload the image",
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Account"
        title="Your profile"
        description="The face and details behind your notes. Keep it feeling like you."
      />

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-5">
          <section className="card overflow-hidden">
            <div className="sidebar-texture relative h-32 overflow-hidden sm:h-40">
              <div
                aria-hidden="true"
                className="absolute -right-2 -top-8 font-display text-[10rem] font-semibold leading-none text-white/[0.055]"
              >
                N
              </div>
              <div className="absolute bottom-0 left-0 h-1 w-32 bg-accent-500" />
            </div>

            <div className="relative px-5 pb-6 sm:px-7">
              <div className="-mt-12 flex flex-col gap-4 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex items-end gap-4">
                  <div className="relative">
                    {user?.profile ? (
                      <img
                        src={user.profile}
                        alt={user.name || "Profile"}
                        className="size-24 rounded-3xl border-4 border-white object-cover shadow-xl sm:size-28"
                      />
                    ) : (
                      <div className="flex size-24 items-center justify-center rounded-3xl border-4 border-paper bg-brand-100 font-display text-3xl font-semibold text-brand-800 shadow-xl sm:size-28">
                        {initials}
                      </div>
                    )}
                    <span className="absolute bottom-1 right-1 flex size-7 items-center justify-center rounded-full border-2 border-white bg-emerald-500 text-white">
                      <CheckCircle2 className="size-4" />
                    </span>
                  </div>

                  <div className="pb-1">
                    <h2 className="font-display text-2xl font-semibold text-ink">
                      {user?.name || "NoteNest member"}
                    </h2>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-muted">
                      <Mail className="size-3.5" />
                      {user?.email || "Loading your email…"}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={openModal}
                  className="btn-secondary w-fit px-4 py-2 text-xs"
                >
                  <Camera className="size-3.5" />
                  Change photo
                </button>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3 border-t border-line pt-5">
                {[
                  { label: "Notes", value: activeNotes.length, icon: FileText },
                  { label: "Favorites", value: favorites.length, icon: Star },
                  { label: "Labels", value: labels.size, icon: Tag },
                ].map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className="text-center sm:text-left">
                      <p className="font-display text-2xl font-semibold text-ink">
                        {stat.value}
                      </p>
                      <p className="mt-0.5 flex items-center justify-center gap-1 text-[11px] font-medium text-muted sm:justify-start">
                        <Icon className="size-3" />
                        {stat.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="card p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-xl font-semibold text-ink">
                  Account information
                </h2>
                <p className="mt-1 text-xs text-muted">
                  The basics tied to your NoteNest account.
                </p>
              </div>
              <ShieldCheck className="size-5 text-emerald-500" />
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label" htmlFor="profile-name">
                  Full name
                </label>
                <input
                  id="profile-name"
                  type="text"
                  value={user?.name || ""}
                  readOnly
                  className="input bg-[#f7f4ec] text-body"
                />
              </div>
              <div>
                <label className="label" htmlFor="profile-email">
                  Email address
                </label>
                <input
                  id="profile-email"
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  className="input bg-[#f7f4ec] text-body"
                />
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-line bg-[#f7f4ec] p-4 sm:flex-row sm:items-center">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-muted shadow-sm">
                <KeyRound className="size-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-ink">Password</p>
                <p className="mt-0.5 text-xs text-muted">
                  Reset your password whenever you need a fresh start.
                </p>
              </div>
              <Link to="/forgot" className="btn-secondary px-4 py-2 text-xs">
                Reset password
              </Link>
            </div>
          </section>
        </div>

        <aside className="space-y-5">
          <section className="sidebar-texture rounded-3xl p-5 text-white shadow-xl shadow-forest/15">
            <div className="flex items-center gap-2 text-accent-200">
              <Star className="size-4" />
              <p className="text-[10px] font-bold uppercase tracking-[0.18em]">
                Your writing
              </p>
            </div>
            <p className="mt-4 font-display text-4xl font-semibold">{activeNotes.length}</p>
            <p className="mt-1 text-xs text-white/50">
              notes are safely nested in your workspace
            </p>
            <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-accent-500 transition-[width] duration-700"
                style={{
                  width: `${Math.min(100, Math.max(8, (activeNotes.length / 20) * 100))}%`,
                }}
              />
            </div>
            <p className="mt-2 text-[10px] text-white/35">
              A lovely start. Keep writing — future-you is collecting these.
            </p>
          </section>

          <section className="card p-5">
            <h2 className="font-display text-base font-semibold text-ink">
              Profile checklist
            </h2>
            <ul className="mt-3 space-y-3">
              {[
                { label: "Create your account", done: true },
                { label: "Write your first note", done: activeNotes.length > 0 },
                { label: "Add a profile photo", done: Boolean(user?.profile) },
                { label: "Say hi in the community", done: false },
              ].map((item) => (
                <li key={item.label} className="flex items-center gap-2.5 text-xs">
                  <span
                    className={`flex size-5 shrink-0 items-center justify-center rounded-full ${
                      item.done
                        ? "bg-emerald-50 text-emerald-600"
                        : "border border-line text-muted/50"
                    }`}
                  >
                    <CheckCircle2 className="size-3.5" />
                  </span>
                  <span
                    className={
                      item.done ? "text-muted line-through" : "text-body"
                    }
                  >
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="card p-5">
            <div className="flex items-center gap-2 text-accent-700">
              <ImageUp className="size-4" />
              <h2 className="font-display text-base font-semibold text-ink">
                A photo tip
              </h2>
            </div>
            <p className="mt-2 text-xs leading-5 text-muted">
              Use a square image with a simple background. It will look crisp in
              the sidebar and community chat.
            </p>
          </section>
        </aside>
      </div>

      {showModal ? (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-forest/55 p-4 backdrop-blur-sm">
          <div className="animate-fade-up w-full max-w-md rounded-3xl border border-line bg-paper p-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-display text-xl font-semibold text-ink">
                  Change your photo
                </h2>
                <p className="mt-1 text-xs text-muted">
                  Square images work best. JPG or PNG, up to 5 MB.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                aria-label="Close photo dialog"
                className="rounded-lg p-1.5 text-muted transition hover:bg-[#f1ede4] hover:text-body"
              >
                <X className="size-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => fileInput.current?.click()}
              className="mt-5 flex w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-line bg-[#faf7f0] px-4 py-8 text-center transition hover:-translate-y-0.5 hover:border-brand-300 hover:bg-brand-50/50"
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Selected profile preview"
                  className="size-28 rounded-full object-cover shadow-lg"
                />
              ) : (
                <>
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-paper text-brand-700 shadow-sm">
                    <UploadCloud className="size-5" />
                  </span>
                  <span className="text-sm font-semibold text-body">
                    Choose an image
                  </span>
                  <span className="text-[11px] text-muted">
                    or drop it here
                  </span>
                </>
              )}
            </button>

            <input
              ref={fileInput}
              type="file"
              accept="image/*"
              onChange={(event) => setFile(event.target.files?.[0] || null)}
              className="hidden"
            />

            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                disabled={uploading}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleUpload}
                disabled={!file || uploading}
                className="btn-primary"
              >
                {uploading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <UploadCloud className="size-4" />
                )}
                {uploading ? "Uploading…" : "Save photo"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Profile;
