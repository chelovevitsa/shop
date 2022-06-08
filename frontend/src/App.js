import React, { useState } from 'react';
import Header from './components/Header';
import './App.css';
import ClearSession from './components/ClearSession/';
import AppContext from './appContext/AppContext';
import Products from './components/Products';

const App = () => {
  const [logged, setLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div className="App">
       <AppContext.Provider value={{ logged, setLogged, isAdmin, setIsAdmin }}>
          <ClearSession />
          <Header />
          <Products />
      </AppContext.Provider>
    </div>
  );
}

export default App;
