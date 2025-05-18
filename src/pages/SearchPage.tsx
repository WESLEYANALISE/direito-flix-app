
import { useState } from "react";
import { courses } from "../data/courses";
import CourseCard, { CourseType } from "../components/CourseCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<CourseType[]>([]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    
    const results = courses.filter(course => 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.area.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setSearchResults(results);
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Buscar Cursos</h1>
      
      <form onSubmit={handleSearch} className="mb-8">
        <div className="relative">
          <Input
            type="text"
            placeholder="Busque por título ou área do direito..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-netflix-card border-netflix-secondary focus:border-netflix-accent"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-netflix-secondary" size={18} />
          <button 
            type="submit" 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 netflix-button py-1 px-3"
          >
            Buscar
          </button>
        </div>
      </form>
      
      {searchResults.length > 0 ? (
        <>
          <p className="text-netflix-secondary mb-4">Encontrados {searchResults.length} resultados para "{searchTerm}"</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {searchResults.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </>
      ) : searchTerm !== "" && (
        <div className="text-center p-10">
          <p className="text-xl font-medium mb-2">Nenhum resultado encontrado</p>
          <p className="text-netflix-secondary">Tente buscar por outro termo ou área do direito.</p>
        </div>
      )}
      
      {searchTerm === "" && (
        <div className="text-center p-10">
          <p className="text-xl font-medium mb-2">Digite um termo para buscar</p>
          <p className="text-netflix-secondary">Você pode buscar por título do curso ou área do direito.</p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
