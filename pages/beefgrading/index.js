import React from "react";
import Home from "../../components/Beefgrading/Home/Home";
import { BackgroundGrade } from "../../utils/background";
import Nav from "../../components/Beefgrading/Nav/Nav"
const index = () => {
  return (
    <BackgroundGrade>
        <Nav/>
      <Home/>
    </BackgroundGrade>
  );
};

export default index;
