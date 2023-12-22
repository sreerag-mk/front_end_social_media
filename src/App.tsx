import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Signup from './pages/Signup';
import Layout from './components/Layout';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Message from './pages/Message';
import Photo from './pages/Photo';
import Settings from './pages/Settings';
import Search from './pages/Search';



function App() {
  return (

    <div className="App" >
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/' element={<Layout />}>


          <Route path='/' element={<HomePage />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/message' element={<Message />} />
          <Route path='/photo' element={<Photo />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/search' element={<Search />} />


        </Route>
      </Routes>
    </div>
  );
}


export default App;
