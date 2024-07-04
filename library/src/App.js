import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import "./stylesheets/alignments.css";
import "./stylesheets/theme.css";
import "./stylesheets/sizes.css";
import "./stylesheets/custom-components.css";
import "./stylesheets/form-elements.css";
import ProtectedRoute from "./Components/ProtectedRoute";
import About from "./Pages/About";
import Services from "./Pages/Services";
import Gallery from "./Pages/Gallery";
import Features from "./Pages/Features";

import { useSelector } from "react-redux";
import Loader from "./Components/Loader";
import Profile from "./Pages/Profile";
import BookDescription from "./Pages/BookDescription";

import Main from "./Pages/Main";

function App() {
  const { loading } = useSelector((state) => state.loaders);

  return (
    <div className="App">
   
      {loading && <Loader />} {/* Render loader when loading state is true */}
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/book/:id"
          element={
            <ProtectedRoute>
              <BookDescription />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/services" element={<Services />} />
       
      </Routes>
    </div>
  );
}

export default App;
