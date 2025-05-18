
import CourseCard from './CourseCard';
import { Course } from '../services/courseService';

interface CourseCategoryProps {
  title: string;
  courses: Course[];
  count: number;
  showFavoriteButton?: boolean;
  showCompletedButton?: boolean;
}

const CourseCategory = ({ 
  title, 
  courses, 
  count, 
  showFavoriteButton = false,
  showCompletedButton = false
}: CourseCategoryProps) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <span className="text-sm text-netflix-secondary px-2 py-1 bg-netflix-card rounded-full">
          {count} {count === 1 ? 'curso' : 'cursos'}
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {courses.map((course) => (
          <CourseCard 
            key={course.id} 
            course={course} 
            showFavoriteButton={showFavoriteButton}
            showCompletedButton={showCompletedButton} 
          />
        ))}
      </div>
    </div>
  );
};

export default CourseCategory;
