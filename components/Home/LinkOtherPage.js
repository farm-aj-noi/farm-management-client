import styled from "styled-components";
import { lightBlue, white } from "../../utils/colors";

export const LinkSt = styled.div`
  display: inline-grid;
  color: ${white};
  padding: 40px 20px 40px 20px;
  cursor: pointer;

  &:hover,
  &:focus {
    background: ${lightBlue};
  }
`;
