import React from "react";
import Nav from "../../../../components/BeefWarehouse/BeefStore/Nav/Nav";
import { BackgroundStore } from "../../../../utils/background";
import Footer from "../../../../components/BeefWarehouse/Footer";
import Basket from "../../../../components/BeefWarehouse/BeefStore/08Setting/roomsetting/basket";

const basket = () => {
  return (
    <BackgroundStore>
      <Nav />
      <Basket />
      <Footer />
    </BackgroundStore>
  );
};

export default basket;
