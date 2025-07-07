import AllBlogs from "./AllBlogs";
import HeroSection from "./../components/Home/HeroSection";
import Cookies from "js-cookie";
import Blogs from "./Blogs.jsx";

import FeaturedPosts from "../components/Home/Feature.jsx";
import SubscribeNewsletter from "./SubscribeFeature.jsx";
import Footer from "./Footer.jsx";
import HeroBanner from "./HeroBanner.jsx";

const Home = () => {
  return (
    <div>
      {/* <AllBlogs></AllBlogs> */}
      <HeroBanner/>
      <FeaturedPosts/>
      <Blogs/>
      <SubscribeNewsletter/>

      <Footer/>
  
    </div>
  );
};

export default Home;
