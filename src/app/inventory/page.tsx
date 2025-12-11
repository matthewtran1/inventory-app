
"use client";
import ItemCard from "@/components/ItemCard";
import { useState } from "react";

type Item = {
    id: string;
    itemName: string;
    enteredDate: string;
    expiryDate: string;
    notes: string;
 };

    type Storage = {
    id: string;
    name: string;
    items: Item[];
    };


export default function Inventory() {

  
  const [inventory, setInventory] = useState<Storage[]>([
    { id: "fridge", name: "Fridge", items: [] },
    { id: "freezer", name: "Freezer", items: [] },
    { id: "pantry", name: "Pantry", items: [] },
  ]);

  // Add item to a specific storage
  function addItem(storageId: string) {
    const newItem: Item = {
      id: crypto.randomUUID(), // unique ID
      itemName: "New Item",
      enteredDate: new Date().toISOString().slice(0, 10),
      expiryDate: "",
      notes: "",
    };

    setInventory((prev) =>
      prev.map((storage) =>
        storage.id === storageId
          ? { ...storage, items: [...storage.items, newItem] }
          : storage
      )
    );
  }

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
              onClick={() => addItem(storage.id)}
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
    </div>
  );
}
