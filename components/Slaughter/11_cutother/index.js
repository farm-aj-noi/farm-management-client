import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Spinner } from "react-bootstrap";

import { Icon } from "react-icons-kit";
import { Table } from "react-bootstrap";
// import DatePicker from "react-datepicker";

import dayjs from "dayjs";
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
// import Footer from "../../Footer/index";
import ListChop from "./listchop";

import { Savebutton, Editbutton, Removebutton } from "../../../utils/button";
import { now } from "moment";
import Barcodebutton from "../99_Barcode/5_Chop";

import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

export const QUERYLIST = gql`
  query QUERYLIST($barcode: String) {
    LumpForCut(barcode: $barcode) {
      id
      beeftype {
        code
        nameTH
        BBE
        priceG2h
        priceG3
        priceG3h
        priceG4
        priceG4h
        priceG5
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

export const QUERY_CHOP = gql`
  query QUERY_CHOP($lump: String) {
    SearchChop(lump: $lump) {
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
      lump {
        id
      }
    }
  }
`;

const CREATE_CHOP = gql`
  mutation CREATE_CHOP(
    $weight: Float!
    $lump: String!
    $imslaughter: String!
    $beeftype: String!
  ) {
    createChop(
      weight: $weight
      lump: $lump
      imslaughter: $imslaughter
      beeftype: $beeftype
    ) {
      weight
      price
      barcode
      createdAt
      lump {
        id
      }
    }
  }
`;

global.globleweightother = 0;

const Index = () => {
  const [weightmain, setWeightmain] = useState(0);
  const [weightother, setWeightother] = useState(0);

  if (globleweightother !== weightother) {
    setWeightother(globleweightother);
  }
  // console.log("weightmain : " + weightmain + " , weightother : " + weightother+ " , globleweightother : " + globleweightother);

  const calculatedwight = async (data) => {
    let datacal = 0;
    data.forEach((element) => {
      // console.log(element.weight);
      datacal = datacal + element.weight;
      // setWeightother(weightother + element.weight);
      // console.log(datacal)
    });
    setWeightother(datacal);
    globleweightother = datacal;
  };

  

  const [edit, setEdit] = useState(false);
  const [datatest, setDatatest] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingquarter, setLoadingQuarter] = useState(false);
  const [loadingdelete, setLoadingDelete] = useState(false);
  const [barcode, setInputbarcode] = useState();
  const [barcodeAlert, setBarcodeAlert] = useState(false);
  const [code, setInputCode] = useState("");
  const [codeAlert, setCodeAlert] = useState(false);
  const [QUERY_CHOP_AGAIN, setInputQUERY_CHOP_AGAIN] = useState("");

  const [weightChop, setInputWeightChop] = useState("");
  const [weightChoppAlert, setWeightChopAlert] = useState(false);

  const refBarcode = useRef();
  const refBeeftype = useRef();
  const refWeight = useRef();

  // console.log(refBarcode)
  // console.log(new Date())
  // console.log(dayjs().$d)

  const { data: lumpData } = useQuery(QUERYLIST, {
    variables: {
      barcode: barcode,
    },
    onCompleted: (data) => {
      // console.log(data.LumpForCut)
      if (data.LumpForCut) {
        setWeightmain(data.LumpForCut.weight);
        setInputCode(data.LumpForCut.beeftype.code);
      } else {
        // setInputbarcode("");
        setWeightmain(0);
        globleweightother = 0;
      }
    },
  });

  // console.log(lumpData)

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

  const { data: chopData } = useQuery(QUERY_CHOP, {
    onCompleted: (data) => {
      // console.log(data.SearchChop);
      if (data.SearchChop) {
        setWeightother(0);
        calculatedwight(data.SearchChop);
      }
    },
    variables: {
      lump: lumpData && lumpData.LumpForCut ? lumpData.LumpForCut.id : "",
    },
  });

  const [createChop] = useMutation(CREATE_CHOP, {
    onCompleted: (data) => {
      setInputQUERY_CHOP_AGAIN(data.createChop.lump.id);
      autoPrint(data.createChop.barcode);
      globleweightother = globleweightother + data.createChop.weight;
    },
    refetchQueries: [
      {
        query: QUERY_CHOP,
        variables: {
          lump: lumpData && lumpData.LumpForCut ? lumpData.LumpForCut.id : "",
        },
      },
    ],
  });

  //autoprint
  const [autoprint, setAutoprint] = useState();
  const [barcodeautoprint, setBarcodeAutoprint] = useState();
  const autoPrint = async (e) => {
    // console.log(e)
    await setBarcodeAutoprint(e);
    await setAutoprint(true);
    setBarcodeAutoprint(null);
    setAutoprint(false);
  };

  const handleSubmitCreateChop = async () => {
    setLoadingQuarter(true);
    // console.log(halveData)
    await createChop({
      variables: {
        weight: +weightChop,
        lump: lumpData.LumpForCut.id,
        imslaughter: lumpData.LumpForCut.imslaughter.id,
        beeftype: BeefData.SearchBeeftypeLump.id,
      },
    });
    setLoadingQuarter(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (lumpData && lumpData.LumpForCut !== null) {
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
        !weightChop ||
        (lumpData && lumpData.LumpForCut === null) ||
        !lumpData.LumpForCut.weight ||
        weightChop > weightmain - weightother ||
        weightChop.toString() === (weightmain - weightother).toString()
      ) {
      } else {
        await handleSubmitCreateChop();
        refWeight.current.focus();
        setInputWeightChop("");
      }
    }
    // if (event.key === "Backspace" && weightChop.length === 0) {
    //   refBeeftype.current.focus();
    // }
  };

  useEffect(() => {
    if (weightChop <= 0) {
      setInputWeightChop("");
    }
  }, [weightChop]);

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
            ก้อนเนื้อ
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
                  lumpData &&
                  lumpData.LumpForCut === null && (
                    <label style={{ color: "red" }}>ไม่พบข้อมูล</label>
                  )
                )}
              </div>
            </DivFromInsideLeft>
            <DivFromInsideLeft>
              ชื่อเนื้อ :{" "}
              <Searchinput
                value={
                  lumpData && lumpData.LumpForCut !== null
                    ? lumpData.LumpForCut.beeftype.nameTH
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
                    lumpData && lumpData.LumpForCut !== null
                      ? lumpData.LumpForCut.weight.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                      : "ไม่พบข้อมูล"
                  }
                  disabled
                />
                <WightInputWC2 value="กก." disabled />
              </div>
            </DivFromInsideLeft>
            <DivFromInsideLeft>
              MFG :{" "}
              <div style={{ display: "inline-flex" }}>
                <Pickadate.InputPicker
                  disabled
                  initialState={{
                    selected: dayjs().$d,
                  }}
                  initialTranslation={TH}
                  style={{
                    display: "inline",
                    width: "200px",
                    padding: "0.375rem 0.75rem",
                    fontSize: "1rem",
                    fontWeight: "400",
                    lineHeight: "1.5",
                    color: "#495057",
                    backgroundColor: "#eeeeeebd",
                    backgroundClip: "padding-box",
                    border: "1px solid #ced4da",
                    /* border-radius: 0.25rem 0rem 0rem 0.25rem; */
                    borderRadius: "0.25rem",
                    transition:
                      "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
                  }}
                />
              </div>
            </DivFromInsideLeft>
            <DivFromInsideLeft>
              BBE :{" "}
              <div style={{ display: "inline-flex" }}>
                {lumpData && lumpData.LumpForCut !== null ? (
                  // console.log(lumpData.LumpForCut.beeftype.BBE)
                  <Pickadate.InputPicker
                    disabled
                    initialState={{
                      selected: dayjs().add(
                        lumpData.LumpForCut.beeftype.BBE,
                        "d"
                      ).$d,
                    }}
                    onChangeValue={({ value, date }) => {
                      handleDateChange(dayjs(date).format("YYYY-MM-DD"));
                      // console.log(value, date);
                    }}
                    initialTranslation={TH}
                    style={{
                      display: "inline",
                      width: "200px",
                      padding: "0.375rem 0.75rem",
                      fontSize: "1rem",
                      fontWeight: "400",
                      lineHeight: "1.5",
                      color: "#495057",
                      backgroundColor: "#eeeeeebd",
                      backgroundClip: "padding-box",
                      border: "1px solid #ced4da",
                      /* border-radius: 0.25rem 0rem 0rem 0.25rem; */
                      borderRadius: "0.25rem",
                      transition:
                        "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
                    }}
                  />
                ) : (
                  <Searchinput
                    value="ไม่พบข้อมูล"
                    style={{ backgroundColor: "#eeeeeebd" }}
                    disabled
                  />
                )}
              </div>
            </DivFromInsideLeft>
            <DivFromInsideLeft>
              ราคาต่อกก. :{" "}
              <div style={{ display: "inline-flex" }}>
                <WightInputWC1
                  style={{ backgroundColor: "#eeeeeebd" }}
                  value={
                    lumpData &&
                    lumpData.LumpForCut !== null &&
                    lumpData.LumpForCut.imslaughter.grade === "2.5"
                      ? lumpData.LumpForCut.beeftype.priceG2h.toLocaleString(
                          undefined,
                          {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }
                        )
                      : lumpData &&
                        lumpData.LumpForCut !== null &&
                        lumpData.LumpForCut.imslaughter.grade === "3"
                      ? lumpData.LumpForCut.beeftype.priceG3.toLocaleString(
                          undefined,
                          {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }
                        )
                      : lumpData &&
                        lumpData.LumpForCut !== null &&
                        lumpData.LumpForCut.imslaughter.grade === "3.5"
                      ? lumpData.LumpForCut.beeftype.priceG3h.toLocaleString(
                          undefined,
                          {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }
                        )
                      : lumpData &&
                        lumpData.LumpForCut !== null &&
                        lumpData.LumpForCut.imslaughter.grade === "4"
                      ? lumpData.LumpForCut.beeftype.priceG4.toLocaleString(
                          undefined,
                          {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }
                        )
                      : lumpData &&
                        lumpData.LumpForCut !== null &&
                        lumpData.LumpForCut.imslaughter.grade === "4.5"
                      ? lumpData.LumpForCut.beeftype.priceG4h.toLocaleString(
                          undefined,
                          {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }
                        )
                      : lumpData &&
                        lumpData.LumpForCut !== null &&
                        lumpData.LumpForCut.imslaughter.grade === "5"
                      ? lumpData.LumpForCut.beeftype.priceG5.toLocaleString(
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
                <WightInputWC2 value="บาท" disabled />
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
              รายละเอียดผลการตัดแต่งก้อนเนื้อ
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
                      value={weightChop}
                      style={{
                        width: 75,
                        borderColor: `${!weightChop ? "red" : ""}`,
                      }}
                      onChange={(event) => {
                        let input = event.target.value;
                        let value = input.replace(/[^0-9.+]/gi, "");

                        // console.log(input + "   "+value )

                        if (input !== value) {
                          // console.log("11111" )
                          setWeightChopAlert(true);
                        } else {
                          setWeightChopAlert(false);
                          setInputWeightChop(value);
                        }
                      }}
                      ref={refWeight}
                      onFocus={(e) => e.currentTarget.select()}
                      onKeyDown={handleKeyDownSubmit}
                    />
                    <WightInputWC2 value="กก." disabled />
                  </div>
                  {!weightChop && !weightChoppAlert ? (
                    <label
                      style={{
                        color: "red",
                        position: "absolute",
                        marginTop: "38px",
                      }}
                    >
                      กรุณากรอกน้ำหนัก
                    </label>
                  ) : weightChoppAlert ? (
                    <label
                      style={{
                        color: "red",
                        position: "absolute",
                        marginTop: "38px",
                      }}
                    >
                      กรุณากรอกตัวเลข เท่านั้น
                    </label>
                  ) : (lumpData && lumpData.LumpForCut === null) ||
                    !lumpData.LumpForCut.weight ||
                    weightChop > weightmain - weightother ? (
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
                    (lumpData && lumpData.LumpForCut === null) ||
                    !lumpData.LumpForCut.weight ||
                    (weightChop.toString() ===
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
                  onClick={handleSubmitCreateChop}
                  style={{
                    backgroundColor: `${
                      (BeefData && BeefData.SearchBeeftypeLump === null) ||
                      !weightChop ||
                      (lumpData && lumpData.LumpForCut === null) ||
                      !lumpData.LumpForCut.weight ||
                      weightChop > weightmain - weightother
                        ? "gray"
                        : ""
                    }`,
                  }}
                  disabled={
                    (BeefData && BeefData.SearchBeeftypeLump === null) ||
                    !weightChop ||
                    (lumpData && lumpData.LumpForCut === null) ||
                    !lumpData.LumpForCut.weight ||
                    weightChop > weightmain - weightother
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
              ผลการตัดแต่งก้อนเนื้อ
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
                    {chopData &&
                    chopData.SearchChop &&
                    chopData.SearchChop.length > 0 ? (
                      chopData.SearchChop.map((prod) => (
                        <ListChop
                          key={prod.id}
                          id={prod.id}
                          imslaughter={prod}
                        />
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
