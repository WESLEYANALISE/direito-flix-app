
import { useState, useEffect } from "react";
import CourseCard from "../components/CourseCard";
import { fetchFavoriteCourses, type Course } from "../services/courseService";
import { Link } from "react-router-dom";

const MyCourses = () => {
  const [favoriteCourses, setFavoriteCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadFavorites = async () => {
      setLoading(true);
      try {
        const favorites = await fetchFavoriteCourses();
        setFavoriteCourses(favorites);
      } catch (error) {
        console.error("Error loading favorite courses:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadFavorites();
  }, []);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="animate-pulse h-5 w-24 bg-netflix-secondary rounded"></div>
      </div>
    );
  }
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Meus Cursos Favoritos</h1>
      
      {favoriteCourses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favoriteCourses.map(course => (
            <CourseCard key={course.id} course={course} showFavoriteButton={true} />
          ))}
        </div>
      ) : (
        <div className="text-center p-16">
          <p className="text-xl font-medium mb-2">Você ainda não adicionou cursos aos favoritos</p>
          <p className="text-netflix-secondary mb-6">Explore nosso catálogo e favorite os cursos que mais gosta.</p>
          <Link to="/" className="netflix-button">Explorar Cursos</Link>
        </div>
      )}
    </div>
  );
};

export default MyCourses;
