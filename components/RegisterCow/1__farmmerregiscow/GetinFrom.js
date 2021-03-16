import styled from "styled-components";

import { FromDiv } from "../../../utils/from";
import { lightBlue, white, blue,lightGreen,green } from "../../../utils/colors";

export const DivFrom = styled.div`
  ${FromDiv}
  position: relative;
  display: block;
`;
export const DivFrom1 = styled.div`
  ${FromDiv}
  position: relative;
  display: block;
  width: 950px;
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

export const Searchinput = styled.input`
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
export const Divimg = styled.div`
  ${FromDiv}
  width: 250px;
  height: 100%;
  objectFit:"scale-down"`;
export const Uploads = styled.button`

height: 200px;
width:240px;
overflow: hidden;
margin: 0 auto;
background: #f5f5f5c4;
border: 1px solid #80808014;
  `;
  export const IMG = styled.image`
  object-fit: cover;
    max-width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
  -webkit-appearance: none;
  margin: 0;
  -moz-appearance: textfield;
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