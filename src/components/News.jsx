import React, { useEffect, useState } from "react";
import NewsCard from "../components/NewsCard";
import SkeletonCard from "../animation/SkeletonCard";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const CATEGORIES = [
  { label: "General",       value: "general" },
  { label: "World",         value: "world" },
  { label: "Nation",        value: "nation" },
  { label: "Business",      value: "business" },
  { label: "Technology",    value: "technology" },
  { label: "Entertainment", value: "entertainment" },
  { label: "Sports",        value: "sports" },
  { label: "Science",       value: "science" },
  { label: "Health",        value: "health" },
];

const News = () => {
  const [news, setNews] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("general");

  useEffect(() => {
    async function fetchNews() {
      setLoading(true);
      setError("");
      setNews([]);
      try {
        const res = await fetch(`${BACKEND_URL}/api/news?category=${category}`);
        const result = await res.json();
        if (result.error) {
          setError(result.error);
        } else {
          setNews(result.articles);
        }
      } catch {
        setError("Something went wrong while fetching news.");
      }
      setLoading(false);
    }
    fetchNews();
  }, [category]); // re-fetches whenever category changes

  return (
    <div className="min-h-screen bg-gray-900">

      {/* ── Category Tab Bar ── */}
      <div className="sticky top-0 z-10 bg-gray-900 border-b border-gray-700 shadow-md">
        <div className="flex overflow-x-auto scrollbar-hide px-4 py-3 gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200
                ${category === cat.value
                  ? "bg-blue-600 text-white shadow-lg scale-105"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Content ── */}
      {error ? (
        <div className="flex justify-center items-center p-6">
          <span className="bg-red-700 px-4 py-2 text-xl rounded-xl text-white">
            {error} ....
          </span>
        </div>
      ) : loading ? (
        <div className="grid md:grid-cols-3 gap-6 p-6 bg-black">
          {[...Array(6)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6 p-6 bg-black">
          {news.map((item, index) => (
            <NewsCard key={item.id || index} news={item} />
          ))}
        </div>
      )}

    </div>
  );
};

export default News;