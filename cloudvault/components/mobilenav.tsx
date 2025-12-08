"use client";

import Link from "next/link";
import { X } from "lucide-react";

interface MobileMenuProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MobileNav({ open, setOpen }: MobileMenuProps) {
  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg w-3/4 max-w-xs p-6 transform transition-transform duration-300 z-50
          ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Close Button */}
        <button className="mb-6" onClick={() => setOpen(false)}>
          <X size={28} />
        </button>

        <div className="flex flex-col gap-6 text-xl">
          <Link href="/" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/upload" onClick={() => setOpen(false)}>Upload</Link>
          <Link href="/gallery/id" onClick={() => setOpen(false)}>My Gallery</Link>
          <Link href="/sign-in" onClick={() => setOpen(false)}>Sign In</Link>
        </div>
      </div>
    </>
  );
}
