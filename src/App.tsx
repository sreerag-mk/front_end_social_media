import React, { useEffect } from 'react';
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import Signup from './pages/Signup';



function App() {
  const navigate = useNavigate();
  const user: string | null = localStorage.getItem('userInfo');


  let userparse: string | null = null;
  useEffect(() => {
    if (user) {
      try {
        userparse = JSON.parse(user)
        const headers = {
          Authorization: `Bearer ${userparse}`
        };
        const profileData = async () => {
          await axios.get('/service/profile',
            { headers }
          )

        }
        profileData()
      }
      catch (error) {
        navigate('/login')
      }
    }
    else {
      navigate('/login')
    }
  }, [])

  return (

    <div className="App" >
      <Routes>

        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<HomePage />} />
      </Routes>
    </div>
  );
}


export default App;
