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
              <div className="flex flex-col rounded-md border p-2 bg-white">
                {/* Storage header */}
                <p className="underline underline-offset-2 font-medium">{storage}</p>

                {/* Items in this storage */}
                <ul className="mt-2 space-y-2">
                  {items.map((item, index) => {
                    // Badge style
                    let badgeClasses = '';
                    let badgeText = '';

                    if (item.daysLeft < 0) {
                      // Expired → red badge, same style as yellow, but no text
                      badgeClasses = 'bg-red-100 border border-red-500 rounded-full w-8 h-5';
                      badgeText = ''; // no days shown
                    } else if (item.daysLeft <= 5) {
                      // Expiring soon → yellow badge with days
                      badgeClasses = 'bg-yellow-100 text-yellow-800 border border-yellow-500 rounded-full px-2 py-0.5';
                      badgeText = `${item.daysLeft}d`;
                    }

                    return (
                      <li
                        key={index}
                        className="flex items-center justify-between"
                      >
                        {/* Item name */}
                        <span className="font-medium text-gray-800 truncate">{item.name}</span>

                        {/* Badge */}
                        <span className={`text-xs font-semibold flex items-center justify-center ${badgeClasses}`}>
                          {badgeText}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </li>
          ))
        )}
      </ul>
    </DashboardCard>
  );
}
