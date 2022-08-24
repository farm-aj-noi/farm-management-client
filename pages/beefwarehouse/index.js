import React from "react";
import HomeStore from "../../components/BeefWarehouse/Home/Home";
import { BackgroundStore } from "../../utils/background";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/BeefWarehouse/Footer";
const index = () => {
  return (
    <div>
      <Nav />
      <HomeStore />
      <Footer />
    </div>
  );
};

export default index;
