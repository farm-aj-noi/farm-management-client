import React from "react";

import Nav from "../../../components/RegisterCow/Nav/Nav";
import ListCuttwo from "../../../components/RegisterCow/99_Report/6_cowagelist";
import Bad from '../../../components/Slaughter/09_cuttwo/top/box-alert-date'
import { BackgroundFarmAll } from "../../../utils/background";
import { BackgroundCow } from "../../../utils/background";

const GetinPage = () => {

  return (
    <BackgroundCow>
      <Nav />
      <ListCuttwo />
    </BackgroundCow>
  );
};

export default GetinPage;
