import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import Sidebar from './Components/Navigation/SideBar';
import Explore from './Pages/Explore';
import Message from './Pages/Message';
import Notification from './Pages/Notification';
import Bookmark from './Pages/Bookmark';
import Profile from './Pages/Profile';
import Login from './Auth/Login';
import Register from './Auth/Register';
import ErrorPage from './Pages/ErrorPage';
function App() {
  return (

    <>
      <Router>
        <div className="flex">
          <Sidebar />
          <div className="flex-1 lg:ml-28 mt-20">
            <Routes>
              <Route index path="/" element={<HomePage />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/notifications" element={<Notification />} />
              <Route path="/messages" element={<Message />} />
              <Route path="/bookmarks" element={<Bookmark />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*  " element={<ErrorPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
