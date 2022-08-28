import styled from "styled-components";
import iconchill from "../../../../images/beefwarehouse/Icon18.png"
import Image from "next/image";
import { FromDiv } from "../../../../utils/from";
import {
  lightBlue,
  white,
  blue,
  lightGreen,
  green,
} from "../../../../utils/colors";

export const Iconchill = (prop) => {
  return (
    <Image
      src={iconchill}
      width={prop.weight}
      height={prop.height}
    />
  )
}

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

export const DivFrom = styled.div`
  ${FromDiv}
  position: relative;
  display: block;
  width: 1200px;
  height: auto;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

export const DivFromTop = styled.div`
  display: flex;
  background: ${lightBlue};
  height: fit-content;
  border-radius: 10px 10px 0 0;
  padding: 0.2rem 15px;
  color: ${white};
  font-size:18px;
  font-weight:600;
  letter-spacing: 1px;
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

export const DivFromInsideLeft = styled.div`
  display: inline-grid;
  grid-template-columns: 1fr 1fr;
  @media screen and (max-width:700px) {
    display: grid;
    grid-template-columns: 1fr;
}
@media screen and (max-width:1300px) and (min-width:700px){
  display:grid;
  grid-template-columns: 1fr 1fr;
}
`;

export const Savebutton1 = styled.button`
/*   display: inline-block; */
  width: 70px;
 /*  justify-self: right; */
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

///////////////////////////////////////////////
export const DivContainar = styled.div`
padding-left:100px;
padding-right: 100px;
margin-top: 0;
display: grid;
grid-template-columns: 270px 1fr;
/* grid-gap: 2rem; */
width: 100%;
grid-column-gap: 2rem;

@media screen and (max-width:700px) {
    grid-template-columns: 1fr;
    grid-gap: 2rem; 
    padding-left:30px;
    padding-right: 30px;
    padding-bottom: 130px;
}
@media screen and (max-width:1300px) and (min-width:700px) {
    grid-gap: 2rem; 
    padding-left:30px;
    padding-right: 30px;
    padding-bottom: 130px;
}
`
export const HeaderColor = styled.div`
  text-align: center;
  background: #da4453;
  border: none;
  border-radius: 4px;
  font-size: 30px;
  color: #ffffff;
  font-weight: bold;
  width: fit-content;
  height: fit-content;
  padding:5px 30px;
  letter-spacing: 1px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin-bottom: 30px;
`;
export const DivSearch = styled.div`
display: flex;
justify-content: center;
align-items: center;
gap:10px;

@media screen and (max-width:700px) {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem; 
}
@media screen and (max-width:1300px) and (min-width: 700px){
    display: grid;
    grid-template-columns: 1fr 1fr ;
    grid-gap: 10px; 
}
`
export const DivFromSearch = styled.div`
display:flex;
justify-content: center;

@media screen and  (max-width:1300px){
    display:grid;
    grid-template-columns: 1fr;
}
/* @media screen and (max-width:1200px) and (min-width: 600px){
    display:grid;
    grid-template-columns: 1fr 1fr;
} */
`
export const DivGrid = styled.div`
grid-row-start: 1 ;
grid-column-start: 2 ;
border-radius: 7px;
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
height: fit-content;
@media screen and (max-width:700px) { 
    display:grid;
    grid-template-columns: 1fr;
    grid-row-start: 2 ;
    grid-column-start: 1 ;
    margin:0;   
}
@media screen and (max-width:1300px) and (min-width:700px){
    
    grid-row-start: 1 ;
    grid-column-start: 2 ;
    margin:0;   
}
`

export const DivData = styled.div`
grid-row-start: 2;
grid-column-start: 2;

border-radius: 7px;
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
height: fit-content;

@media screen and (max-width:700px) {
    display:grid;
    grid-template-columns: 1fr;
    grid-row-start: 3 ;
    grid-column-start: 1 ;
    margin:0;
}
@media screen and (max-width:1300px) and (min-width:700px) {
  grid-column-start: 1;
  grid-column-end:3;
}
`
export const SelectType = styled.select`
height: 35px;
width: 120px;
border: 1px solid #AFAFAF;
border-radius: 4px;
text-align: center;
font-size: 16px;
margin-left: 10px;


@media screen and (max-width:1300px) {
    width:100%;
    margin:0px;
}
@media screen and (max-width:1500px) and (min-width:1300px){
  margin-left:0px;}
`

export const Formfilter = styled.form`
font-size: 18px;
`

export const Formfilter1 = styled.form`
font-size: 18px;
@media screen and (min-width:1680px){
display: flex;
justify-content: center;
align-items: center;
}
`

export const FormfilterRoom = styled.form`
display: flex;
justify-content: center;
align-items: center;
font-size: 18px;

@media screen and (max-width:700px) {
display: flex;
justify-content: center;
align-items: center;
}
`
export const Inputfilter = styled.input`
height: 35px;
width: 120px;
border: 1px solid #AFAFAF;
border-radius: 4px;
text-align: center;
font-size: 16px;
margin-left: 10px;


@media screen and (max-width:1300px) {
    width:100%;
    margin:0px;
}
@media screen and (max-width:1500px) and (min-width:1300px){
  margin-left:0px;
}
`

export const InputSubmit = styled.input`
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
  @media screen and (max-width:700px) {
    width:100%;
    margin:0px;
}
`
export const SelectSubmit = styled.select`
display: inline;
height: 35px;
width: 160px;
border: 1px solid #afafaf;
border-radius: 4px;
text-align: center;
font-size: 16px;
@media screen and (max-width:700px) {
  width:100%;
    margin:0px;
}
`

export const SelectRoom = styled.select`
height: 35px;
border: 1px solid #AFAFAF;
width: 60px;
border-radius: 4px;
text-align: center;
font-size: 16px;
margin-left: 10px;

@media screen and (max-width:1300px) {
    width:33%;
    margin:0px;
}
@media screen and (max-width:1500px) and (min-width:1300px){
  margin:0px;
}
`

export const FormSubmit = styled.div`
display: grid;
grid-template-rows: 1fr 15px;
`

export const DivSubmit = styled.div`
@media screen and (max-width:1300px) {
    width:33%;
    margin:0px;
}
`