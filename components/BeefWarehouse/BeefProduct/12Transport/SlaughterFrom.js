import styled from "styled-components";

import { FromDiv } from "../../../../utils/from";
import { lightBlue, white, blue, lightGreen, green } from "../../../../utils/colors";

export const DivFrom = styled.div`
  ${FromDiv}
  position: relative;
  display: block;
  width: 950px;
  height: auto;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

export const DivFromTop = styled.div`
  display: flex;
  background: ${lightBlue};
  height: fit-content;
  border-radius: 10px 10px 0 0;
  padding: 0.2rem 15px;
  font-size: 18px;
  font-weight: 600;
  letter-spacing:1px;
  color: ${white};
`;

export const DivFromDown = styled.div`
  height: fit-content;
  border-radius: 10px 10px 0 0;
  padding: 15px 15px 15px 15px;
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
  margin-right:10px
`;

export const Searchbutton = styled.button`
  display: inline;
  width: 170px;
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
`;


export const Gobutton = styled.button`
  display: inline-block;
  font-weight: 400;
  color: ${white};
  background-color: ${lightGreen};
  text-align: center;
  vertical-align: middle;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  /* padding: 0.375rem 0.75rem; */
  font-size: 20px;
  line-height: 1.5;
  border-radius: 0.25rem;

  &:hover {
    background-color: ${green};
  }
`;

export const Gobutton1 = styled.button`
  display: inline-block;
  font-weight: 400;
  color: ${white};
  background-color: ${lightBlue};
  text-align: center;
  vertical-align: middle;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.2rem;
  margin: -5px 0px 0px 0px;

  &:hover{
    background-color: ${blue};
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
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;