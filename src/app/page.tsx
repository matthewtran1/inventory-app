import DashboardCard from "./components/DashboardCard";

export default function Dashboard() {
  return (
    <div
      className="p-4 bg-zinc-50 dark:bg-gray-900"
      style={{ height: "calc(100vh - 64px)" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-4 h-full">

        <DashboardCard title="Expiring Soon" accent="red">
          <ul className="space-y-2">
            <li>🥦 Broccoli – Fridge – 2 days left</li>
            <li>🥛 Milk – Fridge – 1 day left</li>
            <li>🍞 Bread – Pantry – 3 days left</li>
          </ul>
        </DashboardCard>

        <DashboardCard title="Recipe Suggestions" accent="green">
          <ul className="space-y-2">
            <li>🥗 Veggie Stir Fry – Uses Broccoli, Carrot</li>
            <li>🍲 Chicken Soup – Uses Chicken, Carrot</li>
            <li>🥪 Sandwich – Uses Bread, Cheese</li>
          </ul>
        </DashboardCard>

        <DashboardCard title="Fridge Summary" accent="blue">
          <p>12 items</p>
          <p>Fullness: 75%</p>
        </DashboardCard>

        <DashboardCard title="Pantry Summary" accent="yellow">
          <p>15 items</p>
          <p>Fullness: 60%</p>
        </DashboardCard>

      </div>
    </div>
  );
}
