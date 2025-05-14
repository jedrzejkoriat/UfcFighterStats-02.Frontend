import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FighterStats from "./components/FighterStats";

function App() {

  return (
      <Router>
          <Routes>
              <Route path="/" element={<FighterStats />} />
          </Routes>
      </Router>
  );
}

export default App;
