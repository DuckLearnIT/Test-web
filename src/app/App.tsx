import { Routes, Route, useLocation } from "react-router";
import { useEffect } from "react";
import { CustomCursor } from "./components/CustomCursor";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { ProjectDetails } from "./pages/ProjectDetails";

export default function App() {
  const location = useLocation();

  useEffect(() => {
    // Basic scroll to top on route change
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="font-[Inter] antialiased bg-[#0a0a0f] cursor-none">
      <CustomCursor />
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
      </Routes>

      <Footer />
    </div>
  );
}
