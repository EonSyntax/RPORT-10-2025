import { motion, useScroll, useTransform } from "framer-motion";
import { Mail } from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { useTheme } from "@/context/ThemeContext";
import { lazy, Suspense, useEffect } from "react";
const Spline = lazy(() => import("@splinetool/react-spline"));

import PROFILE_PIC from "@/assets/images/profile-pic.jpg";
import { containerVariants, itemVariants } from "@/utils/helper";

const HeroSection = () => {
  const { isDarkMode } = useTheme();

  // Preload the Spline chunk immediately so the above-the-fold 3D scene appears fast
  useEffect(() => {
    import("@splinetool/react-spline");
  }, []);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, -100]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1, ease: "easeOut", delay: 0.5 },
    },
  };

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        isDarkMode ? "bg-gray-950 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Hero Section */}
      <motion.section
        id="home"
        style={{ y: heroY }}
        className="relative flex items-center justify-center min-h-screen px-6 pt-10"
      >
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className={`absolute top-20 right-20 w-64 h-64 rounded-full blur-3xl opacity-10 ${
              isDarkMode ? "bg-blue-500" : "bg-blue-400"
            }`}
          />
          <motion.div
            animate={{
              scale: [1.1, 1, 1.1],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            className={`absolute bottom-20 left-20 w-48 h-48 rounded-full blur-3xl opacity-10 ${
              isDarkMode ? "bg-purple-500" : "bg-purple-400"
            }`}
          />
        </div>

        {/* Spline: Layer 1 — centered on desktop, hidden on mobile */}
        <div
          className="hidden lg:flex absolute inset-0 ml-20 items-center justify-center pointer-events-none z-5"
          aria-hidden="true"
        >
          <div className="w-[520px] h-[520px] lg:w-[680px] lg:h-[680px] 2xl:w-[880px] 2xl:h-[880px] relative overflow-hidden">
            <div className="[clip-path:inset(0_0_25%_0)] w-full h-full">
              <Suspense fallback={<div className="w-full h-full" />}>
                <Spline
                  scene="https://prod.spline.design/qFHEUKwt4anEZ479/scene.splinecode"
                  className="w-full h-full"
                />
              </Suspense>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto w-full z-10 mt-10">
          {/* Mobile Layout - Centered */}
          <div className="block lg:hidden">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="text-center"
            >
              {/* Content - Mobile */}
              <motion.div
                variants={textVariants}
                className={`text-sm uppercase tracking-widest ${
                  isDarkMode ? "text-gray-500" : "text-gray-600"
                } mb-4`}
              >
                Full-Stack Developer
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-3xl md:text-5xl font-light mb-6 leading-tight"
              >
                <span
                  className={`${isDarkMode ? "text-white" : "text-gray-900"}`}
                >
                  Crafting Digital
                </span>
                <span className="text-blue-500 font-medium ml-2">
                  experiences
                </span>
                <br />
                <span className={isDarkMode ? "text-white" : "text-gray-900"}>
                  That Inspire.
                </span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className={`text-base md:text-lg ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                } max-w-xl mx-auto font-light leading-relaxed`}
              >
                I build high-performance web applications with clean
                architecture, accessibility, and seamless user experiences.
              </motion.p>

              {/* Tech Stack - Mobile */}
              <motion.div
                variants={containerVariants}
                className="flex justify-center items-center space-x-6 text-xs uppercase tracking-widest flex-wrap mb-2"
              >
                <span
                  className={isDarkMode ? "text-gray-600" : "text-gray-500"}
                >
                  React
                </span>
                <span
                  className={isDarkMode ? "text-gray-700" : "text-gray-400"}
                >
                  •••
                </span>
                <span
                  className={isDarkMode ? "text-gray-600" : "text-gray-500"}
                >
                  Node.js
                </span>
                <span
                  className={isDarkMode ? "text-gray-700" : "text-gray-400"}
                >
                  •••
                </span>
                <span
                  className={isDarkMode ? "text-gray-600" : "text-gray-500"}
                >
                  TypeScript
                </span>
                <span
                  className={isDarkMode ? "text-gray-700" : "text-gray-400"}
                >
                  •••
                </span>
                <span
                  className={isDarkMode ? "text-gray-600" : "text-gray-500"}
                >
                  MongoDB
                </span>
              </motion.div>

              {/* Profile Image - Mobile*/}
              <motion.div variants={imageVariants} className="mb-18">
                <div className="w-50 h-70 mx-auto relative">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className={`w-full h-70 rounded-2xl overflow-hidden border-4 ${
                      isDarkMode ? "border-gray-800" : "border-gray-300"
                    } shadow-2xl`}
                  >
                    <img
                      src={PROFILE_PIC}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  {/* Decorative ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute -inset-1 rounded-2xl border border-blue-500/20"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute -inset-1 rounded-2xl border border-purple-500/20"
                  />
                </div>
              </motion.div>

              {/* CTA Buttons - Mobile */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col-2 gap-4 justify-center items-center mb-8"
              >
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => scrollToSection("work")}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full text-sm uppercase tracking-wider font-medium transition-all duration-300"
                >
                  View Work
                </motion.button>
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => scrollToSection("contact")}
                  className={`border ${
                    isDarkMode
                      ? "border-gray-700 hover:border-gray-600 text-gray-300"
                      : "border-gray-300 hover:border-gray-400 text-gray-700"
                  } px-8 py-3 rounded-full uppercase tracking-wider font-medium transition-all duration-300`}
                >
                  Get in Touch
                </motion.button>
              </motion.div>

              {/* Social Links - Mobile */}
              <motion.div
                variants={itemVariants}
                className="flex justify-center space-x-6 mb-15"
              >
                {[
                  { icon: FiGithub, href: "https://github.com/EonSyntax" },
                  {
                    icon: FiLinkedin,
                    href: "https://linkedin.com/in/adebanji-emmanuel",
                  },
                  { icon: Mail, href: "mailto:eonsyntax@gmail.com" },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.1 }}
                    className={`p-3 rounded-full transition-colors ${
                      isDarkMode
                        ? "text-gray-400 hover:text-white hover:bg-gray-800"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                    }`}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Desktop Layout - Split*/}
          <div className="hidden lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
            {/* Left Column - Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="text-left"
            >
              <motion.div
                variants={textVariants}
                className={`text-sm uppercase tracking-widest ${
                  isDarkMode ? "text-gray-500" : "text-gray-600"
                } mb-6`}
              >
                Full Stack Developer
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-5xl xl:text-7xl font-light mb-8 leading-tight"
              >
                <span
                  className={`${isDarkMode ? "text-white" : "text-gray-900"}`}
                >
                  Crafting Digital
                </span>
                <br />
                <span className="text-blue-500 font-medium">experiences</span>
                <br />
                <span className={isDarkMode ? "text-white" : "text-gray-900"}>
                  That Inspire.
                </span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className={`text-xl ${
                  isDarkMode ? "text-gray-400" : "text-gray-400"
                } mb-12 font-light leading-relaxed max-w-lg`}
              >
                I build high-performance web applications with clean
                architecture, accessibility, and seamless user experiences.
              </motion.p>

              {/* CTA Buttons - Desktop */}
              <motion.div variants={itemVariants} className="flex gap-6 mb-8">
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => scrollToSection("work")}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full text-sm uppercase tracking-wider font-medium transition-all duration-300"
                >
                  View Work
                </motion.button>
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => scrollToSection("contact")}
                  className={`border ${
                    isDarkMode
                      ? "border-gray-700 hover:border-gray-600 text-gray-300"
                      : "border-gray-300 hover:border-gray-400 text-gray-700"
                  } px-8 py-4 rounded-full text-sm uppercase tracking-wider font-medium transition-all duration-300`}
                >
                  Get in Touch
                </motion.button>
              </motion.div>

              {/* Social Links - Desktop */}
              <motion.div
                variants={itemVariants}
                className="flex space-x-6 mb-12 mx-15"
              >
                {[
                  { icon: FiGithub, href: "https://github.com/EonSyntax" },
                  {
                    icon: FiLinkedin,
                    href: "https://linkedin.com/in/adebanji-emmanuel",
                  },
                  { icon: Mail, href: "mailto:eonsyntax@gmail.com" },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.1 }}
                    className={`p-3 rounded-full transition-colors ${
                      isDarkMode
                        ? "text-gray-400 hover:text-white hover:bg-gray-800"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                    }`}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Column - Profile Image */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={imageVariants}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative">
                {/* Tech Stack - Desktop */}
                <motion.div
                  variants={itemVariants}
                  className="flex items-center space-x-8 text-xs uppercase tracking-widest absolute -top-16 -left-28"
                >
                  <span
                    className={isDarkMode ? "text-gray-600" : "text-gray-500"}
                  >
                    React
                  </span>
                  <span
                    className={isDarkMode ? "text-gray-700" : "text-gray-400"}
                  >
                    •••
                  </span>
                  <span
                    className={isDarkMode ? "text-gray-600" : "text-gray-500"}
                  >
                    Node.js
                  </span>
                  <span
                    className={isDarkMode ? "text-gray-700" : "text-gray-400"}
                  >
                    •••
                  </span>
                  <span
                    className={isDarkMode ? "text-gray-600" : "text-gray-500"}
                  >
                    TypeScript
                  </span>
                  <span
                    className={isDarkMode ? "text-gray-700" : "text-gray-400"}
                  >
                    •••
                  </span>
                  <span
                    className={isDarkMode ? "text-gray-600" : "text-gray-500"}
                  >
                    MongoDB
                  </span>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`w-80 h-110 rounded-3xl overflow-hidden border-4 ${
                    isDarkMode ? "border-gray-800" : "border-gray-300"
                  } shadow-2xl`}
                >
                  <img
                    src={PROFILE_PIC}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                {/* Decorative elements */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute -inset-4 rounded-3xl border border-blue-500/20"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute -inset-8 rounded-3xl border border-purple-500/10"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 flex justify-center pt-2"
            style={{ borderColor: "hsl(var(--primary) / 0.5)" }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: "hsl(var(--primary))" }}
            />
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default HeroSection;
