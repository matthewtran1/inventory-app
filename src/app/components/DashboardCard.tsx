type Accent = "red" | "green" | "blue" | "yellow";

type DashboardCardProps = {
  title: string;
  accent: Accent;
  children: React.ReactNode;
};

const accentStyles: Record<Accent, string> = {
  red: "bg-red-50 text-red-600",
  green: "bg-green-50 text-green-600",
  blue: "bg-blue-50 text-blue-600",
  yellow: "bg-yellow-50 text-yellow-600",
};


export default function DashboardCard({
  title,
  accent,
  children,
}: DashboardCardProps) {
  return (
    <div
      className={`rounded-xl shadow-md p-6 flex flex-col h-[50vh] sm:h-auto ${accentStyles[accent]}`}
    >
      <h2 className="text-xl font-semibold mb-4">
        {title}
      </h2>

      <div className="flex-1 overflow-y-auto text-gray-800">
        {children}
      </div>
    </div>
  );
}
