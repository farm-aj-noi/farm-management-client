import React from "react";
import Nav from "../../../../components/BeefWarehouse/BeefStore/Nav/Nav";
import Room from "../../../../components/BeefWarehouse/BeefStore/08Setting/roomsetting";
import { BackgroundStore } from "../../../../utils/background";
const room = () => {
  return (
    <BackgroundStore>
      <Nav />
      <Room />
    </BackgroundStore>
  );
};

export default room;
