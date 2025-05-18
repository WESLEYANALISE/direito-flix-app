
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import CourseDetail from "./pages/CourseDetail";
import AreaDetail from "./pages/AreaDetail";
import SearchPage from "./pages/SearchPage";
import MyCourses from "./pages/MyCourses";
import NotFound from "./pages/NotFound";
import Favorites from "./pages/Favorites";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="course/:id" element={<CourseDetail />} />
            <Route path="area/:areaName" element={<AreaDetail />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="my-courses" element={<MyCourses />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
