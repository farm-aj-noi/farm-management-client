import React from 'react'
import { BackgroundCow } from "../../../utils/background";

import Grade from "../../../components/Beefgrading/detail/Grade"
import Nav from "../../../components/Beefgrading/Nav/Nav";

const GradePage = () => {
  return  (
<div> 
  <Nav />
  <Grade/>
</div>
  );
}

export default GradePage;
