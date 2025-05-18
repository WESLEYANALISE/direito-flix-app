
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CourseCard from "../components/CourseCard";
import { fetchCoursesByAreaName, type Course } from "../services/courseService";
import { ArrowLeft } from "lucide-react";

const AreaDetail = () => {
  const { areaName } = useParams<{ areaName: string }>();
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadCourses = async () => {
      setLoading(true);
      if (!areaName) {
        navigate("/404");
        return;
      }
      
      try {
        const areaNameDecoded = decodeURIComponent(areaName);
        const coursesData = await fetchCoursesByAreaName(areaNameDecoded);
        
        if (coursesData.length === 0) {
          navigate("/404");
          return;
        }
        
        setCourses(coursesData);
      } catch (error) {
        console.error(`Error loading courses for area ${areaName}:`, error);
        navigate("/404");
      } finally {
        setLoading(false);
      }
    };
    
    loadCourses();
  }, [areaName, navigate]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="animate-pulse h-5 w-24 bg-netflix-secondary rounded"></div>
      </div>
    );
  }

  return (
    <div className="pb-12">
      <div className="mb-8">
        <button 
          onClick={() => navigate("/")} 
          className="flex items-center text-netflix-secondary hover:text-netflix-accent mb-4"
        >
          <ArrowLeft size={18} className="mr-1" />
          <span>Voltar para Início</span>
        </button>
        
        <h1 className="text-3xl font-bold mb-3">{areaName && decodeURIComponent(areaName)}</h1>
        <p className="text-netflix-secondary mb-6">
          {courses.length} {courses.length === 1 ? 'curso disponível' : 'cursos disponíveis'}
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {courses.map(course => (
          <CourseCard key={course.id} course={course} showFavoriteButton={true} />
        ))}
      </div>
    </div>
  );
};

export default AreaDetail;
