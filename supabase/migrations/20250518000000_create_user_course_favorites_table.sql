
-- Create the user_course_favorites table to track user's favorite courses
CREATE TABLE IF NOT EXISTS public.user_course_favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  course_id BIGINT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  
  -- Add unique constraint to prevent duplicate favorites
  CONSTRAINT unique_user_course UNIQUE(user_id, course_id)
);

-- Add RLS policies
ALTER TABLE public.user_course_favorites ENABLE ROW LEVEL SECURITY;

-- Users can view their own favorites
CREATE POLICY "Users can view their own favorites" ON public.user_course_favorites
  FOR SELECT USING (auth.uid() = user_id);

-- Users can add favorites
CREATE POLICY "Users can add favorites" ON public.user_course_favorites
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can delete their own favorites
CREATE POLICY "Users can delete their own favorites" ON public.user_course_favorites
  FOR DELETE USING (auth.uid() = user_id);
