import React, {useState} from 'react';
import './scss/main.css';
import Navbar from './components/navbar';
import Pricing from './components/pricing';

function App() {

  const [word, setWord] = React.useState('logout')

  return (
    <div className="App">
      <Navbar message={word} />
      <Pricing />
    </div>
  );
}

export default App;
