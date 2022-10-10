import styled from "styled-components";

import { FromDiv } from "../../../../utils/from";
import { lightBlue, white, blue } from "../../../../utils/colors";

export const DivFrom = styled.div`
  ${FromDiv}
  position: relative;
  display: block;
  height: auto;
  box-shadow: 0px 0px 4px grey;
  
 /*  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); */
`;

export const DivFromTop = styled.div`
  display: flex;
  background: ${lightBlue};
  height: fit-content;
  border-radius: 10px 10px 0 0;
  padding: 0.2rem 15px;
  color: ${white};
  font-size: 18px;
  font-weight: 600;
  letter-spacing:1px;
`;

export const DivFromDown = styled.div`
  height: fit-content;
  border-radius: 10px 10px 0 0;
  padding: 25px 15px 15px 15px;
 
`;

export const Searchinput = styled.input`
  display: inline;
  width: 200px;
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
`;

export const Gobutton = styled.button`
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
  border-radius: 0.25rem;
  margin: -5px 0px 0px 0px;

  &:hover{
    background-color: ${blue};
  }
`;

export const Wightinput = styled.input`
  display: inline;
  width: 85px;
  padding: 2px 0.375rem;
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
`;

export const DivBase1 = styled.div`
  display: block;
  position: absolute;
  width: 100%;
  padding-top: 30px;
  padding-bottom: 130px;
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
  /* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); */
`;
//////////////////////////////////////////
export const DivContainer = styled.div`
background-color: red;
margin-top: 30px;
padding-bottom: 30px;
display:grid;
grid-template-columns: 300px 1fr 300px;

@media screen  and (max-width:700px) {
  grid-template-columns: 30px 1fr 30px;
}
@media screen and (min-width:701px )and (max-width:1600px) {
  grid-template-columns: 100px 1fr 100px;
}
`;

export const DivItem = styled.div`
grid-column-start:2;
`
export const DivList = styled.div`
display:grid;
grid-gap: 1rem;
grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
@media screen  and (max-width:700px) {
  grid-template-columns: 1fr;
}
@media screen and (min-width:701px )and (max-width:1600px) {
  grid-template-columns: 1fr 1fr 1fr;
}
`