
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-netflix-background text-netflix-text mx-px my-[30px]">
      <Header />
      <main className="flex-1 container mx-auto md:py-6 my-[10px] py-0 px-[14px] mt-20">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
