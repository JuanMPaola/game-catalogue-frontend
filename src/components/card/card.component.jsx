import style from "./card.module.css"
import { NavLink } from "react-router-dom";

function Card({ game }) {

    console.log("card", game);
    return (
        <div className={style.container} >
            <NavLink to={`/detail/${game.id}`}>
                <div>

                    <img src={game.background_image} alt="" />

                    <div className={style.cardInfo}>


                        <div>
                            <h2>{game.name}</h2>

                        </div>

                        <div>
                            <p>{game.rating}</p>
                        </div>

                        <div>
                            <ul>
                                {game.genres?.map((genre) => (
                                    <li>{genre.name}</li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>

                <div>
                </div>
            </NavLink>
        </div>
    );
}

export default Card;