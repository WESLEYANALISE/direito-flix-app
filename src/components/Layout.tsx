import { Outlet } from "react-router-dom";
import Header from "./Header";
import MobileFooter from "./MobileFooter";
const Layout = () => {
  return <div className="flex flex-col min-h-screen bg-netflix-background text-netflix-text mx-px my-[30px]">
      <MobileFooter />
      <Header />
      <main className="flex-1 container mx-auto md:py-6 mt-14 my-[10px] py-0 px-[14px]">
        <Outlet />
      </main>
    </div>;
};
export default Layout;