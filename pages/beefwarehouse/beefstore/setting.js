import React from "react";
import Nav from "../../../components/BeefWarehouse/BeefStore/Nav/Nav";
import Setting from "../../../components/BeefWarehouse/BeefStore/08Setting";
import { BackgroundStore } from "../../../utils/background";
const setting = () => {
  return (
    <BackgroundStore>
      <Nav />
      <Setting />
    </BackgroundStore>
  );
};

export default setting;
