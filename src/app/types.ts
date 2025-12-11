// src/app/types.ts
export type Item = {
  id: string;
  itemName: string;
  enteredDate: string;
  expiryDate: string;
  notes: string;
};

export type Storage = {
  id: string;
  name: string;
  items: Item[];
};
