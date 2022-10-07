import styled from "styled-components";
import { FromDiv } from "../../../utils/from";
import { lightBlue, white } from "../../../utils/colors";

export const DivFrom = styled.div`
  ${FromDiv}
  position: relative;
  display: block;
  width: 1300px;
  height: auto;
`;

export const DivFromTop = styled.div`
  display: flex;
  background: ${lightBlue};
  height: fit-content;
  border-radius: 10px 10px 0 0;
  padding: 0.2rem 15px;
  font-size: 20px;
  color: ${white};
`;

export const DivFromDown = styled.div`
  height: fit-content;
  border-radius: 10px 10px 0 0;
  padding: 25px 15px 15px 15px;
  padding-bottom: 5%;
`;

export const DivAlertCard = styled.div`
  position: relative;
  display: block;
  width: 300px;
  height: 156px;
  border-radius: 10px;
  outline: 0;
  margin: auto;
  box-shadow: 0px 0px 2px grey;
  color: ${white};
`;

export const StyleAlertCardDown = styled.div`
  background: aliceblue;
  color: black;
  width: 300px;
  border-radius: 0 0 9px 9px;
  height: 25%;
  padding: 5px 10px;
  color: #0d76ff;
  display: inline-flex;
  cursor: pointer;

  &:hover {
    background: ${lightBlue};
    color: ${white};
  }
`;

export const StyleEdit = styled.div`
  border-radius: 10px;
  border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  font-size: 20px;
  font-weight: 580;
  textAlign: 'center',
  width: 40px;
  height: 40px;
  padding: 10px 20px;
  background-color: ${({ bg }) => bg || "#FF5722"};
  color: ${({ color }) => color || "#fff"};

&:hover {
  opacity: 0.9;
  transform: scale(0.98);
  background: #e00202;
  color: #fff;
}
`;

export const StyleSave= styled.div`
  border-radius: 10px;
  border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  font-size: 20px;
  font-weight: 580;
  textAlign: 'center',
  width: 40px;
  height: 40px;
  padding: 10px 20px;
  background-color: ${({ bg }) => bg || "#02e036"};
  color: ${({ color }) => color || "#fff"};

&:hover {
  opacity: 0.9;
  transform: scale(0.98);
  background: #05ffb0;
  color: #fff;
}
`;

export const StyleCancle = styled.div`
  border-radius: 10px;
  border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  font-size: 20px;
  font-weight: 580;
  textAlign: 'center',
  width: 40px;
  height: 40px;
  padding: 10px 20px;
  background-color: ${({ bg }) => bg || "#e00202"};
  color: ${({ color }) => color || "#fff"};

&:hover {
  opacity: 0.9;
  transform: scale(0.98);
  background: #FF5722;
  color: #fff;
}
`;



export const DivAlertCardDown = () => {
  return (
    <Link href="/slaughter/getin">
      <StyleAlertCardDown>
        แสดงรายละเอียด
        <div style={{ margin: "-3px 0px 0px auto" }}>
          <Icon size={20} icon={fileText} />
        </div>
      </StyleAlertCardDown>
    </Link>
  );
};
