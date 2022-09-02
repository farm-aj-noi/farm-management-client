import React from "react";
import HomeStore from "../../components/BeefWarehouse/Home/Home";
import { BackgroundStoreAll, BackgroundFarmAll } from "../../utils/background";
import Nav from "../../components/BeefWarehouse/Nav/Nav";
import Footer from "../../components/BeefWarehouse/Footer";
const index = () => {
  return (
    <BackgroundFarmAll>
      {/* <BackgroundStoreAll> */}
        <Nav />
        <HomeStore />
        <Footer />
      {/* </BackgroundStoreAll> */}
     </BackgroundFarmAll> 
  );
};

export default index;
