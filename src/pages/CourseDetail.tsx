
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { courseDetails } from "../data/courses";
import { toast } from "@/components/ui/use-toast";

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const courseId = parseInt(id || "0");
  
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (isNaN(courseId) || !courseDetails[courseId as keyof typeof courseDetails]) {
      navigate("/404");
      return;
    }
    
    setCourse(courseDetails[courseId as keyof typeof courseDetails]);
    setLoading(false);
  }, [courseId, navigate]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="animate-pulse h-5 w-24 bg-netflix-secondary rounded"></div>
      </div>
    );
  }
  
  const startCourse = () => {
    toast({
      title: "Curso iniciado!",
      description: `Você começou o curso: ${course.title}`,
    });
  };
  
  const downloadMaterial = () => {
    toast({
      title: "Download iniciado",
      description: "O material de apoio será baixado em instantes.",
    });
  };
  
  return (
    <div className="pb-12">
      <div className="relative h-[40vh] mb-8 overflow-hidden rounded-lg">
        <div className="absolute inset-0 bg-gradient-to-t from-netflix-background via-transparent to-transparent z-10"></div>
        <img 
          src={course.coverImage} 
          alt={course.title} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
        <p className="text-netflix-secondary mb-4">{course.area} • {course.duration} • Prof. {course.instructor}</p>
        
        <div className="flex flex-wrap gap-3 mb-8">
          <button onClick={startCourse} className="netflix-button">
            Iniciar Curso
          </button>
          <button onClick={downloadMaterial} className="netflix-secondary-button">
            Baixar Material de Apoio
          </button>
        </div>
        
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold mb-3">Sobre o Curso</h2>
            <p className="text-gray-300">{course.description}</p>
          </div>
          
          <div>
            <h2 className="text-xl font-bold mb-3">Módulos</h2>
            <ul className="space-y-2">
              {course.modules.map((module: string, index: number) => (
                <li key={index} className="flex items-center gap-3 p-3 rounded bg-netflix-card">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-netflix-accent text-white font-bold">
                    {index + 1}
                  </span>
                  {module}
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h2 className="text-xl font-bold mb-3">Pré-requisitos</h2>
            <p className="text-gray-300">{course.requirements}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
