
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="py-4 px-6 bg-black bg-opacity-95 sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-netflix-accent font-bold text-2xl">JurisCursos</Link>
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <li><Link to="/" className="text-netflix-text hover:text-netflix-accent">Início</Link></li>
            <li><Link to="/search" className="text-netflix-text hover:text-netflix-accent">Buscar</Link></li>
            <li><Link to="/my-courses" className="text-netflix-text hover:text-netflix-accent">Meus Cursos</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
