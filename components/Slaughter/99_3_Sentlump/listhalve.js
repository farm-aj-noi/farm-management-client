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

const UPDATE_LUMP = gql`
  mutation UPDATE_LUMP($id: ID!, $sendAt: String!) {
    updateLumpSent(id: $id, sendAt: $sendAt) {
      id
      beeftype {
        nameTH
      }
      barcode
      createdAt
      status {
        id
        code
        nameTH
      }
      sendAt
      weight
      imslaughter {
        grade
      }
    }
  }
`;

const DELETE_LUMP_SENT = gql`
  mutation DELETE_LUMP_SENT($id: ID!) {
    deleteLumpSent(id: $id) {
      id
      beeftype {
        nameTH
      }
      barcode
      createdAt
      status {
        id
        code
        nameTH
      }
      sendAt
      weight
      imslaughter {
        grade
      }
    }
  }
`;

const Imslaughter = ({ imslaughter }) => {
  //calendar
  const dateRef = useRef();
  const [date, setDate] = useState(new Date());
  const [selectedDate, handleDateChange] = useState(
    dayjs(date).format("YYYY-MM-DD")
  );
  // console.log(selectedDate);
  const months = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];

  const dateValueRef = useRef(date);
  dateValueRef.current = date;

  const changeDateToBuddhist = (changeDate = new Date()) => {
    const prevDate = new Date(changeDate);
    // console.log("current date", prevDate === date);
    const newDate = new Date(
      prevDate.setFullYear(prevDate.getFullYear() + 543)
    );
    // console.log("year", newDate.getFullYear());
    dateRef.current.input.value = `${newDate.getDate()} ${
      months[newDate.getMonth()]
    } ${newDate.getFullYear()}`;
  };

  // component did mount
  useEffect(() => {
    // console.log("dateRef", dateRef);
    // change date value in input dom on mounted
    changeDateToBuddhist(date);
    const datePicker = dateRef.current;
    const renderDateInput = datePicker.renderDateInput;
    // console.log(renderDateInput);
    datePicker.renderDateInput = function () {
      const inputDom = renderDateInput();
      return React.cloneElement(inputDom, {
        value: changeDateToBuddhist(dateValueRef.current),
      });
    };
  }, []);

  const onChangeDatePicker = (e) => {
    // console.log("onChange");
    setDate(e);
    handleDateChange(dayjs(e).format("YYYY-MM-DD"));
  };
  //calendar
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lumpData, setlumpData] = useState(imslaughter);

  const [updateLumpSent] = useMutation(UPDATE_LUMP, {
    onCompleted: (data) => {
      // console.log(data.createHalveL)
      setlumpData(data.updateLumpSent);
      setEdit(false);
    },
  });

  const [deleteLumpSent] = useMutation(DELETE_LUMP_SENT, {
    onCompleted: (data) => {
      // console.log(data.createHalveL)
      setlumpData(data.deleteLumpSent);
      setEdit(false);
    },
  });

  const handleSubmitUpdate = async () => {
    setLoading(true);
    // console.log(lumpData)
    await updateLumpSent({
      variables: {
        sendAt: selectedDate,
        id: lumpData.id,
      },
    });
    setEdit(false);
    setLoading(false);
  };

  const handleSubmitdeleteLumpSent = async () => {
    setLoading(true);
    // console.log(lumpData)
    await deleteLumpSent({
      variables: {
        id: lumpData.id,
      },
    });
    setEdit(false);
    setLoading(false);
  };
  return (
    <tr style={{ textAlign: "center" }}>
      <td>{lumpData.barcode}</td>
      <td>{lumpData.beeftype.nameTH}</td>
      <td>{lumpData.weight}</td>
      <td>{lumpData.imslaughter.grade}</td>
      <td>
        {dayjs(lumpData.createdAt)
          .add(543, "y")
          .locale("th")
          .format("DD-MMMM-YYYY")}
      </td>
      <td>
        {lumpData.sendAt && !edit ? (
          <div>
            {dayjs(lumpData.sendAt)
              .add(543, "y")
              .locale("th")
              .format("DD-MMMM-YYYY")}
            <div style={{ display: "none" }}>
              <DatePicker
                className={Datestyle.datepicker}
                selected={date}
                onChange={onChangeDatePicker}
                dateFormat="dd/mm/yyyy"
                ref={dateRef}
                locale="th"
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
              />
            </div>
          </div>
        ) : (
          <DatePicker
            className={Datestyle.datepicker}
            selected={date}
            onChange={onChangeDatePicker}
            dateFormat="dd/mm/yyyy"
            ref={dateRef}
            locale="th"
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
          />
        )}
      </td>

      <td>
        {lumpData.sendAt ? (
          <Icon size={20} icon={check} style={{ color: "green" }} />
        ) : (
          <Icon size={20} icon={close} style={{ color: "red" }} />
        )}
      </td>

      <td>
        {loading ? (
          <Spinner animation="border" variant="primary" />
        ) : !lumpData.sendAt && !edit ? (
          <Savebuttoncolor
            style={{
              backgroundColor: `${
                lumpData.status.id === "5f4468e0f226042dc88ef335" ? "gray" : ""
              }`,
            }}
            disabled={lumpData.status.id === "5f4468e0f226042dc88ef335"}
            onClick={handleSubmitUpdate}
          >
            <Savebutton />
          </Savebuttoncolor>
        ) : lumpData.sendAt && !edit ? (
          <Removebuttoncolor
            style={{
              backgroundColor: `${
                lumpData.status.id === "5f4468e0f226042dc88ef335" ? "gray" : ""
              }`,
            }}
            disabled={lumpData.status.id === "5f4468e0f226042dc88ef335"}
            onClick={handleSubmitdeleteLumpSent}
          >
            <Removebutton />
          </Removebuttoncolor>
        ) : lumpData.sendAt && edit ? (
          <Savebuttoncolor
            style={{
              backgroundColor: `${
                lumpData.status.id === "5f4468e0f226042dc88ef335" ? "gray" : ""
              }`,
            }}
            disabled={lumpData.status.id === "5f4468e0f226042dc88ef335"}
            onClick={handleSubmitUpdate}
          >
            <Savebutton />
          </Savebuttoncolor>
        ) : (
          <div>
            <Savebuttoncolor
              style={{
                backgroundColor: `${
                  lumpData.status.id === "5f4468e0f226042dc88ef335"
                    ? "gray"
                    : ""
                }`,
              }}
              disabled={lumpData.status.id === "5f4468e0f226042dc88ef335"}
              onClick={() => setEdit(true)}
            >
              <Savebutton />
            </Savebuttoncolor>
          </div>
        )}
      </td>
    </tr>
  );
};

export default Imslaughter;
