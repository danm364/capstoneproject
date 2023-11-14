import React, {useState, useEffect} from 'react';
import './scss/main.css';
import Login from './components/Login';
import Pricing from './components/Pricing';
import Portfolio from './components/portfolio/Portfolio';
import Invest from './components/Invest';
import RegisterAccount from './components/RegisterAccount'
import {Routes, Route, Link, useNavigate} from 'react-router-dom';
import axios from "axios";

function App() {

  function parseJwt(token) {
    try {
        // Split the token into its parts
        const parts = token.split('.');
        if (parts.length !== 3) {
            throw new Error('The token is invalid');
        }

        // Decode the payload
        const decodedPayload = atob(parts[1]);

        // Parse the decoded payload
        return JSON.parse(decodedPayload);
    } catch (error) {
        console.error('Failed to parse JWT:', error);
        return null;
    }
}
  let navigate = useNavigate();

  const [loading, setLoading] = useState(false)
  const [currentAccount, setCurrentAccount] = useState({})

  let profile = Object.keys(currentAccount).length > 0 ? parseInt(currentAccount.profile) : 0
  let username = Object.keys(currentAccount).length > 0 ? currentAccount.username : ""
  let token = Object.keys(currentAccount).length > 0 ? currentAccount.token : ""

function handleLogout() {
  axios.post(`${process.env.REACT_APP_HOST_DATA}/accounts/logout`, {}, {
    withCredentials: true
  }).then((response) => {
          setCurrentAccount({})
          navigate('/', {replace: true})
      })
}
  useEffect(() => {
    axios.post(`${process.env.REACT_APP_HOST_DATA}/accounts/refreshToken`,{}, {
      withCredentials: true
    }).then((response) => {

      console.log(response.data)
      let accessToken = response.data
      let responseData = response.data.accessToken !== "" ? parseJwt(response.data) : {}
      let profile = responseData.profile_id?.profile_id ? responseData.profile_id.profile_id : {}
      let username = responseData.username?.username ? responseData.username.username : {}

      setCurrentAccount({...currentAccount, profile : profile, username : username, token : accessToken})
    })
  }, [])  

  if (loading) return <div>Loading ...</div>

  return (
    <div className="App">
      <nav className='nav'>
            <ul className="navbar">
              
              <li className="navbar__item">
                <Link to="/" className="navbar__btn" >Home</Link>
              </li>               
              <li className="navbar__item ">
                  {(!loading && currentAccount.profile) ?
                    <Link to="/invest" className="navbar__btn" >Invest</Link>
                    : <div></div>}
                  {(!loading && currentAccount.profile) ?
                    <Link to="/portfolio" className="navbar__btn" >Portfolio</Link>
                    : <div></div>
                  }       
                {(!loading && currentAccount.profile) ?
                <Link to="/" onClick={handleLogout} className="navbar__btn"> Logout</Link>
                : <Link to="/login" className="navbar__btn" >Login</Link>
                }
              </li>
          </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Pricing />} />
        <Route path="/login" element={<Login setCurrentAccount={setCurrentAccount} currentAccount={currentAccount}  />} />
        <Route path="/invest" element={(!loading && currentAccount.profile) ? <Invest currentAccount={currentAccount} /> : <Login setCurrentAccount={setCurrentAccount} currentAccount={currentAccount}  /> } />
        <Route path="/portfolio" element={(!loading && currentAccount.profile) ? <Portfolio currentAccount={currentAccount} /> : <Login setCurrentAccount={setCurrentAccount} currentAccount={currentAccount}  /> } />
        <Route path='/register' element={<RegisterAccount />} />
      </Routes>
    </div>
  );
}

export default App;
