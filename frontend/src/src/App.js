import React, { useState } from 'react';
import Header from './components/Header';
import './App.css';
import ClearSession from './components/ClearSession/';
import AppContext from './appContext/AppContext';

const App = () => {
  const [logged, setLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div className="App">
       <Provider value={logged, setLogged, isAdmin, setIsAdmin}>
          <ClearSession />
          <Header />
      </Provider>
    </div>
  );
}

export default App;
