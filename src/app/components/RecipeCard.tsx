"use client"

import { useState } from "react";
import DashboardCard from "./DashboardCard";


export default function RecipeCard() {

    const [getRecipes, setRecipes] = useState([]);

    const fetchInventory = async () => {
        try {
            const response = await fetch("/api/recipeAgent");
            const data = await response.json();
            
            console.log("AI Response:", data.messages[data.messages.length - 1].kwargs.content);
            setRecipes(data);
        }
        catch (error) {
            console.error("Error fetching recipess:", error);
        } 
    }

    return (    
        <DashboardCard title="Recipe Suggestions" accent='green'>
            <div className="flex flex-col gap-2">
                <p className="text-gray-600">Recipe suggestions will appear here based on your inventory.</p>
                <button
                    onClick={fetchInventory}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"         
                >
                    Get Recipe Suggestions
                </button>
            </div>
        </DashboardCard>    
    );

}