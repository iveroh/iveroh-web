"use client";

import { useState } from "react";
import ArticleCard from "@/components/ArticleCard";
import ArticleDetail from "@/components/ArticleDetail";
import FeaturedArticle from "@/components/FeaturedArticle";
import {
  getArticlesByYear,
  getUniqueYears,
  getLatestArticle,
  Article,
} from "@/lib/articlesData";
import Footer from "@/components/Footer";
import Plasma from "@/components/ui/Plasma";
import TechLogosScroll from "@/components/TechLogosScroll";

export default function ArticlesPage() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const years = getUniqueYears();

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50">
      {/* Hero Section */}
      <section className="w-screen h-screen overflow-hidden border-b-2" id="home">
        <div className="relative w-full h-full">
          <div className="absolute inset-0">
          </div>
          {/* Content */}
          <div className="relative flex flex-col items-center justify-between h-full py-8 md:py-12">
            <div className="w-full max-w-6xl mx-auto px-4 sm:px-8">
              <h1 className="text-5xl md:text-7xl font-bold text-slate-700 mb-4">
                Monthly Articles
              </h1>
              <p className="text-xl text-slate-600 mb-4">
                Insights on web development, technology trends, and best practices
              </p>
              <div className="h-1 w-32 bg-red-600 rounded-full" />
            </div>

            {/* Featured Article */}
            {getLatestArticle() && (
              <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 py-12">
                <FeaturedArticle
                  article={getLatestArticle()!}
                  onSelect={setSelectedArticle}
                />
              </div>
            )}

            {/* Tech Logos */}
            <div className="w-full max-w-6xl mx-auto px-4 pb-4 md:pb-8">
              <TechLogosScroll color="#E80000" />
            </div>
          </div>
        </div>
      </section>

      {/* Articles by Year */}
      <section className="w-full py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto space-y-20">
          {years.map((year) => {
            const yearArticles = getArticlesByYear(year);
            return (
              <div key={year}>
                {/* Year Header */}
                <div className="mb-12">
                  <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
                    {year}
                  </h2>
                  <p className="text-slate-600">
                    {yearArticles.length} articles from this year
                  </p>
                  <div className="h-1 w-20 bg-red-600 rounded-full mt-4" />
                </div>

                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {yearArticles.map((article) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      onSelect={setSelectedArticle}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
      {/* Article Detail Modal */}
      <ArticleDetail
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
      <Footer />
    </div>
  );
}
