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
