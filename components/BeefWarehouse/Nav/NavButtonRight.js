import styled from "styled-components";
import { lightBlue, white, blue } from "../../../utils/colors";
import { navbarHeight } from "../../../utils/sizes";

export const NavButtonSignup = styled.button`
  background: ${blue};
  color:${white};
  cursor: pointer;
  flex: 0 0 auto;
  height: ${navbarHeight}px ;
  border: 0cm;
  text-align: center;
  vertical-align: middle;

  &:hover,
  &:focus{
    background: ${lightBlue};
  }
`;

export const NavButtonSigin = styled.button`
  background: ${lightBlue};
  color:${white};
  cursor: pointer;
  flex: 0 0 auto;
  height: ${navbarHeight}px ;
  border: 0cm;
  text-align: center;
  vertical-align: middle;
  padding: 0px 10px;

  &:hover,
  &:focus{
    color:${blue};
    opacity: 2;
  }
`;

export const NavButtonSigninComplete = styled.button`
background: ${blue};
color: ${white};
text-align: left;
cursor: pointer;
flex: 0 0 auto;
height: ${navbarHeight}px;
border: 0cm;
/* text-align: center; */
vertical-align: middle;
padding: 0px 10px;
border-radius:5px;
&:hover,
&:focus {
  background: ${lightBlue};
}
`;



