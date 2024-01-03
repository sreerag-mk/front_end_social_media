import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Signup from './pages/Signup';
import Layout from './components/Layout';
import Login from './pages/Login';
import Profile from './pages/OtherProfile';
import Message from './pages/Message';
import Photo from './pages/Photo';
import Settings from './pages/Settings';
import Search from './pages/Search';
import SavedPost from './pages/SavedPost';
import Addpost from './pages/Addpost';
import Explore from './pages/Explore';
import Comment from './components/Comment';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/message" element={<Message />} />
          <Route path="/photo" element={<Photo />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/search" element={<Search />} />
          <Route path="/saved" element={<SavedPost />} />
          <Route path="/addpost" element={<Addpost />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/comment" element={<Comment />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
