
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface AreaShowcaseProps {
  area: string;
  courseCount: number;
  imageUrl?: string;
}

const AreaShowcase = ({ area, courseCount, imageUrl }: AreaShowcaseProps) => {
  const [areaCoverImage, setAreaCoverImage] = useState<string | undefined>(imageUrl);
  
  // Fetch the first course from this area to use its cover image
  useEffect(() => {
    const fetchAreaCoverImage = async () => {
      if (!imageUrl) {
        try {
          const { data, error } = await supabase
            .from('cursos_narrados')
            .select('capa')
            .eq('area', area)
            .limit(1)
            .single();
          
          if (error) {
            console.error("Error fetching area cover:", error);
          } else if (data?.capa) {
            setAreaCoverImage(data.capa);
          }
        } catch (err) {
          console.error("Error fetching area cover:", err);
        }
      }
    };
    
    fetchAreaCoverImage();
  }, [area, imageUrl]);
  
  // Default background images for different areas if we can't fetch one
  const defaultImages: Record<string, string> = {
    "Direito Civil": "https://images.unsplash.com/photo-1589994965851-a7f54d2274b9",
    "Direito Penal": "https://images.unsplash.com/photo-1575505586569-646b2ca898fc",
    "Direito Constitucional": "https://images.unsplash.com/photo-1589391886645-d51941baf7fb",
    "Direito Administrativo": "https://images.unsplash.com/photo-1436450412740-6b988f486c6b",
    "Direito Tributário": "https://images.unsplash.com/photo-1554224154-26032ffc0d07",
    "Direito do Trabalho": "https://images.unsplash.com/photo-1551135049-8a33b5883817",
    "Direito Empresarial": "https://images.unsplash.com/photo-1507679799987-c73779587ccf",
    "Processo Civil": "https://images.unsplash.com/photo-1423592707957-3b212afa6733",
    "Processo Penal": "https://images.unsplash.com/photo-1593115057322-e94b77572f20",
  };
  
  const bgImage = areaCoverImage || defaultImages[area] || "https://images.unsplash.com/photo-1589994965851-a7f54d2274b9";
  
  return (
    <Link to={`/area/${encodeURIComponent(area)}`} className="block">
      <div className="relative rounded-lg overflow-hidden h-40 group">
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
        <img 
          src={bgImage}
          alt={area} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute bottom-0 left-0 z-20 p-4 w-full">
          <h3 className="text-lg font-bold text-white">{area}</h3>
          <div className="flex justify-between items-center mt-1">
            <span className="text-sm text-white bg-netflix-accent bg-opacity-70 px-2 py-0.5 rounded-full">
              {courseCount} {courseCount === 1 ? 'curso' : 'cursos'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AreaShowcase;
