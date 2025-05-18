
import { Link } from "react-router-dom";
import { Course } from "../services/courseService";
import { Heart } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

interface CourseCardProps {
  course: Course;
  showFavoriteButton?: boolean;
}

const CourseCard = ({ course, showFavoriteButton = false }: CourseCardProps) => {
  const [isFavorite, setIsFavorite] = useState(course.is_favorite || false);
  
  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking the heart
    e.stopPropagation();
    
    try {
      const { data: existingFavorite } = await supabase
        .from('user_course_favorites')
        .select('*')
        .eq('course_id', course.id)
        .maybeSingle();
      
      if (existingFavorite) {
        // Remove from favorites
        await supabase
          .from('user_course_favorites')
          .delete()
          .eq('course_id', course.id);
          
        setIsFavorite(false);
        toast({
          title: "Curso removido dos favoritos",
          description: `${course.materia} foi removido dos seus favoritos.`,
        });
      } else {
        // Add to favorites
        await supabase
          .from('user_course_favorites')
          .insert([{ course_id: course.id }]);
          
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
  
  return (
    <Link to={`/course/${course.id}`} className="block">
      <div className="netflix-card relative">
        <div className="aspect-video bg-netflix-secondary overflow-hidden">
          <img 
            src={course.capa} 
            alt={course.materia} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-medium mb-1 line-clamp-1">{course.materia}</h3>
          <p className="text-sm text-netflix-secondary mb-2">{course.area}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs bg-netflix-accent px-2 py-1 rounded">
              {course.dificuldade}
            </span>
            <span className="text-xs text-gray-400">
              Sequência {course.sequencia}
            </span>
          </div>
          
          {showFavoriteButton && (
            <button 
              onClick={toggleFavorite}
              className="absolute top-2 right-2 bg-black bg-opacity-60 p-1.5 rounded-full"
            >
              <Heart 
                size={18} 
                className={`${isFavorite ? 'fill-netflix-accent text-netflix-accent' : 'text-white'}`}
              />
            </button>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
