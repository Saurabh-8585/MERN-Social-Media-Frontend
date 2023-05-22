import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import Sidebar from './Components/Navigation/SideBar';
function App() {
  return (

    <>
      <Router>
      <div className="flex">
      <Sidebar />

      <div className="flex-1 md:ml-28 mt-20 p-1">
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              {/* <Route path="/explore" element={Explore} /> */}
              {/* <Route path="/login" element={Login} /> */}
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
