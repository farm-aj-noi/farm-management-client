import React from "react";
import Nav from "../../../../components/BeefWarehouse/BeefStore/Nav/Nav";
import Export_halves from "../../../../components/BeefWarehouse/BeefStore/04Export/01export_halves"
import { BackgroundStore } from "../../../../utils/background";
const export_havles = () => {
  return (
    <BackgroundStore>
      <Nav />
      <Export_halves />
    </BackgroundStore>
  );
};

export default export_havles;
