import React, { useEffect, useState } from "react";
import style from "./paginado.module.css";

export default function Paginado({ gamesPerPage, allGames, paginado, currentPage }) {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(allGames / gamesPerPage); i++) {
        pageNumbers.push(i)
    }

    const [disablePrev, setDisablePrev] = useState(false)
    const [disableNext, setDisableNext] = useState(false)

    const disableHandler = () => {
        if (currentPage == 1){
            setDisablePrev(true)
        } 

    }

    useEffect(() => {
        disableHandler()
      }, [])

    return (
        <div className={style.container}>
            {/* <button disabled={disablePrev} > ← </button> */}
            <ul>
                {pageNumbers && pageNumbers.map(number => (
                    <li key={number}>
                        <a onClick={() => paginado(number)}>{number}</a>
                    </li>
                ))}
            </ul>
            {/* <button disabled={disableNext} > → </button> */}
        </div>
    )
}