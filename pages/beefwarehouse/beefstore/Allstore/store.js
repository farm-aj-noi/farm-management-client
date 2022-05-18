import React from "react";
import Nav from "../../../../components/BeefWarehouse/BeefStore/Nav/Nav";
import Store from "../../../../components/BeefWarehouse/BeefStore/05Store/01Store";
import { BackgroundStore } from "../../../../utils/background";
const store = () => {
  return (
    <BackgroundStore>
      <Nav />
      <Store />
    </BackgroundStore>
  );
};

export default store;
