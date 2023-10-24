import React, {useState, useEffect} from 'react';
import './scss/main.css';
import Login from './components/Login';
import Pricing from './components/Pricing';
import Portfolio from './components/portfolio/Portfolio';
import Invest from './components/Invest';
import RegisterAccount from './components/RegisterAccount'
import {Routes, Route, Link, Navigate} from 'react-router-dom';
import axios from "axios";

function App() {

  const [loggedIn, setLoggedIn] = useState(false)
  const [currentAccount, setCurrentAccount] = useState(0)

  function getCookieValue(name) {
    console.log(name)
    const value = document.cookie;
    const parts = value.split("=");
    console.log(parts)

    if (parts.length === 2) return parts[1]
}

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_HOST_DATA}/accounts/authenticateUser`, {

        headers : {
            Authorization : `Bearer ${getCookieValue(document.cookie)}` 
        }
        
    }).then((response) => {

        setLoggedIn(true)
        console.log(getCookieValue(document.cookie))
        console.log(response)
    })
  })  

  return (
    <div className="App">
      <nav className='nav'>
            <ul className="navbar">
              <li className="navbar__item">
                <Link to="/" className="navbar__btn" >Home</Link>
              </li>               
              <li className="navbar__item ">
                <Link to="/invest" className="navbar__btn" >Invest</Link>
                <Link to="/portfolio" className="navbar__btn" >Portfolio</Link>
                { loggedIn === false ? (<Link to="/login" className="navbar__btn" >Login</Link>)
                : (<Link onClick={() => setLoggedIn(!loggedIn)} className="navbar__btn"> Logout</Link>)
                
                }
              </li>
          </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Pricing />} />
        <Route path="/login" element={loggedIn === false ? <Login setCurrentAccount={setCurrentAccount} currentAccount={currentAccount} loggedIn={loggedIn} setLoggedIn={setLoggedIn} /> : <Navigate to="/portfolio" />} />
        <Route path="/invest" element={loggedIn ? <Invest currentAccount={currentAccount} /> : <Navigate to="/login" replace />} />
        <Route path="/portfolio" element={loggedIn ? <Portfolio currentAccount={currentAccount} /> : <Navigate to="/login" replace/>} />
        <Route path='/register' element={<RegisterAccount />} />
      </Routes>
    </div>
  );
}

export default App;
