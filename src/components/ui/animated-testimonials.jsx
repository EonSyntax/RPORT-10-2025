"use client";;
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence} from "motion/react";
import { useTheme } from "../../context/ThemeContext";
import { useEffect, useState } from "react";

export const AnimatedTestimonials = ({ testimonials, autoplay = false }) => {
  const { isDarkMode } = useTheme();
  const [active, setActive] = useState(0);

  const handleNext = () => {
    if (!testimonials || testimonials.length === 0) return;
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    if (!testimonials || testimonials.length === 0) return;
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay && testimonials && testimonials.length > 0) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, testimonials]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  if (!testimonials || testimonials.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500 dark:text-gray-400 relative">
        Please Wait Testimonials Loading....
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-sm px-4 py-20 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12">
      <div className="relative grid grid-cols-1 gap-8 sm:gap-10 lg:gap-20 md:grid-cols-2">
        <div>
          <div className="relative h-80 w-full">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
                  drag={isActive(index)} // only active one is draggable
                  dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
                  dragElastic={0.4}
                  onDragEnd={(_, info) => {
                    const offsetX = info.offset.x;
                    const offsetY = info.offset.y;
                    const distance = Math.sqrt(offsetX ** 2 + offsetY ** 2);
                    const threshold = 800; // how far to drag before changing
                    if (distance > threshold) {
                      handleNext(); // swipe left → go to next
                    }
                  }}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index)
                      ? 40
                      : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom cursor-grab"
                  whileTap={{ cursor: "grabbing" }}
                >
                  <img
                    src={testimonial.src}
                    alt={testimonial.name || "Testimonial"}
                    width={500}
                    height={500}
                    draggable={false}
                    className="h-full w-full rounded-3xl object-cover object-center"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex flex-col justify-between py-4">
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
          >
            <h3
              className={`text-2xl font-bold ${
                isDarkMode ? " text-white" : " text-blue-500"
              }`}
            >
              {testimonials[active].name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-neutral-500">
              {testimonials[active].designation}
            </p>
            <motion.p className="mt-6 text-lg">
              {testimonials[active].quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{
                    filter: "blur(10px)",
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
          <div className="flex justify-center items-center gap-4 pt-8 md:pt-0">
            <button
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ sclae: 0.98 }}
              onClick={handlePrev}
              className="group/button flex h-7 w-7 items-center justify-center rounded-full dark:bg-blue-500 hover:dark:bg-blue-600"
            >
              <IconArrowLeft className="h-5 w-5 transition-transform duration-300 group-hover/button:rotate-12 text-white" />
            </button>
            <button
              onClick={handleNext}
              className="group/button flex h-7 w-7 items-center justify-center rounded-full dark:bg-blue-500 hover:dark:bg-blue-600"
            >
              <IconArrowRight className="h-5 w-5 transition-transform duration-300 group-hover/button:-rotate-12 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
