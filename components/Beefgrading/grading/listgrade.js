import React, { useState } from "react";
import dayjs from "dayjs";
import Link from "next/link";
import {
  ButtonQrcodeColor,
  ButtonHeaderColor,
  ButtonSearchColor,
  ButtonRecordColor,
  ButtonSubmit,
  ButtonImagecolor
} from "../Styleclass/Button";

const ListGrade = ({ ListGrade }) => {
  const [ListGradeData, SetListGradeData] = useState (ListGrade);
  console.log (ListGradeData)
  return (
    <tr style={{ textAlign: "center" }}>
       <td>{ListGradeData.beeftype.code}</td>
      <td>{ListGradeData.barcode}</td>
      <td>{ListGradeData.weightwarm}</td>
      <td>{ListGradeData.weightcool}</td>
      <td>{ListGradeData.chill.chilldateStart}</td>
      <td>{ListGradeData.chill.chilldateEnd}</td>
      <td>{ListGradeData.chill.chillroom}</td>
      <td>{ListGradeData.imslaughter.pun}</td> 
    </tr>
  );
};

export default ListGrade;
