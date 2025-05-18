
import { useState, useEffect } from "react";
import CourseCategory from "../components/CourseCategory";
import AreaShowcase from "../components/AreaShowcase";
import { fetchAllAreas, fetchFavoriteCourses, fetchCompletedCourses, getTotalCourseCount, type AreaStats, type Course } from "../services/courseService";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const [areas, setAreas] = useState<AreaStats[]>([]);
  const [favoriteCourses, setFavoriteCourses] = useState<Course[]>([]);
  const [completedCourses, setCompletedCourses] = useState<Course[]>([]);
  const [totalCourses, setTotalCourses] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      
      try {
        // Load all areas with their course counts
        const areasData = await fetchAllAreas();
        setAreas(areasData);
        
        // Load favorite courses
        const favorites = await fetchFavoriteCourses();
        setFavoriteCourses(favorites);
        
        // Load completed courses
        const completed = await fetchCompletedCourses();
        setCompletedCourses(completed);
        
        // Get total course count
        const total = await getTotalCourseCount();
        setTotalCourses(total);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="animate-pulse h-5 w-24 bg-netflix-secondary rounded"></div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <section>
        <div className="relative h-[50vh] mb-10 overflow-hidden rounded-lg">
          <div className="absolute inset-0 bg-gradient-to-t from-netflix-background to-transparent z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
            alt="Direito" 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 z-20 p-8 w-full md:w-2/3">
            <h1 className="text-4xl font-bold mb-3">JurisCursos</h1>
            <p className="text-lg mb-2">Sua plataforma de cursos jurídicos para todas as áreas do Direito</p>
            
            <div className="flex flex-wrap gap-3 mb-4">
              <Badge variant="outline" className="bg-netflix-accent text-white border-none text-lg px-4 py-2">
                {totalCourses} cursos disponíveis
              </Badge>
              <Badge variant="outline" className="bg-green-600 text-white border-none text-lg px-4 py-2">
                Atualizados 2025
              </Badge>
            </div>
            
            <p className="text-sm text-netflix-accent font-semibold mb-6">
              {areas.length} áreas do Direito • Material atualizado
            </p>
            <a href="#areas" className="netflix-button">Explorar Áreas</a>
          </div>
        </div>
      </section>
      
      <section className="bg-zinc-800/50 p-6 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Biblioteca de Cursos</h2>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-netflix-accent text-white border-none">
              {totalCourses} cursos disponíveis
            </Badge>
            <Badge variant="outline" className="bg-green-600 text-white border-none">
              2025
            </Badge>
          </div>
        </div>
        <p className="text-gray-300 mb-4">
          Acesse nossa biblioteca completa com {totalCourses} cursos jurídicos atualizados para 2025, 
          abrangendo {areas.length} áreas do Direito.
        </p>
      </section>
      
      {completedCourses.length > 0 && (
        <section>
          <CourseCategory 
            title="Seus Cursos Concluídos" 
            courses={completedCourses}
            count={completedCourses.length}
            showCompletedButton={true}
          />
        </section>
      )}
      
      {favoriteCourses.length > 0 && (
        <section>
          <CourseCategory 
            title="Seus Cursos Favoritos" 
            courses={favoriteCourses}
            count={favoriteCourses.length}
            showFavoriteButton={true}
          />
        </section>
      )}

      <section id="areas">
        <h2 className="text-2xl font-bold mb-6">Áreas do Direito</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {areas.map(area => (
            <AreaShowcase 
              key={area.area} 
              area={area.area} 
              courseCount={area.courseCount} 
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
