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

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYWNmYWEwZjUwYTE5OTFhMGVhMjU3NThiZTM1NWU1ZiIsIm5iZiI6MTc1OTA1MTQxNS45NTEsInN1YiI6IjY4ZDhmZTk3ZmI5Mjc0OTMxMmUxYzNmZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.12V7HeEh5JpBWJzhyg8-7FnhY4aTY88e6xPfZKQYsOk",
    },
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      options
    )
      .then((res) => res.json())
      .then((res) => {
        const trailer = res.results.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube"
        );
        if (trailer) {
          setApiData(trailer);
        } else if (res.results.length > 0) {
          setApiData(res.results[0]); // fallback if no trailer found
        }
      })
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <div className="Player">
      <img src={back_arrow_icon} alt="Back" onClick={() => navigate(-1)} />
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
