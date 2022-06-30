import React from "react";
import Nav from "../../../../components/BeefWarehouse/BeefStore/Nav/Nav";
import { BackgroundStore } from "../../../../utils/background";
import Footer from "../../../../components/BeefWarehouse/Footer";
import Shelf from "../../../../components/BeefWarehouse/BeefStore/08Setting/roomsetting/shelf";

const shelf = () => {
  return (
    <BackgroundStore>
      <Nav />
      <Shelf />
      <Footer />
    </BackgroundStore>
  );
};

export default shelf;
