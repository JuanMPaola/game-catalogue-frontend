import { useState } from "react";
import style from "./form.module.css"
import { sumbitGame } from "../../redux/actions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function Form({ allGenres }) {

  const allPlatforms = ["PC", "xBox", "PS4", "Switch", "PS5"];

  const [isDisabled, setIsDisabled] = useState(false)

  const [data, setData] = useState({
    name: "",
    description: "",
    realesed: "",
    background_image: "",
    rating: "",
    platforms: [],
    genres: [],
  })

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    realesed: "",
    background_image: "",
    rating: "",
    platforms: "",
    genres: "",
  });

  useEffect(() => {
    disabledHandler()
  }, [errors])

  //FUNCION QUE SE USA PARA MODIFICAR EL ESTADO DEL BOTON
  const disabledHandler = () => {
    if (errors && Object.keys(errors).length > 0) {
      setIsDisabled(true)
    } else {
      setIsDisabled(false)
    }
  }

  //FUNCION DE VALIDACION DE CAMPOS
  function validation(data) {
    let errors = {}

    if (data.name === "" || !data.name) errors.name = "El nombre es obligatorio"
    if (data.name.length > 50) errors.name = "Longitud maxima de nombre 50 caracteres"

    if (data.background_image === "" || !data.background_image) errors.background_image = "La imagen es obligatoria"

    if (data.description === "" || !data.description) errors.description = "Agregue una breve descripcion"
    if (data.description.length > 50) errors.description = "Longitud maxima de descripcion 255 caracteres"

    if (data.platforms.length < 1 || !data.platforms) errors.platforms = "Ingrese aunque sea una plataforma"

    if (!data.rating) errors.rating = "Ingrese el rating del juego"
    if (data.rating > 5 || data.rating < 0) errors.rating = "Rating debe ser entre 0 y 5"

    if (data.realesed === "" || !data.realesed) errors.realesed = "Ingrese la fecha de lanzamiento"

    if (data.genres.length < 1 || !data.genres) errors.genres = "Ingrese almenos un genero"

    return errors;
  }

  //GUARDA LOS VALORES EN EL ESTADO
  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "platforms" || name === "genres") {
      if (!data[name].includes(value)) {
        setData({
          ...data,
          [name]: [...data[name], value]
        });
      }
    } else {
      setData({
        ...data,
        [name]: value
      });
    }
    setErrors(
      validation({
        ...data,
        [name]: value
      })
    );
  };

  //ELIMINA GENEROS YA AGREGADOS
  const deleteOption = (event) => {
    event.preventDefault();
    const eliminado = data[event.target.name].filter((option) => option !== event.target.value)
    setData({
      ...data,
      [event.target.name]: eliminado
    })
    setErrors(
      validation({
        ...data,
        [event.target.name]: event.target.value
      })
    );

  }

  const dispatch = useDispatch();

  function handleSumbit(event) {
    event.preventDefault()
    dispatch(sumbitGame(data))
    setData({
      name: "",
      description: "",
      realesed: "",
      background_image: "",
      rating: "",
      platforms: [],
      genres: [],
    });
    setErrors({
      name: "",
      description: "",
      realesed: "",
      background_image: "",
      rating: "",
      platforms: "",
      genres: "",
    });
  }

  return (
    <div className={style.container} >

      <form onSubmit={handleSumbit}>

        <label >Name</label>
        <input
          type="text"
          value={data.name}
          onChange={handleChange}
          placeholder="Name"
          name="name"
        />
        {errors.name ? <p className="formerror">{errors.name}</p> : null}

        <label >Image</label>
        <input
          type="text"
          value={data.background_image}
          onChange={handleChange}
          placeholder="background_image"
          name="background_image"
        />
        {errors.background_image ? <p className="formerror">{errors.background_image}</p> : null}

        <label >Description</label>
        <input
          type="text"
          value={data.description}
          onChange={handleChange}
          placeholder="Description"
          name="description"
        />
        {errors.description ? <p className="formerror">{errors.description}</p> : null}

        <label >Platforms</label>
        <select
          defaultValue=""
          onChange={handleChange}
          name="platforms"
        >
          <option selected>-</option>
          {
            allPlatforms.map((plat) => (
              <option value={plat}>
                {plat}
              </option>
            ))
          }
        </select>
        {errors.platforms ? <p className="formerror">{errors.platforms}</p> : null}

        {data.platforms ? (
          <div>
            {
              data.platforms.map((plat) => (
                <button name="platforms" key={plat} value={plat} onClick={deleteOption}>{plat}❌</button>
              ))}
          </div>
        ) : null}

        <label >Rating</label>
        <input
          type="text"
          value={data.rating}
          onChange={handleChange}
          placeholder="1 to 5"
          name="rating"
        />

        {errors.rating ? <p className="formerror">{errors.rating}</p> : null}
        <label >Realesed</label>
        <input
          type="date"
          value={data.realesed}
          onChange={handleChange}
          placeholder="Realesed date"
          name="realesed"
        />
        {errors.realesed ? <p className="formerror">{errors.realesed}</p> : null}

        <label >Genres</label>
        <select
          defaultValue=""
          onChange={handleChange}
          name="genres"
        >
          <option disabled selected>-</option>
          {
            allGenres.map((genero) => (
              <option key={genero.id} value={genero.name}>
                {genero.name}
              </option>
            ))
          }
        </select>
        {errors.genres ? <p className="formerror">{errors.genres}</p> : null}

        {data.genres ? (
          <div>
            {
              data.genres.map((genre) => (
                <button name="genres" key={genre} value={genre} onClick={deleteOption}>{genre}❌</button>
              ))}
          </div>
        ) : null}

        <button type="submit" onClick={handleSumbit} disabled={isDisabled} className={style.sumbit}>SUMBIT</button>
      </form>
    </div>
  );
}

export default Form;