import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { useNavigate, useParams } from "react-router-dom";

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: "",
  });

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    if (!id) return;

    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
    )
      .then((res) => res.json())
      .then((res) => {
        if (!res.results || res.results.length === 0) return;

        const trailer = res.results.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube"
        );

        setApiData(trailer || res.results[0]);
      })
      .catch((err) => console.error("TMDB Error:", err));
  }, [id, API_KEY]);

  return (
    <div className="Player">
      <img
        src={back_arrow_icon}
        alt="Back"
        onClick={() => navigate(-1)}
        style={{ cursor: "pointer" }}
      />

      {apiData.key ? (
        <iframe
          width="90%"
          height="90%"
          src={`https://www.youtube.com/embed/${apiData.key}`}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="Trailer"
        ></iframe>
      ) : (
        <p style={{ color: "white", marginTop: "20px" }}>
          No trailer available for this movie.
        </p>
      )}

      <div className="player-info">
        <p>{apiData.published_at?.slice(0, 10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
};

export default Player;
