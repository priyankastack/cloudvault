"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import MobileNav from "./mobilenav";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            CloudVault
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 text-lg">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <Link href="/upload" className="hover:text-blue-600">Upload</Link>
            <Link href="/gallery/me" className="hover:text-blue-600">My Gallery</Link>
            <Link href="/auth/Sign In" className="hover:text-blue-600">Sign In</Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setOpen(true)}>
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
          {open && <MobileNav open={open} setOpen={setOpen} />}
    </>
  );
}
