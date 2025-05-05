import React from 'react';
import HeroSection from '../components/Home/HeroSection.jsx';
import Navber from '../components/Shared/Navber.jsx';
import AllBlogs from '../components/blog/AllBlogs.jsx';

const Home = () => {
    return (
        <div>
            <AllBlogs></AllBlogs>
           
            {/* <HeroSection /> */}
        </div>
    );
};

export default Home;