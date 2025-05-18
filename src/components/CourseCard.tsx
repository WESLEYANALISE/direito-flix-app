
import { Link } from "react-router-dom";

export interface CourseType {
  id: number;
  title: string;
  area: string;
  coverImage: string;
  shortDescription: string;
}

interface CourseCardProps {
  course: CourseType;
}

const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <Link to={`/course/${course.id}`}>
      <div className="netflix-card">
        <div className="aspect-video bg-netflix-secondary overflow-hidden">
          <img 
            src={course.coverImage} 
            alt={course.title} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-medium mb-1 line-clamp-1">{course.title}</h3>
          <p className="text-sm text-netflix-secondary mb-2">{course.area}</p>
          <p className="text-xs line-clamp-2 text-gray-400">{course.shortDescription}</p>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
