import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getById, clearState } from "../../redux/actions";
import { useParams } from "react-router-dom";
import style from "./detail.module.css"

function Detail() {

  const { id } = useParams()

  let game = useSelector((state) => state.gameId);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getById(id))

    //Aca va lo que pasa cuando se desmonta
    return (()=>dispatch(clearState()))
  }, [dispatch])

  console.log(game)

  const description = game.description?.replace(/<[^>]*>/g, '');
  return (
    <div className={style.container} style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,1)),url(${game.background_image})` }} >

      <div className={style.lateral}>

        {/* <button>back</button> */}
      </div>

      <div className={style.informacion}>
        <h1>{game.name}</h1>

        <img src={game.background_image} alt="" />
        <h4>Realesed: {game.released}</h4>
        <h4>Rating: {game.rating}</h4>
        <h4>Genres:</h4>
        <ul>
          {game.genres?.map((genre) => (
            <li>{genre.name}</li>
          ))}
        </ul>
        <h4>Avible on:</h4>

        <ul>
          {game.platforms?.map((plat) => (
            <li key={plat}>{plat.platform.name}</li>
          ))}
        </ul>
      </div>

      <div>

        <p>{description}</p>

      </div>

      <div>

      </div>

    </div>
  );
}

export default Detail;