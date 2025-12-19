import { useCallback, useEffect, useState } from "react";
import { Award, Calendar, ExternalLink, Hash } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext";

/**
 * CertificateCard - Individual certificate/credential card component
 *
 * @component
 * @param {Object} props
 * @param {Object} props.certificate - Certificate object containing:
 *   - id: number
 *   - organization_name: string
 *   - certificate_name: string
 *   - certificate_id: string
 *   - issue_date: string (ISO date)
 *   - expiry_date?: string (ISO date, optional)
 *   - image_url: string (URL)
 *   - verify_url: string (URL)
 * @returns {JSX.Element}
 */
const CertificateCard = ({ certificate }) => {
  const { isDarkMode } = useTheme();
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="group relative flex flex-col h-full rounded-xl overflow-hidden bg-card shadow-soft hover:shadow-elevated transition-all duration-500 border border-blue-500/20">
      {/* Certificate Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={certificate.image_url}
          alt={certificate.certificate_name}
          className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-primary/80 via-primary/20 to-transparent" />

        {/* Badge */}
        <div className="absolute top-4 right-4 bg-orange-500 p-2 rounded-full shadow-gold">
          <Award className="w-5 h-5 text-accent-foreground" />
        </div>

        {/* Organization */}
        <div className="absolute bottom-4 left-4 right-4">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-linear-to-r from-blue-600 to-purple-600 rounded-full text-sm font-medium text-white shadow-lg">
            {certificate.organization_name}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 space-y-4">
        <h3 className="text-lg font-semibold text-blue-500 line-clamp-2 min-h-14">
          {certificate.certificate_name}
        </h3>

        <div className="space-y-3 flex-1">
          {/* Credential ID */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Hash className="w-4 h-4 text-orange-400" />
            <span
              className={`font-mono text-xs truncate ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              {certificate.certificate_id}
            </span>
          </div>

          {/* Dates */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 text-orange-400" />
            <span className={`${isDarkMode ? "text-white" : "text-black"}`}>
              {formatDate(certificate.issue_date)}
              {certificate.expiry_date && (
                <span
                  className={`text-muted-foreground/70 ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  {" → "}
                  {formatDate(certificate.expiry_date)}
                </span>
              )}
            </span>
          </div>
        </div>

        {/* Verify Button */}
        <a
          href={certificate.verify_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-blue-500 text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors duration-300 group/btn"
        >
          Verify Credential
          <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
        </a>
      </div>
    </div>
  );
};

export default CertificateCard;
