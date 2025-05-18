
import { Link } from "react-router-dom";
import { BookOpen, Search, Home } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-black bg-opacity-90 border-b border-zinc-800 py-2 px-4 z-50">
      <div className="hidden md:flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold text-netflix-accent">LawFlix</Link>
        </div>
        <nav className="flex space-x-6">
          <Link to="/" className="text-netflix-text hover:text-netflix-accent">Início</Link>
          <Link to="/search" className="text-netflix-text hover:text-netflix-accent">Buscar</Link>
          <Link to="/my-courses" className="text-netflix-text hover:text-netflix-accent">Meus Cursos</Link>
        </nav>
      </div>
      
      {/* Mobile navigation - moved from MobileFooter to Header */}
      <div className="flex md:hidden justify-around items-center">
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
    </header>
  );
};

export default Header;
