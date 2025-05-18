
import { useState, useEffect } from "react";
import CourseCategory from "../components/CourseCategory";
import CourseCard from "../components/CourseCard";
import { Course, fetchCoursesByArea } from "../services/courseService";

const Index = () => {
  const [featuredCourses, setFeaturedCourses] = useState<Course[]>([]);
  const [coursesByArea, setCoursesByArea] = useState<Record<string, Course[]>>({});
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadCourses = async () => {
      setLoading(true);
      const courses = await fetchCoursesByArea();
      
      // Get featured courses (first 4 from all areas)
      const featured: Course[] = [];
      Object.values(courses).forEach(areasCourses => {
        if (areasCourses.length > 0) {
          featured.push(areasCourses[0]);
        }
      });
      
      setFeaturedCourses(featured.slice(0, 4));
      setCoursesByArea(courses);
      setLoading(false);
    };
    
    loadCourses();
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
            <p className="text-lg mb-6">Sua plataforma de cursos jurídicos para todas as áreas do Direito</p>
            <button className="netflix-button">Comece Agora</button>
          </div>
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-bold mb-6">Cursos em Destaque</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {Object.entries(coursesByArea).map(([area, courses]) => (
        <CourseCategory 
          key={area} 
          title={area} 
          courses={courses} 
        />
      ))}
    </div>
  );
};

export default Index;
