import React, { useContext, useState, useRef, useEffect } from "react";
import styled from "styled-components";

import { Icon } from "react-icons-kit";
import { Table } from "react-bootstrap";

import { list } from "react-icons-kit/fa/list";
import { DivBase } from "../../../utils/divBase";
import {
  DivFrom,
  DivFromTop,
  DivFromDown,
  Searchinput,
  Wightinput,
} from "./GetinFrom";
import LoadingSmall from "../../../helps/LoadingSmall";
// import Footer from "../../Footer/index";
import dayjs from "dayjs";
import DatePicker, { registerLocale } from "react-datepicker";
import th from "date-fns/locale/th";
registerLocale("th", th);
import Datestyle from "../helps/datepicker.module.css";

import ListImport from "./listImport";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

export const QUERY_NUMKUN = gql`
  query QUERY_NUMKUN($importDate: String, $numkun: String, $statusIm: String) {
    imslaughtersSearchNumkun(
      numkun: $numkun
      importDate: $importDate
      statusIm: $statusIm
    ) {
      id
      numcow
      numkun
      pun
      numfarmer
      namefarmer
      weight
      price
      importDate
      importslaughterDate
      statusIm {
        code
        nameTH
      }
      statusCa {
        code
        nameTH
      }
      statusEn {
        code
        nameTH
      }
      user {
        name
      }
    }
  }
`;

const Index = () => {
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
  const [inputnumkun, setInputnumkun] = useState("");
  const [selectedStatus, SetStatusChange] = useState("");

  const { data, loading, error, refetch } = useQuery(QUERY_NUMKUN, {
    variables: {
      numkun: inputnumkun,
      importDate: selectedDate,
      statusIm: selectedStatus,
    },
  });
  // console.log(data);

  return (
    <>
      <DivBase>
        <DivFrom>
          <DivFromTop>
            <div style={{ margin: "-3px 5px 0px 0px" }}>
              <Icon size={20} icon={list} />
            </div>
            รายการรับโคเข้าเชือด
          </DivFromTop>
          <DivFromDown
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gridRowGap: "5px",
            }}
          >
            {/* ใส่ card */}
            <div className="mb-3" style={{ margin: "auto" }}></div>
            <div className="mb-3" style={{ margin: "auto" }}>
              ค้นหาตามใบแจ้งขุน : {}
              <Searchinput
                onChange={(event) => setInputnumkun(event.target.value)}
              />
              วันที่ : {}
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
              />{" "}
              สถานะ : {}
              <select
                onChange={(event) => SetStatusChange(event.target.value)}
                style={{
                  display: "inline",
                  width: "130px",
                  padding: "0.375rem 0.75rem",
                  fontSize: "1rem",
                  fontWeight: "400",
                  lineHeight: "1.5",
                  color: "#495057",
                  backgroundColor: "#fff",
                  backgroundClip: "padding-box",
                  border: "1px solid #ced4da",
                  /* border-radius: 0.25rem 0rem 0rem 0.25rem; */
                  borderRadius: "0.25rem",
                  transition:
                    "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
                }}
              >
                <option value="">ทั้งหมด</option>
                <option value="5f0fdb4b02b40c2ab8506563">รอรับเข้า</option>
                <option value="5f0fdb6502b40c2ab8506565">
                  รับเข้าเสร็จสิ้น
                </option>
              </select>
              {/* <Searchbutton>ค้นหา</Searchbutton> */}
            </div>

            <div>
              <Table
                striped
                bordered
                responsive
                hover
                style={{ margin: "auto" }}
              >
                {/* <LoadingSmall/> */}
                <thead>
                  <tr style={{ textAlign: "center" }}>
                    <th>ใบแจ้งขุน</th>
                    <th>เบอร์โค</th>
                    <th>พันธุ์</th>
                    <th>รหัสสมาชิก</th>
                    <th>ชื่อสมาชิก</th>
                    <th>น้ำหนักโค (กก.)</th>
                    <th>ราคาประเมิน (บาท)</th>
                    <th>สถานะ</th>
                    <th>จัดการ</th>
                  </tr>
                </thead>

                <tbody>
                  {/* {loading && <LoadingSmall/>} */}

                  {data &&
                    data.imslaughtersSearchNumkun.map((prod) => (
                      <ListImport key={prod.id} imslaughter={prod} />
                    ))}
                </tbody>
              </Table>
            </div>
          </DivFromDown>
        </DivFrom>
        {/* <Footer/> */}
      </DivBase>
    </>
  );
};

export default Index;
