import "./App.css";
import Navbar from "./Components/Navbar";
import News from "./Components/News";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default function App() {

  const [progress, setProgress] = useState(0)
  
   let apiKey1 = process.env.REACT_APP_API_KEY
  let setChanges = (progress) =>{
   setProgress(progress)
  }
    return (
      <div>
        <Router>
        <LoadingBar
        height={5}
        color='#f11946'
        progress={progress}
        
      />
          <Navbar />
          <Routes>
            <Route
              path="/general"
              element={<News setProgress={setChanges} key='general' apiKey={apiKey1}  pageSize={5} country="in" category="general" />}
            />
            <Route
              path="/general"
              element={<News setProgress={setChanges} key='' apiKey={apiKey1}  pageSize={5} country="in" category="About" />}
            />
            <Route
              path="/business"
              element={<News setProgress={setChanges} key='business' apiKey={apiKey1} pageSize={5} country="in" category="business" />}
            />
            <Route
              path="/entertainment"
              element={
                <News setProgress={setChanges} key='entertainment' apiKey={apiKey1}  pageSize={5} country="in" category="entertainment" />
              }
            />
            <Route
              path="/health"
              element={<News setProgress={setChanges} key='health' apiKey={apiKey1}  pageSize={5} country="in" category="health" />}
            />
            <Route
              path="/science"
              element={<News setProgress={setChanges} key='science' apiKey={apiKey1}  pageSize={5} country="in" category="science" />}
            />
            <Route
              path="/sports"
              element={<News setProgress={setChanges} key='sports' apiKey={apiKey1}  pageSize={5} country="in" category="sports" />}
            />
            <Route
              path="/technology"
              element={<News setProgress={setChanges} key='technology' apiKey={apiKey1}  pageSize={5} country="in" category="technology" />}
            />
          </Routes>
        </Router>
      </div>
    );
  
}

