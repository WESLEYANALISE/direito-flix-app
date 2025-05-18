
import CourseCard, { CourseType } from './CourseCard';

interface CourseCategoryProps {
  title: string;
  courses: CourseType[];
}

const CourseCategory = ({ title, courses }: CourseCategoryProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default CourseCategory;
