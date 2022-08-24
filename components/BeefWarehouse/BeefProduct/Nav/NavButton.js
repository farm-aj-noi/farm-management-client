import styled, { css } from "styled-components";

import { lightBlue, white, blue } from "../../../../utils/colors";
import { navbarHeight } from "../../../../utils/sizes";

export const NavButtonSigninComplete = styled.button`
  background: ${blue};
  color: ${white};
  text-align: left;
  cursor: pointer;
  flex: 0 0 auto;
  height: ${navbarHeight}px;
  border: 0cm;
  border-radius:5px;
  /* text-align: center; */
  vertical-align: middle;
  padding: 0px 10px;

  &:hover,
  &:focus {
    background: ${lightBlue};
  }
`;

export const NavButtonLeft = styled.button`
  text-transform: none;
  border: none;
  text-align: left;
  background: ${blue};
  position: relative;
  vertical-align: middle;
  color: ${white};
  height: ${navbarHeight}px;
  font-size: 16px;
  font-weight:600;
  border-radius:5px;
  letter-spacing: 1px;
  &:hover,
  &:active {
    background-color: ${lightBlue};
  }
`;

export const NavDropdownItem = styled.a`
  display: block;
  width: 100%;
  padding: 0.25rem 1.5rem;
  padding-top: 10px;
    padding-bottom: 10px;
  clear: both;
  font-weight:600;
  border-radius:5px;
  letter-spacing: 1px;
  color: ${white};
  text-align: inherit;
  white-space: nowrap;
  background-color: ${blue};
  border: 0;
  cursor: pointer;

  &:hover {
    background-color: ${lightBlue};
    color: ${white};
    text-decoration:none
  }
`;