import styled from 'styled-components';
import {lightRed,blue} from '../../utils/colors'

export const LeftText = styled.div`
  text-align:start;
`;

export const ForgetPassword = styled.span`
  color:${lightRed};

  &:hover{
    text-decoration:underline
  }
`;

export const Register = styled.span`
  color:${blue};

  &:hover{
    text-decoration:underline
  }
`;