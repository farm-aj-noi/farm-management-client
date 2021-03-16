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

import { QUERY_LISTST } from "../99_0_Grade/index";

const UPDATE_HALVE = gql`
  mutation UPDATE_HALVE($id: ID!, $sendAt: String!) {
    updateHalve(id: $id, sendAt: $sendAt) {
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
      weightwarm
      weightcool
      imslaughter {
        grade
      }
    }
  }
`;

const DELETE_HALVE_SENT = gql`
  mutation DELETE_HALVE_SENT($id: ID!) {
    deleteHalveSent(id: $id) {
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
      weightwarm
      weightcool
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
  const [halveData, sethalveData] = useState(imslaughter);

  const [updateHalve] = useMutation(UPDATE_HALVE, {
    onCompleted: (data) => {
      // console.log(data.createHalveL)
      sethalveData(data.updateHalve);
      setEdit(false);
    },
    refetchQueries: [{ query: QUERY_LISTST }],
  });

  const [deleteHalveSent] = useMutation(DELETE_HALVE_SENT, {
    onCompleted: (data) => {
      // console.log(data.createHalveL)
      sethalveData(data.deleteHalveSent);
      setEdit(false);
    },
    refetchQueries: [{ query: QUERY_LISTST }],
  });

  const handleSubmitUpdate = async () => {
    setLoading(true);
    // console.log(halveData)
    await updateHalve({
      variables: {
        sendAt: selectedDate,
        id: halveData.id,
      },
    });
    setEdit(false);
    setLoading(false);
  };

  const handleSubmitDeleteHalveSent = async () => {
    setLoading(true);
    // console.log(halveData)
    await deleteHalveSent({
      variables: {
        id: halveData.id,
      },
    });
    setEdit(false);
    setLoading(false);
  };
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
        {halveData.sendAt && !edit ? (
          <div>
            {dayjs(halveData.sendAt)
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
        {halveData.sendAt ? (
          <Icon size={20} icon={check} style={{ color: "green" }} />
        ) : (
          <Icon size={20} icon={close} style={{ color: "red" }} />
        )}
      </td>

      <td>
        {loading ? (
          <Spinner animation="border" variant="primary" />
        ) : !halveData.sendAt && !edit ? (
          <Savebuttoncolor
            style={{
              backgroundColor: `${
                halveData.status.id === "5f1155c0f34d6036d0515e3f" ? "gray" : ""
              }`,
            }}
            disabled={halveData.status.id === "5f1155c0f34d6036d0515e3f"}
            onClick={handleSubmitUpdate}
          >
            <Savebutton />
          </Savebuttoncolor>
        ) : halveData.sendAt && !edit ? (
          <Removebuttoncolor
            style={{
              backgroundColor: `${
                halveData.status.id === "5f1155c0f34d6036d0515e3f" ? "gray" : ""
              }`,
            }}
            disabled={halveData.status.id === "5f1155c0f34d6036d0515e3f"}
            onClick={handleSubmitDeleteHalveSent}
          >
            <Removebutton />
          </Removebuttoncolor>
        ) : halveData.sendAt && edit ? (
          <Savebuttoncolor
            style={{
              backgroundColor: `${
                halveData.status.id === "5f1155c0f34d6036d0515e3f" ? "gray" : ""
              }`,
            }}
            disabled={halveData.status.id === "5f1155c0f34d6036d0515e3f"}
            onClick={handleSubmitUpdate}
          >
            <Savebutton />
          </Savebuttoncolor>
        ) : (
          <div>
            <Savebuttoncolor
              style={{
                backgroundColor: `${
                  halveData.status.id === "5f1155c0f34d6036d0515e3f"
                    ? "gray"
                    : ""
                }`,
              }}
              disabled={halveData.status.id === "5f1155c0f34d6036d0515e3f"}
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
