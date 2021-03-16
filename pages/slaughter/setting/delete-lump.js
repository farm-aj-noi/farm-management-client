import React from "react";

import Nav from "../../../components/Slaughter/Nav/Nav";
import Setting from "../../../components/Slaughter/99_Setting/8_Delete";
import { BackgroundFarmAll } from "../../../utils/background";

const GetinPage = () => {
  return (
    <BackgroundFarmAll>
      <Nav />
      <Setting />
    </BackgroundFarmAll>
  );
};

export default GetinPage;
