import React from "react";
import Nav from "../../../../components/BeefWarehouse/BeefStore/Nav/Nav";
import Chillroom from "../../../../components/BeefWarehouse/BeefStore/08Setting/chillroom";
import { BackgroundStore } from "../../../../utils/background";
import Footer from "../../../../components/BeefWarehouse/Footer";
const chillroom = () => {
  return (
    <BackgroundStore>
      <Nav />
      <Chillroom />
      <Footer />
    </BackgroundStore>
  );
};

export default chillroom;
