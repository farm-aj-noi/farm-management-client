import React, { useState } from "react";
import dayjs from "dayjs";

import Nav from "../../components/Slaughter/Nav/Nav";
import Getin from "../../components/Slaughter/97_transport/index";
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
