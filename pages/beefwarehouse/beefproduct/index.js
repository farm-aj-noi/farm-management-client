import React from "react";
import Nav from "../../../components/BeefWarehouse/BeefProduct/Nav/Nav";
import Dashboard from "../../../components/BeefWarehouse/BeefProduct/01Dashboard";
import { BackgroundProduct } from "../../../utils/background";
import Footer from "../../../components/BeefWarehouse/Footer";
const index = () => {
  return (
    <BackgroundProduct>
      <Nav />
      <Dashboard />
      <Footer />
    </BackgroundProduct>
  );
};

export default index;
