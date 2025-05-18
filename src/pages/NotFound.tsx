
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh]">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-lg mb-6">Página não encontrada</p>
      <Link to="/" className="netflix-button">
        Voltar para a Página Inicial
      </Link>
    </div>
  );
};

export default NotFound;
