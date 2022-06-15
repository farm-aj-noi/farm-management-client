import React from 'react'
import { BackgroundCow } from "../../utils/background";

import Product from "../../components/RegisterCow/1_regis/detail/Product"
import Nav from "../../components/RegisterCow/Nav/Nav";

const ProductId = () => {
  return  <BackgroundCow>
  <Nav />
<div>
  <Product/>
</div>
</BackgroundCow>
}

export default ProductId;
