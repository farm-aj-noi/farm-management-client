import React, { useContext, useState, useRef, useEffect } from "react";
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

import { Wightinput } from "./SlaughterFrom";
// import LoadingPage from "../../../helps/LoadingPage";
import dayjs from "dayjs";
import DatePicker, { registerLocale } from "react-datepicker";
import th from "date-fns/locale/th";
registerLocale("th", th);
import Datestyle from "../helps/datepicker.module.css";
import { QUERY } from "./index";

const UPDATE = gql`
  mutation UPDATE($id: ID!, $statuscow: String!) {
    updateTstatus(id: $id, statuscow: $statuscow) {
      id
      numcow
      numkun
      pun
      numfarmer
      namecow
      datet
      statuscow
    }
  }
`;

const Imslaughter = ({ imslaughter }) => {
  //calendar
  const dateRef = useRef();
  const [date, setDate] = useState(new Date());

  const days_between = (date1) => {

    dayjs(date1).format("YYYY-MM-DD");

    // The number of milliseconds in one day
    const ONE_DAY = 1000 * 60 * 60 * 24;
    var date2 = new Date().toISOString()
    var date3 = dayjs(date2).format("YYYY-MM-DD");
    var dt1 = new Date(date1);
    var dt2 = new Date(date2);
    return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));
  }
  // component did mount
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [prod, sethalveData] = useState(imslaughter);

  // console.log(halveData)

  const [updateTstatus] = useMutation(UPDATE, {
    onCompleted: (data) => {
      // console.log(data.createHalveL)
      sethalveData(data.updateTstatus);
      setEdit(false);
    },
    refetchQueries: [
      {
        query: QUERY,
      },
    ],
  });

  const handleSubmitUpdate = async () => {
    setLoading(true);
    // console.log(halveData)
    await updateTstatus({
      variables: {
        statuscow: "กำลังขุน",
        id: prod.id,
      },
    });
    setEdit(false);
    setLoading(false);
  };

  return (
    <tr style={{ textAlign: "center" }}>

              <td> {prod.numkun} </td>
                <td> {prod.numcow}</td>
                <td>{prod.namecow}</td>
                <td> {prod.pun} </td>
                <td>{
                days_between(prod.datet.substring(0,10))
                  } วัน</td>
                <td> {prod.numfarmer} </td>
      <td>
        <div>
          <Savebuttoncolor onClick={handleSubmitUpdate}>
            <Savebutton />
          </Savebuttoncolor>
        </div>

      </td>
    </tr>
  );
};

export default Imslaughter;
