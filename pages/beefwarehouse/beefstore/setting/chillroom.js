import React from "react";
import Nav from "../../../../components/BeefWarehouse/BeefStore/Nav/Nav";
import Chillroom from "../../../../components/BeefWarehouse/BeefStore/08Setting/chillroom";
import { BackgroundStore } from "../../../../utils/background";

const chillroom = () => {
  return (
    <BackgroundStore>
      <Nav />
      <Chillroom />
    </BackgroundStore>
  );
};

export default chillroom;
