"use client";

import Link from "next/link";
import { useState } from "react";

export default function Topbar() {
  const [isOpen, setIsOpen] = useState(false);
  

  return (
    <header className="w-full bg-white border-b px-4">
      <div className="p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Inventory</h1>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-4">
          <Link href="/" className="text-gray-700 hover:text-black font-medium">
            Dashboard
          </Link>
          <Link href="/inventory" className="text-gray-700 hover:text-black font-medium">
            Inventory
          </Link>
          <Link href="/settings" className="text-gray-700 hover:text-black font-medium">
            Settings
          </Link>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden px-4 pb-4 flex flex-col gap-3">
          <Link
            href="/"
            className="text-gray-700 hover:text-black font-medium"
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            href="/inventory"
            className="text-gray-700 hover:text-black font-medium"
            onClick={() => setIsOpen(false)}
          >
            Inventory
          </Link>
          <Link
            href="/settings"
            className="text-gray-700 hover:text-black font-medium"
            onClick={() => setIsOpen(false)}
          >
            Settings
          </Link>
        </nav>
      )}
    </header>
  );
}
