import React from "react";
import Nav from "../../../components/BeefWarehouse/BeefProduct/Nav/Nav";
import { BackgroundProduct } from "../../../utils/background";
import Store from "../../../components/BeefWarehouse/BeefProduct/04Store";
import Footer from "../../../components/BeefWarehouse/Footer";
const store = () => {
  return (
    <BackgroundProduct>
      <Nav />
      <Store />
      <Footer />
    </BackgroundProduct>
  );
};

export default store;
