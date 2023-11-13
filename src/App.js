import { Route, Routes, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getGenres, getPlatforms } from "./redux/actions";

import "./App.css"

import Detail from './views/detail page/detail.componente';
import Home from './views/home/home.component';
import Form from './views/form page/form.component';
import Landing from './views/landing page/landig.component';
import Nav from "./components/nav/nav.component";

function App() {

  const dispatch = useDispatch();

  let allGenres = useSelector((state) => state.allGenres);


  useEffect(() => {
    dispatch(getGenres())
    //Aca va lo que pasa cuando se desmonta
    /* return (()=>clearState()) */
  }, [dispatch])

  const location = useLocation()
  
  const allPlataforms = ["PC", "xBox", "PS4", "Switch", "PS5"]
/*   const platforms = useSelector((state)=> state.platforms)

  useEffect(() => {
    dispatch(getPlatforms())

  }, [dispatch]) */

  return (
    <div>
      {location.pathname !== '/' && <Nav /> }
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route exact path="/home" element={<Home allGenres={allGenres} />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/form" element={<Form allGenres={allGenres} allPlataforms={allPlataforms} />} />
      </Routes>
    </div>
  );
}

export default App;
