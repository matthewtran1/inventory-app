"use client"

import { useState, useEffect } from "react";
import DashboardCard from "./DashboardCard";
import { LowAmountItem } from "../types";

export default function AmountCard() {

    // Set state for recipes
    const [getLowItems, setLowItems] = useState<LowAmountItem[]>([]);

    // Get low amounts of items from API
    useEffect(() => {
        const fetchLowItems = async () => {
            try {
                const response = await fetch("/api/items/amount");
                const data = await response.json();
                setLowItems(data);
            }
            catch (error) {
                console.error("Error fetching items:", error);
            } 
        }

        fetchLowItems()
    }, []);

    return (    
        <DashboardCard title="Low Items" accent='blue'>
            <div className="flex flex-col gap-2">
            {getLowItems.length > 0 ? (
                getLowItems.map((item, index) => (
                    <div key={index} className="rounded-md border p-2 bg-white flex flex-col">
                    <div className="flex justify-between">
                        <h3 className="font-semibold">{item.name}</h3>
                        <div className={`border rounded-lg p-4 ${
                            item.amount <= 20 ? "bg-red-100 border-red-500"
                            : item.amount <= 50
                            ? "bg-yellow-100 border-yellow-500"
                            : ""
                        }`}></div>
                    </div>
                    <p>Amount: {item.amount}%</p>
                    </div>
                ))
                ) : (
                    <p className="">No items running low!</p>
                )}
         
                
            </div>
        </DashboardCard>    
    );

}