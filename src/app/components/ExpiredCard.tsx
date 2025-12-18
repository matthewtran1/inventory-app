'use client';

import { useEffect, useState } from 'react';
import DashboardCard from './DashboardCard';

type ExpiringItem = {
  name: string;
  storage: string;
  entered_date: string;
  expired_date: string;
};

type ItemWithDays = {
  name: string;
  storage: string;
  daysLeft: number;
};

export default function ExpiringSoonCard() {
  const [expiredItems, setExpiredItems] = useState<ItemWithDays[]>([]);

  useEffect(() => {
    const fetchExpiringItems = async () => {
      try {
        const response = await fetch('/api/items/expiring');
        const data: ExpiringItem[] = await response.json();

        // Calculate days left for each item
        const itemsWithDays: ItemWithDays[] = data.map(item => {
          const expiryDate = new Date(item.expired_date);
          const today = new Date();
          const diffTime = expiryDate.getTime() - today.getTime();
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          return {
            name: item.name,
            storage: item.storage,
            daysLeft: diffDays,
          };
        });

        // Sort by days left
        itemsWithDays.sort((a, b) => a.daysLeft - b.daysLeft);

        setExpiredItems(itemsWithDays);
      } catch (error) {
        console.error('Error fetching expiring items:', error);
        setExpiredItems([]);
      }
    };

    fetchExpiringItems();
  }, []);

  // Group items by storage with proper typing
  type GroupedItems = Record<string, ItemWithDays[]>;

  // Use `reduce` to transform the flat array of expiredItems
  // into an object grouped by storage
  const groupedByStorage: GroupedItems = expiredItems.reduce(
    (acc, item) => {
      // If this storage hasn't been added to the accumulator yet, initialize it as an empty array
      if (!acc[item.storage]) acc[item.storage] = [];

      // Add the current item to the array for its storage
      acc[item.storage].push(item);

      // Return the accumulator for the next iteration
      return acc;
    },
    {} as GroupedItems // Initial value of the accumulator, typed as GroupedItems
  );

  return (
    <DashboardCard title="Expiring Soon" accent="red">
      
      <ul className="space-y-4">
        {expiredItems.length === 0 ? (
          <li>No items expiring soon!</li>
        ) : (
          Object.entries(groupedByStorage).map(([storage, items]) => (
            <li key={storage}>
              <div className='flex flex-col rounded-md border p-2'>
              {/* Storage header */}
              <p className="underline underline-offset-2">{storage}</p>
              {/* Items in this storage */}
              <ul className="mt-2 space-y-2">
                {items.map((item, index) => (
                  <li
                    key={index}
                  >
                    <span className="text-sm ">{item.name}</span>
                  </li>
                ))}
              </ul>
              </div>
            </li>
          ))
        )}
      </ul>
    
    </DashboardCard>
  );
}
