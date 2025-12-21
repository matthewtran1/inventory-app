"use client";

import { useState } from "react";
import type { Recipe } from "../types";  

const Recipe = () => {

    // Set state for recipes
    const [getRecipes, setRecipes] = useState<Recipe[]>([]);

    // Get recipes from API
    const fetchRecipes = async () => {
        try {
            const response = await fetch("/api/recipeAgent");
            const data = await response.json();
            const aiText = data.messages[data.messages.length - 1].kwargs.content;
            const trimmedText = aiText.trim();
            const parsed = JSON.parse(trimmedText);
            
            const cleanedRecipes = parsed.recipes.map((recipe: Recipe) => ({
                ...recipe,
                prepTime: recipe.prepTime.replace(/\n/g, ' ').trim(),
                instructions: recipe.instructions
                    .replace(/\r?\n|\\n/g, ' ') // replace all types of newlines with space
                    .replace(/\s+/g, ' ')       // collapse multiple spaces
                    .trim(),
            }));

            setRecipes(cleanedRecipes);
        }
        catch (error) {
            console.error("Error fetching recipes:", error);
        } 
    }
  return (

    <div className="min-h-screen bg-gray-100 flex flex-col">
    {/* Page Container */}
    <div className="flex-1 flex flex-col p-8 max-w-8xl mx-auto w-full">
        
        {/* Header */}
        <div className="rounded-lg border p-4 mb-4 bg-white shadow hover:shadow-md transition">
            <h1 className="text-3xl font-bold text-gray-800">Recipe Suggestions</h1>
            <p className="text-gray-600 mt-2">
                Recipe suggestions will appear here based on your inventory.
            </p>
            {/* Button */}
            <div className="mt-4">
                <button
                    onClick={fetchRecipes}
                    className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 transition font-medium"
                >
                    Get Recipe Suggestions
                </button>
            </div>
        </div>


        {/* Recipes List */}
        <div className="flex-1 overflow-y-auto space-y-4">
        {getRecipes.length === 0 ? (
            <p className="text-gray-500">No recipes yet. Click the button above to fetch suggestions.</p>
        ) : (
            getRecipes.map((recipe, index) => (
            <div
                key={index}
                className="rounded-lg border p-4 bg-white shadow hover:shadow-md transition"
            >
                <h3 className="text-xl font-semibold mb-2">{recipe.name}</h3>
                <p className="text-gray-700 mb-1">
                <span className="font-semibold">My Ingredients:</span>{" "}
                {recipe.ingredients?.join(", ") || "None"}
                </p>
                <p className="text-red-500 mb-1">
                <span className="font-semibold">Missing Ingredients:</span>{" "}
                {recipe.missingIngredients?.join(", ") || "None"}
                </p>
                <p className="text-gray-700 mb-1">
                <span className="font-semibold">Prep Time:</span> {recipe.prepTime}
                </p>
                <p className="text-gray-700 mb-1">
                <span className="font-semibold">Difficulty:</span> {recipe.difficulty}
                </p>
                <p className="text-gray-700">
                <span className="font-semibold">Steps:</span> {recipe.instructions}
                </p>
            </div>
            ))
        )}
        </div>
    </div>
    </div>

    
  )
}

export default Recipe