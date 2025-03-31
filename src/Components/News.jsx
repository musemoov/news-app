import React, { useEffect, useState } from "react";
import techImg from "../assets/images/tech.jpg";
import wordlImg from "../assets/images/world.jpg";
import sportsImg from "../assets/images/sports.jpg";
import scienceImg from "../assets/images/science.jpg";
import healthImg from "../assets/images/health.jpg";
import entertainmentImg from "../assets/images/entertainment.jpg";
import nationImg from "../assets/images/nation.jpg";
import noImg from "../assets/images/no-img.png";
import "./News.css";
import axios from "axios";
import NewsModal from "./NewsModal";


const categories = [
  "general",
  "world",
  "business",
  "technology",
  "entertainment",
  "sports",
  "science",
  "health",
  "nation",
];

const News = () => {
  const [headline, setHeadline] = useState(null);
  const [news, setNews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [showModal, setShowModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      const url = `https://gnews.io/api/v4/top-headlines?category=${selectedCategory}&lang=en&apikey=${process.env.REACT_APP_GNEWS_API_KEY}`;
      const response = await axios.get(url);

      const fetchedNews = response.data.articles;

      fetchedNews.forEach((article) => {
        if (!article.image) {
          article.image = noImg;
        }
      });

      setHeadline(fetchedNews[0]);
      setNews(fetchedNews.slice(1, 7));

      console.log(news);
    };

    fetchNews();
  }, [selectedCategory]);

  const handleCategoryClick = (e, category) => {
    e.preventDefault();
    setSelectedCategory(category);
  };

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    setShowModal(true);

    console.log(article);
  };

  return (
    <div className="news-app">
      <div className="news-header">
        <h1 className="logo">Happy News</h1>
      </div>
      <div className="news-content">
        <nav className="navbar">
          <h1 className="nav-heading">Categories</h1>
          <div className="categories">
            {categories.map((category) => (
              <a
                href="#"
                className="nav-link"
                key={category}
                onClick={(e) => handleCategoryClick(e, category)}
              >
                {category}
              </a>
            ))}
          </div>
        </nav>
        <div className="news-section">
          {headline && (
            <div
              className="headline cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-xl glow-hover"
              onClick={() => handleArticleClick(headline)}
            >
              <img
                src={headline.image || noImg}
                alt={headline.title}
                className="transition-opacity duration-300 opacity-60 hover:opacity-90"
              />
              <h2 className="headline-title">{headline.title}</h2>
            </div>
          )}

          <div className="news-grid">
            {news.map((article, index) => (
              <div
                 className="news-grid-item relative rounded-xl border border-neutral-700 cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:brightness-110 glow-hover"
                key={index}
                onClick={() => handleArticleClick(article)}
              >
                {/* 글로우 효과 컴포넌트 삽입
                <GlowingEffect
                  blur={20}
                  borderWidth={3}
                  spread={100}
                  glow={true}
                  disabled={false}
                  proximity={150}
                  inactiveZone={0.1}
                  className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                /> */}

                <img
                  src={article.image || noImg}
                  alt={article.title}
                  className="relative z-10 transition-opacity duration-300 opacity-60 hover:opacity-90"
                />
                <h3 className="relative z-20">{article.title}</h3>
              </div>
            ))}
          </div>
        </div>
        <NewsModal
          show={showModal}
          article={selectedArticle}
          onClose={() => setShowModal(false)}
        />
      </div>
      <footer>
        <p className="copyright">
          <span>News App</span>
        </p>
        <p>&copy; All Rights Reserved. By Code And Create</p>
      </footer>
    </div>
  );
};

export default News;
