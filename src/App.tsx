import React, { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Router & Layout
import { RouterProvider, useRouter } from './router';
import { Navbar } from './components/navigation/Navbar';
import { ElectricRaysBackground } from './effects/ElectricRaysBackground';

// Page Views
import { HomePage } from './pages/HomePage';
import { ArticlesPage } from './pages/ArticlesPage';
import { RIPArticlePage } from './pages/RIPArticlePage';
import { AboutPage } from './pages/AboutPage';

gsap.registerPlugin(ScrollTrigger);

const AppContent: React.FC = () => {
  const { currentPath } = useRouter();

  // Initialize Lenis smooth scroll and connect to GSAP ScrollTrigger
  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, [currentPath]);

  // Page Routing Switch
  const renderCurrentPage = () => {
    switch (currentPath) {
      case '/articles/rip-routing-protocol':
        return <RIPArticlePage />;
      case '/articles':
        return <ArticlesPage />;
      case '/about':
        return <AboutPage />;
      case '/':
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="relative min-h-screen text-[#D8CBB3] bg-[#090A0C] overflow-x-clip selection:bg-[#2F6BFF]/30 selection:text-white">
      {/* Dynamic Flowing Electric Blue Rays & Dot Matrix (Lenis-driven) */}
      <ElectricRaysBackground />

      {/* Global Navigation Bar */}
      <Navbar />

      {/* Dynamic View Component */}
      <main id="main-content" className="relative z-10">
        {renderCurrentPage()}
      </main>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <RouterProvider>
      <AppContent />
    </RouterProvider>
  );
};

export default App;
