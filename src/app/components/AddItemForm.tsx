"use client";

import { useState } from "react";
import { Item } from "../types";

// type props
type AddItemFormProps = {
  storageId: string;
  item?: Item;
  onSubmit: (storageId: string, item: Item) => void;
  onClose: () => void;
};

// Form popup to add items
export default function AddItemForm({ storageId, item, onSubmit, onClose }: AddItemFormProps) {
  const [itemName, setItemName] = useState(item?.name ?? "");
  const [expiryDate, setExpiryDate] = useState(item?.expired_date ?? "");
  const [notes, setNotes] = useState(item?.notes ?? "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create new item
    const newItem: Item = {
      storage_id: storageId,
      name: itemName,
      entered_date: new Date().toISOString().slice(0, 10),
      expired_date: expiryDate,
      notes,
    };


    try {

      // if item exists, we're editing; otherwise, adding
      const method = item ? "PATCH" : "POST";

      // Send storageId along with the item
      const res = await fetch("/api/items", {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newItem,
          id: item?.id,
          storage_id: storageId, 
        }),
      });

      const data = await res.json();
      // console.log("API returned:", data);

      if (!data.error) {
        // Pass the storageId to onSubmit so it updates the correct storage
        onSubmit(storageId, data); 
        onClose();
      } else {
        alert(`Failed to add item: ${data.error}`);
      }
    } catch (err) {
      console.error(err);
      alert(`Error adding or saving item to storage ${storageId}`);
    }
  };


  return (
    <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
      <form
        className="bg-white p-6 rounded shadow-md w-80 flex flex-col space-y-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-semibold">{item ? "Edit an Item" : "Add an Item"}</h2>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">
            Item Name
          </label>
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
            className="border px-2 py-1 rounded"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">
            Expiry Date (optional)
          </label>
          <input
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
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
          <button type="button" onClick={onClose} className="px-4 py-1 rounded border cursor-pointer">
            Cancel
          </button>
          <button type="submit" className="px-4 py-1 rounded bg-blue-500 text-white cursor-pointer">
            {item ? "Save" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
}
