"use client";

import { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
import AddItemForm from "../components/AddItemForm";
import { Item, Storage } from "../types";
import AddStorageForm from "../components/AddStorageForm";

export default function Inventory() {

  // Basic storage stuff
  const [inventory, setInventory] = useState<Storage[]>([]);

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
            // Add the new item to the storage's items array
            // If storage.items is undefined, default to an empty array first
          ? { ...storage, items: [...(storage.items ?? []), newItem] }
          : storage
      )
    );
  };

  // create new storage
  async function handleAddStorage(newStorage: Storage) {
    setInventory(prev => [...prev, newStorage]);
  }

  // Delete item from storage
  const handleDeleteItem = async (storageId: string, itemId: string) => {
    setInventory(prev =>
      prev.map(storage =>
        storage.id === storageId
          ? { ...storage, items: storage.items.filter(item => item.id !== itemId) }
          : storage
      )
    );

    try {
      await fetch("/api/items", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: itemId,
          storage_id: storageId, 
        }),
      });

    } catch (err) {
      console.error(err);
      alert(`Error failed to delete item from storage ${storageId}`);
    }
  };

  useEffect(() => {
    async function loadData() {
      // Fetch storages
      const resStorages = await fetch("/api/storages");
      const storages: Storage[] = await resStorages.json();

      // Fetch items
      const resItems = await fetch("/api/items");
      const items: Item[] = await resItems.json();

      // Attach items to their storage
      const storagesWithItems = storages.map(storage => ({
        ...storage,
        items: items.filter(item => item.storage_id === storage.id),
      }));

      setInventory(storagesWithItems);
    }

    loadData();
  }, []);

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
            {storage.items?.map((item) => (
              <ItemCard
                key={item.id}
                id = {item.id}
                itemName={item.name}
                enteredDate={item.entered_date}
                expiryDate={item.expired_date}
                notes={item.notes}
                onDelete={(itemId) => handleDeleteItem(storage.id, itemId)}
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
