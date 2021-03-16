import React from "react";

import Nav from "../../../components/Slaughter/Nav/Nav";
import ListCuttwo from "../../../components/Slaughter/99_Report/3_Entrail";
import Bad from '../../../components/Slaughter/09_cuttwo/top/box-alert-date'
import { BackgroundFarmAll } from "../../../utils/background";

const GetinPage = () => {

  return (
    <BackgroundFarmAll>
      <Nav />
      <ListCuttwo />
    </BackgroundFarmAll>
  );
};

export default GetinPage;
