import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import BrandMark from "./BrandMark";

const links = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#community", label: "Community" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-paper/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="group flex items-center gap-3">
          <BrandMark className="size-10 rounded-xl shadow-sm transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105" />
          <div>
            <p className="font-display text-xl font-semibold leading-none text-ink">
              NoteNest
            </p>
            <p className="mt-1.5 text-[9px] font-bold uppercase tracking-[0.22em] text-accent-600">
              Your second brain
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative py-1 text-sm font-bold text-muted transition hover:text-ink"
            >
              {link.label}
              <span className="absolute inset-x-0 -bottom-1 h-0.5 origin-left scale-x-0 rounded-full bg-accent-500 transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link to="/login" className="btn-ghost">
            Log in
          </Link>
          <Link to="/signup" className="btn-primary">
            Get started free
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Close menu" : "Open menu"}
          className="icon-btn md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-line bg-paper px-4 pb-5 pt-3 md:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-bold text-muted transition hover:bg-brand-50 hover:text-brand-800"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Link to="/login" className="btn-secondary" onClick={() => setOpen(false)}>
              Log in
            </Link>
            <Link to="/signup" className="btn-primary" onClick={() => setOpen(false)}>
              Get started
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
};

export default Navbar;
