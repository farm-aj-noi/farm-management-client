import React from "react";
import Nav from "../../../../components/BeefWarehouse/BeefStore/Nav/Nav";
import Notify_import from "../../../../components/BeefWarehouse/BeefStore/07Notify/04notify_import";
import { BackgroundStore } from "../../../../utils/background";
const notify_import = () => {
  return (
    <BackgroundStore>
      <Nav />
      <Notify_import />
    </BackgroundStore>
  );
};

export default notify_import;
