import React from "react";
import Nav from "../../../../components/BeefWarehouse/BeefProduct/Nav/Nav";
import { BackgroundProduct } from "../../../../utils/background";
import Footer from "../../../../components/BeefWarehouse/Footer";
import Notify_date from "../../../../components/BeefWarehouse/BeefProduct/06Notify/01notify_date";
const notify_date = () => {
  return (
    <BackgroundProduct>
      <Nav />
      <Notify_date />
      <Footer/>
    </BackgroundProduct>
  );
};

export default notify_date;
