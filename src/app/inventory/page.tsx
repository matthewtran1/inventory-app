"use client";

import { useState } from "react";
import ItemCard from "../components/ItemCard";
import AddItemForm from "../components/AddItemForm";
import { Item, Storage } from "../types";

export default function Inventory() {
  const [inventory, setInventory] = useState<Storage[]>([
    { id: "fridge", name: "Fridge", items: [] },
    { id: "freezer", name: "Freezer", items: [] },
    { id: "pantry", name: "Pantry", items: [] },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [activeStorageId, setActiveStorageId] = useState<string | null>(null);

  const handleAddItem = (storageId: string, newItem: Item) => {
    setInventory((prev) =>
      prev.map((storage) =>
        storage.id === storageId
          ? { ...storage, items: [...storage.items, newItem] }
          : storage
      )
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black px-8 py-8">
      <div className="text-3xl font-semibold mb-8">Inventory</div>

      {inventory.map((storage) => (
        <div
          key={storage.id}
          className="bg-white w-full mb-8 px-6 py-4 rounded-lg shadow"
        >
          <div className="flex justify-between">
            <div className="text-3xl font-semibold">{storage.name}</div>
            <div
              className="text-3xl font-semibold cursor-pointer px-2 rounded hover:bg-blue-500 hover:text-white transition-colors"
              onClick={() => {
                setActiveStorageId(storage.id);
                setIsFormOpen(true);
              }}
            >
              +
            </div>
          </div>

          {/* Scrollable Items Area */}
          <div className="max-h-64 overflow-y-auto pr-2 space-y-4 mt-4">
            {storage.items.map((item) => (
              <ItemCard
                key={item.id}
                itemName={item.itemName}
                enteredDate={item.enteredDate}
                expiryDate={item.expiryDate}
                notes={item.notes}
              />
            ))}
          </div>
        </div>
      ))}

      {/* Add Item Popup */}
      {isFormOpen && activeStorageId && (
        <AddItemForm
          storageId={activeStorageId}
          onSubmit={handleAddItem}
          onClose={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
}
