import { CLEAR_STATE, GET_BY_ID, GET_BY_NAME, GET_GAMES, SUMBIT_GAME, GET_GENRES, GET_PLATFORMS, ORDER_UPDOWN, FILTER_BY_ORIGIN, FILTER_GENRES } from "../actions";

let initialState = { allGames: [], allGenres: [], gameId: {}, platflorms: [], aux: [], /* selectedGenres: {} */ todos: [] }

function rootReducer(state = initialState, action) {
    let ordenados;
    let filtrados;
    let filtradosGenre = [];

    switch (action.type) {

        case GET_BY_NAME:
            return {
                ...state,
                allGames: action.payload
            }
        case GET_GAMES:
            return {
                ...state,
                allGames: action.payload,
                todos: action.payload
            }
        case GET_BY_ID:
            return {
                ...state,
                gameId: action.payload
            }
        case SUMBIT_GAME:
            return {
                ...state,
                allGames: [...state.allGames, ...action.payload]
            }
        case GET_GENRES:
            return {
                ...state,
                allGenres: action.payload
            }
        case GET_PLATFORMS:
            return {
                ...state,
                platflorms: action.payload
            }

        case ORDER_UPDOWN:
            if (action.payload === "A Nombre") {
                ordenados = state.allGames.sort((a, b) => a.name.localeCompare(b.name))
            }
            if (action.payload === "D Nombre") {
                ordenados = state.allGames.sort((a, b) => b.name.localeCompare(a.name))
            }
            if (action.payload === "A Rating") {
                ordenados = state.allGames.sort((a, b) => (a.rating > b.rating ? 1 : -1))
            }
            if (action.payload === "D Rating") {
                ordenados = state.allGames.sort((a, b) => (a.rating < b.rating ? 1 : -1))
            }
            return {
                ...state,
                allGames: ordenados,
            }

        case FILTER_GENRES:
            if (action.payload === "All") {
                return {
                    ...state,
                    allGames: state.todos // Restaura la lista original de juegos sin filtrar
                };
            } else {
                state.todos.filter(game => {
                    game.genres.forEach(genero => {
                        console.log(genero.name)
                        if (genero.name === action.payload) filtradosGenre.push(game)
                    });
                });
                return {
                    ...state,
                    allGames: filtradosGenre // Sobrescribe allGame con los juegos filtrados
                };
            }

        case FILTER_BY_ORIGIN:
            let filtrados;

            if (action.payload === "DB") {
                filtrados = state.todos.filter((game) => typeof game.id === 'string' && game.id.includes("-"));
            } else if (action.payload === "API") {
                filtrados = state.todos.filter((game) => typeof game.id === 'number');
            } else if (action.payload === "All") {
                // Si seleccionas "All", restaura la lista original de juegos sin duplicados
                filtrados = state.todos;
            }

            return {
                ...state,
                allGames: filtrados,
            };
        case CLEAR_STATE:
            return {
                ...state,
                gameId: {}
            }
        default:
            return state
    }
}

export default rootReducer;