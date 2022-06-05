import React from "react";
import Nav from "../../../../components/BeefWarehouse/BeefStore/Nav/Nav";
import Room from "../../../../components/BeefWarehouse/BeefStore/08Setting/roomsetting/room";
import { BackgroundStore } from "../../../../utils/background";
import Footer from "../../../../components/BeefWarehouse/Footer";
const room = () => {
  return (
    <BackgroundStore>
      <Nav />
      <Room />
      <Footer />
    </BackgroundStore>
  );
};

export default room;
