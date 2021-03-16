import React, { useState } from "react";

import Nav from "../../../components/RegisterCow/Nav/Nav";
import Form from "../../../components/RegisterCow/8-setcow/2_dise"
import { BackgroundCow } from "../../../utils/background";

const ListregisPage = () => {

  return (
    <BackgroundCow>
      <Nav />
    <div>
      <Form/>
    </div>
    </BackgroundCow>
  );
};

export default ListregisPage;
