"use client";

import { useState } from "react";
import ItemCard from "../components/ItemCard";
import AddItemForm from "../components/AddItemForm";
import { Item, Storage } from "../types";
import AddStorageForm from "../components/AddStorageForm";

export default function Inventory() {

  // Basic storage stuff
  const [inventory, setInventory] = useState<Storage[]>([
    { id: "fridge", name: "Fridge", items: [], notes: '' },
    { id: "freezer", name: "Freezer", items: [], notes: '' },
  ]);

  // Item form
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Storage ID for which the form is active
  const [activeStorageId, setActiveStorageId] = useState<string | null>(null);

  // Storage Form
  const [isStorageFormOpen, setIsStorageFormOpen] = useState(false);

  // Add item to correct storage
  const handleAddItem = (storageId: string, newItem: Item) => {
    setInventory((prev) =>
      prev.map((storage) =>
        storage.id === storageId
          ? { ...storage, items: [...storage.items, newItem] }
          : storage
      )
    );
  };

  // create new storage
  function handleAddStorage(newStorage: Storage) {
    setInventory((prev) => [...prev, newStorage]);
  } 

  return (
    <div className="flex h-full flex-col font-sans dark:bg-black px-8 py-8">
      <div className="bg-white shadow-md rounded-xl p-4 mb-8 ">
        <div className="flex justify-between">
          <h1 className="text-3xl font-semibold text-gray-800">Inventory</h1>

          <div
            className="text-3xl font-semibold cursor-pointer px-3 py-1 rounded-md hover:bg-blue-500 hover:text-white transition-colors"
            onClick={() => setIsStorageFormOpen(true)}
          >
            +
          </div>
        </div>
        <p>Manage your inventory</p>
      </div>

     {/* Render Storage */}
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

          {/* Add Storage Notes */}
        {storage.notes && (
          <p className="mt-2 text-gray-500 text-sm">{storage.notes}</p>
        )}

          {/* Scrollable Items Area */}
          <div className="max-h-64 overflow-y-auto pr-2 space-y-4 mt-4">
            {/* Render items inside storage */}
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

      {/* Add Storage Popup */}
      {isStorageFormOpen && (
        <AddStorageForm
          onSubmit={handleAddStorage}
          onClose={() => setIsStorageFormOpen(false)}
        />
      )}

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
