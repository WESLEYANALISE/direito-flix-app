
import { useState, useEffect } from "react";
import CourseCategory from "../components/CourseCategory";
import CourseCard from "../components/CourseCard";
import { courses, getLegalAreas, getCoursesByArea } from "../data/courses";

const Index = () => {
  const [featuredCourses, setFeaturedCourses] = useState(courses.slice(0, 4));
  const [legalAreas, setLegalAreas] = useState<string[]>([]);
  
  useEffect(() => {
    setLegalAreas(getLegalAreas());
  }, []);

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

      {legalAreas.map(area => (
        <CourseCategory 
          key={area} 
          title={area} 
          courses={getCoursesByArea(area)} 
        />
      ))}
    </div>
  );
};

export default Index;
