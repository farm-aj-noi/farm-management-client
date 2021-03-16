import React, { useContext, useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";

import { Icon } from "react-icons-kit";
import { Table } from "react-bootstrap";
// import DatePicker from "react-datepicker";

import { list } from "react-icons-kit/fa/list";
import ListQuarter from "./listquarter";
import { DivBase } from "../../../utils/divBase";
import {
  DivFrom,
  DivFromTop,
  DivFromDown,
  Searchinput,
  Gobutton,
} from "./ListcutfourFrom";
// import Footer from "../../Footer/index";
import dayjs from "dayjs";
import DatePicker, { registerLocale } from "react-datepicker";
import th from "date-fns/locale/th";
registerLocale("th", th);
import Datestyle from "../helps/datepicker.module.css";

import { Savebutton, Editbutton } from "../../../utils/button";
import { now } from "moment";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

export const QUERYLIST = gql`
  query QUERYLIST($sendAt: String, $status: String, $barcode: String) {
    SearchQuarterForCut(sendAt: $sendAt, status: $status, barcode: $barcode) {
      id
      beeftype {
        code
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
  const [edit, setEdit] = useState(false);
  const [datatest, setDatatest] = useState(false);
  const [barcode, setInputbarcode] = useState("");
  const [selectedStatus, SetStatusChange] = useState("");
  const [selectedBeeftype, setInputBeeftype] = useState("");
  const [selectedGrade, setInputGrade] = useState("");

  const { data, loading, error } = useQuery(QUERYLIST, {
    variables: {
      barcode: barcode,
      sendAt: selectedDate,
      status: selectedStatus,
    },
  });

  return (
    <>
      <DivBase>
        <DivFrom>
          <DivFromTop>
            <div style={{ margin: "-3px 5px 0px 0px" }}>
              <Icon size={20} icon={list} />
            </div>
            รายการตัดแต่งซากโคสี่เสี้ยว
          </DivFromTop>
          <DivFromDown
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gridRowGap: "5px",
            }}
          >
            {/* ใส่ card */}
            {/* <div className="mb-3" style={{ margin: "auto" }}>
              ค้นหาตามใบแจ้งขุน : {}
              <Searchinput />
            </div> */}
            <div className="mb-3" style={{ margin: "auto" }}>
              วันที่ต้องตัดแต่ง : {}
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
              ชื่อเนื้อ : {}
              <select
                onChange={(event) => setInputBeeftype(event.target.value)}
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
                  marginRight: 10,
                }}
              >
                <option value="">ทั้งหมด</option>
                <option value="b1">ซากซ้าย-ขาหน้า</option>
                <option value="b2">ซากซ้าย-ขาหลัง</option>
                <option value="b3">ซากขวา-ขาหน้า</option>
                <option value="b4">ซากขวา-ขาหลัง</option>
              </select>
              เกรด : {}
              <select
                onChange={(event) => setInputGrade(event.target.value)}
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
                  marginRight: 10,
                }}
              >
                <option value="">ทั้งหมด</option>
                <option value="2.5">2.5</option>
                <option value="3">3</option>
                <option value="3.5">3.5</option>
                <option value="4">4</option>
                <option value="4.5">4.5</option>
                <option value="5">5</option>
              </select>
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
                <option value="5f3f2dd3b23ee40f9c84be07">รอตัดแต่ง</option>
                <option value="5f3f2de2b23ee40f9c84be08">ตัดแต่งแล้ว</option>
              </select>
            </div>

            <div>
              <Table
                striped
                bordered
                responsive
                hover
                style={{ margin: "auto" }}
              >
                <thead>
                  <tr style={{ textAlign: "center" }}>
                    <th>บาร์โค๊ด</th>
                    <th>ชื่อเนื้อ</th>
                    <th>น้ำหนัก (กรัม)</th>
                    <th>เกรด</th>
                    <th>ตัดแต่งเมื่อ</th>
                    <th>วันที่ต้องตัดแต่ง</th>
                    <th>สถานะ</th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.SearchQuarterForCut.map((prod) =>
                      prod.imslaughter.grade &&
                      !selectedGrade &&
                      !selectedBeeftype ? (
                        <ListQuarter key={prod.id} imslaughter={prod} />
                      ) : !selectedGrade &&
                        selectedBeeftype &&
                        prod.imslaughter.grade &&
                        prod.beeftype.code === selectedBeeftype ? (
                        <ListQuarter key={prod.id} imslaughter={prod} />
                      ) : selectedGrade &&
                        !selectedBeeftype &&
                        prod.imslaughter.grade &&
                        prod.imslaughter.grade === selectedGrade ? (
                        <ListQuarter key={prod.id} imslaughter={prod} />
                      ) : selectedGrade &&
                        selectedBeeftype &&
                        prod.imslaughter.grade &&
                        prod.imslaughter.grade === selectedGrade &&
                        prod.beeftype.code === selectedBeeftype ? (
                        <ListQuarter key={prod.id} imslaughter={prod} />
                      ) : null
                    )}
                </tbody>
              </Table>
            </div>
            <div className="mb-3" style={{ margin: "12px auto" }}>
              <Link href="/slaughter/cutfour">
                <Gobutton>ไปยังหน้าตัดแต่งซากโคสี่ซีก</Gobutton>
              </Link>
            </div>
          </DivFromDown>
        </DivFrom>
        {/* <Footer/> */}
      </DivBase>
    </>
  );
};

export default Index;
