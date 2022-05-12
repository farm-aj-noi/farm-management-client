import styled from "styled-components";
import { FromDiv } from "../../../utils/from";
import { lightBlue, white } from "../../../utils/colors";

export const DivAlertCard = styled.div`
  position: relative;
  display: block;
  width: 330px;
  height: 156px;
  border-radius: 5px;
  outline: 0;
  margin: auto;
  box-shadow: 0px 0px 2px grey;
  color: #ffffff;
`;
import styled from "styled-components";

export const DivFrom = styled.div`
  ${FromDiv}
  position: relative;
  display: block;
  width: 730px;
  height: auto;
`;

export const DivFromTop = styled.div`
  display: flex;
  background: ${lightBlue};
  height: fit-content;
  border-radius: 10px 10px 0 0;
  padding: 0.2rem 15px;
  color: ${white};
`;

export const DivFromDown = styled.div`
  height: fit-content;
  border-radius: 10px 10px 0 0;
  padding: 25px 15px 15px 15px;
  padding-bottom: 5%;
`;
