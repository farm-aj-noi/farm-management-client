import React, { useContext, useState, useRef, useEffect } from "react";
import styled from "styled-components";

import { Icon } from "react-icons-kit";
import { Table } from "react-bootstrap";
import {magnifying_glass_add} from 'react-icons-kit/ikons/magnifying_glass_add'

import { list } from "react-icons-kit/fa/list";
import {notepad_add} from 'react-icons-kit/ikons/notepad_add'
import { usePagination } from "../../../helps/paginationhook";

import { DivBase } from "../../../utils/divBase";
import {
  DivFrom,
  DivFromTop,
  DivFromDown,
  Searchinput,
  Searchbutton,
  Gobutton,
} from "./SlaughterFrom";
// import Footer from "../../Footer/index";
import dayjs from "dayjs";
import DatePicker, { registerLocale } from "react-datepicker";
import th from "date-fns/locale/th";
registerLocale("th", th);
import Datestyle from "../helps/datepicker.module.css";

import { Savebutton, Editbutton } from "../../../utils/button";
import { Spinner } from "react-bootstrap";

import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

export const QUERY_INFO = gql`
  query QUERY_INFO($numkun: String) {
    Trackinginfo(numkun: $numkun) {
      id
      numcow
      pun
      numfarmer
      namefarmer
      feeds {
        datestart
        dateend
        typefood
        namefood
        namecop
        cp
        tdn
        quantity
        note
      }
    }
  }
`;


const QUERY_FOOD = gql`
  query QUERY_FOOD($type:String) {
    selectFood(type:$type) {
      name
      CP
      TDN
      id
    }
  }
`;
const CREATE = gql`
  mutation CREATE(
    $datestart: String!
    $dateend: String!
    $typefood: String!
    $namefood: String!
    $namecop: String!
    $cp: String!
    $tdn: String!
    $imslaughter: String!
    $note: String!
    $quantity: Float!
  ) {
    createFeed(
      datestart: $datestart
      dateend: $dateend
      typefood: $typefood
      namefood: $namefood
      namecop: $namecop
      cp: $cp
      tdn: $tdn
      imslaughter: $imslaughter
      quantity: $quantity
      note: $note
    ) {
      id
      datestart
      dateend
      typefood
      namefood
      quantity
    }
  }
`;

const Index = () => {
  //calendar
  const {
    isPaginating,
    currentPage,
    setCurrentPage,
    pageItems,
    setItemList,
    totalPages,
  } = usePagination([]);
  const dateRef = useRef();
  const [date, setDate] = useState(new Date());
  const [selectedDate, handleDateChange] = useState(
    dayjs(date).format("YYYY-MM-DD")
  );

  const dateRef2 = useRef();
  const [date2, setDate2] = useState(new Date());
  const [selectedDate2, handleDateChange2] = useState(
    dayjs(date2).format("YYYY-MM-DD")
  );
  // console.log("start : " + selectedDate + " , end : " + selectedDate2);
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

  const dateValueRef2 = useRef(date2);
  dateValueRef2.current = date2;

  const onChangeDatePicker = (e) => {
    // console.log("onChange");
    setDate(e);
    handleDateChange(dayjs(e).format("YYYY-MM-DD"));
  };

  const onChangeDatePicker2 = (e) => {
    // console.log("onChange");
    setDate2(e);
    handleDateChange2(dayjs(e).format("YYYY-MM-DD"));
  };

  const CustomInput = ({ value, onClick }) => (
    <Searchbutton style={{ width: "156px" }} onClick={onClick}>
      {dayjs(selectedDate).add(543, "y").locale("th").format("DD MMMM YYYY")}
    </Searchbutton>
  );
  const CustomInput2 = ({ onClick }) => (
    <Searchbutton style={{ width: "156px" }} onClick={onClick}>
      {dayjs(selectedDate2).locale("th").add(543, "y").format("DD MMMM YYYY")}
    </Searchbutton>
  );
  //calendar
  const [numkun, setNumkun] = useState("");
  const [imslaughter, setImslaughter] = useState("");
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [success, setSuccess] = useState(false);
  const [prod, setProd] = useState({
    typefood: "",
    namefood: "",
    namecop: "",
    cp: "",
    tdn: "",
    quantity: "",
    imslaughter: "",
    note: "",
  });
  const [selectedStatus, SetStatusChange] = useState("");

  // console.log(prod);

  // const event1 = new Date("July 1, 1999");
  const { data: foodset } = useQuery(QUERY_FOOD, {
    variables: {
      type: selectedStatus,

    },
    onCompleted:(data) => {
      // console.log(data.SearchBuy)
      setItemList(data.selectFood)

    }
  });

  const { data: datainfo } = useQuery(QUERY_INFO, {
    variables: {
      numkun: numkun,
    },
    onCompleted: (data) => {
      if (data.Trackinginfo) setImslaughter(data.Trackinginfo.id);
    },
  });
  // console.log(data);

  const [createFeed, error] = useMutation(CREATE, {
    onCompleted: (data) => {
      setSuccess(true),
        setTimeout(function () {
          setSuccess(false);
        }, 3000);
    },
    refetchQueries: [
      {
        query: QUERY_INFO,
        variables: {
          numkun: numkun,
        },
      },
    ],
  });

  const handleChange = (e) =>
    setProd({ ...prod, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setLoadingCreate(true);
    try {
      await createFeed({
        variables: {
          ...prod,
          datestart: selectedDate,
          dateend: selectedDate2,
          quantity: +prod.quantity,
          imslaughter: imslaughter,
        },
      });
      setLoadingCreate(false);
    } catch (error) {
      setErrorAlert(true);
      setLoadingCreate(false);
      // console.log(error);
    }
  };
// console.log(foodset)
//   useEffect(() => {
//     foodset &&
//     foodset.selectFood.filter((value) => {
//         if (value.name === prod.name) {
//           setProd({ ...prod, namefood: foodset.selectFood.name ,cp: foodset.selectFood.CP});
//         }
//       });
//   }, [prod.name]);

  useEffect(() => {
    if (prod.typefood === "อาหารหยาบ") setProd({ ...prod, cp: "", tdn: "" });
  }, [prod.typefood]);

  return (
    <>
      <DivBase>
        <DivFrom style={{ marginBottom: "15px" }}>
          <DivFromTop>
            <div style={{ margin: "-3px 5px 0px 0px" }}>
              <Icon size={20} icon={magnifying_glass_add} />
            </div>
            ข้อมูลโค
          </DivFromTop>
          <DivFromDown
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
              gridRowGap: "5px",
            }}
          >
            {/* ใส่ card */}

            <div>
              ใบแจ้งขุน : {}
              <Searchinput
                style={{ width: "156px" }}
                onChange={(event) => setNumkun(event.target.value)}
              />
            </div>
            <div>
              เบอร์โค : {}
              <Searchinput
                value={
                  datainfo && datainfo.Trackinginfo
                    ? datainfo.Trackinginfo.numcow
                    : ""
                }
                style={{ width: "156px", backgroundColor: "#ececec" }}
                disabled
              />
            </div>
            <div>
              สายพันธุ์ : {}
              <Searchinput
                value={
                  datainfo && datainfo.Trackinginfo
                    ? datainfo.Trackinginfo.pun
                    : ""
                }
                style={{ width: "156px", backgroundColor: "#ececec" }}
                disabled
              />
            </div>
            <div>
              รหัสสมาชิก : {}
              <Searchinput
                value={
                  datainfo && datainfo.Trackinginfo
                    ? datainfo.Trackinginfo.numfarmer
                    : ""
                }
                style={{ width: "156px", backgroundColor: "#ececec" }}
                disabled
              />
            </div>
            <div>
              ชื่อสมาชิก : {}
              <Searchinput
                value={
                  datainfo && datainfo.Trackinginfo
                    ? datainfo.Trackinginfo.namefarmer
                    : ""
                }
                style={{ width: "156px", backgroundColor: "#ececec" }}
                disabled
              />
            </div>
          </DivFromDown>
        </DivFrom>

        <DivFrom style={{ marginBottom: "15px" }}>
          <DivFromTop>
          <div style={{ margin: "-3px 5px 0px 0px" }}>
              <Icon size={20} icon={notepad_add} />
            </div>
            บันทึกการให้อาหาร
          </DivFromTop>
          <DivFromDown
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gridRowGap: "5px",
              paddingBottom: "15px",
            }}
          >
            {/* ใส่ card */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
                gridRowGap: "5px",
              }}
            >
              <div>
                วันเริ่มให้อาหาร : {}
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
                  customInput={<CustomInput />}
                />{" "}
              </div>

              <div>
                ประเภทอาหาร : {}
                <select
                  name="typefood"
                  onChange={(event) => SetStatusChange(event.target.value)}
                  // onChange={handleChange}
                  style={{
                    display: "inline",
                    width: "156px",
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
                  <option value="">เลือกประเภทอาหาร</option>
                  <option value="F1">อาหารข้น</option>
                  <option value="F2">อาหารหยาบ</option>
                </select>
              </div>
              <div>
                ชื่อ/สูตรอาหาร : {}
                <select
                  name="typefood"
                  onChange={handleChange}
                  style={{
                    display: "inline",
                    width: "156px",
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
                  <option value="">รายการอาหาร</option>
                  {foodset &&
                    foodset.selectFood.map((prod) => (
                      <option key={prod.id} value={prod.name}>
                        {prod.name}
                      </option>
                    ))}
                </select>
              </div>
              <div style={{ gridColumnStart: 4, gridColumnEnd: 6 }}>
                ชื่อบริษัท : {}
                <Searchinput
                  name="namecop"
                  onChange={handleChange}
                  style={{ width: "339px" }}
                />
              </div>
              <div>
                วันจบการให้อาหาร : {}
                <DatePicker
                  style={{ width: "170px" }}
                  className={Datestyle.datepicker}
                  selected={date2}
                  onChange={onChangeDatePicker2}
                  dateFormat="dd/mm/yyyy"
                  ref={dateRef2}
                  locale="th"
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  customInput={<CustomInput2 />}
                />{" "}
              </div>
              <div>
                โปรตีน (CP) : {}
                <Searchinput
                  name="cp"
                  // value={foodset.selectFood.CP}
                  // value={prod.cp}
                  // value={inputList[i].nofity}

                  onChange={handleChange}
                  type="text"
                  style={{
                    width: "156px",
                    backgroundColor: `${
                      prod.typefood === "อาหารหยาบ" ? "#ececec" : ""
                    }`,
                  }}
                  disabled={prod.typefood === "อาหารหยาบ"}
                />
              </div>
              <div>
                พลังงาน (TDN) : {}
                <Searchinput
                  name="tdn"
                  value={prod.tdn}
                  onChange={handleChange}
                  type="text"
                  style={{
                    width: "156px",
                    backgroundColor: `${
                      prod.typefood === "อาหารหยาบ" ? "#ececec" : ""
                    }`,
                  }}
                  disabled={prod.typefood === "อาหารหยาบ"}
                />
              </div>
              <div>
                ปริมาณ (กก.) : {}
                <Searchinput
                  name="quantity"
                  onChange={handleChange}
                  type="number"
                  style={{ width: "156px" }}
                />
              </div>
              <div>
                หมายเหตุ : {}
                <Searchinput
                  name="note"
                  onChange={handleChange}
                  style={{ width: "156px" }}
                />
              </div>
            </div>

            {loadingCreate ? (
              <Spinner
                style={{ margin: "0px 12px 0px auto", float: "right" }}
                animation="border"
                variant="primary"
              />
            ) : (
              <Gobutton
                disabled={
                  !prod.typefood ||
                  !prod.namefood ||
                  !prod.namecop ||
                  !prod.quantity ||
                  !imslaughter
                }
                style={{
                  backgroundColor: `${
                    !prod.typefood ||
                    !prod.namefood ||
                    !prod.namecop ||
                    !prod.quantity ||
                    !imslaughter
                      ? "gray"
                      : ""
                  }`,
                  margin: "5px 29px 0px auto",
                  float: "right",
                }}
                onClick={handleSubmit}
              >
                บันทึก
              </Gobutton>
            )}
            {/* {success && (
              <p
                style={{
                  color: "green",
                  position: "absolute",
                  display: "flex",
                  margin: "145px 0px 0px 81%",
                }}
              >
                บันทึกสำเร็จ
              </p>
            )} */}
          </DivFromDown>
        </DivFrom>

        <DivFrom>
          <DivFromTop>
            <div style={{ margin: "-3px 5px 0px 0px" }}>
              <Icon size={20} icon={list} />
            </div>
            รายการอาหาร
          </DivFromTop>
          <DivFromDown
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gridRowGap: "5px",
            }}
          >
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
                    <th style={{ width: "140px" }}>วันที่่เริ่มให้อาหาร</th>
                    <th style={{ width: "140px" }}>วันที่่สุดท้ายให้อาหาร</th>
                    <th style={{ width: "94px" }}>ประเภทอาหาร</th>
                    <th>ชื่ออาหาร</th>
                    <th>ชื่อบริษัท</th>
                    <th style={{ width: "50px" }}>โปรตีน (CP)</th>
                    <th style={{ width: "50px" }}>พลังงาน (TDN)</th>
                    <th style={{ width: "50px" }}>ปริมาณ (กก.)</th>
                    <th style={{ width: "50px" }}>หมายเหตุ</th>
                  </tr>
                </thead>
                <tbody>
                  {datainfo &&
                  datainfo.Trackinginfo &&
                  datainfo.Trackinginfo.feeds.length > 0 ? (
                    datainfo.Trackinginfo.feeds.map((prod) => (
                      <tr key={prod.id} style={{ textAlign: "center" }}>
                        <td>
                          {dayjs(prod.datestart)
                            .add(543, "y")
                            .locale("th")
                            .format("DD MMMM YYYY")}
                        </td>
                        <td>
                          {dayjs(prod.dateend)
                            .add(543, "y")
                            .locale("th")
                            .format("DD MMMM YYYY")}
                        </td>
                        <td>{prod.typefood}</td>
                        <td>{prod.namefood}</td>
                        <td>{prod.namecop}</td>
                        <td>{prod.cp}</td>
                        <td>{prod.tdn}</td>
                        <td>{prod.quantity}</td>
                        <td>{prod.note ? prod.note : "-"}</td>
                      </tr>
                    ))
                  ) : (
                    <tr style={{ textAlign: "center" }}>
                      <td colspan="9">ไม่พบข้อมูล</td>
                    </tr>
                  )}
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
