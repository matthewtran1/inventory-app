"use client";

import { useState } from "react";
import { Item } from "../types";

type AddItemFormProps = {
  storageId: string;
  onSubmit: (storageId: string, item: Item) => void;
  onClose: () => void;
};

export default function AddItemForm({ storageId, onSubmit, onClose }: AddItemFormProps) {
  const [itemName, setItemName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newItem: Item = {
      id: crypto.randomUUID(),
      itemName,
      enteredDate: new Date().toISOString().slice(0, 10),
      expiryDate,
      notes,
    };

    onSubmit(storageId, newItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
      <form
        className="bg-white p-6 rounded shadow-md w-80 flex flex-col space-y-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-semibold">Add New Item</h2>
        <input
          type="text"
          placeholder="Item Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          required
          className="border px-2 py-1 rounded"
        />
        <input

          placeholder="Expiry Date (optional)"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          className="border px-2 py-1 rounded"
        />
        <textarea
          placeholder="Notes (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="border px-2 py-1 rounded"
        />
        <div className="flex justify-end space-x-2">
          <button type="button" onClick={onClose} className="px-4 py-1 rounded border cursor-pointer">
            Cancel
          </button>
          <button type="submit" className="px-4 py-1 rounded bg-blue-500 text-white cursor-pointer">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
