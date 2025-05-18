
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchCourseById, Course } from "../services/courseService";
import { ArrowLeft, Heart, CheckCircle } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const courseId = parseInt(id || "0");
  
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [showWebView, setShowWebView] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  
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
      setIsFavorite(courseData.is_favorite || false);
      setIsCompleted(courseData.is_completed || false);
      setLoading(false);
    };
    
    loadCourse();
  }, [courseId, navigate]);
  
  const toggleFavorite = async () => {
    if (!course) return;
    
    try {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData?.user?.id;
      
      if (!userId) {
        toast({
          title: "Login necessário",
          description: "Faça login para adicionar cursos aos favoritos.",
          variant: "destructive",
        });
        return;
      }
      
      const { data: existingFavorite } = await supabase
        .from('user_course_favorites')
        .select('*')
        .eq('course_id', course.id)
        .eq('user_id', userId)
        .maybeSingle();
      
      if (existingFavorite) {
        // Remove from favorites
        await supabase
          .from('user_course_favorites')
          .delete()
          .eq('course_id', course.id)
          .eq('user_id', userId);
          
        setIsFavorite(false);
        toast({
          title: "Curso removido dos favoritos",
          description: `${course.materia} foi removido dos seus favoritos.`,
        });
      } else {
        // Add to favorites
        await supabase
          .from('user_course_favorites')
          .insert([{ 
            course_id: course.id,
            user_id: userId
          }]);
          
        setIsFavorite(true);
        toast({
          title: "Curso adicionado aos favoritos",
          description: `${course.materia} foi adicionado aos seus favoritos.`,
        });
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar seus favoritos.",
        variant: "destructive",
      });
    }
  };
  
  const toggleCompleted = async () => {
    if (!course) return;
    
    try {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData?.user?.id;
      
      if (!userId) {
        toast({
          title: "Login necessário",
          description: "Faça login para marcar cursos como concluídos.",
          variant: "destructive",
        });
        return;
      }
      
      const { data: existingCompleted } = await supabase
        .from('user_course_completed')
        .select('*')
        .eq('course_id', course.id)
        .eq('user_id', userId)
        .maybeSingle();
      
      if (existingCompleted) {
        // Remove from completed
        await supabase
          .from('user_course_completed')
          .delete()
          .eq('course_id', course.id)
          .eq('user_id', userId);
          
        setIsCompleted(false);
        toast({
          title: "Curso desmarcado",
          description: `${course.materia} foi removido dos cursos concluídos.`,
        });
      } else {
        // Add to completed
        await supabase
          .from('user_course_completed')
          .insert([{ 
            course_id: course.id,
            user_id: userId
          }]);
          
        setIsCompleted(true);
        toast({
          title: "Curso concluído!",
          description: `${course.materia} foi marcado como concluído.`,
        });
      }
    } catch (error) {
      console.error("Error toggling completed:", error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o status do curso.",
        variant: "destructive",
      });
    }
  };
  
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
          <button 
            onClick={() => navigate("/")} 
            className="flex items-center text-netflix-secondary hover:text-netflix-accent mb-4"
          >
            <ArrowLeft size={18} className="mr-1" />
            <span>Voltar para Início</span>
          </button>
          
          <div className="relative h-[40vh] mb-8 overflow-hidden rounded-lg">
            <div className="absolute inset-0 bg-gradient-to-t from-netflix-background via-transparent to-transparent z-10"></div>
            <img 
              src={course.capa} 
              alt={course.materia} 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 z-20 flex gap-2">
              <button
                onClick={toggleCompleted}
                className="bg-black bg-opacity-60 p-2 rounded-full"
              >
                <CheckCircle 
                  size={24} 
                  className={`${isCompleted ? 'fill-green-500 text-green-500' : 'text-white'}`}
                />
              </button>
              <button
                onClick={toggleFavorite}
                className="bg-black bg-opacity-60 p-2 rounded-full"
              >
                <Heart 
                  size={24} 
                  className={`${isFavorite ? 'fill-netflix-accent text-netflix-accent' : 'text-white'}`}
                />
              </button>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold">{course.materia}</h1>
              <div className="bg-green-600 text-white text-xs px-2 py-1 rounded-md">
                Atualizado 2025
              </div>
            </div>
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
              <button 
                onClick={toggleCompleted} 
                className={`flex items-center gap-2 px-4 py-2 rounded ${
                  isCompleted 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-700 text-white'
                }`}
              >
                <CheckCircle size={18} /> {isCompleted ? 'Concluído' : 'Marcar como Concluído'}
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
