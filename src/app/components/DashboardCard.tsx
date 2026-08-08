type Accent = "red" | "green" | "blue" | "yellow";

type DashboardCardProps = {
  title: string;
  accent: Accent;
  children: React.ReactNode;
};

const accentBorder: Record<Accent, string> = {
  red: "border-l-red-500",
  green: "border-l-green-500",
  blue: "border-l-blue-500",
  yellow: "border-l-yellow-500",
};

export default function DashboardCard({
  title,
  accent,
  children,
}: DashboardCardProps) {
  return (
    <div
      className={`rounded-2xl border border-zinc-100 border-l-4 ${accentBorder[accent]} bg-white shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col h-full`}
    >
      <h2 className="text-lg font-semibold text-zinc-900 mb-4 tracking-tight">
        {title}
      </h2>

      <div className="flex-1 overflow-y-auto text-zinc-700">
        {children}
      </div>
    </div>
  );
}
