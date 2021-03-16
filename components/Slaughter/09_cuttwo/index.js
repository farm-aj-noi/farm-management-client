import React, { useState, useEffect, useRef } from "react";
import { useMutation } from "@apollo/react-hooks";
import styled from "styled-components";
import { Spinner } from "react-bootstrap";

import { Icon } from "react-icons-kit";
import { Table } from "react-bootstrap";
// import DatePicker from "react-datepicker";

import Pickadate from "pickadate/builds/react-dom";
import TH from "pickadate/builds/translations/th_TH";

import { list } from "react-icons-kit/fa/list";
import { DivBase } from "../../../utils/divBase";
import {
  DivFromRight,
  DivFromTop,
  DivFromDown,
  DivFromLeft,
  DivFromInRight,
  Searchinput,
  DivFromInsideLeft,
  WightInputWC2,
  WightInputWC1,
  DivFromInsideRight,
  Gobutton,
  SaveWeightCoolbutton,
} from "./ListcuttwoFrom";
import ListQuarter from "./listquarter";
// import Footer from "../../Footer/index";

import { now } from "moment";
import Barcodebutton from "../99_Barcode/3_Quarter";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

export const QUERYLIST = gql`
  query QUERYLIST($barcode: String) {
    HalveForCut(barcode: $barcode) {
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
      weightwarm
      weightcool
      imslaughter {
        id
        grade
      }
    }
  }
`;

const UPDATE_WEIGHT_COOL = gql`
  mutation UPDATE_WEIGHT_COOL($id: ID!, $weightcool: Float!) {
    updateHalveWeightCool(id: $id, weightcool: $weightcool) {
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
      weightwarm
      weightcool
      imslaughter {
        id
        grade
      }
    }
  }
`;

export const QUERYTYPE = gql`
  query QUERYTYPE($code: String) {
    SearchBeeftypefour(code: $code) {
      id
      code
      nameTH
    }
  }
`;

export const QUERYQUARTER = gql`
  query QUERYQUARTER($halve: String) {
    SearchQuarter(halve: $halve) {
      id
      barcode
      beeftype {
        code
        nameTH
      }
      imslaughter {
        grade
      }
      weight
      price
      halve {
        id
      }
    }
  }
`;

const CREATE_QUARTER = gql`
  mutation CREATE_QUARTER(
    $weight: Float!
    $halve: String!
    $imslaughter: String!
    $beeftype: String!
  ) {
    createQuarter(
      weight: $weight
      halve: $halve
      imslaughter: $imslaughter
      beeftype: $beeftype
    ) {
      weight
      price
      barcode
      createdAt
    }
  }
`;

// const DELETE_QUARTER = gql`
//   mutation DELETE_QUARTER($id: ID!) {
//     deleteQuarter(id: $id) {
//       id
//       weight
//     }
//   }
// `;

global.globleweighthalve = 0;

const Index = () => {
  const [weightmain, setWeightmain] = useState(0);
  const [weightother, setWeightother] = useState(0);

  if (globleweighthalve !== weightother) {
    setWeightother(globleweighthalve);
  }

  // console.log(
  //   "weightmain : " +
  //     weightmain +
  //     " , weightother : " +
  //     weightother +
  //     " , globleweighthalve : " +
  //     globleweighthalve
  // );

  const calculatedwight = async (data) => {
    let datacal = 0;
    data.forEach((element) => {
      // console.log(element.weight);
      datacal = datacal + element.weight;
      // setWeightother(weightother + element.weight);
      // console.log(datacal)
    });
    setWeightother(datacal);
    globleweighthalve = datacal;
  };

  const [edit, setEdit] = useState(false);
  const [datatest, setDatatest] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingquarter, setLoadingQuarter] = useState(false);
  const [loadingdelete, setLoadingDelete] = useState(false);
  const [barcode, setInputbarcode] = useState("");
  const [barcodeAlert, setBarcodeAlert] = useState(false);
  const [code, setInputCode] = useState("");
  const [codeAlert, setCodeAlert] = useState(false);
  const [weightcool, setInputWeightcool] = useState("");
  const [weightcoolAlert, setWeightcoolAlert] = useState(false);
  const [weightfour, setInputWeightfour] = useState("");
  const [weightfourAlert, setWeightfourAlert] = useState(false);
  // console.log(barcode.length);

  const refBarcode = useRef();
  const refCool = useRef();
  const refBeeftype = useRef();
  const refWeight = useRef();

  // useEffect(() => {
  //   console.log("^.^")
  //   if (barcode.length === 15) {
  //     refCool.current.focus()
  //   }
  // }, [barcode])

  const { data: halveData } = useQuery(QUERYLIST, {
    variables: {
      barcode: barcode,
    },
    onCompleted: (data) => {
      // console.log(data.HalveForCut)
      if (data.HalveForCut) {
        if (data.HalveForCut.weightcool) {
          setWeightmain(data.HalveForCut.weightcool);
          setInputWeightcool(data.HalveForCut.weightcool);
        }
      } else {
        // setInputbarcode("");
        setWeightmain(0);
        globleweighthalve = 0;
      }
      if (!data.HalveForCut) {
        // setInputbarcode("");
        setWeightmain(0);
        globleweighthalve = 0;
      }
    },
  });
  const { data: BeefData } = useQuery(QUERYTYPE, {
    variables: {
      code: code,
    },
    onCompleted: (data) => {
      // console.log(data.LumpForCut)
      if (!data.SearchBeeftypefour) {
        // setInputCode("");
      }
    },
  });

  const { data: QuarterData } = useQuery(QUERYQUARTER, {
    onCompleted: (data) => {
      // console.log(data.SearchChop);
      if (data.SearchQuarter) {
        setWeightother(0);
        calculatedwight(data.SearchQuarter);
      }
    },
    variables: {
      halve: halveData && halveData.HalveForCut ? halveData.HalveForCut.id : "",
    },
  });

  const [updateHalveWeightCool] = useMutation(UPDATE_WEIGHT_COOL, {
    onCompleted: (data) => {
      setWeightmain(data.updateHalveWeightCool.weightcool);
      setInputWeightcool(data.updateHalveWeightCool.weightcool);
    },
    refetchQueries: [
      {
        query: QUERYLIST,
        variables: {
          barcode: barcode,
        },
      },
    ],
  });

  const [createQuarter] = useMutation(CREATE_QUARTER, {
    onCompleted: (data) => {
      autoPrint(data.createQuarter.barcode);
      globleweighthalve = globleweighthalve + data.createQuarter.weight;
    },
    refetchQueries: [
      {
        query: QUERYQUARTER,
        variables: {
          halve:
            halveData && halveData.HalveForCut ? halveData.HalveForCut.id : "",
        },
      },
    ],
  });

  //autoprint
  const [autoprint, setAutoprint] = useState();
  const [barcodeautoprint, setBarcodeAutoprint] = useState();
  const autoPrint = async (e) => {
    setBarcodeAutoprint(e);
    setAutoprint(true);
    setBarcodeAutoprint(null);
    setAutoprint(false);
  };

  const handleSubmitUpdate = async () => {
    setLoading(true);
    // console.log(halveData)
    await updateHalveWeightCool({
      variables: {
        weightcool: +weightcool,
        id: halveData.HalveForCut.id,
      },
    });
    setInputWeightcool("");
    refBeeftype.current.focus();
    setLoading(false);
  };

  const handleSubmitCreatequarter = async () => {
    setLoadingQuarter(true);
    // console.log(halveData)
    await createQuarter({
      variables: {
        weight: +weightfour,
        halve: halveData.HalveForCut.id,
        imslaughter: halveData.HalveForCut.imslaughter.id,
        beeftype: BeefData.SearchBeeftypefour.id,
      },
    });
    setLoadingQuarter(false);
    refWeight.current.focus();
    setInputWeightfour("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (
        halveData &&
        halveData.HalveForCut !== null &&
        halveData.HalveForCut.weightcool
      ) {
        refBeeftype.current.focus();
      } else if (halveData && halveData.HalveForCut !== null) {
        refCool.current.focus();
      } else {
        refBarcode.current.focus();
      }
    }
  };

  const handleKeyDownBeeftype = (event) => {
    if (event.key === "Enter") {
      if (BeefData.SearchBeeftypefour) {
        refWeight.current.focus();
      } else {
        refBeeftype.current.focus();
        // setInputCode("");
      }
    }
    // if (event.key === "Backspace" && code.length === 0) {
    //   refBarcode.current.focus();
    // }
  };

  const handleKeyDownSubmit = async (event) => {
    if (event.key === "Enter") {
      if (
        (BeefData && BeefData.SearchBeeftypefour === null) ||
        !weightfour ||
        (halveData && halveData.HalveForCut === null) ||
        !halveData.HalveForCut.weightcool ||
        weightfour > weightmain - weightother ||
        weightfour.toString() === (weightmain - weightother).toString() ||
        (QuarterData &&
          QuarterData.SearchQuarter &&
          QuarterData.SearchQuarter.length >= 2)
      ) {
      } else {
        await handleSubmitCreatequarter();
        refWeight.current.focus();
        setInputWeightfour("");
      }
    }
    // if (event.key === "Backspace" && weightfour.length === 0) {
    //   refBeeftype.current.focus();
    // }
  };

  const handleKeyDownUpdate = async (event) => {
    if (event.key === "Enter") {
      if (!weightcool) {
      } else {
        await handleSubmitUpdate();
      }
    }
    // if (event.key === "Backspace" && weightcool.length === 0) {
    //   refBarcode.current.focus();
    // }
  };
  useEffect(() => {
    if (weightfour <= 0) {
      setInputWeightfour("");
    }
  }, [weightfour]);

  return (
    <>
      <Barcodebutton autoprint={autoprint} barcode={barcodeautoprint} />
      <DivBase
        style={{
          display: "flex",
          margin: "auto",
        }}
      >
        <DivFromLeft>
          <DivFromTop>
            <div style={{ margin: "-3px 5px 0px 0px" }}>
              <Icon size={20} icon={list} />
            </div>
            ซากโคผ่าซีก
          </DivFromTop>
          <DivFromDown
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gridRowGap: "5px",
            }}
          >
            <DivFromInsideLeft>
              บาร์โค๊ด :{" "}
              <div style={{ display: "grid", gridTemplateRows: "1fr 15px" }}>
                <Searchinput
                  onChange={(event) => {
                    let input = event.target.value;
                    let value = input.replace(/[^A-Za-z0-9]/gi, "");

                    if (input !== value) {
                      setBarcodeAlert(true);
                    } else {
                      setBarcodeAlert(false);
                      setInputbarcode(value);
                      setInputWeightcool("");
                    }
                  }}
                  autoFocus
                  onFocus={(e) => e.currentTarget.select()}
                  placeholder="กรุณากรอกบาร์โค๊ด"
                  maxLength="15"
                  onKeyDown={handleKeyDown}
                  value={barcode}
                  ref={refBarcode}
                  style={{ borderColor: `${!barcode ? "red" : ""}` }}
                />
                {!barcode && !barcodeAlert ? (
                  <label style={{ color: "red" }}>กรุณากรอกบาร์โค้ด</label>
                ) : barcodeAlert ? (
                  <label style={{ color: "red" }}>
                    กรุณากรอกตัวเลข,ภาษาอังกฤษ เท่านั้น
                  </label>
                ) : (
                  halveData &&
                  halveData.HalveForCut === null && (
                    <label style={{ color: "red" }}>ไม่พบข้อมูล</label>
                  )
                )}
              </div>
            </DivFromInsideLeft>
            <DivFromInsideLeft>
              ชื่อเนื้อ :{" "}
              <Searchinput
                value={
                  halveData && halveData.HalveForCut !== null
                    ? halveData.HalveForCut.beeftype.nameTH
                    : "ไม่พบข้อมูล"
                }
                style={{ marginBottom: "15px", backgroundColor: "#eeeeeebd" }}
                disabled
              />
            </DivFromInsideLeft>
            <DivFromInsideLeft>
              น้ำหนักอุ่น :{" "}
              <div style={{ marginBottom: "15px", display: "inline-flex" }}>
                <WightInputWC1
                  style={{ backgroundColor: "#eeeeeebd" }}
                  value={
                    halveData && halveData.HalveForCut !== null
                      ? halveData.HalveForCut.weightwarm.toLocaleString(
                          undefined,
                          {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }
                        )
                      : "ไม่พบข้อมูล"
                  }
                  disabled
                />
                <WightInputWC2 value="กก." disabled />
              </div>
            </DivFromInsideLeft>
            <DivFromInsideLeft>
              น้ำหนักเย็น :{" "}
              <div style={{ display: "grid", gridTemplateRows: "37.61px 1fr" }}>
                <div style={{ display: "inline-flex" }}>
                  {halveData &&
                  halveData.HalveForCut !== null &&
                  halveData.HalveForCut.weightcool ? (
                    <WightInputWC1
                      style={{ backgroundColor: "#eeeeeebd" }}
                      value={halveData.HalveForCut.weightcool.toLocaleString(
                        undefined,
                        {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }
                      )}
                      disabled
                    />
                  ) : (
                    <WightInputWC1
                      type="Nember"
                      ref={refCool}
                      onFocus={(e) => e.currentTarget.select()}
                      onKeyDown={handleKeyDownUpdate}
                      value={weightcool}
                      onChange={(event) => {
                        let input = event.target.value;
                        let value = input.replace(/[^0-9.]/gi, "");

                        if (input !== value) {
                          setWeightcoolAlert(true);
                        } else {
                          setWeightcoolAlert(false);
                          setInputWeightcool(value);
                        }
                      }}
                      style={{ borderColor: `${!weightcool ? "red" : ""}` }}
                    />
                  )}
                  <WightInputWC2 value="กก." disabled />
                </div>
                {!weightcool && !weightcoolAlert ? (
                  <label style={{ color: "red" }}>กรุณากรอกน้ำหนักเย็น</label>
                ) : weightcoolAlert ? (
                  <label style={{ color: "red" }}>
                    กรุณากรอกตัวเลข เท่านั้น
                  </label>
                ) : (halveData && halveData.HalveForCut === null) ||
                  !weightcool ||
                  weightcool > halveData.HalveForCut.weightwarm ? (
                  <label style={{ color: "red" }}>
                    กรุณากรอกน้ำหนักเย็นไม่เกินน้ำหนักอุ่น
                  </label>
                ) : (
                  (halveData && halveData.HalveForCut === null) ||
                  !weightcool ||
                  (weightcool < halveData.HalveForCut.weightwarm * 0.95 && (
                    <label style={{ color: "red" }}>
                      กรุณากรอกน้ำหนักเย็นน้อยกว่าน้ำหนักอุ่นได้ไม่เกิน 5%
                      ของน้ำหนักอุ่น
                    </label>
                  ))
                )}
              </div>
            </DivFromInsideLeft>
            {loading ? (
              <Spinner
                style={{ justifySelf: "right" }}
                animation="border"
                variant="primary"
              />
            ) : (
              <SaveWeightCoolbutton
                onClick={handleSubmitUpdate}
                style={{
                  backgroundColor: `${
                    (halveData && halveData.HalveForCut === null) ||
                    !weightcool ||
                    weightcool > halveData.HalveForCut.weightwarm
                      ? "gray"
                      : ""
                  }`,
                }}
                disabled={
                  (halveData && halveData.HalveForCut === null) ||
                  !weightcool ||
                  weightcool > halveData.HalveForCut.weightwarm
                }
              >
                บันทึก
              </SaveWeightCoolbutton>
            )}
          </DivFromDown>
        </DivFromLeft>

        <DivFromRight>
          <DivFromInRight>
            <DivFromTop>
              <div style={{ margin: "-3px 5px 0px 0px" }}>
                <Icon size={20} icon={list} />
              </div>
              รายละเอียดผลการตัดแต่งซากโคผ่าซีก
            </DivFromTop>
            <DivFromDown
              style={{
                display: "grid",
                gridTemplateColumns: "1.85fr 1.75fr 1.75fr 1.05fr",
                gridRowGap: "5px",
              }}
            >
              {/* ใส่ card */}
              <DivFromInsideRight>
                รหัสชิ้นเนื้อ :{" "}
                <div
                  style={{
                    display: "inline-grid",
                    gridTemplateRows: "1fr 15px",
                  }}
                >
                  <Searchinput
                    ref={refBeeftype}
                    onFocus={(e) => e.currentTarget.select()}
                    value={code.toUpperCase()}
                    onChange={(event) => {
                      let input = event.target.value;
                      let value = input.replace(/[^A-Za-z0-9]/gi, "");

                      if (input !== value) {
                        setCodeAlert(true);
                      } else {
                        setCodeAlert(false);
                        setInputCode(value);
                      }
                    }}
                    style={{ width: 100, borderColor: `${!code ? "red" : ""}` }}
                    onKeyDown={handleKeyDownBeeftype}
                  />
                  {!code && !codeAlert ? (
                    <label
                      style={{
                        color: "red",
                        position: "absolute",
                        marginTop: "38px",
                      }}
                    >
                      กรุณากรอกรหัสชิ้นเนื้อ
                    </label>
                  ) : (
                    codeAlert && (
                      <label
                        style={{
                          color: "red",
                          position: "absolute",
                          marginTop: "38px",
                        }}
                      >
                        กรุณากรอกตัวเลข,ภาษาอังกฤษ เท่านั้น
                      </label>
                    )
                  )}
                </div>
              </DivFromInsideRight>
              <DivFromInsideRight>
                ชื่อเนื้อ :{" "}
                <Searchinput
                  placeholder={
                    BeefData && BeefData.SearchBeeftypefour !== null
                      ? BeefData.SearchBeeftypefour.nameTH
                      : "ไม่พบข้อมูล"
                  }
                  style={{ width: 115, backgroundColor: "#eeeeeebd" }}
                  disabled
                />
              </DivFromInsideRight>
              <DivFromInsideRight>
                น้ำหนัก :{" "}
                <div
                  style={{
                    display: "inline-grid",
                    gridTemplateRows: "1fr 15px",
                  }}
                >
                  <div style={{ display: "inline-flex" }}>
                    <WightInputWC1
                      type="number"
                      ref={refWeight}
                      onFocus={(e) => e.currentTarget.select()}
                      onKeyDown={handleKeyDownSubmit}
                      value={weightfour}
                      placeholder="กรอกน้ำหนัก"
                      style={{
                        width: 75,
                        borderColor: `${!weightfour ? "red" : ""}`,
                      }}
                      onChange={(event) => {
                        let input = event.target.value;
                        let value = input.replace(/[^0-9.+]/gi, "");

                        if (input !== value) {
                          setWeightfourAlert(true);
                        } else {
                          setWeightfourAlert(false);
                          setInputWeightfour(value);
                        }
                      }}
                    />
                    <WightInputWC2 value="กก." disabled />
                  </div>
                  {!weightfour && !weightfourAlert ? (
                    <label
                      style={{
                        color: "red",
                        position: "absolute",
                        marginTop: "38px",
                      }}
                    >
                      กรุณากรอกน้ำหนัก
                    </label>
                  ) : weightfourAlert ? (
                    <label
                      style={{
                        color: "red",
                        position: "absolute",
                        marginTop: "38px",
                      }}
                    >
                      กรุณากรอกตัวเลข เท่านั้น
                    </label>
                  ) : (halveData && halveData.HalveForCut === null) ||
                    !halveData.HalveForCut.weightcool ||
                    weightfour > weightmain - weightother ? (
                    <label
                      style={{
                        color: "red",
                        position: "absolute",
                        marginTop: "38px",
                        marginLeft: "-55px",
                      }}
                    >
                      กรุณากรอกน้ำหนักไม่เกินน้ำหนักเย็น
                    </label>
                  ) : (
                    (halveData && halveData.HalveForCut === null) ||
                    !halveData.HalveForCut.weightcool ||
                    (weightfour.toString() ===
                      (weightmain - weightother).toString() && (
                      <label
                        style={{
                          color: "red",
                          position: "absolute",
                          marginTop: "38px",
                          marginLeft: "-55px",
                        }}
                      >
                        กรุณากรอกน้ำหนักน้อยน้ำหนักเย็น
                      </label>
                    ))
                  )}
                </div>
              </DivFromInsideRight>
              {loadingquarter ? (
                <Spinner animation="border" variant="primary" />
              ) : QuarterData &&
                QuarterData.SearchQuarter &&
                QuarterData.SearchQuarter.length >= 2 ? (
                <Gobutton
                  style={{
                    backgroundColor: "gray",
                  }}
                  disabled
                >
                  บันทึก
                </Gobutton>
              ) : (
                <Gobutton
                  onClick={handleSubmitCreatequarter}
                  style={{
                    backgroundColor: `${
                      (BeefData && BeefData.SearchBeeftypefour === null) ||
                      !weightfour ||
                      (halveData && halveData.HalveForCut === null) ||
                      !halveData.HalveForCut.weightcool ||
                      weightfour > weightmain - weightother ||
                      weightfour.toString() ===
                        (weightmain - weightother).toString()
                        ? "gray"
                        : ""
                    }`,
                  }}
                  disabled={
                    (BeefData && BeefData.SearchBeeftypefour === null) ||
                    !weightfour ||
                    (halveData && halveData.HalveForCut === null) ||
                    !halveData.HalveForCut.weightcool ||
                    weightfour > weightmain - weightother ||
                    weightfour.toString() ===
                      (weightmain - weightother).toString()
                  }
                >
                  บันทึก
                </Gobutton>
              )}
              {/* <div className="mb-3" style={{ margin: "auto" }}>
              ค้นหาตามใบแจ้งขุน : {}
              <Searchinput />
            </div> */}
            </DivFromDown>
          </DivFromInRight>
          <DivFromInRight>
            <DivFromTop>
              <div style={{ margin: "-3px 5px 0px 0px" }}>
                <Icon size={20} icon={list} />
              </div>
              ผลการตัดแต่งซากโคผ่าซีก
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
                      <th>รหัสชิ้นเนื้อ</th>
                      <th>ชื่อชิ้นเนื้อ</th>
                      <th>เกรด</th>
                      <th>น้ำหนัก (กก.)</th>
                      <th>ราคา</th>
                      <th>จัดการ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {QuarterData &&
                    QuarterData.SearchQuarter &&
                    QuarterData.SearchQuarter.length > 0 ? (
                      QuarterData.SearchQuarter.map((prod) => (
                        <ListQuarter key={prod.id} imslaughter={prod} />
                        // <tr key={prod.id} style={{ textAlign: "center" }}>
                        //   <td>{prod.barcode}</td>
                        //   <td>{prod.beeftype.code.toUpperCase()}</td>
                        //   <td>{prod.beeftype.nameTH}</td>
                        //   <td>{prod.imslaughter.grade}</td>
                        //   <td>{prod.weight}</td>
                        //   <td>
                        //     {prod.price.toLocaleString(undefined, {
                        //       minimumFractionDigits: 2,
                        //       maximumFractionDigits: 2,
                        //     })}
                        //   </td>
                        //   <td>
                        //     {loadingdelete ? (
                        //       <Spinner
                        //         animation="border"
                        //         variant="primary"
                        //       />
                        //     ) : (
                        //       <Removebuttoncolor
                        //         onClick={handleSubmitDeletequarter({id:prod.id})}
                        //       >
                        //         <Removebutton />
                        //       </Removebuttoncolor>
                        //     )}
                        //   </td>
                        // </tr>
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
          </DivFromInRight>
        </DivFromRight>

        {/* <Footer/> */}
      </DivBase>
    </>
  );
};

export default Index;
