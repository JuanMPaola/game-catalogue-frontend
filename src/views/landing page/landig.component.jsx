import React from 'react';
import style from './landing.module.css'
import { NavLink } from 'react-router-dom';

function Landing() {
    return (
        <div className={style.container + " landing-container"}>

            <div className={style.div}>
                <h1>Welcome to My Individual Project</h1>
                <h3>This website was meticulously crafted as a part of my individual project for a bootcamp. It is a video game page that allows you to navigate through a ton of pages with different games and information about them. I used advanced technologies such as React with Redux for the front-end and Node.js with PostgreSQL for the back-end. This project showcases a blend of cutting-edge web development skills and a deep passion for creating innovative solutions.</h3>
                <p>Enjoy it! 😃</p>

                <NavLink to={`/home`}>
                    <button>Start</button>
                </NavLink>
            </div>
        </div>
    );
}

export default Landing;