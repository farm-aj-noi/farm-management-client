import React from "react";
import styled from "styled-components";

import { blue, white } from "../../utils/colors";

const Wrapper = styled.footer`
  display: block;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: ${white};
  background: ${blue};
  box-sizing: border-box;
  position: inherit;
  bottom: 0;
  width: 100%;
  height: 60px;
  line-height: 60px;
  z-index: 0;
  position: relative;
  margin-top: 30px;
`;

const index = () => {
  return <Wrapper>coryright 2020</Wrapper>;
};

export default index;
