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

const UPDATE = gql`
  mutation UPDATE($id: ID!, $importDate: String!) {
    toSlaughter(id: $id, importDate: $importDate) {
      id
      numcow
      numkun
      pun
      date
      numfarmer
      namefarmer
      importDate
      importslaughterDate
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
  const days_between = (date1) =>{
 
    dayjs(date1).format("YYYY-MM-DD");

   // The number of milliseconds in one day
   const ONE_DAY = 1000 * 60 * 60 * 24;
    var  date2 = new Date().toISOString()
   var date3 =  dayjs(date2).format("YYYY-MM-DD");
    var dt1 = new Date(date1);
    var  dt2 = new Date(date2);
     return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
   }
   
 function timeDifference(date) {
  console.log(date);
    var date1 = new Date(date);
    console.log(date1)
    var date2 = new Date();
    var diff = new Date(date2.getTime() - date1.getTime());
  
    let year = diff.getUTCFullYear() - 1970;
    let month = diff.getUTCMonth();
    let day = diff.getUTCDate() - 1;
    let week = (day / 7);
  
    // console.log(week);
    let hour = diff.getUTCHours();
    let minute = diff.getUTCMinutes();
    let second = diff.getUTCSeconds();
    // console.clear() 
    // console.log(`${year} Year\n${month} Month \n${week} Week \n${day} Day \n${hour}:${minute}:${second} s`);
   
    if (year !== 0) {
      return `${year} ปี ${month} เดือน`;
   } else if (month !== 0) {
      return `${month} เดือน ${day} วัน`;
   } else if (week >= 1) {
      return `${week.toFixed(0)} สัปดาห์`;
   } else if (day > 1) {
       return `${day} วัน`;
   }
    else if (day !== 0) {
      return `เมื่อวานนี้`;
   }
    else if (hour > 1 && hour <= 24) {
     return `${hour} ชั่วโมง`;
   } else if (hour !== 0) {
      return `${hour} ชั่วโมง`;
   } else if (minute > 1) {
      return `${minute}นาที`;
   } else if (minute === 1) {
     return `${minute} นาที`;
   } else if (second !== 0) {
      return 'เมื่อครู่นี้';
   }
   return 'เมื่อครู่นี้';
 }

  // component did mount
  useEffect(() => {
    console.log("dateRef", dateRef);
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

  // console.log(halveData)

  const [toSlaughter] = useMutation(UPDATE, {
    onCompleted: (data) => {
      // console.log(data.createHalveL)
      sethalveData(data.toSlaughter);
      setEdit(false);
    },
  });

  const handleSubmitUpdate = async () => {
    setLoading(true);
    // console.log(halveData)
    await toSlaughter({
      variables: {
        importDate: selectedDate,
        id: halveData.id,
      },
    });
    setEdit(false);
    setLoading(false);
  };

  return (
    <tr style={{ textAlign: "center" }}>
      <td>{halveData.numkun}</td>
      <td>{halveData.numcow}</td>
      <td>{halveData.pun}</td>
      <td>{
                timeDifference(halveData.date)
              }</td>
      <td>{halveData.numfarmer}</td>
      <td>{halveData.namefarmer}</td>
      <td>
        {halveData.importDate && !edit ? (
          <div>
            {dayjs(halveData.importDate)
              .add(543, "y")
              .locale("th")
              .format("DD MMMM YYYY")}
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
        {loading ? (
          <Spinner animation="border" variant="primary" />
        ) : !halveData.importDate && !edit ? (
          <Savebuttoncolor onClick={handleSubmitUpdate}>
            <Savebutton />
          </Savebuttoncolor>
        ) : halveData.importDate && !edit ? (
          <Editbuttoncolor
            disabled={halveData.importslaughterDate}
            style={{
              backgroundColor: `${halveData.importslaughterDate ? "gray" : ""}`,
            }}
            onClick={() => setEdit(true)}
          >
            <Editbutton />
          </Editbuttoncolor>
        ) : halveData.importDate && edit ? (
          <Savebuttoncolor onClick={handleSubmitUpdate}>
            <Savebutton />
          </Savebuttoncolor>
        ) : (
          <div>
            <Savebuttoncolor onClick={handleSubmitUpdate}>
              <Savebutton />
            </Savebuttoncolor>
          </div>
        )}
      </td>
    </tr>
  );
};

export default Imslaughter;
