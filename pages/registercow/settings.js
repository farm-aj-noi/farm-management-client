import React, { useState } from "react";
import { BackgroundCow } from "../../utils/background";

import Nav from "../../components/RegisterCow/Nav/Nav"
import Form from "../../components/RegisterCow/8-setcow/1_medi"

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
