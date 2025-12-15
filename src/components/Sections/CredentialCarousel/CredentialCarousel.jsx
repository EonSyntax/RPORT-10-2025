import { useCallback, useEffect, useState, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CertificateCard from "./CertificateCard";
import { useTheme } from "../../../context/ThemeContext";

/**
 * CredentialCarousel - A reusable, standalone carousel component for displaying credentials/certificates
 *
 * @component
 * @param {Object} props
 * @param {Array} props.certificates - Array of certificate objects with required fields
 * @param {string} props.title - Section title (default: "Professional Certifications")
 * @param {string} props.subtitle - Section subtitle (default: "Verified credentials demonstrating expertise and continuous learning")
 * @returns {JSX.Element}
 *
 * @example
 * import { CredentialCarousel } from '@/components/CredentialCarousel';
 *
 * const MyComponent = () => {
 *   const certs = [
 *     {
 *       id: "1",
 *       issuingOrganization: "AWS",
 *       credentialName: "Solutions Architect",
 *       credentialId: "AWS-123",
 *       credentialUrl: "https://aws.amazon.com/...",
 *       issueDate: "2024-01-15",
 *       expiryDate: "2027-01-15",
 *       certificateImage: "https://...",
 *       organizationLogo: "https://..."
 *     }
 *   ];
 *
 *   return <CredentialCarousel certificates={certs} title="My Certifications" />;
 * };
 */
const CredentialCarousel = ({
  certificates = [],
  title = "Professional",
  subtitle = "Verified credentials demonstrating expertise and continuous learning",
}) => {
  const { isDarkMode } = useTheme();
  const sectionRef = useRef(null);
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
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  // Return empty if no certificates
  if (!certificates || certificates.length === 0) {
    return null;
  }

  return (
    <section
      id="credential"
      ref={sectionRef}
      className={`w-full py-16 md:py-24 ${
        isDarkMode ? "bg-gray-950" : "bg-white"
      } text-white relative overflow-hidden`}
    >
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-white">
              <span className="w-2 h-2 rounded-full gradient-gold" />
              <span className={`text-sm uppercase tracking-widest ${
              isDarkMode ? "text-gray-500" : "text-gray-600"
            } mb-4`}>
                Credentials
              </span>
            </div>
            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight ${
              isDarkMode ? "text-white" : "text-black"
            }`}>
              {title} <span className="text-blue-500">{"Certifications"}</span>
            </h2>
            <p className={`text-lg max-w-xl ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}>{subtitle}</p>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-3">
            <button
              onClick={scrollPrev}
              disabled={!prevBtnEnabled}
              className="p-3 rounded-full bg-orange-400 hover:bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-soft"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollNext}
              disabled={!nextBtnEnabled}
              className="p-3 rounded-full bg-purple-400 text-primary-foreground hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-soft"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
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
        </div>

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
      </div>
    </section>
  );
};

export default CredentialCarousel;
