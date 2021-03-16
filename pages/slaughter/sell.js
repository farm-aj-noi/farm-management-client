import React from "react";

import Nav from "../../components/Slaughter/Nav/Nav";
import ListCuttwo from "../../components/Slaughter/13_Sell/index";
import Bad from '../../components/Slaughter/13_Sell/top/box-alert-date'
import { BackgroundFarmAll } from "../../utils/background";

const GetinPage = () => {
  return (
    <BackgroundFarmAll>
      <Nav />
      <Bad name="รายการตัดแต่งซากโคผ่าซีก ณ วัน" count= {"จำนวน " + 50 +" รายการ"}/>
      <ListCuttwo />
    </BackgroundFarmAll>
  );
};

export default GetinPage;
