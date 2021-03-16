import styled from "styled-components";
import { lightBlue, white } from "../../utils/colors";

export const LinkSt = styled.div`
  display: inline-grid;
  color: ${white};
  padding: 10px;
  cursor: pointer;

  &:hover,
  &:focus {
    background: ${lightBlue};
  }
`;
