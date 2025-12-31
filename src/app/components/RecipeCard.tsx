"use client"

import { useState } from "react";
import DashboardCard from "./DashboardCard";
import { Recipe } from "../types";

export default function RecipeCard() {

    // Set state for recipes
    const [getRecipes, setRecipes] = useState<Recipe[]>([]);

    // Get recipes from API
    const fetchRecipes = async () => {
        try {
            const response = await fetch("/api/recipeAgent");
            const data = await response.json();

            // If API explicitly returns empty array

            const aiText = data.messages[data.messages.length - 1].kwargs.content;
            const trimmedText = aiText.trim();
            const parsed = JSON.parse(trimmedText);
            console.log(parsed)
            const cleanedRecipes = parsed.recipes.map((recipe: Recipe) => ({
                ...recipe,
                prepTime: recipe.prepTime.replace(/\n/g, ' ').trim(),
            }));

            setRecipes(cleanedRecipes);
        }
        catch (error) {
            console.error("Error fetching recipes:", error);
        } 
    }

    return (    
        <DashboardCard title="Recipe Suggestions" accent='green'>
            <div className="flex flex-col gap-2">
                <p className="">Recipe suggestions will appear here based on your inventory.</p>
                <button
                    onClick={fetchRecipes}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition cursor-pointer"         
                >
                    Get Recipe Suggestions
                </button>
                
                {/* Display recipes if available */}
                {Object.entries(getRecipes).map(([index, recipe]) => (
                    <div key={index} className="rounded-md border p-2 bg-white">
                        <h3 className="font-semibold">{recipe.name}</h3>
                        <p>My Ingredients: {recipe.ingredients.join(", ") || "None"}</p>
                        <p className="text-red-600">Missing Ingredients: {recipe.missingIngredients.join(", ") || "None"}</p>
                        <p>Prep Time: {recipe.prepTime}</p>
                        <p>Difficulty: {recipe.difficulty}</p>
                    </div>
                    ))    
                }  
                
            </div>
        </DashboardCard>    
    );

}