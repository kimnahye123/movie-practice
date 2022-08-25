import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css";

function Detail() {
  const { id } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    console.log(json);
    setMovie(json.data.movie);
    setLoading(false);
  };
  useEffect(() => {
    getMovie();
  }, []);
  return (
    <div className={styles.container}>
      {isLoading ? (
        <div className={styles.loader}>
          <span>Loading.....Wait a seconds</span>
        </div>
      ) : (
        <div className={styles.movies}>
          <h1>{movie.title}</h1>
          <p>{movie.year}</p>
          <div className={styles.movie__img}>
            <img src={movie.large_cover_image}></img>
          </div>
          <span>{movie.description_full}</span>
        </div>
      )}
    </div>
  );
}

export default Detail;
