
import { Link } from "react-router-dom";
import { Course } from "../services/courseService";

interface CourseCardProps {
  course: Course;
}

const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <Link to={`/course/${course.id}`}>
      <div className="netflix-card">
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
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
