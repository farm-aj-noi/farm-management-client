import React, { useState } from "react";
import dayjs from "dayjs";

import Nav from "../../components/Slaughter/Nav/Nav";
import Getin from "../../components/Slaughter/98_Importcow/index";
import Bad from "../../components/Slaughter/98_Importcow/top/box-alert-date";
import { BackgroundFarmAll } from "../../utils/background";


const GetinPage = () => {

  return (
    <BackgroundFarmAll>
      <Nav />
      
      <Getin />
    </BackgroundFarmAll>
  );
};

export default GetinPage;
