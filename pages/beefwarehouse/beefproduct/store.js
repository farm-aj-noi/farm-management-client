import React from "react";
import Nav from "../../../components/BeefWarehouse/BeefProduct/Nav/Nav";
import { BackgroundStore } from "../../../utils/background";
import Store from "../../../components/BeefWarehouse/BeefProduct/04Store";
import Footer from "../../../components/BeefWarehouse/Footer";
const store = () => {
  return (
    <BackgroundStore>
      <Nav />
      <Store />
      <Footer />
    </BackgroundStore>
  );
};

export default store;
