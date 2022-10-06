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

const ListHistory = ({ ListHistory }) => {
  const router = useRouter();
  const [prod, setProd] = useState(ListHistory);
  const [ListHistoryData, SetListHistoryData] = useState(ListHistory);
  console.log(ListHistoryData);
  return (
    <tr style={{ textAlign: "center" }}>
      <td>{ListHistoryData.beeftype.code}</td>
      <td>{ListHistoryData.barcode}</td>
      <td>{ListHistoryData.weightwarm}</td>
      <td>{ListHistoryData.weightcool ? ListHistoryData.weightcool : "-"}</td>
      <td>
        {dayjs(ListHistoryData.chill.chilldateStart).format("DD-MM-YYYY")}
      </td>
      <td>{dayjs(ListHistoryData.chill.chilldateEnd).format("DD-MM-YYYY")}</td>
      {ListHistoryData &&
        ListHistoryData.chill.map((prod) => (
          <td>
            {ListHistoryData.chill[0].chillroom.roomnum
              ? ListHistoryData.chill[0].chillroom.roomnum
              : "-"}
          </td>
        ))}
      <td>{ListHistoryData.imslaughter.pun}</td>
      {ListHistoryData &&
        ListHistoryData.grade.map((prod) => (
          <td>{prod.SystemGrade ? prod.SystemGrade : "-"}</td>
        ))}
       {ListHistoryData &&
        ListHistoryData.grade.map((prod) => (
          <td>{prod.ExpertGrade ? prod.ExpertGrade : "-"}</td>
        ))}
        <td>สรุปเกรดเสร็จสิ้น</td>
        <td>
        <Link href="grade/[gradeId]" as={`grade/${ListHistoryData.id}`}>
          <ButtonSubmit>ออกรายงาน</ButtonSubmit>
        </Link>
        </td>
        <td>
        <Link href="grade/[gradeId]" as={`grade/${ListHistoryData.id}`}>
          <ButtonSubmit>รายระเอียด</ButtonSubmit>
        </Link>
        </td>
    </tr>
  );
};

export default ListHistory;
