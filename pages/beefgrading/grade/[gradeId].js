import React from 'react'
import { BackgroundCow } from "../../../utils/background";

import Grade from "../../../components/Beefgrading/detail/Grade"
import Nav from "../../../components/Beefgrading/Nav/Nav";
import Footer from "../../../components/Beefgrading/Footer";

const GradePage = () => {
  return  (
<div> 
  <Nav />
  <Grade/>
  <Footer />
</div>
  );
}

export default GradePage;
