import React from "react";
import { BackgroundCow } from "../../../utils/background";

import Product from "../../../components/RegisterCow/4_treat/detail/Product";
import Nav from "../../../components/RegisterCow/Nav/Nav";

const DetailId = () => {
  return (
    <BackgroundCow>
      <Nav />
      <div>
        <Product />
      </div>
    </BackgroundCow>
  );
};

export default DetailId;
