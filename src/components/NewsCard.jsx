import React from "react";

const NewsCard = ({ news }) => {
  return (
    <div className="bg-gray-600 rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">

      {/* Image */}
      <img
        src={news.image || "https://via.placeholder.com/400"}
        alt="news"
        className="w-full h-48 object-cover"
      />

      {/* Content */}
      <div className="p-4 flex flex-col gap-2">

        {/* Title */}
        <h2 className="text-lg font-semibold line-clamp-2 text-white">
          {news.title}
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-200 line-clamp-3">
          {news.description}
        </p>

        {/* Source + Link */}
        <div className="flex justify-between items-center mt-2">

          <span className="text-xs text-green-100">
            {news.source?.name}
          </span>

          <a
            href={news.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 text-sm font-medium hover:underline"
          >
            Read More →
          </a>

        </div>
      </div>
    </div>
  );
};

export default NewsCard;