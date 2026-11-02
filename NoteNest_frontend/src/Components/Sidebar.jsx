import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  House,
  Notebook,
  Star,
  Trash2,
  CircleUser,
  LogOut,
  MessagesSquare,
  Sparkles,
  X,
} from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";
import BrandMark from "./BrandMark";
import { API_URL } from "../Features/API";
import { toast } from "../utils/toast";

const navItems = [
  { to: "/layout", label: "Dashboard", icon: House, end: true },
  { to: "/layout/allNotes", label: "All notes", icon: Notebook, badge: "notes" },
  { to: "/layout/favorites", label: "Favorites", icon: Star, badge: "favorites" },
  { to: "/layout/community", label: "Community", icon: MessagesSquare, live: true },
  { to: "/layout/trash", label: "Trash", icon: Trash2, badge: "trash" },
];

const Sidebar = ({ open, onClose }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.userDetails.userdata?.message);
  const notes = useSelector((state) => state.userNotes.userdata) || [];

  const counts = {
    notes: notes.filter((note) => !note.Trash).length,
    favorites: notes.filter((note) => note.favorite && !note.Trash).length,
    trash: notes.filter((note) => note.Trash).length,
  };

  const initials = (user?.name || "N")
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/auth/logout`, {
        withCredentials: true,
      });

      if (response.data.status) {
        toast.success("You have been logged out");
        navigate("/");
      } else {
        toast.error(response.data.message || "Could not log out");
      }
    } catch {
      toast.error("Could not log out. Please try again.");
    }
  };

  const navClass = ({ isActive }) =>
    `group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition duration-200 ${
      isActive
        ? "bg-paper text-forest shadow-[0_10px_24px_-18px_rgba(0,0,0,0.75)]"
        : "text-white/60 hover:bg-white/[0.07] hover:text-white"
    }`;

  return (
    <>
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-forest/55 backdrop-blur-sm transition lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`sidebar-texture fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-white/5 text-white transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-6">
          <Link to="/layout" className="flex items-center gap-3" onClick={onClose}>
            <BrandMark className="size-11 rounded-2xl shadow-lg shadow-black/20" />
            <div>
              <p className="font-display text-xl font-semibold leading-none">NoteNest</p>
              <p className="mt-1.5 text-[9px] font-bold uppercase tracking-[0.22em] text-brand-200/70">
                Your second brain
              </p>
            </div>
          </Link>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="rounded-lg p-1.5 text-white/60 transition hover:bg-white/10 hover:text-white lg:hidden"
          >
            <X className="size-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-4">
          <p className="px-3 pb-2 pt-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white/30">
            Workspace
          </p>

          {navItems.map((item) => {
            const Icon = item.icon;
            const count = item.badge ? counts[item.badge] : 0;

            return (
              <NavLink key={item.to} to={item.to} end={item.end} onClick={onClose} className={navClass}>
                {({ isActive }) => (
                  <>
                    {isActive ? (
                      <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-accent-500" />
                    ) : null}
                    <Icon
                      className={`size-[18px] shrink-0 transition-transform duration-200 group-hover:-rotate-3 group-hover:scale-110 ${
                        isActive ? "text-brand-700" : ""
                      }`}
                    />
                    <span className="flex-1">{item.label}</span>
                    {item.live ? (
                      <span
                        className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          isActive
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-emerald-400/10 text-emerald-300"
                        }`}
                      >
                        <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
                        Live
                      </span>
                    ) : null}
                    {count > 0 ? (
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          isActive ? "bg-brand-100 text-brand-800" : "bg-white/10 text-white/70"
                        }`}
                      >
                        {count}
                      </span>
                    ) : null}
                  </>
                )}
              </NavLink>
            );
          })}

          <p className="px-3 pb-2 pt-6 text-[10px] font-bold uppercase tracking-[0.22em] text-white/30">
            Account
          </p>

          <NavLink
            to="/layout/profile"
            onClick={onClose}
            className={({ isActive }) =>
              `group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition duration-200 ${
                isActive
                  ? "bg-paper text-forest shadow-[0_10px_24px_-18px_rgba(0,0,0,0.75)]"
                  : "text-white/60 hover:bg-white/[0.07] hover:text-white"
              }`
            }
          >
            <CircleUser className="size-[18px] transition-transform duration-200 group-hover:-rotate-3 group-hover:scale-110" />
            Profile
          </NavLink>

          <button
            type="button"
            onClick={handleLogout}
            className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-white/60 transition duration-200 hover:bg-white/[0.07] hover:text-white"
          >
            <LogOut className="size-[18px] transition-transform duration-200 group-hover:translate-x-0.5" />
            Log out
          </button>
        </nav>

        <div className="p-4">
          <div className="group rounded-2xl border border-white/10 bg-white/[0.055] p-4 transition duration-300 hover:border-accent-300/30 hover:bg-white/[0.08]">
            <div className="flex items-center gap-2 text-accent-200">
              <Sparkles className="size-4 transition-transform duration-300 group-hover:rotate-12" />
              <p className="text-xs font-bold uppercase tracking-wider">AI summaries</p>
            </div>
            <p className="mt-2 text-xs leading-5 text-white/50">
              Open any note and let AI turn it into a quick recap.
            </p>
            <Link
              to="/layout/allNotes"
              onClick={onClose}
              className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-white transition hover:text-accent-200"
            >
              Try it now
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </div>

          <div className="mt-3 flex items-center gap-3 rounded-2xl bg-black/20 p-3">
            {user?.profile ? (
              <img
                src={user.profile}
                alt={user.name || "Profile"}
                className="size-10 rounded-full object-cover ring-2 ring-white/10"
              />
            ) : (
              <div className="flex size-10 items-center justify-center rounded-full bg-accent-500 text-sm font-bold text-white">
                {initials}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{user?.name || "NoteNest user"}</p>
              <p className="truncate text-[11px] text-white/45">
                {user?.email || "Welcome back"}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
