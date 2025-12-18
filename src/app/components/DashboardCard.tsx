type Accent = "red" | "green" | "blue" | "yellow";

type DashboardCardProps = {
  title: string;
  accent: Accent;
  children: React.ReactNode;
};

const accentStyles: Record<Accent, string> = {
  red: "bg-red-50 dark:bg-red-900 text-red-600 dark:text-red-300",
  green: "bg-green-50 dark:bg-green-900 text-green-600 dark:text-green-300",
  blue: "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300",
  yellow: "bg-yellow-50 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300",
};

export default function DashboardCard({
  title,
  accent,
  children,
}: DashboardCardProps) {
  return (
    <div
      className={`rounded-xl shadow-md p-6 flex flex-col h-full ${accentStyles[accent]}`}
    >
      <h2 className="text-xl font-semibold mb-4">
        {title}
      </h2>

      <div className="flex-1 overflow-y-auto text-gray-800 dark:text-gray-200" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {children}
      </div>
    </div>
  );
}
