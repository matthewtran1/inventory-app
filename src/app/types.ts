// src/app/types.ts
export type Item = {
  id?: number;
  storage_id: string;
  name: string;
  entered_date: string;
  expired_date: string;
  notes: string;
  amount?: number;
};

export type Storage = {
  id: string;
  name: string;
  items: Item[];
  notes: string
};

// Type for recipe data from API
export type Recipe = {
    name: string;
    ingredients: string[];
    missingIngredients: string[];
    prepTime: string;
    difficulty: string;
    instructions: string;
};

// Type for expiring items from API
export type ExpiringItem = {
  name: string;
  storage: string;
  entered_date: string;
  expired_date: string;
};

export type ItemWithDays = {
  name: string;
  storage: string;
  daysLeft: number;
};

// Type for low amount items
export type LowAmountItem = {
    name: string;
    amount: number;
};