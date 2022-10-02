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
    background: ${lightBlue};
  }
`;


export const NavDropdownItem = styled.a`
  display: block;
  width: 100%;
  padding: 0.25rem 1.5rem;
  padding-top: 10px;
  padding-bottom: 10px;
  clear: both;
  color: ${white};
  text-align: inherit;
  white-space: nowrap;
  background-color: ${blue};
  border: 0;
  cursor: pointer;
  font-size: 20px;

  &:hover {
    background-color: ${lightBlue};
    color: ${white};
    text-decoration:none
  }
`;
