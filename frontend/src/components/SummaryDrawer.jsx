import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getSummary } from "../api/services";
import { X, Loader2, Globe } from "lucide-react";
import api from "../api/api";

const LANGUAGES = {
  en: "English",
  hi: "Hindi",
  ml: "Malayalam",
  ta: "Tamil",
  te: "Telugu",
  kn: "Kannada",
  mr: "Marathi",
  gu: "Gujarati",
  pa: "Punjabi",
  bn: "Bengali",
  or: "Odia",
  ur: "Urdu",
};

const SummaryDrawer = ({ isOpen, onClose, docId }) => {
  const [summaryData, setSummaryData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedLang, setSelectedLang] = useState("en");
  const [translating, setTranslating] = useState(false);
  const [displayedSummary, setDisplayedSummary] = useState("");

  // Fetch summary when drawer opens
  useEffect(() => {
    const fetchSummary = async () => {
      if (!isOpen || !docId) return;
      setLoading(true);
      setError(null);
      setSummaryData(null);
      setDisplayedSummary("");
      setSelectedLang("en");

      try {
        const response = await getSummary(docId);
        setSummaryData(response);
        setDisplayedSummary(response.summary || "");
      } catch (err) {
        console.error("Error fetching summary:", err);
        setError("Failed to fetch document summary");
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, [isOpen, docId]);

  // Reset state when drawer closes
  useEffect(() => {
    if (!isOpen) {
      setSummaryData(null);
      setError(null);
      setLoading(false);
      setSelectedLang("en");
      setDisplayedSummary("");
    }
  }, [isOpen]);

  // Handle language change
  const handleLanguageChange = async (lang) => {
    setSelectedLang(lang);
    if (lang === "en") {
      setDisplayedSummary(summaryData?.summary || "");
      return;
    }

    setTranslating(true);
    try {
      const response = await api.get("/documents/summary/translate", {
        params: { doc_id: docId, lang },
      });
      setDisplayedSummary(response.data.summary || "");
    } catch (err) {
      console.error("Translation failed:", err);
      setDisplayedSummary(summaryData?.summary || "");
    } finally {
      setTranslating(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-50/30 backdrop-blur-3xl z-40"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-96 bg-gray-50 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-green-500">
                Document Summary
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-green-500 hover:text-green-200 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Language Selector */}
            <div className="px-6 pt-4 pb-2">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-green-500" />
                <label className="text-sm font-medium text-green-500">
                  Language
                </label>
              </div>
              <select
                value={selectedLang}
                onChange={(e) => handleLanguageChange(e.target.value)}
                disabled={loading || !summaryData}
                className="mt-2 w-full px-3 py-2 border border-green-200 rounded-lg text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-green-400 disabled:opacity-50"
              >
                {Object.entries(LANGUAGES).map(([code, name]) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-green-500 border-b border-green-100 pb-1 mb-3">
                    Document ID
                  </h3>
                  <p className="text-gray-800 text-sm">{docId}</p>
                </div>

                {/* Summary Content */}
                <div>
                  <h3 className="text-sm font-medium text-green-500 border-b border-green-100 pb-1 mb-3">
                    Summary — {LANGUAGES[selectedLang]}
                  </h3>
                  <div className="border border-green-200 p-4 rounded-lg">
                    {loading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <Loader2 className="w-4 h-4 animate-spin text-green-500" />
                        <p className="text-green-500">Loading summary...</p>
                      </div>
                    ) : error ? (
                      <p className="text-red-500">⚠️ {error}</p>
                    ) : translating ? (
                      <div className="flex items-center justify-center space-x-2">
                        <Loader2 className="w-4 h-4 animate-spin text-green-500" />
                        <p className="text-green-500">Translating...</p>
                      </div>
                    ) : displayedSummary ? (
                      <p className="text-gray-700 leading-relaxed">
                        {displayedSummary}
                      </p>
                    ) : (
                      <p className="text-green-400">No summary available</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SummaryDrawer;