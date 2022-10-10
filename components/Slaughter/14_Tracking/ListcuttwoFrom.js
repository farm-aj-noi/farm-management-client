import styled from "styled-components";

import { FromDiv } from "../../../utils/from";
import { lightBlue, white, blue } from "../../../utils/colors";

export const DivFrom = styled.div`
  ${FromDiv}
  position: relative;
  display: block;
  /* width: 960px; */
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
  border-radius: 0px 0px 10px 10px;
  padding: 15px 15px 15px 15px;
  background-color:white;
  display:grid;
  grid-template-columns: 1fr;
  width:100%;
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

export const DivContainar = styled.div`
padding-left:300px;
padding-right: 300px;
margin-top: 100px;
display: grid;
grid-template-columns: 200px 1fr;
/* grid-gap: 2rem; */
width: 100%;
grid-column-gap: 2rem;

@media screen and (max-width:1300px) {
    grid-template-columns: 1fr;
    grid-gap: 2rem; 
    padding-left:30px;
    padding-right: 30px;
    padding-bottom: 130px;
}
`
export const DivItem = styled.div`
grid-column-start: 2;
width: 100%;
margin-top: 60px;
@media screen and (max-width:1300px) {
  grid-column-start: 1;
  margin-top: 0;
}
`

export const DivList = styled.div`
display: grid;
grid-gap:1rem;
grid-template-columns: 1fr 1fr 1fr 1fr;
@media screen and (max-width:800px) {
  grid-template-columns: 1fr;
}
`

