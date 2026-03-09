import React, { useState, useEffect } from "react";
import LoadingScreen from "./Components/LoadingScreen";
import Navbar from "./Components/Navbar";
import MobileMenu from "./Components/Section/MobileMenu";
import Home from "./Components/Section/Home";
import About from "./Components/Section/About";
import Projects from "./Components/Section/Projects";
import Contact from "./Components/Section/Contact";
import Footer from "./Components/Footer";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [menuOpen, setmenuOpen] = useState(false);

  useEffect(() => {
    // Prevent scrolling during loading
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      ) : (
        <div className="relative min-h-screen">
          {/* Ambient background */}
          <div className="ambient-mesh" />
          <div className="noise-overlay" />

          <Navbar menuOpen={menuOpen} setmenuOpen={setmenuOpen} />
          <MobileMenu menuOpen={menuOpen} setmenuOpen={setmenuOpen} />

          <main className="relative z-10">
            <Home />
            <About />
            <Projects />
            <Contact />
          </main>

          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
