import React, { useEffect, useState } from "react";
import NewsCard from "../components/NewsCard";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
      async function fetchNews (){
        const res = await fetch(`${BACKEND_URL}/api/news`)
        const result = await res.json();
        console.log(result.articles);
        setNews(result.articles);
      }
      fetchNews();
  }, []);

  return (
    <div className="grid md:grid-cols-3 gap-6 p-6 bg-black">
      {news.map((item, index) => (
        <NewsCard key={item.id || index} news={item} />
      ))}
    </div>
  );
};

export default News;