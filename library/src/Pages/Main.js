import React, { useEffect } from "react";
import Hero from "../Components/Hero";
import Navigation from "../Components/LandingPage";
import { useNavigate } from "react-router-dom";

function Main() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div>
      <Navigation />
      <Hero />
    </div>
  );
}

export default Main;
