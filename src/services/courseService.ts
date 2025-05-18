
import { supabase } from "@/integrations/supabase/client";

export interface Course {
  id: number;
  area: string;
  sequencia: string;
  link: string;
  materia: string;
  capa: string;
  sobre: string;
  download: string;
  dificuldade: string;
}

export const fetchCoursesByArea = async (): Promise<Record<string, Course[]>> => {
  const { data, error } = await supabase
    .from('cursos_narrados')
    .select('*');

  if (error) {
    console.error("Error fetching courses:", error);
    return {};
  }

  // Group courses by area
  const coursesByArea: Record<string, Course[]> = {};
  
  data?.forEach((course: Course) => {
    if (!coursesByArea[course.area]) {
      coursesByArea[course.area] = [];
    }
    coursesByArea[course.area].push(course);
  });

  // Sort courses by sequencia within each area
  Object.keys(coursesByArea).forEach(area => {
    coursesByArea[area].sort((a, b) => {
      return parseInt(a.sequencia) - parseInt(b.sequencia);
    });
  });

  return coursesByArea;
};

export const fetchCourseById = async (id: number): Promise<Course | null> => {
  const { data, error } = await supabase
    .from('cursos_narrados')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error("Error fetching course:", error);
    return null;
  }

  return data as Course;
};
