import React from "react";
import Nav from "../../../../components/BeefWarehouse/BeefStore/Nav/Nav";
import Notify_date from "../../../../components/BeefWarehouse/BeefStore/07Notify/01notify_date";
import { BackgroundStore } from "../../../../utils/background";
import Footer from "../../../../components/BeefWarehouse/Footer";
const notify_date = () => {
  return (
    <BackgroundStore>
      <Nav />
      <Notify_date />
      <Footer />
    </BackgroundStore>
  );
};

export default notify_date;
