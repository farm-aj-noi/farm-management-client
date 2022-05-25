import React from "react";
import Nav from "../../../../components/BeefWarehouse/BeefStore/Nav/Nav";
import Date from "../../../../components/BeefWarehouse/BeefStore/08Setting/datesetting";
import { BackgroundStore } from "../../../../utils/background";

const date = () => {
  return (
    <BackgroundStore>
      <Nav />
      <Date />
    </BackgroundStore>
  );
};

export default date;
