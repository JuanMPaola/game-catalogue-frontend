import Card from "../card/card.component";
import style from "../cards/cards.module.css"

function Cards({ allGames}) {

    const gamesList = Array.isArray(allGames) ? allGames : [];

    return (
        <div className={style.container}>

            <div className={style.cards}>
                {
                    gamesList.map((game) =>
                        <Card game={game} />
                    )
                }
            </div>
        </div>
    );
}

export default Cards;