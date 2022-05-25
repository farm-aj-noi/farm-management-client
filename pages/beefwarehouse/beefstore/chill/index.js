import React from "react";
import Nav1 from "../../../../components/BeefWarehouse/BeefStore/Nav/Nav";
import Chill from "../../../../components/BeefWarehouse/BeefStore/02Chill/";
import { BackgroundStore } from "../../../../utils/background";
import Footer from "../../../../components/BeefWarehouse/Footer";
const index = () => {
  return (
    <BackgroundStore>
      <Nav1 />
      <Chill />
      <Footer />
    </BackgroundStore>
  );
};

export default index;
