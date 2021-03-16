import React, { useState } from "react";

import Nav from "../../components/RegisterCow/Nav/Nav";
import Form from "../../components/RegisterCow/1__farmmerregiscow/index"
import { BackgroundCow } from "../../utils/background";

const RegisPage = () => {

  return (
    <BackgroundCow>
      <Nav />
    <div>
      <Form/>
    </div>
    </BackgroundCow>
  );
};

export default RegisPage;
