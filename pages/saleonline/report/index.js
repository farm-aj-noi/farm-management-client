import React from "react";

// import Nav from "../../../components/RegisterCow/Nav/Nav";
import OrderReport from "../../../components/Saleonline/report/OrderReport";
// import Bad from '../../../components/Slaughter/09_cuttwo/top/box-alert-date'
// import { BackgroundFarmAll } from "../../../utils/background";
// import { BackgroundCow } from "../../../utils/background";
import Nav from "../../../components/Saleonline/Nav/Nav"
const GetinPage = () => {

  return (
    // <BackgroundCow>
    // <Nav />
    <div>
      <Nav />
      <OrderReport />
    </div>

    // </BackgroundCow>
  );
};

export default GetinPage;