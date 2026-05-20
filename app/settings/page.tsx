"use client";
import { Bell, Globe, LifeBuoy } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function SettingsPage() {
  const { lang, setLang, t } = useLanguage();

  return (
    <div className="p-8 md:p-12 max-w-4xl w-full">
      <h1 className="text-3xl font-extrabold text-gray-950 mb-8 italic">FixIt.gr {t.settingsTitle}</h1>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Ειδοποιήσεις */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between hover:bg-gray-50 transition duration-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-full">
              <Bell className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">{t.notifications}</h3>
              <p className="text-sm text-gray-500">{t.notifDesc}</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {/* Γλώσσα */}
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-gray-50 transition duration-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-full">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">{t.langTitle}</h3>
              <p className="text-sm text-gray-500">{t.langDesc}</p>
            </div>
          </div>
          <select 
            value={lang} 
            onChange={(e) => setLang(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-auto p-2.5 outline-none transition cursor-pointer"
          >
            <option value="el">Ελληνικά</option>
            <option value="en">English</option>
          </select>
        </div>

        {/* Βοήθεια */}
        <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-gray-50 transition duration-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-rose-50 text-rose-600 rounded-full">
              <LifeBuoy className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">{t.helpTitle}</h3>
              <p className="text-sm text-gray-500">{t.helpDesc}</p>
            </div>
          </div>
          <button className="text-gray-900 font-medium border border-gray-300 px-6 py-2.5 rounded-lg hover:bg-gray-100 transition w-full md:w-auto">
            {t.contactBtn}
          </button>
        </div>

      </div>
    </div>
  );
}