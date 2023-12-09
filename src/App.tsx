import './App.css';
import { Route, Routes } from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import HomePage from './pages/HomePage';
import Signup from './pages/Signup';
import Layout from './components/Layout';
import Login from './pages/Login';
import Profile from './components/Profile';
import Message from './components/Message';
import Photo from './components/Photo';
import Settings from './components/Settings';


function App() {
  return (

    <div className="App" >
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/' element={<Layout />}>



          <Route element={<RequireAuth />}>
            <Route path='/home' element={<HomePage />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/message' element={<Message />} />
            <Route path='/photo' element={<Photo />} />
            <Route path='/settings' element={<Settings />} />
          </Route>

        </Route>
      </Routes>
    </div>
  );
}


export default App;
