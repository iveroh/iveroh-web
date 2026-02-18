/* eslint-disable @next/next/no-img-element */
"use client";

import { Article, getMonthName } from "@/lib/articlesData";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";

interface ArticleDetailProps {
  article: Article | null;
  onClose: () => void;
}

export default function ArticleDetail({ article, onClose }: ArticleDetailProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (article) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [article]);

  if (!article) return null;

  const monthName = getMonthName(article.month);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };

  return (
    <div
      ref={modalRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center p-4"
    >
      {/* Modal Card */}
      <div
        ref={contentRef}
        className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-2 bg-white rounded-full hover:bg-gray-100 transition-colors border border-gray-200"
          aria-label="Close article"
        >
          <X size={24} className="text-black" />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1">
          {/* Banner Image */}
          <div className="relative w-full h-80 flex-shrink-0">
            <img
              src={article.bannerImage}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            {/* Date Overlay */}
            <div className="absolute bottom-6 left-6 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-lg">
              <p className="text-white text-sm font-medium">{monthName} {article.year}</p>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8 md:p-12">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-12">
              {article.title}
            </h1>

            {/* Article Sections */}
            <div className="space-y-20">
              {article.sections.map((section, index) => (
                <div key={index} className="space-y-6">
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                      section.imagePosition === 'left' ? 'lg:grid-cols-2' : 'lg:grid-cols-2'
                    }`}
                  >
                    {/* Image on Left */}
                    {section.imagePosition === 'left' && (
                      <div className="relative h-72 rounded-lg overflow-hidden shadow-lg">
                        <img
                          src={section.image}
                          alt={`Section ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Text Content */}
                    <div>
                      <p className="text-lg text-slate-700 leading-relaxed">
                        {section.text}
                      </p>
                    </div>

                    {/* Image on Right */}
                    {section.imagePosition === 'right' && (
                      <div className="relative h-72 rounded-lg overflow-hidden shadow-lg">
                        <img
                          src={section.image}
                          alt={`Section ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 pt-8 mt-12">
              <p className="text-slate-600 text-sm">
                Published on {monthName} {article.year}
              </p>
              <p className="text-slate-600 text-sm mt-2">
                Explore more articles about web development, technology trends, and best practices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
