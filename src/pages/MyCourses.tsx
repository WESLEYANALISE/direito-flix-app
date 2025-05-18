
import { useState, useEffect } from "react";
import CourseCard, { CourseType } from "../components/CourseCard";
import { courses } from "../data/courses";

const MyCourses = () => {
  // Simulating enrolled courses (in a real app, this would come from a backend)
  const [enrolledCourses, setEnrolledCourses] = useState<CourseType[]>([]);
  
  useEffect(() => {
    // Simulate fetching enrolled courses
    const randomCourses = [...courses]
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    
    setEnrolledCourses(randomCourses);
  }, []);
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Meus Cursos</h1>
      
      {enrolledCourses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {enrolledCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="text-center p-16">
          <p className="text-xl font-medium mb-2">Você ainda não se inscreveu em nenhum curso</p>
          <p className="text-netflix-secondary mb-6">Explore nosso catálogo e comece a aprender agora mesmo.</p>
          <a href="/" className="netflix-button">Explorar Cursos</a>
        </div>
      )}
    </div>
  );
};

export default MyCourses;
