import React from "react";
import Home from "../../components/Beefgrading/Home/Home";
import { BackgroundGrade } from "../../utils/background";
import Nav from "../../components/Beefgrading/Nav/Nav";
import Footer from "../../components/beefgrading/Footer";
const index = () => {
  return (
    <BackgroundGrade>
        <Nav/>
      <Home/>
     {/*  <Footer /> */}
    </BackgroundGrade>
  );
};

export default index;
