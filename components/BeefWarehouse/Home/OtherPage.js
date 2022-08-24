import styled from "styled-components";

export const ButtonStore = styled.button`
  height: 120px;
  width: 600px;
  border-radius: 100px;
  color: white;
  border: none;
  font-size: 48px;
  background-color: #c90d0d;
  margin-right: 50px;
  font-weight: bold;
  
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  &:hover,
  &:focus {
    background: #a00b0b;
    text-shadow: 2px 2px black;
  }
`;

export const ButtonProduct = styled.button`
  height: 120px;
  width: 600px;
  border-radius: 100px;
  color: white;
  border: none;
  font-size: 48px;
  font-weight: bold;
  background-color: #5cc2b1;

  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  &:hover,
  &:focus {
    background: #11ac92;
    text-shadow: 2px 2px black;
  }
`;

