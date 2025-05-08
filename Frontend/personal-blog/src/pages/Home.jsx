import React, { useEffect, useState } from "react";
import AllBlogs from './AllBlogs';
import HeroSection from './../components/Home/HeroSection';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [showHero, setShowHero] = useState(false);
  const token = Cookies.get("token"); // JWT stored in cookies
  const navigate = useNavigate();

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");

    if (!token && !hasVisited) {
      setShowHero(true);
    }
  }, [token]);

  const handleGetStarted = () => {
    localStorage.setItem("hasVisited", "true");
    setShowHero(false);
    navigate("/login"); // Redirect to login after "Start reading"
  };

  if (token) {
    return <AllBlogs />;
  }

  return (
    <div>
      {showHero ? <HeroSection onGetStarted={handleGetStarted} /> : <AllBlogs />}
    </div>
  );
};

export default Home;
