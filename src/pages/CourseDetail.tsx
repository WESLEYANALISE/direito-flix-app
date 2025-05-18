
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchCourseById, Course } from "../services/courseService";
import { ArrowLeft } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const courseId = parseInt(id || "0");
  
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [showWebView, setShowWebView] = useState(false);
  
  useEffect(() => {
    const loadCourse = async () => {
      setLoading(true);
      if (isNaN(courseId) || courseId === 0) {
        navigate("/404");
        return;
      }
      
      const courseData = await fetchCourseById(courseId);
      if (!courseData) {
        navigate("/404");
        return;
      }
      
      setCourse(courseData);
      setLoading(false);
    };
    
    loadCourse();
  }, [courseId, navigate]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="animate-pulse h-5 w-24 bg-netflix-secondary rounded"></div>
      </div>
    );
  }

  if (showWebView && course) {
    return (
      <div className="fixed inset-0 bg-black flex flex-col z-50">
        <div className="bg-black p-4 flex items-center">
          <Button 
            variant="ghost" 
            className="text-white flex items-center gap-1" 
            onClick={() => setShowWebView(false)}
          >
            <ArrowLeft size={18} /> Voltar
          </Button>
          <h2 className="ml-4 text-lg font-semibold">{course.materia}</h2>
        </div>
        <iframe 
          src={course.link} 
          title={course.materia}
          className="flex-1 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>
    );
  }
  
  const startCourse = () => {
    setShowWebView(true);
  };
  
  const downloadMaterial = () => {
    if (course?.download) {
      window.open(course.download, '_blank');
      toast({
        title: "Download iniciado",
        description: "O material de apoio será baixado em instantes.",
      });
    } else {
      toast({
        title: "Material indisponível",
        description: "Este curso não possui material de apoio para download.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="pb-12">
      {course && (
        <>
          <div className="relative h-[40vh] mb-8 overflow-hidden rounded-lg">
            <div className="absolute inset-0 bg-gradient-to-t from-netflix-background via-transparent to-transparent z-10"></div>
            <img 
              src={course.capa} 
              alt={course.materia} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">{course.materia}</h1>
            <p className="text-netflix-secondary mb-4">
              {course.area} • Sequência {course.sequencia} • Dificuldade: {course.dificuldade}
            </p>
            
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
                <p className="text-gray-300">{course.sobre || "Nenhuma descrição disponível para este curso."}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CourseDetail;
