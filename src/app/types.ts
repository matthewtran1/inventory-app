// src/app/types.ts
export type Item = {
  id: string;
  storage_id: string;
  name: string;
  entered_date: string;
  expired_date: string;
  notes: string;
};

export type Storage = {
  id: string;
  name: string;
  items: Item[];
  notes: string
};
