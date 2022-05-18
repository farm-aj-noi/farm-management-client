import React from "react";
import Nav from "../../../../components/BeefWarehouse/BeefStore/Nav/Nav";
import Notify_chill from "../../../../components/BeefWarehouse/BeefStore/07Notify/03notify_chill";
import { BackgroundStore } from "../../../../utils/background";
const notify_chill = () => {
  return (
    <BackgroundStore>
      <Nav />
      <Notify_chill />
    </BackgroundStore>
  );
};

export default notify_chill;
