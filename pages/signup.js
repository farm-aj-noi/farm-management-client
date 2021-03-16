import React from "react";

import Signup from "../components/Signup";
import Nav from "../components/Nav/Nav";
import Footer from "../components/Footer/index"
import { BackgroundFarmAll } from "../utils/background";

const SignupPage = () => {
  return (
    <BackgroundFarmAll>
      <Nav />
      <Signup />
      {/* <Footer/> */}
    </BackgroundFarmAll>
  );
};

export default SignupPage;
