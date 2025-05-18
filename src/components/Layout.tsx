
import { Outlet } from "react-router-dom";
import Header from "./Header";
import MobileFooter from "./MobileFooter";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-netflix-background text-netflix-text">
      <Header />
      <MobileFooter />
      <main className="flex-1 container mx-auto px-4 py-6 md:py-6 mt-14 md:mt-0">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
