import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Main from "./components/Main/Main";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="main">
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
