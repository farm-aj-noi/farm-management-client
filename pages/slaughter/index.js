import React from "react";


import Nav from "../../components/Slaughter/Nav/Nav";
import Footer from "../../components/Footer/index";
import Home from "../../components/Slaughter/Home/index";
import { BackgroundFarmAll } from "../../utils/background";


const Index = () => {
  return (
    <BackgroundFarmAll>
      <Nav />
      <Home />
      {/* <Footer /> */}
    </BackgroundFarmAll>
  );
};

export default Index;
