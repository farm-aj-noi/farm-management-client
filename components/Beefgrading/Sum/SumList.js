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

const ListSum = ({ ListSum }) => {
  const router = useRouter();
  const [prod, setProd] = useState(ListSum);
  const [ListSumData, SetListSumData] = useState(ListSum);
  
  return (
    <tr style={{ textAlign: "center" }}>
      <td>{ListSumData.beeftype.code}</td>
      <td>{ListSumData.barcode}</td>
      <td>{ListSumData.weightwarm}</td>
      <td>{ListSumData.weightcool ? ListSumData.weightcool : "-"}</td>
      <td>{dayjs(ListSumData.chill.chilldateStart).format("DD-MM-YYYY")}</td>
      <td>{dayjs(ListSumData.chill.chilldateEnd).format("DD-MM-YYYY")}</td>
      {ListSumData &&
        ListSumData.chill.map((prod) => (
          <td>{prod.chillroom.roomnum ? prod.chillroom.roomnum : "-"}</td>
        ))}
      <td>{ListSumData.imslaughter.pun}</td>
      <td>{ListSumData.gradecom ? ListSumData.gradecom : "-"}</td>
      <td>{ListSumData.gradehuman ? ListSumData.gradehuman : "-"}</td>
      <td>{ListSumData.grading ? ListSumData.grading : "-"}</td>
      <td>
        <Link
          href="summarize/[sumId]"
          as={`summarize/${ListSumData.id}`}
        >
          <ButtonSubmit>สรุปเกรด</ButtonSubmit>
        </Link>
      </td>
    </tr>
  );
};

export default ListSum;
