import styled from "styled-components";

import { FromDiv } from "../../../utils/from";
import { lightBlue, white, blue, lightGreen, green } from "../../../utils/colors";

export const DivFromRight = styled.div`
  margin: 0 auto auto 10px;
  /* border: 1px solid rgba(0, 0, 0, 0.2); */
  outline: 0;
  /* margin: auto; */
  position: relative;
  display: grid;
  gap: 10px;
  width: 650px;
  height: auto;
`;
export const DivFromInRight = styled.div`
  background-color: #fff;
  /* border: 1px solid rgba(0, 0, 0, 0.2); */
  border-radius: 10px;
  outline: 0;
  /* margin: auto; */
  box-shadow: 0px 0px 2px grey;
  position: relative;
  display: block;
  width: 650px;
  height: auto;
`;

export const DivFromLeft = styled.div`
  margin: 0 0px auto auto;
  background-color: #fff;
  /* border: 1px solid rgba(0, 0, 0, 0.2); */
  border-radius: 10px;
  outline: 0;
  /* margin: auto; */
  box-shadow: 0px 0px 2px grey;
  position: relative;
  display: block;
  width: 300px;
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

export const DivFromInsideLeft = styled.div`
    display: inline-grid;
    grid-template-columns: 1fr 1fr;
`;

export const DivFromInsideRight = styled.div`
    display: inline;
`;

export const WightInputWC1 = styled.input`
  display: inline;
  width: 155px;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  /* border-radius: 0.25rem 0rem 0rem 0.25rem; */
  border-radius: 0.25rem 0rem 0rem 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`;

export const WightInputWC2 = styled.input`
  display: inline;
  width: 45px;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: ${white};
  background-color: ${blue};
  background-clip: padding-box;
  border: 1px solid #ced4da;
  /* border-radius: 0.25rem 0rem 0rem 0.25rem; */
  border-radius: 0rem 0.25rem 0.25rem 0rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`;