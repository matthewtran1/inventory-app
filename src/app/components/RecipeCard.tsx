"use client"

import { useState } from "react";
import DashboardCard from "./DashboardCard";

type Recipe = {
    name: string;
    missingIngredients: string[];
    prepTime: string;
    difficulty: string;
    instructions: string;
};

export default function RecipeCard() {

    const [getRecipes, setRecipes] = useState<Recipe[]>([]);


    const fetchRecipes = async () => {
        try {
            const response = await fetch("/api/recipeAgent");
            const data = await response.json();
            const aiText = data.messages[data.messages.length - 1].kwargs.content;
            const trimmedText = aiText.trim();
            const parsed = JSON.parse(trimmedText);
            setRecipes(parsed.recipes);
        }
        catch (error) {
            console.error("Error fetching recipes:", error);
        } 
    }

    return (    
        <DashboardCard title="Recipe Suggestions" accent='green'>
            <div className="flex flex-col gap-2">
                <p className="text-gray-600">Recipe suggestions will appear here based on your inventory.</p>
                <button
                    onClick={fetchRecipes}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"         
                >
                    Get Recipe Suggestions
                </button>
                
                {Object.entries(getRecipes).map(([index, recipe]) => (
                    <div key={index} className="border-b pb-2">
                        <h3 className="font-semibold">{recipe.name}</h3>
                        <p>Missing Ingredients: {recipe.missingIngredients.join(", ") || "None"}</p>
                        <p>Prep Time: {recipe.prepTime}</p>
                        <p>Difficulty: {recipe.difficulty}</p>
                        <p>Instructions: {recipe.instructions}</p>
                    </div>
                ))    }  
                
            </div>
        </DashboardCard>    
    );

}