export default function Dashboard() {
  return (
    <div
      className="p-4 bg-zinc-50 dark:bg-black"
      style={{ height: 'calc(100vh - 64px)' }} 
    >
      <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-4 h-full">
        
        {/* Card 1 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col h-full">
          <h2 className="text-xl font-semibold mb-4">Expiring Soon</h2>
          <ul className="space-y-2 flex-1 overflow-y-auto">
            <li>🥦 Broccoli – Fridge – 2 days left</li>
            <li>🥛 Milk – Fridge – 1 day left</li>
            <li>🍞 Bread – Pantry – 3 days left</li>
          </ul>
        </div>

        {/* Card 2 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col h-full">
          <h2 className="text-xl font-semibold mb-4">Recipe Suggestions</h2>
          <ul className="space-y-2 flex-1 overflow-y-auto">
            <li>🥗 Veggie Stir Fry – Uses Broccoli, Carrot</li>
            <li>🍲 Chicken Soup – Uses Chicken, Carrot</li>
            <li>🥪 Sandwich – Uses Bread, Cheese</li>
          </ul>
        </div>

        {/* Card 3 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col h-full">
          <h2 className="text-xl font-semibold mb-4">Fridge Summary</h2>
          <div className="flex-1">
            <p>12 items</p>
            <p>Fullness: 75%</p>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col h-full">
          <h2 className="text-xl font-semibold mb-4">Pantry Summary</h2>
          <div className="flex-1">
            <p>15 items</p>
            <p>Fullness: 60%</p>
          </div>
        </div>

      </div>
    </div>
  );
}
