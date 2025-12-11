"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 h-full bg-white border-r p-4 flex flex-col">
      <h1 className="text-xl font-bold mb-8">My App</h1>

      <nav className="flex flex-col gap-4">
        <Link
          href="/"
          className="text-gray-700 hover:text-black font-medium"
        >
          Dashboard
        </Link>

        <Link
          href="/inventory"
          className="text-gray-700 hover:text-black font-medium"
        >
          Inventory
        </Link>

        <Link
          href="/settings"
          className="text-gray-700 hover:text-black font-medium"
        >
          Settings
        </Link>
      </nav>
    </aside>
  );
}
