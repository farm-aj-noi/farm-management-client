import React from "react";

import Nav from "../../components/Slaughter/Nav/Nav";
// import Footer from "../../components/Footer/index";
import Alert from "../../components/Slaughter/01_Alert/index";
import { BackgroundFarmAll } from "../../utils/background";

const AlertPage = () => {
  return (
    <BackgroundFarmAll>
      <Nav />
      <Alert />
      {/* <Footer /> */}
    </BackgroundFarmAll>
  );
};

export default AlertPage;
