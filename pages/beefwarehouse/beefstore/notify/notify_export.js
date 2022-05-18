import React from "react";
import Nav from "../../../../components/BeefWarehouse/BeefStore/Nav/Nav";
import Notify_export from "../../../../components/BeefWarehouse/BeefStore/07Notify/05notify_export";
import { BackgroundStore } from "../../../../utils/background";
const notify_export = () => {
  return (
    <BackgroundStore>
      <Nav />
      <Notify_export />
    </BackgroundStore>
  );
};

export default notify_export;
