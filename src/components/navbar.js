import React from "react";


// function Header() {
//     return <h1>Hello Dan</h1>
// }



const Navbar = () => {
    return (
        <nav>
            <ul className="navbar">
                <li className="navbar__item">
                    <a className="navbar__btn">Home</a>
                </li>
                <h1 className="date"></h1>
                <li className="navbar__item">
                    <h1 className="navbar__home">HOME</h1>
                </li>
                <li className="navbar__item ">
                    <a  className="navbar__btn">Portfolio</a>
                    <a  className="navbar__btn">Login</a>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar