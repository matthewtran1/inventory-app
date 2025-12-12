"use client";

import { useState } from "react";
import { Storage } from "../types";

type AddStorageFormProps = {
  onSubmit: (storage: Storage) => void;
  onClose: () => void;
};

export default function AddStorageForm({ onSubmit, onClose }: AddStorageFormProps) {
  const [storageName, setStorageName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newStorage: Storage = {
      id: crypto.randomUUID(),
      name: storageName,
      items: [],
    };

    onSubmit(newStorage);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
      <form
        className="bg-white p-6 rounded shadow-md w-80 flex flex-col space-y-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-semibold">Add New Storage</h2>
        <input
          type="text"
          placeholder="Storage Name"
          value={storageName}
          onChange={(e) => setStorageName(e.target.value)}
          required
          className="border px-2 py-1 rounded"
        />
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
