"use client";

import { Article, getMonthName } from "@/lib/articlesData";

interface FeaturedArticleProps {
  article: Article;
  onSelect: (article: Article) => void;
}

export default function FeaturedArticle({ article, onSelect }: FeaturedArticleProps) {
  const monthName = getMonthName(article.month);

  return (
    <div
      onClick={() => onSelect(article)}
      className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer bg-gray-200 mb-12"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 h-96">
        {/* Image Section */}
        <div className="relative overflow-hidden">
          <img
            src={article.bannerImage}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all duration-300" />
        </div>

        {/* Content Section */}
        <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 p-8 md:p-12 flex flex-col justify-between">
          {/* Badge */}
          <div className="inline-flex items-center w-fit mb-4">
            <span className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full">
              LATEST
            </span>
          </div>

          {/* Title */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-red-400 transition-colors">
              {article.title}
            </h2>
            <p className="text-white/80 text-lg mb-6">
              {article.excerpt}
            </p>
          </div>

          {/* Date and CTA */}
          <div className="flex items-center justify-between">
            <p className="text-white/70 text-sm">
              {monthName} {article.year}
            </p>
            <button className="px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors">
              Read More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
