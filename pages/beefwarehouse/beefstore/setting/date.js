import React from "react";
import Nav from "../../../../components/BeefWarehouse/BeefStore/Nav/Nav";
import Date from "../../../../components/BeefWarehouse/BeefStore/08Setting/datesetting";
import { BackgroundStore } from "../../../../utils/background";
import Footer from "../../../../components/BeefWarehouse/Footer";
const date = () => {
  return (
    <BackgroundStore>
      <Nav />
      <Date />
      <Footer />
    </BackgroundStore>
  );
};

export default date;
