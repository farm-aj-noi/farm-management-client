import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {
  Savebuttoncolor,
  Editbuttoncolor,
  Removebuttoncolor,
} from "../../../utils/buttonColor";
import { Savebutton, Editbutton, Removebutton } from "../../../utils/button";
import { Spinner } from "react-bootstrap";

import { Icon } from "react-icons-kit";
import { check } from "react-icons-kit/fa/check";
import { close } from "react-icons-kit/fa/close";

import dayjs from "dayjs";
import Pickadate from "pickadate/builds/react-dom";
import TH from "pickadate/builds/translations/th_TH";

// import LoadingPage from "../../../helps/LoadingPage";

const Imslaughter = ({ imslaughter }) => {
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  // console.log(edit);
  const [halveData, sethalveData] = useState(imslaughter);
  return (
    <tr style={{ textAlign: "center" }}>
      <td>{halveData.barcode}</td>
      <td>{halveData.beeftype.nameTH}</td>
      <td>{halveData.weightwarm}</td>
      <td>{halveData.imslaughter.grade}</td>
      <td>
        {dayjs(halveData.createdAt)
          .add(543, "y")
          .locale("th")
          .format("DD-MMMM-YYYY")}
      </td>
      <td>
        {dayjs(halveData.sendAt)
          .add(543, "y")
          .locale("th")
          .format("DD-MMMM-YYYY")}
      </td>
      <td>
        {halveData.status.code === "b2" ? (
          <Icon size={20} icon={check} style={{ color: "green" }} />
        ) : (
          <Icon size={20} icon={close} style={{ color: "red" }} />
        )}
      </td>
    </tr>
  );
};

export default Imslaughter;
