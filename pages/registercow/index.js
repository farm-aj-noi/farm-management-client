import React from "react";


import Nav from "../../components/RegisterCow/Nav/Nav";
import Footer from "../../components/Footer/index";
import Home from "../../components/RegisterCow/Home/index";
import { BackgroundCow } from "../../utils/background";


const Index = () => {
  return (
    <BackgroundCow>
      <Nav />
      <Home />
      {/* <Footer /> */}
    </BackgroundCow>
  );
};

export default Index;
