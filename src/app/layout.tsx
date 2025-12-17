import "./globals.css";
import Topbar from "./components/Topbar";

export const metadata = {
  title: "Inventory Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-gray-100">
        {/* Top Bar */}
        <Topbar />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-zinc-50">
          {children}
        </main>
      </body>
    </html>
  );
}
