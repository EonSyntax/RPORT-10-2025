import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Sun, Moon, X, Menu } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const Navbar = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <motion.nav
      style={{ opacity: 1 }}
      className={`fixed top-0 w-full z-50 px-6 py-4 ${
        isDarkMode ? "bg-gray-950/80" : "bg-gray-50/80"
      } backdrop-blur-md border-b ${
        isDarkMode ? "border-gray-800" : "border-gray-200"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.div className="flex items-center space-x-2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className=""
          >
            <Code2 size={34} className="text-blue-500" />{" "}
          </motion.div>
          <span
            className={`text-lg ml-1 ${
              isDarkMode
                ? "text-gray-400 hover:text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Eon Syntax
          </span>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex item-center space-x-8">
          {["Home", "Skills", "Work", "About", "Contact", "Theme"].map(
            (item) => (
              <motion.button
                key={item}
                whileHover={{ scale: 1.05 }}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`text-sm uppercase tracking-wider transition-colors ${
                  isDarkMode
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {item}
              </motion.button>
            )
          )}
          <motion.button
            onClick={() => toggleDarkMode(isDarkMode ? "light" : "dark")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-2 rounded-full transition-colors ${
              isDarkMode
                ? "text-gray-400 hover:text-white hover:bg-gray-800"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
            }`}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          <motion.button
            onClick={() => toggleDarkMode(isDarkMode ? "light" : "dark")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-2 rounded-full transition-colors ${
              isDarkMode
                ? "text-gray-400 hover:text-white hover:bg-gray-800"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
            }`}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`p-2 rounded-full transition-colors ${
              isDarkMode
                ? "text-gray-400 hover:text-white hover:bg-gray-800"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
            }`}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`md:hidden mt-4 p-4 rounded-lg ${
              isDarkMode ? "bg-gray-900" : "bg-white"
            } border ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}
          >
            {["Home", "Skills", "Work", "About", "Contact", "Themes"].map(
              (item) => (
                <motion.button
                  key={item}
                  whileHover={{ x: 5 }}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`block w-full text-left py-2 text-sm uppercase tracking-wider transition-colors ${
                    isDarkMode
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {item}
                </motion.button>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
