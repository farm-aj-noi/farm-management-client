import styled from "styled-components";
import { FromDiv } from "../../../../utils/from";
import { lightBlue, white } from "../../../../utils/colors";

export const DivFrom = styled.div`
  ${FromDiv}
  position: relative;
  display: block;
  width: 1300px;
  height: auto;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

export const DivFromTop = styled.div`
  display: flex;
  background: ${lightBlue};
  height: fit-content;
  border-radius: 10px 10px 0 0;
  padding: 0.2rem 15px;
  color: ${white};
  font-weight:600;
  letter-spacing: 1px;
  font-size: 20px;
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
  font-size:16px;
  &:hover {
    background: #d1d7dd;
    color: ${white};
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
//////////////////////////////////////////////////////
export const DivContainar = styled.div`
padding-left:300px;
padding-right: 300px;
margin-top: 0;
display: grid;
/* grid-template-rows: 125px; */
grid-template-columns: 1fr;
/* grid-gap: 2rem; */
width: 100%;
grid-column-gap: 2rem;

@media screen and (max-width:700px) {
  grid-template-columns: 1fr;
  grid-gap: 2rem; 
  padding-left:30px;
  padding-right: 30px;
  padding-bottom: 130px;
}
@media screen and (max-width:1300px) and (min-width:700px) {
  grid-gap: 2rem; 
  padding-left:30px;
  padding-right: 30px;
  padding-bottom: 130px;
}
@media screen and (min-width:1300px) {
grid-template-rows: 17%;
}
`

export const DivDashBoard = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 20px;
`