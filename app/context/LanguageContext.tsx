"use client";
import React, { createContext, useContext, useState } from "react";

const dictionary = {
  el: {
    home: "Αρχική",
    appointments: "Τα Ραντεβού μου",
    account: "Ο Λογαριασμός μου",
    settings: "Ρυθμίσεις",
    partner: "Γίνε Συνεργάτης",
    settingsTitle: "Ρυθμίσεις",
    notifications: "Ειδοποιήσεις",
    notifDesc: "Λάβε μήνυμα για την εξέλιξη του ραντεβού σου.",
    langTitle: "Γλώσσα (Language)",
    langDesc: "Επίλεξε τη γλώσσα της εφαρμογής.",
    themeTitle: "Εμφάνιση",
    themeDesc: "Επίλεξε φωτεινό ή σκοτεινό περιβάλλον.",
    helpTitle: "Βοήθεια & Υποστήριξη",
    helpDesc: "Έχεις κάποιο πρόβλημα; Είμαστε εδώ για εσένα.",
    contactBtn: "Επικοινωνία"
  },
  en: {
    home: "Home",
    appointments: "My Appointments",
    account: "My Account",
    settings: "Settings",
    partner: "Become a Partner",
    settingsTitle: "Settings",
    notifications: "Notifications",
    notifDesc: "Receive a message about your appointment status.",
    langTitle: "Language",
    langDesc: "Choose the application language.",
    themeTitle: "Appearance",
    themeDesc: "Choose light or dark environment.",
    helpTitle: "Help & Support",
    helpDesc: "Have a problem? We are here for you.",
    contactBtn: "Contact Us"
  }
};

const LanguageContext = createContext<any>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState("el"); // Η προεπιλεγμένη γλώσσα είναι τα Ελληνικά
  const t = dictionary[lang as keyof typeof dictionary]; // Εδώ τραβάμε τις λέξεις βάσει της γλώσσας

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);