import React from "react";
import Event from "../Event";
import About from "../About";
import Contact from "../Contact";
import { Banner, Footer } from "../../components";

const Home = () => {
  return (
    <div className="pt-16">
      <Banner />
      <Event />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
