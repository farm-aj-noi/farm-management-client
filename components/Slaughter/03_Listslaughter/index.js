import React, { useContext, useState, useRef, useEffect } from "react";
import styled from "styled-components";

import { Icon } from "react-icons-kit";
import { Table } from "react-bootstrap";
// import DatePicker from "react-datepicker";
import { check } from "react-icons-kit/fa/check";
import { close } from "react-icons-kit/fa/close";

import { list } from "react-icons-kit/fa/list";
import { DivBase } from "../../../utils/divBase";
import { DivFrom, DivFromTop, DivFromDown } from "./ListslaughterFrom";
// import Footer from "../../Footer/index";

import dayjs from "dayjs";
import DatePicker, { registerLocale } from "react-datepicker";
import th from "date-fns/locale/th";
registerLocale("th", th);
import Datestyle from "../helps/datepicker.module.css";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

export const QUERY_LISTST = gql`
  query QUERY_LISTST($importslaughterDate: String, $statusCa: String) {
    imslaughtersSearchList(
      importslaughterDate: $importslaughterDate
      statusCa: $statusCa
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
        id
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
  // console.log(selectedDate);
  const [selectedStatus, SetStatusChange] = useState({ status: "" });
  // console.log(selectedStatus.status);

  const { data, loading, error } = useQuery(QUERY_LISTST, {
    variables: {
      importslaughterDate: selectedDate,
      statusCa: selectedStatus.status,
    },
  });
  // console.log(data);

  const handleStatusChange = (e) =>
    SetStatusChange({ [e.target.name]: e.target.value });

  return (
    <>
      <DivBase>
        <DivFrom>
          <DivFromTop>
            <div style={{ margin: "-3px 5px 0px 0px" }}>
              <Icon size={20} icon={list} />
            </div>
            รายการเชือดโค
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
                id="status"
                name="status"
                onChange={handleStatusChange}
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
                <option value="5f0fdb7b02b40c2ab8506566">รอเชือด</option>
                <option value="5f0fdb8b02b40c2ab8506567">เชือดแล้ว</option>
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
                    <th>เบอร์โค</th>
                    <th>ใบแจ้งขุน</th>
                    <th>พันธุ์</th>
                    <th>รหัสสมาชิก</th>
                    <th>ชื่อสมาชิก</th>
                    <th>น้ำหนักโค (กก.)</th>
                    <th>วันลงทะเบียนเชือด</th>
                    <th>สถานะ</th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.imslaughtersSearchList.map((prod) => (
                      <tr key={prod.id} style={{ textAlign: "center" }}>
                        <td>{prod.numcow}</td>
                        <td>{prod.numkun}</td>
                        <td>{prod.pun}</td>
                        <td>{prod.numfarmer}</td>
                        <td>{prod.namefarmer}</td>
                        <td>{prod.weight}</td>
                        <td>
                          {dayjs(prod.importslaughterDate)
                            .locale("th")
                            .add(543, "year")
                            .format("DD MMMM YYYY")}
                        </td>
                        <td>
                          {prod.statusCa.id === "5f0fdb8b02b40c2ab8506567" ? (
                            <Icon
                              size={20}
                              icon={check}
                              style={{ color: "green" }}
                            />
                          ) : (
                            <Icon
                              size={20}
                              icon={close}
                              style={{ color: "red" }}
                            />
                          )}
                        </td>
                      </tr>
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
