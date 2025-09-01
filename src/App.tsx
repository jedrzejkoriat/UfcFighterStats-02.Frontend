import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FighterStats from "./components/FighterStats";
import video from './assets/video.mp4';
import Navbar from "./components/Navbar";

function App() {

  return (
        <div className="global-container">
            <video autoPlay loop muted playsInline className="background-video">
                <source src={video} type="video/mp4" />
            </video>
            <div className="video-overlay"></div>
            <div className="global-content">
        <Router>
            <Navbar />
          <Routes>
            <Route path="/" element={<FighterStats />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
