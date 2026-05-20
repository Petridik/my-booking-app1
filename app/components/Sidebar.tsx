"use client";
import { Home, Calendar, User, Settings, Wrench } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";

export default function Sidebar() {
  const { t } = useLanguage();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col shadow-sm z-10">
      <div className="p-6 border-b border-gray-100 flex items-center gap-2">
        <Wrench className="w-6 h-6 text-blue-600" />
        <span className="text-2xl font-extrabold text-gray-950">FixIt.gr</span>
      </div>
      
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <Link href="/" className="flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-colors font-medium">
          <Home className="w-5 h-5" />
          {t.home}
        </Link>
        <Link href="#" className="flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-colors font-medium">
          <Calendar className="w-5 h-5" />
          {t.appointments}
        </Link>
        <Link href="#" className="flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-colors font-medium">
          <User className="w-5 h-5" />
          {t.account}
        </Link>
        <Link href="/settings" className="flex items-center gap-3 p-3 text-blue-700 bg-blue-50 rounded-xl transition-colors font-semibold">
          <Settings className="w-5 h-5" />
          {t.settings}
        </Link>
      </nav>

      <div className="p-4 border-t border-gray-100">
        <button className="w-full flex items-center justify-center gap-2 p-3 text-white bg-gray-900 hover:bg-gray-800 rounded-xl transition-colors font-medium">
          {t.partner}
        </button>
      </div>
    </aside>
  );
}