import React from "react";

import Signin from "../../components/Signin/index";
import Nav from "../../components/Nav/Nav"
import Footer from "../../components/Footer/index"
import { BackgroundFarmAll } from "../../utils/background";


const SigninPage = () => {
  return (
    <BackgroundFarmAll>
        <Nav/>
      <Signin />
      {/* <Footer/> */}
    </BackgroundFarmAll>
  );
};

export default SigninPage;
