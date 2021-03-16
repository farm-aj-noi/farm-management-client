import React from "react";

import Nav from "../../components/Slaughter/Nav/Nav";
import Getin from "../../components/Slaughter/99_0_Grade/index";
import Bad from '../../components/Slaughter/99_0_Grade/top/box-alert-date'
import { BackgroundFarmAll } from "../../utils/background";

const GetinPage = () => {
  return (
    <BackgroundFarmAll>
      <Nav />
      {/* <Bad name="รายการเชือดโค ณ วัน" count= {"จำนวน " + 50 +" รายการ"}/> */}
      <Getin />
    </BackgroundFarmAll>
  );
};

export default GetinPage;
