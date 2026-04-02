import React, { useEffect, useState } from "react";
import NewsCard from "../components/NewsCard";
import SkeletonCard from "../animation/SkeletonCard";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const News = () => {
  const [news, setNews] = useState([]);
  const [error, setError] = useState("")
  const [Loading,SetLoading] = useState(false);

  useEffect(() => {
    async function fetchNews() {
      SetLoading(true);
      const res = await fetch(`${BACKEND_URL}/api/news`)
      const result = await res.json();
      console.log(result.articles);
      if (result.error) {
        setError(result.error);
      } else {
        setNews(result.articles);
      }
      SetLoading(false);
    }
    fetchNews();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900">

      {error ? (
        <div className="text-white  flex justify-center items-center p-3">
          <span
          className="bg-red-700 p-2 text-xl rounded-xl"
          >{error+" ...."}</span>
          </div>
      ) : Loading ?
        (<div className="grid md:grid-cols-3 gap-6 p-6 bg-black ">
          {[...Array(6)].map((_,index) => (
           <SkeletonCard key={index}/>
          ))}
        </div>):(
          <div className="grid md:grid-cols-3 gap-6 p-6 bg-black ">
          {news.map((item, index) => (
            <NewsCard key={item.id || index} news={item} />
          ))}
        </div>
        )}
    </div>

  );
};

export default News;