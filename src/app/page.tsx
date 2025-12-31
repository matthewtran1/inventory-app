import ExpiredCard from "./components/ExpiredCard";
import RecipeCard from "./components/RecipeCard";
import DashboardCard from "./components/DashboardCard";
import AmountCard from "./components/AmountCard";

export default function Dashboard() {
  return (
    <div
      className="p-4 bg-zinc-50 "
      style={{ height: "calc(100vh - 64px)" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-4 h-full">

        <ExpiredCard />

        <RecipeCard />
        
        <AmountCard />

        <DashboardCard title="Not used" accent="yellow">
          <p>Not used</p>
        </DashboardCard>

      </div>
    </div>
  );
}
