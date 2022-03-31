import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import parse from 'html-react-parser';
import './App.css';
import Details from '../details/Details';
import Home from '../home/Home';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="details/:recepieId" element={<Details />} />
      </Routes>
    </div>
  );
}

export default App;
