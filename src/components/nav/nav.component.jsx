import style from "./nav.module.css"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getByName } from "../../redux/actions";
import { NavLink } from "react-router-dom";

function Nav() {

    const dispatch = useDispatch();

    const [name, setName] = useState("");

    const onSearch = (event) => {
        event.preventDefault()
        dispatch(getByName(name))
    }
    // setCurrentpage (1)


    function handleChange(event) {
        setName(event.target.value);
    }

   /*  function handleDetail(event) {
        dispatch()
    } */

    return (
        <div className={style.container} >
            <div>
                <NavLink to={`/home`}>
                    <button /* onClick={handleDetail} */>Home</button>
                    {/* <img src="../../assets/icons8-joystick-60.png" alt="" /> */}
                </NavLink>
            </div>

            <div>
                <input
                    type="text"
                    onChange={handleChange}
                />
                <button onClick={onSearch}>🔎</button>
            </div>

            <div>
                <NavLink to={`/form`}>
                    <button>Upload game</button>
                </NavLink>
            </div>

            <div>
                <button>User</button>
            </div>


        </div>
    );
}

export default Nav;