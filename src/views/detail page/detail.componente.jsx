import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getById, clearState } from "../../redux/actions";
import { useParams } from "react-router-dom";
import style from "./detail.module.css";

function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const game = useSelector((state) => state.gameId);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Dispatch the action to get the game details
    dispatch(getById(id));

    // Minimum loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 1 second

    // Clear the state and timer when component unmounts
    return () => {
      dispatch(clearState());
      clearTimeout(timer);
    };
  }, [dispatch, id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!game) {
    return <div>No game data available</div>;
  }

  const description = game.description?.replace(/<[^>]*>/g, '');

  return (
    <div
      className={style.container}
      style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,1)),url(${game.background_image})` }}
    >
      <div className={style.lateral}>
        {/* <button>back</button> */}
      </div>

      <div className={style.informacion}>
        {/* <h1>{game.name}</h1> */}

        <img src={game.background_image} alt="" />
        <h4>Released: {game.released}</h4>
        <h4>Rating: {game.rating}</h4>
        <h4>Genres:</h4>
        <ul>
          {Array.isArray(game.genres) && game.genres.length > 0 ? (
            game.genres.map((genre, index) => (
              <li key={index}>{genre.name}</li>
            ))
          ) : (
            <li>No genres available</li>
          )}
        </ul>
        <h4>Available on:</h4>
        <ul>
          {Array.isArray(game.platforms) && game.platforms.length > 0 ? (
            game.platforms.map((plat, index) => (
              <li key={index}>{plat.platform?.name || 'Unknown'}</li>
            ))
          ) : (
            <li>No platforms available</li>
          )}
        </ul>
      </div>

      <div>
        <p>{description}</p>
      </div>

      <div></div>
    </div>
  );
}

export default Detail;
