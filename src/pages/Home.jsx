
import { StarBackground } from "@/components/backgrounds/StarBackground";
import BallpitBackground from "@/components/backgrounds/BallpitBackground";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/Sections/HeroSection";
import AboutSection from "@/components/Sections/AboutSection";
import SkillsSection from "@/components/Sections/SkillsSection";
import ProjectsSection from "@/components/Sections/ProjectsSection";
import { TestimonialsSection } from "@/components/Sections/TestimonialsSection";
import ContactSection from "@/components/Sections/ContactSection";
import Footer from "@/components/Sections/Footer";

export const Home = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen">

        {/* Background Effects */}
        <StarBackground />
        {/* <BallpitBackground /> */}
        {/* <div style={{position: 'relative', overflow: 'hidden', minHeight: '500px', maxHeight: '500px', width: '100%'}}>
          <BallpitBackground
            count={200}
            gravity={0.7}
            friction={0.8}
            wallBounce={0.95}
            followCursor={true}
          />
        </div> */}

        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main>
          <HeroSection />
          <SkillsSection />
          <ProjectsSection />
          <AboutSection />
          <TestimonialsSection />
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </ThemeProvider>
  );
};
