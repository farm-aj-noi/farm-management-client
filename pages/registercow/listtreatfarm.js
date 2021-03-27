import React, { useState } from "react";
import { BackgroundCow } from "../../utils/background";

import Nav from "../../components/RegisterCow/Nav/Nav";
import Form from "../../components/RegisterCow/5-5listtreatfarm/index"
const ListtreatPage = () => {

  return (
    <BackgroundCow>
      <Nav />
    <div>
      <Form/>
    </div>
    </BackgroundCow>
  );
};

export default ListtreatPage;
