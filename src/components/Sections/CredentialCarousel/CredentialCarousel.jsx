import { useCallback, useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext";
import { containerVariants, itemVariants } from "../../../utils/helper";
import CertificateCard from "../CredentialCarousel/CertificateCard";

const CredentialCarousel = () => {
  const { isDarkMode } = useTheme();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    skipSnaps: false,
    dragFree: true,
  });

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    fetch("https://rportb.onrender.com/api/certificates/")
      .then((res) => res.json())
      .then((data) => {
        setCertificates(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching certificates:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section
      id="certificates"
      ref={sectionRef}
      className={`py-12 px-6 ${
        isDarkMode ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"
      } relative overflow-hidden`}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute top-20 left-1/4 w-96 rounded-full blur-3xl opacity-5 ${
            isDarkMode ? "bg-blue-500" : "bg-blue-400"
          }`}
        />
        <div
          className={`absolute bottom-20 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-5 ${
            isDarkMode ? "bg-purple-500" : "bg-purple-400"
          }`}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-10"
        >
          <motion.div
            variants={itemVariants}
            className={`text-sm uppercase tracking-widest ${
              isDarkMode ? "text-gray-500" : "text-gray-600"
            } mb-4`}
          >
            Credentials
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-5xl font-light mb-6"
          >
            My
            <span className="text-blue-500 font-medium"> Certificates</span>
          </motion.h2>

          <div className="flex flex-col md:flex-row md:items-center md:justify-center md:relative gap-8">
            <motion.p
              variants={itemVariants}
              className={`text-lg ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              } max-w-2xl font-light`}
            >
              Professional certifications and credentials that validate my
              expertise.
            </motion.p>
            <div className="flex justify-center md:absolute md:right-0 items-center gap-3">
              <button
                onClick={scrollPrev}
                disabled={!prevBtnEnabled}
                className="p-3 rounded-full bg-orange-400 hover:bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-soft text-white"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={scrollNext}
                disabled={!nextBtnEnabled}
                className="p-3 rounded-full bg-purple-400 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-soft text-white"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Conditional Rendering */}
        {loading ? (
          <div className="text-center py-20 text-gray-500 dark:text-gray-400">
            Please Wait, Certificates Loading...
          </div>
        ) : certificates.length === 0 ? (
          <div className="text-center py-20 text-gray-500 dark:text-gray-400">
            No certificates available.
          </div>
        ) : (
          <>
            {/* Carousel */}
            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={containerVariants}
              className="overflow-hidden"
              ref={emblaRef}
            >
              <div className="flex gap-6">
                {certificates.map((certificate, index) => (
                  <div
                    key={certificate.id}
                    className="shrink-0 w-[85%] sm:w-[45%] lg:w-[30%] min-w-0"
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    <CertificateCard certificate={certificate} />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {certificates.map((_, index) => (
                <button
                  key={index}
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === selectedIndex
                      ? "w-8 gradient-gold"
                      : "bg-border hover:bg-muted-foreground/30"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default CredentialCarousel;
