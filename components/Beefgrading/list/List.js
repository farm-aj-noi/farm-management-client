import React, { useState } from "react";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import Link from "next/link";
import { ButtonSubmit } from "../Styleclass/Button";

const ListGrade = ({ ListGrade }) => {
  const router = useRouter();
  const [prod, setProd] = useState(ListGrade);
  const [ListGradeData, SetListGradeData] = useState(ListGrade);
  console.log(ListGradeData.chill.chilldateStart);
  return (
    <tr style={{ textAlign: "center" }}>
      <td>{ListGradeData.beeftype.code}</td>
      <td>{ListGradeData.barcode}</td>
      <td>{ListGradeData.weightwarm}</td>
      <td>{ListGradeData.weightcool ? ListGradeData.weightcool : "-"}</td>
      <td>{dayjs(ListGradeData.chill[0].chilldateStart).format("DD-MM-YYYY")}</td>
      <td>{dayjs(ListGradeData.chill[0].chilldateEnd).format("DD-MM-YYYY")}</td>
      {ListGradeData && ListGradeData.chill.map((prod) => (
      <td>
      {ListGradeData.chill[0].chillroom.roomnum
        ? ListGradeData.chill[0].chillroom.roomnum
        : "-"}
      </td>
      ))} 
      <td>{ListGradeData.imslaughter.pun}</td>
      <td>รอตัดเกรด</td>
      <td>
        <Link href="grade/[gradeId]" as={`grade/${ListGradeData.id}`}>
          <ButtonSubmit>ตัดเกรด</ButtonSubmit>
        </Link>
      </td>
    </tr>
  );
};

export default ListGrade;
