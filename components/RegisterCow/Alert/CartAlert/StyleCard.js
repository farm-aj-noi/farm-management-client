import styled from "styled-components";
import { Icon } from "react-icons-kit";
import Link from "next/link";

import { fileText } from "react-icons-kit/fa/fileText";
import { lightBlue, white } from "../../../../utils/colors";

export const DivAlertCard = styled.div`
  position: relative;
  display: block;
  width: 210px;
  height: 125px;
  border-radius: 10px;
  outline: 0;
  margin: auto;
  box-shadow: 0px 0px 2px grey;
  color: ${white};
`;

export const StyleAlertCardDown = styled.div`
  background: aliceblue;
  color: black;
  width: 210px;
  border-radius: 0 0 9px 9px;
  height: 25%;
  padding: 5px 10px;
  color: #0d76ff;
  display: inline-flex;
  cursor: pointer;

  &:hover{
    background:${lightBlue};
    color: ${white};
  }
`;

export const DivAlertCardDown = () => {
  return (
    <Link href="/slaughter/getin">
      <StyleAlertCardDown
    >
      แสดงรายละเอียด
      <div style={{ margin: "-3px 0px 0px auto" }}>
        <Icon size={20} icon={fileText} />
      </div>
    </StyleAlertCardDown>
    </Link>
    
  );
};
