import React from "react";
import HomeStore from "../../components/BeefWarehouse/Home/Home";
import { BackgroundStore } from "../../utils/background";
import Nav from "../../components/Nav/Nav"
const index = () => {
  return (
    <BackgroundStore>
        <Nav/>
      <HomeStore />
    </BackgroundStore>
  );
};

export default index;
