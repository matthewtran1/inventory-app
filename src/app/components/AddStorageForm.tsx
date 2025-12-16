"use client";

import { useState } from "react";
import { Storage } from "../types";

type AddStorageFormProps = {
  onSubmit: (storage: Storage) => void;
  onClose: () => void;
};

export default function AddStorageForm({ onSubmit, onClose }: AddStorageFormProps) {
  const [storageName, setStorageName] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create new storage with unique id
    const newStorage: Storage = {
      id: crypto.randomUUID(),
      name: storageName,
      items: [],
      notes,
    };

    try {
      const res = await fetch("/api/storages", {
        method: "POST",
        body: JSON.stringify(newStorage),
      });

      const data = await res.json();
      if (data.success) {
        onSubmit(newStorage); 
        onClose();
      } else {
        alert("Failed to add storage");
      }
    } catch (err) {
      console.error(err);
      alert("Error adding storage");
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
      <form
        className="bg-white p-6 rounded shadow-md w-80 flex flex-col space-y-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-semibold">Add New Storage</h2>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">
            Storage Name
          </label>
          <input
            type="text"
            value={storageName}
            onChange={(e) => setStorageName(e.target.value)}
            required
            className="border px-2 py-1 rounded"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">
            Notes (optional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="border px-2 py-1 rounded"
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1 rounded border cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-1 rounded bg-blue-500 text-white cursor-pointer"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
