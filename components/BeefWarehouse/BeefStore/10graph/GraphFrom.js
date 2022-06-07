import styled from "styled-components";

import { FromDiv } from "../../../../utils/from";
import { lightBlue, white, blue } from "../../../../utils/colors";

export const ButtonSummit1 = styled.button`
  text-align: center;
  background: #87bf4b;
  border: none;
  border-radius: 4px;
  color: #ffffff;
  &:hover,
  &:focus {
    background: #719f3f;
  }
`;

export const ButtonSubmit = styled.button`
  height: 35px;
  text-align: center;
  background: #48cfad;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-size: 18px;
  &:hover,
  &:focus {
    background: #16ac86;
  }
`;
export const HeaderColor = styled.div`
  text-align: center;
  background: #da4453;
  border: none;
  border-radius: 4px;
  font-size: 30px;
  color: #ffffff;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DivFrom = styled.div`
  ${FromDiv}
  position: relative;
  display: block;
  width: 1200px;
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
`;

export const Searchinput = styled.input`
  display: inline;
  width: 160px;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  /* border-radius: 0.25rem 0rem 0rem 0.25rem; */
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  margin-right: 10px;
`;

export const Searchbutton = styled.button`
  display: inline-block;
  font-weight: 400;
  color: ${white};
  background-color: ${blue};
  text-align: center;
  vertical-align: middle;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0rem 0.25rem 0.25rem 0rem;
`;

export const Wightinput = styled.input`
  display: inline;
  width: 85px;
  height: 28px;
  padding: 2px 0.375rem;
  font-size: 1rem;
  font-weight: 400;
  text-align: center;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  /* border-radius: 0.25rem 0rem 0rem 0.25rem; */
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  -webkit-appearance: none;
  margin: 0;
  -moz-appearance: textfield;
`;

export const ButtonPDF = styled.button`
  margin: 10px;
  height: 35px;
  width: 140px;
  text-align: center;
  background: #e26e28;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-size: 18px;
  text-align: center;
  &:hover,
  &:focus {
    background: #cf560d;
  }
`;

export const ButtonExcel = styled.button`
  margin: 10px;
  height: 35px;
  width: 140px;
  text-align: center;
  background: #86be4c;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-size: 18px;
  text-align: center;
  &:hover,
  &:focus {
    background: #719f3f;
  }
`;
