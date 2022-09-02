import React from "react";
import Nav from "../../../../components/BeefWarehouse/BeefProduct/Nav/Nav";
import { BackgroundProduct } from "../../../../utils/background";
import Footer from "../../../../components/BeefWarehouse/Footer";
import Notify_import from "../../../../components/BeefWarehouse/BeefProduct/06Notify/03notify_import";
const notify_import = () => {
  return (
    <BackgroundProduct>
      <Nav />
      <Notify_import />
      <Footer />
    </BackgroundProduct>
  );
};

export default notify_import;
