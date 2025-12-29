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
      <body className="flex flex-col min-h-screen">
        {/* Top Bar */}
        <Topbar />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-red-500">
          {children}
        </main>
      </body>
    </html>
  );
}
