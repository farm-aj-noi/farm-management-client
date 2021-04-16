import React, { useContext, useState, useRef, useEffect } from "react";
import styled from "styled-components";

import { Icon } from "react-icons-kit";
import { Table } from "react-bootstrap";
import { Modal, Button } from "react-bootstrap";

import {
  Savebuttoncolor,
  Editbuttoncolor,
  Removebuttoncolor,
} from "../../../utils/buttonColor";
import { list } from "react-icons-kit/fa/list";
import { DivBase } from "../../../utils/divBase";
import {
  DivFrom,
  DivFromTop,
  DivFromDown,
  Searchinput,
  Searchinputarea,
  Searchbutton,
  Gobutton,
  Addbutton
} from "./SlaughterFrom";
// import Footer from "../../Footer/index";
import dayjs from "dayjs";
import DatePicker, { registerLocale } from "react-datepicker";
import th from "date-fns/locale/th";
registerLocale("th", th);
import Datestyle from "../helps/datepicker.module.css";

import { Savebutton, Editbutton ,Removebutton } from "../../../utils/button";
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
      treats {
        id
        datet
        dise
        symptom
        medi
        nofity
        quantity
        note
      }
    }
  }
`;

const QUERY_DISEASE = gql`
  query QUERY_DISEASE {
    allDisease {
      id
      name
      detail
    }
  }
`;

const QUERY_DRUG = gql`
  query QUERY_DRUG {
    allDrug {
      id
      name
      nofity
    }
  }
`;

const CREATE = gql`
  mutation CREATE(
    $datet: String!
    $dise: String!
    $symptom: String!
    $medi: String!
    $nofity: Int
    $imslaughter: String!
    $note: String!
    $quantity: Float!
  ) {
    createTreat(
      datet: $datet
      dise: $dise
      symptom: $symptom
      medi: $medi
      nofity: $nofity
      imslaughter: $imslaughter
      quantity: $quantity
      note: $note
    ) {
      id
      datet
      dise
      medi
      quantity
      note
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


  const CustomInput = ({ value, onClick }) => (
    <Searchbutton style={{ width: "148px" }} onClick={onClick}>
      {dayjs(selectedDate).add(543, "y").locale("th").format("DD MMMM YYYY")}
    </Searchbutton>
  );
  //calendar
  const [numkun, setNumkun] = useState("");
  const [imslaughter, setImslaughter] = useState("");
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [success, setSuccess] = useState(false);
  const [prod, setProd] = useState({
    dise: "",
    symptom: "",
  });

  // console.log(prod);

  // const event1 = new Date("July 1, 1999");

  const { data: datainfo } = useQuery(QUERY_INFO, {
    variables: {
      numkun: numkun,
    },
    onCompleted: (data) => {
      if (data.Trackinginfo) setImslaughter(data.Trackinginfo.id);
    },
  });
  // console.log(datainfo);

  const { data: datadisease } = useQuery(QUERY_DISEASE, {});
  const { data: datadrug } = useQuery(QUERY_DRUG, {});

  const [createTreat, error] = useMutation(CREATE, {
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
  /////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////////////////
  const handleChange = (e) =>
    setProd({ ...prod, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setLoadingCreate(true);
    try {
      for (let i = 0; i < inputList.length; i++) {
        await createTreat({
          variables: {
            ...prod,
            medi: inputList[i].medi,
            nofity: +inputList[i].nofity,
            quantity: +inputList[i].quantity,
            note: inputList[i].note,
            datet: selectedDate,
            imslaughter: imslaughter,
          },
        });
      }

      // window.location.reload(false);

      setLoadingCreate(false);
    } catch (error) {
      setErrorAlert(true);
      setLoadingCreate(false);
      // console.log(error);
    }
  };

  useEffect(() => {
    datadisease &&
      datadisease.allDisease.filter((value) => {
        if (value.name === prod.dise) {
          setProd({ ...prod, symptom: value.detail });
        }
      });

    if (prod.dise === "ใช้วัคซีน") setProd({ ...prod, symptom: "ใช้วัคซีน" });
  }, [prod.dise]);

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const [inputList, setInputList] = useState([
    {
      medi: "",
      nofity: 0,
      quantity: "",
      date: dayjs(selectedDate).format("YYYY-MM-DD"),
      note: "",
    },
  ]);

  
  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;

    if (name === "nofity") {
      list[index]["date"] = dayjs(date)
        .add(+value, "d")
        .format("YYYY-MM-DD");
    } 
    if (name === "medi") {

      // console.log(list[index])

      datadrug &&
      datadrug.allDrug.filter((value) => {
        console.log(value)
        if (value.name === list[index]['medi']) {
          list[index]['nofity'] =  value.nofity

          // console.log(list[index]['nofity'])
        }
      });
      list[index]["date"] = dayjs(date)
        .add(+list[index]['nofity'], "d")
        .format("YYYY-MM-DD");
    }

    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([
      ...inputList,
      {
        medi: "",
        nofity: 0,
        quantity: "",
        date: dayjs(selectedDate).format("YYYY-MM-DD"),
        note: "",
      },
    ]);
  };

  const onChangeDatePicker = (e) => {
    // console.log("onChange");
    setDate(e);
    handleDateChange(dayjs(e).format("YYYY-MM-DD"));

    
  };


  useEffect(() => {
    for (let i = 0; i < inputList.length; i++) {
      // console.log(inputList[i])
      const list = [...inputList];
      // list[i]["date"] = value;
  
      if (list[i]["nofity"]) {
        list[i]["date"] = dayjs(date)
          .add(+list[i]["nofity"], "d")
          .format("YYYY-MM-DD");
      } else {
        list[i]["date"] = dayjs(selectedDate).format("YYYY-MM-DD")
      }
      setInputList(list);
    }
  }, [selectedDate])


  return (
    <>
      <DivBase>
        <DivFrom style={{ marginBottom: "15px" }}>
          <DivFromTop>
            <div style={{ margin: "-3px 5px 0px 0px" }}>
              <Icon size={20} icon={list} />
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
              <Icon size={20} icon={list} />
            </div>
            บันทึกการรักษา
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
                gridTemplateColumns:  ` 1fr 1fr 1fr 1fr 1fr ${inputList.length !== 1 ? '40px' : '' }`,
                gridRowGap: "5px",
              }}
            >
              <div>
                วันที่รักษา : {}
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
                ชื่อโรค : {}
                <select
                  name="dise"
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
                  <option value="">เลือก</option>
                  <option value="ใช้วัคซีน">ใช้วัคซีน</option>
                  {datadisease &&
                    datadisease.allDisease.map((prod) => (
                      <option key={prod.id} value={prod.name}>
                        {prod.name}
                      </option>
                    ))}
                </select>
              </div>
              <div style={{ gridColumnStart: 3, gridColumnEnd:  `${inputList.length !== 1 ? 7 : 6 } `}}>
                อาการ : {}
                <Searchinputarea
                  name="symptom"
                  value={prod.symptom}
                  onChange={handleChange}
                  style={{ width: `${inputList.length !== 1 ? '563px' : '524px' }`, height: "35px" }}
                />
              </div>

              {/* <div>
                วันที่หยุดยา : {}
                <Searchbutton
                  style={{
                    width: "148px",
                    backgroundColor: "rgb(236, 236, 236)",
                  }}
                  disabled
                >
                  {dayjs(selectedDate)
                    .add(543, "y")
                    .add(+prod.nofity, "d")
                    .locale("th")
                    .format("DD MMMM YYYY")}
                </Searchbutton>
              </div> */}
              {inputList.map((x, i) => {
                return (
                  // console.log(x.length + " : " +i)
                  <div
                    style={{
                      gridColumn: `1 / span ${inputList.length !== 1 ? '6' : '5' } `,
                      display: "grid",
                      gridTemplateColumns: ` 1fr 1fr 1fr 1fr 1fr ${inputList.length !== 1 ? '40px' : '' }`,
                    }}
                  >
                    <div>
                      ยา/วัคซีนที่ใช้ :{}
                      <select
                        name="medi"
                        onChange={(e) => handleInputChange(e, i)}
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
                          borderRadius: "0.25rem",
                          transition:
                            "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
                        }}
                      >
                        <option value="">เลือก</option>
                        {datadrug &&
                          datadrug.allDrug.map((prod) => (
                            <option key={prod.id} value={prod.name}>
                              {prod.name}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div>
                      ระยะให้ยารอบถัดไป : {}
                      <Searchinput
                        name="nofity"
                        value={inputList[i].nofity}
                        onChange={(e) => handleInputChange(e, i)}
                        type="number"
                        style={{ width: "156px" }}
                      />
                    </div>
                    <div>
                      จำนวน (CC) : {}
                      <Searchinput
                        name="quantity"
                        onChange={(e) => handleInputChange(e, i)}
                        type="number"
                        style={{ width: "156px" }}
                      />
                    </div>
                    <div>
                      วันที่หยุดยา : {}
                      <Searchbutton
                        style={{
                          width: "148px",
                          backgroundColor: "rgb(236, 236, 236)",
                        }}
                        disabled
                      >
                        {dayjs(x.date)
                          .add(543, "y")
                          .locale("th")
                          .format("DD MMMM YYYY")}
                      </Searchbutton>
                    </div>
                    <div>
                      หมายเหตุ : {}
                      <Searchinput
                        name="note"
                        onChange={(e) => handleInputChange(e, i)}
                        style={{ width: "156px" }}
                      />
                    </div>

                      {inputList.length !== 1 && (
                        <Removebuttoncolor style={{height: "38px",
                          margin:" auto auto 0",
                          width:' 38px'}}
                          onClick={() => handleRemoveClick(i)}
                        >
                          <Removebutton/>
                        </Removebuttoncolor>
                      )}

                  </div>
                );
              })}

              {/* <Savebuttoncolor style={{width:"120px"}}  onClick={handleShow}
>
               เพิ่มยา
             </Savebuttoncolor>&ensp;
             <div show={show}>
                
             </div> */}
            </div>
            <div
              style={{
                width: "min-content",
                display: "inline-flex",
                gap: "10px",
                marginLeft: "auto",
              }}
            >
              <Addbutton style={{
                    margin: "5px 0px 0px auto",
                  }} onClick={handleAddClick}>เพิ่มข้อมูลยา</Addbutton>
              {loadingCreate ? (
                <Spinner
                  style={{ margin: "0px 12px 0px auto", float: "right" }}
                  animation="border"
                  variant="primary"
                />
              ) : (
                <Gobutton
                  disabled={!prod.dise || !imslaughter}
                  style={{
                    backgroundColor: `${
                      !prod.dise || !imslaughter ? "gray" : ""
                    }`,
                    margin: `5px ${inputList.length !== 1 ? '1px' : '29px' } 0px auto`,
                    float: "right",
                  }}
                  onClick={handleSubmit}
                >
                  บันทึก
                </Gobutton>
              )}
            </div>
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
            รายการรักษา
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
                    <th>วันที่่ให้ยา</th>
                    <th>ระยะหยุดยา</th>
                    <th>วันที่หยุดยา</th>
                    <th>ชื่อโรค</th>
                    <th>ยาหรือวัคซีนที่ใช้</th>
                    <th>จำนวน (CC)</th>
                    <th>หมายเหตุ</th>
                  </tr>
                </thead>
                <tbody>
                  {datainfo &&
                  datainfo.Trackinginfo &&
                  datainfo.Trackinginfo.treats.length > 0 ? (
                    datainfo.Trackinginfo.treats.map((prod) => (
                      <tr key={prod.id} style={{ textAlign: "center" }}>
                        <td>
                          {dayjs(prod.datet)
                            .add(543, "y")
                            .locale("th")
                            .format("DD MMMM YYYY")}
                        </td>
                        <td>{prod.nofity}</td>
                        <td>
                          {dayjs(prod.datet)
                            .add(543, "y")
                            .add(prod.nofity, "d")
                            .locale("th")
                            .format("DD MMMM YYYY")}
                        </td>
                        <td>{prod.dise}</td>
                        <td>{prod.medi}</td>
                        <td>{prod.quantity}</td>
                        <td>{prod.note ? prod.note : "-"}</td>
                      </tr>
                    ))
                  ) : (
                    <tr style={{ textAlign: "center" }}>
                      <td colSpan="7">ไม่พบข้อมูล</td>
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