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

    // Get expiring items from API
    const fetchExpiringItems = async () => {
      try {
        const response = await fetch('/api/items/expiring');
        const data: ExpiringItem[] = await response.json();

        // Map to calculate days left
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

        // sort by days left
        itemsWithDays.sort((a, b) => a.daysLeft - b.daysLeft);

        setExpiredItems(itemsWithDays);
      } catch (error) {
        console.error('Error fetching expiring items:', error);
        setExpiredItems([]);
      }
    };

    fetchExpiringItems();
  }, []);

  return (
    <DashboardCard title="Expiring Soon" accent="red">
       {/* Use a <ul> to list all expiring items with some vertical spacing between <li> */}
        <ul className="space-y-2">

            {/* If there are no expiring items, show a placeholder message */}
            {expiredItems.length === 0 ? (
            <li>No items expiring soon!</li>
            ) : (
                /* Otherwise, map over the expiredItems array to display each item */
                expiredItems.map((item, index) => (
                    <li key={index}>
                    {/* Display the item name, storage location, and days left */}
                    {item.name} – {item.storage} – {item.daysLeft} {item.daysLeft === 1 ? 'day' : 'days'} left
                    </li>
                ))
            )}
        </ul>
    </DashboardCard>
  );
}
