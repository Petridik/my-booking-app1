import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import { LanguageProvider } from "./context/LanguageContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FixIt.gr | Επαγγελματίες Τεχνικοί στην πόρτα σου",
  description: "Βρες άμεσα υδραυλικούς, ηλεκτρολόγους και τεχνικούς στην περιοχή σου.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="el">
      <body className={`${inter.className} flex bg-gray-50 min-h-screen overflow-hidden`}>
        <LanguageProvider>
          <Sidebar />
          <div className="flex-1 flex flex-col h-screen overflow-y-auto">
            {children}
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}