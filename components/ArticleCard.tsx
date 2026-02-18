/* eslint-disable @next/next/no-img-element */
"use client";

import { Article, getMonthName } from "@/lib/articlesData";

interface ArticleCardProps {
  article: Article;
  onSelect: (article: Article) => void;
}

export default function ArticleCard({ article, onSelect }: ArticleCardProps) {
  const monthName = getMonthName(article.month);

  return (
    <div
      onClick={() => onSelect(article)}
      className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer h-64 bg-gray-200"
    >
      {/* Banner Image */}
      <img
        src={article.bannerImage}
        alt={article.title}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300" />

      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-between">
        {/* Month & Year */}
        <div className="text-right">
          <p className="text-white/80 text-sm font-medium">{monthName}</p>
          <p className="text-white text-2xl font-bold">{article.year}</p>
        </div>

        {/* Title & Excerpt */}
        <div>
          <h3 className="text-white font-bold text-lg mb-2 line-clamp-2 transition-colors" style={{ color: 'white' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#FF4D4D')} onMouseLeave={(e) => (e.currentTarget.style.color = 'white')}>
            {article.title}
          </h3>
          <p className="text-white/80 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {article.excerpt}
          </p>
        </div>
      </div>
    </div>
  );
}
