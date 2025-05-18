
import { Outlet } from "react-router-dom";
import Header from "./Header";
import MobileFooter from "./MobileFooter";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-netflix-background text-netflix-text">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6 pb-20 md:pb-6">
        <Outlet />
      </main>
      <MobileFooter />
    </div>
  );
};

export default Layout;
