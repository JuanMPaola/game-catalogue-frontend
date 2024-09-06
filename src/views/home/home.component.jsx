import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./home.module.css";

import { orderUpDown, getGames, filterGenres, filterByOrigin } from "../../redux/actions";
import Cards from "../../components/cards/cards.component";
import Paginado from "../../components/paginado/paginado.component";

function Home({ allGenres }) {
  const [aux, setAux] = useState(false);                      // AUXILIARY
  const dispatch = useDispatch();
  let allGames = useSelector((state) => state.allGames);

  const [selectedRating, setSelectedRating] = useState("-");  // STATES TO RESET NAME AND RATING SELECTS
  const [selectedNombre, setSelectedNombre] = useState("-");
  const [selectedOrigin, setSelectedOrigin] = useState("All");
  const [selectedGenre, setSelectedGenre] = useState("All");

  //------------------------PAGINATION------------------------//

  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage, setGamesPerPage] = useState(15);
  const indexOfLastCharacter = currentPage * gamesPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - gamesPerPage;

  const currentGames = Array.isArray(allGames)
    ? allGames.slice(indexOfFirstCharacter, indexOfLastCharacter)
    : [];

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getGames()); // Calls the action to load games
  }, [dispatch]);

  const handleGenre = (event) => {
    dispatch(filterGenres(event.target.value));
    setAux(true);
  };

  const handleAscDsc = (event) => {
    const selectedValue = event.target.value;
    if (event.target.name === "Nombre") {
      setSelectedNombre(selectedValue);
      setSelectedRating("-");
    } else if (event.target.name === "Rating") {
      setSelectedRating(selectedValue);
      setSelectedNombre("-");
    }
    dispatch(orderUpDown(selectedValue)); // Dispatches the action to sort the array
    setAux(true);
  };

  const handleOrigin = (event) => {
    dispatch(filterByOrigin(event.target.value));
  };

  const handleReset = () => {
    setSelectedNombre("-");
    setSelectedRating("-");
    setSelectedOrigin("All");
    setSelectedGenre("All");
    dispatch(getGames());
    setAux(false);
  };

  return (
    <div className={style.container}>
      {allGames.length > 0 ? (
        <>
          <div className={style.filtros}>
            <h2>Filters</h2>

            <h3>Name</h3>
            <select name="Nombre" onChange={handleAscDsc} value={selectedNombre}>
              <option value="-" disabled>
                -
              </option>
              <option value="A Nombre">A - Z</option>
              <option value="D Nombre">Z - A</option>
            </select>

            <h3>Rating</h3>
            <select name="Rating" onChange={handleAscDsc} value={selectedRating}>
              <option value="-" disabled>
                -
              </option>
              <option value="A Rating">Ascendent</option>
              <option value="D Rating">Descendent</option>
            </select>

            <h3>Origin</h3>
            <select name="Origen" onChange={handleOrigin} value={selectedOrigin}>
              <option value="All">All</option>
              <option value="DB">DB Games</option>
              <option value="API">API Games</option>
            </select>

            <h3>Genres</h3>
            <select onChange={handleGenre} value={selectedGenre}>
              <option value="All">All</option>
              {allGenres && Array.isArray(allGenres) ? (
                allGenres.map((genero) => (
                  <option key={genero.id} value={genero.name}>
                    {genero.name}
                  </option>
                ))
              ) : (
                <option disabled>No genres available</option>
              )}
            </select>

            <h3>-</h3>

            <button onClick={handleReset}>RESET</button>
          </div>

          <div className={style.cardsPaginado}>
            <Cards allGames={currentGames} />

            <Paginado
              gamesPerPage={gamesPerPage}
              allGames={allGames.length}
              paginado={paginado}
              currentPage={currentPage}
            />
          </div>
        </>
      ) : (
        <div className={style.loading}>
          <h1>
            Loading<span className={style.loadingDots}>...</span>
          </h1>
          <br />
          <h2>Server is waking up, please wait</h2>
        </div>
      )}
    </div>
  );
}

export default Home;
