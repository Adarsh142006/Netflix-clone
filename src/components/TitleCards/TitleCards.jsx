import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import { Link } from "react-router-dom";

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  /* ---------- FETCH DATA ---------- */
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${
        category || "now_playing"
      }?api_key=${API_KEY}&language=en-US&page=1`
    )
      .then((res) => res.json())
      .then((data) => setApiData(data.results || []))
      .catch((err) => console.log(err));
  }, [category, API_KEY]);

  /* ---------- ARROW SCROLL ---------- */
  const scrollLeft = () => {
    cardsRef.current.scrollBy({ left: -400, behavior: "smooth" });
  };

  const scrollRight = () => {
    cardsRef.current.scrollBy({ left: 400, behavior: "smooth" });
  };

  /* ---------- DRAG SCROLL ---------- */
  let isDown = false;
  let startX;
  let scrollLeftPos;

  const startDrag = (e) => {
    isDown = true;
    startX = e.pageX - cardsRef.current.offsetLeft;
    scrollLeftPos = cardsRef.current.scrollLeft;
  };

  const stopDrag = () => {
    isDown = false;
  };

  const onDrag = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - cardsRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    cardsRef.current.scrollLeft = scrollLeftPos - walk;
  };

  return (
    <div className="title-cards">
      <h2>{title || "Popular on Netflix"}</h2>

      {/* LEFT ARROW */}
      <button className="arrow left" onClick={scrollLeft}>
        ‹
      </button>

      {/* CARD LIST */}
      <div
        className="card-list"
        ref={cardsRef}
        onMouseDown={startDrag}
        onMouseLeave={stopDrag}
        onMouseUp={stopDrag}
        onMouseMove={onDrag}
      >
        {apiData.map(
          (card) =>
            card.poster_path && (
              <Link
                to={`/player/${card.id}`}
                className="card"
                key={card.id}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${card.poster_path}`}
                  alt={card.original_title}
                />
                <p>{card.original_title}</p>
              </Link>
            )
        )}
      </div>

      {/* RIGHT ARROW */}
      <button className="arrow right" onClick={scrollRight}>
        ›
      </button>
    </div>
  );
};

export default TitleCards;
