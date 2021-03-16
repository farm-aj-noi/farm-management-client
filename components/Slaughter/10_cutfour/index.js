import React, { useState, useRef, useEffect } from "react";
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
} from "./ListcuttwoFrom";
import ListLump from "./listlump";
// import Footer from "../../Footer/index";

import { Savebutton, Editbutton, Removebutton } from "../../../utils/button";
import { now } from "moment";
import Barcodebutton from "../99_Barcode/4_Lump";

import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

export const QUERYLIST = gql`
  query QUERYLIST($barcode: String) {
    QuarterForCut(barcode: $barcode) {
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
        id
        grade
      }
    }
  }
`;

export const QUERYTYPE = gql`
  query QUERYTYPE($code: String) {
    SearchBeeftypeLump(code: $code) {
      id
      code
      nameTH
    }
  }
`;

export const QUERY_LUMP = gql`
  query QUERY_LUMP($quarter: String) {
    SearchLump(quarter: $quarter) {
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
      quarter {
        id
      }
    }
  }
`;

const CREATE_LUMP = gql`
  mutation CREATE_LUMP(
    $weight: Float!
    $quarter: String!
    $imslaughter: String!
    $beeftype: String!
  ) {
    createLump(
      weight: $weight
      quarter: $quarter
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

// export var globleweight = 0
// export var globleweight = React.createContext(0);
global.globleweight = 0;

const Index = () => {
  // global.globleweight
  const [weightmain, setWeightmain] = useState(0);
  const [weightother, setWeightother] = useState(globleweight);

  if (globleweight !== weightother) {
    setWeightother(globleweight);
  }

  // console.log("weightmain : " + weightmain + " , weightother : " + weightother+ " , globleweight : " + globleweight);

  const calculatedwight = async (data) => {
    let datacal = 0;
    data.forEach((element) => {
      // console.log(element.weight);
      datacal = datacal + element.weight;
      // setWeightother(weightother + element.weight);
      // console.log(datacal)
    });
    setWeightother(datacal);
    globleweight = datacal;
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
  const [weightLump, setInputWeightLump] = useState("");
  const [weightLumpAlert, setWeightLumpAlert] = useState(false);

  const refBarcode = useRef();
  const refBeeftype = useRef();
  const refWeight = useRef();

  const { data: quarterData } = useQuery(QUERYLIST, {
    variables: {
      barcode: barcode,
    },
    onCompleted: (data) => {
      // console.log(data.LumpForCut)
      if (data.QuarterForCut) {
        setWeightmain(data.QuarterForCut.weight);
      } else {
        // setInputbarcode("");
        setWeightmain(0);
        globleweight = 0;
      }
    },
  });
  const { data: BeefData } = useQuery(QUERYTYPE, {
    variables: {
      code: code,
    },
    onCompleted: (data) => {
      // console.log(data.LumpForCut)
      if (!data.SearchBeeftypeLump) {
        // setInputCode("");
      }
    },
  });

  const { data: LumpData } = useQuery(QUERY_LUMP, {
    onCompleted: (data) => {
      // console.log(data.SearchLump);
      if (data.SearchLump) {
        setWeightother(0);
        calculatedwight(data.SearchLump);
      }
    },
    variables: {
      quarter:
        quarterData && quarterData.QuarterForCut
          ? quarterData.QuarterForCut.id
          : "",
    },
  });

  const [createLump] = useMutation(CREATE_LUMP, {
    onCompleted: (data) => {
      autoPrint(data.createLump.barcode);
      globleweight = globleweight + data.createLump.weight;
    },
    refetchQueries: [
      {
        query: QUERY_LUMP,
        variables: {
          quarter:
            quarterData && quarterData.QuarterForCut
              ? quarterData.QuarterForCut.id
              : "",
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

  const handleSubmitCreateLump = async () => {
    setLoadingQuarter(true);
    await createLump({
      variables: {
        weight: +weightLump,
        quarter: quarterData.QuarterForCut.id,
        imslaughter: quarterData.QuarterForCut.imslaughter.id,
        beeftype: BeefData.SearchBeeftypeLump.id,
      },
    });
    setLoadingQuarter(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (quarterData && quarterData.QuarterForCut !== null) {
        refBeeftype.current.focus();
      } else {
        refBarcode.current.focus();
        // setInputbarcode("");
      }
    }
  };

  const handleKeyDownBeeftype = (event) => {
    if (event.key === "Enter") {
      if (BeefData.SearchBeeftypeLump) {
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
        (BeefData && BeefData.SearchBeeftypeLump === null) ||
        !weightLump ||
        (quarterData && quarterData.QuarterForCut === null) ||
        !quarterData.QuarterForCut.weight ||
        weightLump > weightmain - weightother ||
        weightLump.toString() === (weightmain - weightother).toString()
      ) {
      } else {
        await handleSubmitCreateLump();
        refWeight.current.focus();
        setInputWeightLump("");
      }
    }
    // if (event.key === "Backspace" && weightLump.length === 0) {
    //   refBeeftype.current.focus();
    // }
  };

  useEffect(() => {
    if (weightLump <= 0) {
      setInputWeightLump("");
    }
  }, [weightLump]);

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
            ซากโคสี่เสี้ยว
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
                    }
                  }}
                  placeholder="กรุณากรอกบาร์โค๊ด"
                  value={barcode}
                  onKeyDown={handleKeyDown}
                  ref={refBarcode}
                  autoFocus
                  onFocus={(e) => e.currentTarget.select()}
                  style={{ borderColor: `${!barcode ? "red" : ""}` }}
                />
                {!barcode && !barcodeAlert ? (
                  <label style={{ color: "red" }}>กรุณากรอกบาร์โค้ด</label>
                ) : barcodeAlert ? (
                  <label style={{ color: "red" }}>
                    กรุณากรอกตัวเลข,ภาษาอังกฤษ เท่านั้น
                  </label>
                ) : (
                  quarterData &&
                  quarterData.QuarterForCut === null && (
                    <label style={{ color: "red" }}>ไม่พบข้อมูล</label>
                  )
                )}
              </div>
            </DivFromInsideLeft>
            <DivFromInsideLeft>
              ชื่อเนื้อ :{" "}
              <Searchinput
                value={
                  quarterData && quarterData.QuarterForCut !== null
                    ? quarterData.QuarterForCut.beeftype.nameTH
                    : "ไม่พบข้อมูล"
                }
                style={{ backgroundColor: "#eeeeeebd" }}
                disabled
              />
            </DivFromInsideLeft>
            <DivFromInsideLeft>
              น้ำหนักเย็น :{" "}
              <div style={{ display: "inline-flex" }}>
                <WightInputWC1
                  style={{ backgroundColor: "#eeeeeebd" }}
                  value={
                    quarterData && quarterData.QuarterForCut !== null
                      ? quarterData.QuarterForCut.weight.toLocaleString(
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
          </DivFromDown>
        </DivFromLeft>

        <DivFromRight>
          <DivFromInRight>
            <DivFromTop>
              <div style={{ margin: "-3px 5px 0px 0px" }}>
                <Icon size={20} icon={list} />
              </div>
              รายละเอียดผลการตัดแต่งซากโคสี่เสี้ยว
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
                    ref={refBeeftype}
                    onFocus={(e) => e.currentTarget.select()}
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
                    BeefData && BeefData.SearchBeeftypeLump !== null
                      ? BeefData.SearchBeeftypeLump.nameTH
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
                      placeholder="กรอกน้ำหนัก"
                      value={weightLump}
                      style={{
                        width: 75,
                        borderColor: `${!weightLump ? "red" : ""}`,
                      }}
                      onChange={(event) => {
                        let input = event.target.value;
                        let value = input.replace(/[^0-9.+]/gi, "");

                        // console.log(input + "   "+value )

                        if (input !== value) {
                          // console.log("11111" )
                          setWeightLumpAlert(true);
                        } else {
                          setWeightLumpAlert(false);
                          setInputWeightLump(value);
                        }
                      }}
                      ref={refWeight}
                      onFocus={(e) => e.currentTarget.select()}
                      onKeyDown={handleKeyDownSubmit}
                    />
                    <WightInputWC2 value="กก." disabled />
                  </div>
                  {!weightLump && !weightLumpAlert ? (
                    <label
                      style={{
                        color: "red",
                        position: "absolute",
                        marginTop: "38px",
                      }}
                    >
                      กรุณากรอกน้ำหนัก
                    </label>
                  ) : weightLumpAlert ? (
                    <label
                      style={{
                        color: "red",
                        position: "absolute",
                        marginTop: "38px",
                      }}
                    >
                      กรุณากรอกตัวเลข เท่านั้น
                    </label>
                  ) : (quarterData && quarterData.QuarterForCut === null) ||
                    !quarterData.QuarterForCut.weight ||
                    weightLump > weightmain - weightother ? (
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
                    (quarterData && quarterData.QuarterForCut === null) ||
                    !quarterData.QuarterForCut.weight ||
                    (weightLump.toString() ===
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
              ) : (
                <Gobutton
                  onClick={handleSubmitCreateLump}
                  style={{
                    backgroundColor: `${
                      (BeefData && BeefData.SearchBeeftypeLump === null) ||
                      !weightLump ||
                      (quarterData && quarterData.QuarterForCut === null) ||
                      !quarterData.QuarterForCut.weight ||
                      weightLump > weightmain - weightother ||
                      weightLump.toString() ===
                        (weightmain - weightother).toString()
                        ? "gray"
                        : ""
                    }`,
                  }}
                  disabled={
                    (BeefData && BeefData.SearchBeeftypeLump === null) ||
                    !weightLump ||
                    (quarterData && quarterData.QuarterForCut === null) ||
                    !quarterData.QuarterForCut.weight ||
                    weightLump > weightmain - weightother ||
                    weightLump.toString() ===
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
              ผลการตัดแต่งซากโคสี่เสี้ยว
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
                    {LumpData &&
                    LumpData.SearchLump &&
                    LumpData.SearchLump.length > 0 ? (
                      LumpData.SearchLump.map((prod) => (
                        <ListLump key={prod.id} imslaughter={prod} />
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
