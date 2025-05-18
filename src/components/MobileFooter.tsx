
import { Link } from "react-router-dom";
import { Home, BookOpen, Search } from "lucide-react";

const MobileFooter = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black bg-opacity-90 border-t border-zinc-800 py-2 px-4 md:hidden">
      <div className="flex justify-around items-center">
        <Link to="/" className="flex flex-col items-center text-netflix-text hover:text-netflix-accent">
          <Home size={24} />
          <span className="text-xs mt-1">Início</span>
        </Link>
        <Link to="/search" className="flex flex-col items-center text-netflix-text hover:text-netflix-accent">
          <Search size={24} />
          <span className="text-xs mt-1">Buscar</span>
        </Link>
        <Link to="/my-courses" className="flex flex-col items-center text-netflix-text hover:text-netflix-accent">
          <BookOpen size={24} />
          <span className="text-xs mt-1">Meus Cursos</span>
        </Link>
      </div>
    </div>
  );
};

export default MobileFooter;
