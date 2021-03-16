import styled from "styled-components";

import { lightYellow, white, yellow, lightGreen, green,red,lightRed } from "./colors";

export const Savebuttoncolor = styled.button`
  display: inline-block;
  color: ${white};
  background: ${lightGreen};
  user-select: none;
  border: 1px solid transparent;
  border-radius: 0.25rem;

  &:hover,
  &:focus{
    background: ${green};
  }
`;

export const Editbuttoncolor = styled.button`
  display: inline-block;
  color: ${white};
  background: ${lightYellow};
  user-select: none;
  border: 1px solid transparent;
  border-radius: 0.25rem;

  &:hover,
  &:focus{
    background: ${yellow};
  }
`;

export const Removebuttoncolor = styled.button`
  display: inline-block;
  color: ${white};
  background: ${lightRed};
  user-select: none;
  border: 1px solid transparent;
  border-radius: 0.25rem;

  &:hover,
  &:focus{
    background: ${red};
  }
`;

export const Barcodebuttoncolor = styled.button`
  display: inline-block;
  color: ${white};
  background: #ff14bc;
  user-select: none;
  border: 1px solid transparent;
  border-radius: 0.25rem;

  &:hover,
  &:focus{
    background: #881166;
  }
`;