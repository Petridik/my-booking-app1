"use client";

import { useState, useEffect } from 'react';
import { Search, MapPin, Star, UserCircle2, Loader2 } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// Αρχικοποίηση του Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

type Technician = {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  area: string;
  pricePerHour: number; // Θα το κάνουμε map από το price_per_hour της βάσης
  imageUrl: string;     // Θα το κάνουμε map από το image_url της βάσης
};

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        // Τραβάμε τα δεδομένα απευθείας από τον πίνακα technicians στο Supabase
        const { data, error } = await supabase
          .from('technicians')
          .select('*');

        if (error) {
          throw error;
        }

        if (data) {
          // Μετατρέπουμε τα δεδομένα από snake_case (Βάση) σε camelCase (Frontend)
          const formattedData: Technician[] = data.map((tech) => ({
            id: tech.id,
            name: tech.name,
            specialty: tech.specialty,
            rating: tech.rating,
            area: tech.area,
            pricePerHour: tech.price_per_hour,
            imageUrl: tech.image_url,
          }));
          setTechnicians(formattedData);
        }
      } catch (error) {
        console.error("Σφάλμα κατά τη φόρτωση από Supabase:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTechnicians();
  }, []);

  const filteredTechnicians = technicians.filter(tech => {
    const matchesSpecialty = tech.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesArea = tech.area.toLowerCase().includes(locationQuery.toLowerCase());
    return matchesSpecialty && matchesArea;
  });

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      
      <header className="bg-white shadow-sm border-b border-gray-100">
        <nav className="max-w-7xl mx-auto p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserCircle2 className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-extrabold text-gray-950">FixThess</span>
          </div>
          <button className="text-sm font-medium text-gray-600 hover:text-blue-600">
            Γίνε Συνεργάτης
          </button>
        </nav>
      </header>

      <div className="bg-white py-16 md:py-24 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-950 mb-4 leading-tight">
            Βρες τον κατάλληλο τεχνικό άμεσα
          </h1>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Υδραυλικοί, Ηλεκτρολόγοι και άλλοι επαγγελματίες στη Θεσσαλονίκη, στην πόρτα σου με ένα κλικ.
          </p>

          <div className="bg-white p-3 rounded-full shadow-2xl shadow-blue-500/10 w-full max-w-4xl flex flex-col md:flex-row gap-2 border border-gray-100 mx-auto">
            <div className="flex-1 flex items-center gap-2 p-3 border border-gray-200 rounded-full bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Τι ψάχνεις; (π.χ. Υδραυλικός)"
                className="flex-1 bg-transparent focus:outline-none text-gray-950"
              />
            </div>
            <div className="flex-1 flex items-center gap-2 p-3 border border-gray-200 rounded-full bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
              <MapPin className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                placeholder="Περιοχή (π.χ. Τούμπα)"
                className="flex-1 bg-transparent focus:outline-none text-gray-950"
              />
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-full transition duration-200 shadow-md">
              Αναζήτηση
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-8 text-gray-950 flex items-center gap-3">
          <MapPin className="w-6 h-6 text-blue-600" />
          Διαθέσιμοι Τεχνικοί
        </h2>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500">
            <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-4" />
            <p className="text-lg">Φόρτωση διαθέσιμων τεχνικών...</p>
          </div>
        ) : filteredTechnicians.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTechnicians.map((tech) => (
              <div key={tech.id} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center gap-5 mb-5">
                  <img 
                      src={tech.imageUrl} 
                      alt={tech.name} 
                      className="w-16 h-16 rounded-full object-cover border-2 border-gray-100" 
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-950">{tech.name}</h3>
                    <p className="text-sm text-gray-500">{tech.specialty}</p>
                    <div className="flex items-center gap-1 mt-1 text-yellow-500">
                      <Star className="w-4 h-4 fill-yellow-400" />
                      <span className="font-bold text-gray-800">{Number(tech.rating).toFixed(1)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between border-t border-gray-100 pt-5 mt-5">
                  <div className="text-sm text-gray-600">
                      <MapPin className="w-4 h-4 inline mr-1 text-gray-400"/>
                      {tech.area}
                  </div>
                  <div className="text-lg font-bold text-gray-950">
                    <span className="text-xs text-gray-500 font-normal">από </span>
                    €{tech.pricePerHour}<span className="text-sm font-normal">/ώρα</span>
                  </div>
                </div>
                
                <button className="w-full bg-gray-950 hover:bg-gray-800 text-white font-semibold py-3 rounded-xl mt-6 transition duration-200">
                  Προβολή Προφίλ
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p className="text-xl">Δεν βρέθηκαν τεχνικοί με αυτά τα κριτήρια.</p>
            <p className="mt-2">Δοκιμάστε μια διαφορετική αναζήτηση!</p>
          </div>
        )}
      </div>

    </main>
  );
}