
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
  is_favorite?: boolean;
}

export interface AreaStats {
  area: string;
  courseCount: number;
}

export const fetchCoursesByArea = async (): Promise<Record<string, Course[]>> => {
  const { data: userData } = await supabase.auth.getUser();
  const userId = userData?.user?.id;
  
  // Fetch courses
  const { data, error } = await supabase
    .from('cursos_narrados')
    .select('*');

  if (error) {
    console.error("Error fetching courses:", error);
    return {};
  }
  
  // Fetch favorites if user is logged in
  let favorites: Record<number, boolean> = {};
  
  if (userId) {
    const { data: favoritesData, error: favoritesError } = await supabase
      .from('user_course_favorites')
      .select('course_id')
      .eq('user_id', userId);
    
    if (!favoritesError && favoritesData) {
      favorites = favoritesData.reduce((acc, fav) => {
        acc[fav.course_id] = true;
        return acc;
      }, {} as Record<number, boolean>);
    }
  }
  
  // Add favorite status to courses
  const coursesWithFavorites = data?.map((course: Course) => ({
    ...course,
    is_favorite: favorites[course.id] || false
  }));

  // Group courses by area
  const coursesByArea: Record<string, Course[]> = {};
  
  coursesWithFavorites?.forEach((course: Course) => {
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

export const fetchAllAreas = async (): Promise<AreaStats[]> => {
  const { data, error } = await supabase
    .from('cursos_narrados')
    .select('area');

  if (error) {
    console.error("Error fetching areas:", error);
    return [];
  }

  // Count courses per area
  const areaCount: Record<string, number> = {};
  data.forEach((course: { area: string }) => {
    if (course.area) {
      areaCount[course.area] = (areaCount[course.area] || 0) + 1;
    }
  });

  // Convert to array of objects
  return Object.entries(areaCount).map(([area, count]) => ({
    area,
    courseCount: count
  }));
};

export const fetchCourseById = async (id: number): Promise<Course | null> => {
  const { data: userData } = await supabase.auth.getUser();
  const userId = userData?.user?.id;
  
  const { data, error } = await supabase
    .from('cursos_narrados')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error("Error fetching course:", error);
    return null;
  }
  
  // Check if course is favorited
  let isFavorite = false;
  
  if (userId) {
    const { data: favoriteData } = await supabase
      .from('user_course_favorites')
      .select('*')
      .eq('user_id', userId)
      .eq('course_id', id)
      .maybeSingle();
    
    isFavorite = !!favoriteData;
  }

  return { ...data, is_favorite: isFavorite } as Course;
};

export const fetchCoursesByAreaName = async (areaName: string): Promise<Course[]> => {
  const { data: userData } = await supabase.auth.getUser();
  const userId = userData?.user?.id;
  
  const { data, error } = await supabase
    .from('cursos_narrados')
    .select('*')
    .eq('area', areaName)
    .order('sequencia', { ascending: true });

  if (error) {
    console.error(`Error fetching courses for area ${areaName}:`, error);
    return [];
  }
  
  // Fetch favorites if user is logged in
  let favorites: Record<number, boolean> = {};
  
  if (userId) {
    const { data: favoritesData } = await supabase
      .from('user_course_favorites')
      .select('course_id')
      .eq('user_id', userId);
    
    if (favoritesData) {
      favorites = favoritesData.reduce((acc, fav) => {
        acc[fav.course_id] = true;
        return acc;
      }, {} as Record<number, boolean>);
    }
  }
  
  // Add favorite status to courses
  return data.map((course: Course) => ({
    ...course,
    is_favorite: favorites[course.id] || false
  }));
};

export const fetchFavoriteCourses = async (): Promise<Course[]> => {
  const { data: userData } = await supabase.auth.getUser();
  const userId = userData?.user?.id;
  
  if (!userId) {
    return [];
  }
  
  // Get user's favorite course IDs
  const { data: favorites, error: favoritesError } = await supabase
    .from('user_course_favorites')
    .select('course_id')
    .eq('user_id', userId);
  
  if (favoritesError || !favorites || favorites.length === 0) {
    return [];
  }
  
  const favoriteIds = favorites.map(f => f.course_id);
  
  // Get course details for favorites
  const { data: courses, error: coursesError } = await supabase
    .from('cursos_narrados')
    .select('*')
    .in('id', favoriteIds);
  
  if (coursesError) {
    console.error("Error fetching favorite courses:", coursesError);
    return [];
  }
  
  return courses.map((course: Course) => ({
    ...course,
    is_favorite: true
  }));
};

export const getTotalCourseCount = async (): Promise<number> => {
  const { count, error } = await supabase
    .from('cursos_narrados')
    .select('*', { count: 'exact', head: true });
  
  if (error) {
    console.error("Error getting course count:", error);
    return 0;
  }
  
  return count || 0;
};
