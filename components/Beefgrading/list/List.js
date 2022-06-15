import React, { useState } from "react";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import Link from "next/link";
import {
  ButtonQrcodeColor,
  ButtonHeaderColor,
  ButtonSearchColor,
  ButtonRecordColor,
  ButtonSubmit,
  ButtonImagecolor,
} from "../Styleclass/Button";

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
      <td>{dayjs(ListGradeData.chill.chilldateStart).format("DD-MM-YYYY")}</td>
      <td>{dayjs(ListGradeData.chill.chilldateEnd).format("DD-MM-YYYY")}</td>
      {ListGradeData &&
        ListGradeData.chill.map((prod) => (
          <td>{prod.chillroom.roomnum ? prod.chillroom.roomnum : "-"}</td>
        ))}

      <td>{ListGradeData.imslaughter.pun}</td>
      <td>
        <Link
          href="grade/[gradeId]"
          as={`grade/${ListGradeData.id}`}
        >
          <ButtonSubmit>รอการตัดเกรด</ButtonSubmit>
        </Link>
      </td>
    </tr>
  );
};

export default ListGrade;
