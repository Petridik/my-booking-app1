"use client";

import { useState, useEffect } from 'react';
import { Search, MapPin, Star, UserCircle2, Loader2, Wrench } from 'lucide-react';
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
  pricePerHour: number;
  imageUrl: string;
};

export default function Home() {
  // States για τα πεδία της φόρμας (τι πληκτρολογεί ο χρήστης)
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");

  // States για τα φίλτρα που έχουν όντως εφαρμοστεί μετά το κλικ
  const [appliedSpecialty, setAppliedSpecialty] = useState("");
  const [appliedArea, setAppliedArea] = useState("");

  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        setIsLoading(true);

        // 1. Ξεκινάμε το query για τον πίνακα technicians
        let query = supabase.from('technicians').select('*');

        // 2. Εφαρμόζουμε δυναμικά τα φίλτρα στη βάση αν ο χρήστης έχει πληκτρολογήσει κάτι
        if (appliedSpecialty) {
          query = query.ilike('specialty', `%${appliedSpecialty}%`);
        }
        if (appliedArea) {
          query = query.ilike('area', `%${appliedArea}%`);
        }

        // 3. Εκτελούμε το query και παίρνουμε τα φιλτραρισμένα δεδομένα
        const { data, error } = await query;

        if (error) {
          throw error;
        }

        if (data) {
          // Μετατρέπουμε τα δεδομένα από snake_case σε camelCase για το frontend
          const formattedData: Technician[] = data.map((tech: any) => ({
            id: tech.id,
            name: tech.name,
            specialty: tech.specialty,
            rating: tech.rating,
            area: tech.area,
            pricePerHour: tech.price_per_hour,
            imageUrl: tech.image_url || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150',
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
  }, [appliedSpecialty, appliedArea]); // <-- Προσθέσαμε τις εξαρτήσεις εδώ για να ξανατρέχει το query όταν αλλάζουν τα φίλτρα

  // Διαχείριση υποβολής της αναζήτησης
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setAppliedSpecialty(searchQuery.trim());
    setAppliedArea(locationQuery.trim());
  };

// Τα δεδομένα έρχονται ήδη φιλτραρισμένα από το Supabase
  const filteredTechnicians = technicians;

  // Καθαρισμός φίλτρων
  const handleClearFilters = () => {
    setSearchQuery("");
    setLocationQuery("");
    setAppliedSpecialty("");
    setAppliedArea("");
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto p-4 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={handleClearFilters}>
            <Wrench className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-extrabold text-gray-950 tracking-tight">FixIt<span className="text-blue-600">.gr</span></span>
          </div>
          <button className="text-sm font-semibold text-gray-600 hover:text-blue-600 border border-gray-200 hover:border-blue-600 px-4 py-2 rounded-full transition-all">
            Γίνε Συνεργάτης
          </button>
        </nav>
      </header>

      {/* Hero Section & Search Form */}
      <div className="bg-white py-16 md:py-24 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-950 mb-4 leading-tight">
            Βρες τον κατάλληλο τεχνικό άμεσα
          </h1>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Υδραυλικοί, Ηλεκτρολόγοι και άλλοι επαγγελματίες στη Θεσσαλονίκη, στην πόρτα σου με ένα κλικ.
          </p>

          <form onSubmit={handleSearch} className="bg-white p-3 rounded-2xl md:rounded-full shadow-2xl shadow-blue-500/10 w-full max-w-4xl flex flex-col md:flex-row gap-3 border border-gray-100 mx-auto">
            <div className="flex-1 flex items-center gap-2 p-3 border border-gray-200 rounded-xl md:rounded-full bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500 focus-within:bg-white transition-all">
              <Search className="w-5 h-5 text-gray-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Τι ψάχνεις; (π.χ. Υδραυλικός)"
                className="flex-1 bg-transparent focus:outline-none text-gray-950 placeholder-gray-400 w-full"
              />
            </div>
            <div className="flex-1 flex items-center gap-2 p-3 border border-gray-200 rounded-xl md:rounded-full bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500 focus-within:bg-white transition-all">
              <MapPin className="w-5 h-5 text-gray-400 shrink-0" />
              <input
                type="text"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                placeholder="Περιοχή (π.χ. Τούμπα)"
                className="flex-1 bg-transparent focus:outline-none text-gray-950 placeholder-gray-400 w-full"
              />
            </div>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-xl md:rounded-full transition duration-200 shadow-md hover:shadow-lg shrink-0">
              Αναζήτηση
            </button>
          </form>

          {/* Εμφάνιση ενεργών φίλτρων */}
          {(appliedSpecialty || appliedArea) && (
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm">
              <span className="text-gray-500">Ενεργά φίλτρα:</span>
              {appliedSpecialty && (
                <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium border border-blue-100">
                  "{appliedSpecialty}"
                </span>
              )}
              {appliedArea && (
                <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium border border-blue-100">
                  Περιοχή: {appliedArea}
                </span>
              )}
              <button 
                onClick={handleClearFilters}
                className="text-red-500 hover:text-red-700 font-semibold underline ml-2 transition-colors"
              >
                Καθαρισμός
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-8 text-gray-950 flex items-center gap-3">
          <MapPin className="w-6 h-6 text-blue-600" />
          {appliedSpecialty || appliedArea ? "Αποτελέσματα Αναζήτησης" : "Δαθέσιμοι Τεχνικοί"}
        </h2>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500">
            <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-4" />
            <p className="text-lg font-medium">Φόρτωση διαθέσιμων τεχνικών...</p>
          </div>
        ) : filteredTechnicians.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTechnicians.map((tech) => (
              <div key={tech.id} className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-5 mb-5">
                    <img 
                        src={tech.imageUrl} 
                        alt={tech.name} 
                        className="w-16 h-16 rounded-full object-cover border-2 border-gray-100 shadow-sm bg-gray-100" 
                    />
                    <div>
                      <h3 className="text-xl font-bold text-gray-950">{tech.name}</h3>
                      <p className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded inline-block mt-0.5">{tech.specialty}</p>
                      <div className="flex items-center gap-1 mt-1.5 text-yellow-500">
                        <Star className="w-4 h-4 fill-yellow-400" />
                        <span className="font-bold text-gray-800 text-sm">{Number(tech.rating).toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-2">
                    <div className="text-sm font-medium text-gray-600 flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-gray-400 shrink-0"/>
                        {tech.area}
                    </div>
                    <div className="text-lg font-black text-gray-950">
                      <span className="text-xs text-gray-500 font-normal">από </span>
                      €{tech.pricePerHour}<span className="text-sm font-normal">/ώρα</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => alert(`Ανάκτηση προφίλ για τον/την: ${tech.name}`)}
                    className="w-full bg-gray-950 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl mt-5 transition-all duration-200 shadow-sm"
                  >
                    Προβολή Προφίλ
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm max-w-2xl mx-auto px-4">
            <p className="text-xl font-bold text-gray-850">Δεν βρέθηκαν τεχνικοί.</p>
            <p className="mt-2 text-gray-500">Δοκιμάστε να αλλάξετε τα κριτήρια αναζήτησης ή την περιοχή σας.</p>
            <button 
              onClick={handleClearFilters}
              className="mt-6 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-6 rounded-xl transition-all text-sm"
            >
              Επαναφορά Όλων
            </button>
          </div>
        )}
      </div>

    </main>
  );
}