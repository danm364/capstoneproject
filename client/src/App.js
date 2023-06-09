import React, {useState} from 'react';
import './scss/main.css';
import Login from './components/Login';
import Pricing from './components/Pricing';
import Portfolio from './components/portfolio/Portfolio';
import Invest from './components/Invest';
import {Routes, Route, Link} from 'react-router-dom';

function App() {
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
                <Link to="/login" className="navbar__btn" >Login</Link>
              </li>
          </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Pricing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/invest" element={<Invest />} />
        <Route path="/portfolio" element={<Portfolio />} />
      </Routes>
    </div>
  );
}

export default App;
