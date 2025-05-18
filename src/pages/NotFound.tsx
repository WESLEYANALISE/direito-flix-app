
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-netflix-secondary mb-8">Oops! Página não encontrada</p>
        <a href="/" className="netflix-button">
          Voltar para a Página Inicial
        </a>
      </div>
    </div>
  );
};

export default NotFound;
