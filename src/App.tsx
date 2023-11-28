import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/login';
import HomePage from './pages/HomePage';


function App() {
  return (

    <div className="App" >

      <Routes>
        {/* <Route path='/' element={<HomePage />} /> */}
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
