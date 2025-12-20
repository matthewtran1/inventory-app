import ExpiredCard from "./components/ExpiredCard";
import RecipeCard from "./components/RecipeCard";
import DashboardCard from "./components/DashboardCard";

export default function Dashboard() {
  return (
    <div
      className="p-4 bg-zinc-50 dark:bg-gray-900"
      style={{ height: "calc(100vh - 64px)" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-4 h-full">

        <ExpiredCard />

        <RecipeCard />
        
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
