import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";

import { Icon } from "react-icons-kit";
import { Table } from "react-bootstrap";

import { Form, Row, Col, Tab, Nav } from "react-bootstrap";
import { ic_notifications_active } from "react-icons-kit/md/ic_notifications_active";
import { ic_info_outline } from "react-icons-kit/md/ic_info_outline";
import { ic_create } from "react-icons-kit/md/ic_create";
import { Button } from "react-bootstrap";

// import DatePicker from "react-datepicker";

import dayjs from "dayjs";
import Pickadate from "pickadate/builds/react-dom";
import TH from "pickadate/builds/translations/th_TH";

import { list } from "react-icons-kit/fa/list";
import { DivBase } from "../../../utils/divBase";
import {
  DivFrom,
  DivFromTop,
  DivFromDown,
  Searchinput,
  Gobutton,
  Wightinput,
} from "./ListcuttwoFrom";
// import Footer from "../../Footer/index";

import { Savebutton, Editbutton } from "../../../utils/button";
import { now } from "moment";
import ListImport from "./listImport";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

export const QUERY = gql`
  query QUERY($barcode: String) {
    Tracking(barcode: $barcode) {
      barcode
      beeftype
      grade
      weight
      price
      MFG
      BBE
      farmer
      numcow
      numkun
      pun
      age
      weightcow
    }
  }
`;

export const QUERY_INFO = gql`
  query QUERY_INFO($numkun: String) {
    Trackinginfo(numkun: $numkun) {
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

const Index = () => {
  const router = useRouter();
  // console.log(router.query.trackingId);
  const [edit, setEdit] = useState(false);
  const [tab, setTab] = useState(1);

  // calendar
  const [inputnumkun, setInputnumkun] = useState();
  const [selectedDate, handleDateChange] = useState("");
  // console.log(selectedDate)

  const { data, loading, error, refetch } = useQuery(QUERY, {
    variables: {
      barcode: router.query.trackingId,
    },
  });

  const { data: datainfo } = useQuery(QUERY_INFO, {
    variables: {
      numkun: data ? data.Tracking.numkun : "",
    },
  });

  console.log(datainfo);
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      router.replace(
        `/slaughter/tracking/[trackingId]`,
        `/slaughter/tracking/${inputnumkun}`
      );
      setInputnumkun("");
    }
  };

  return (
    <>
      <DivBase
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 237.5px 950px 1fr",
          gridRowGap: "15px",
          gridColumnGap: "10px",
          // width:"950px",
          // margin:"auto"
        }}
      >
        <DivFrom
          style={{ gridColumnStart: "2", gridColumnEnd: "4", width: "100%" }}
        >
          <DivFromTop>
            <div style={{ margin: "-3px 5px 0px 0px" }}>
              <Icon size={20} icon={list} />
            </div>
            ตรวจสอบสินค้าย้อนกลับ{" "}
          </DivFromTop>
          <DivFromDown
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gridRowGap: "5px",
            }}
          >
            <div className="mb-3" style={{ margin: "auto" }}>
              กรุณากรอกบาร์โค๊ด : { }
              <Searchinput
                value={inputnumkun}
                onChange={(event) => setInputnumkun(event.target.value)}
                style={{
                  marginRight: 10,
                }}
                autoFocus
                onFocus={(e) => e.currentTarget.select()}
                onKeyDown={handleKeyDown}
              />
              <Link href="[trackingId]" as={`${inputnumkun}`}>
                <Gobutton onClick={() => refetch()}>ค้นหา</Gobutton>
              </Link>
            </div>
          </DivFromDown>
        </DivFrom>
        {data && data.Tracking.barcode ? (
          <>
            <DivFrom
              style={{
                width: "100%",
                marginTop: "0",
                gridRowStart: "2",
                gridRowEnd: "4",
                gridColumnStart: "2",
              }}
            >
              <DivFromTop>
                <div style={{ margin: "-3px 5px 0px 0px" }}>
                  <Icon size={20} icon={list} />
                </div>
                รายการตรวจสอบ{" "}
              </DivFromTop>
              <DivFromDown>
                <div style={{ margin: "auto", minWidth: "100%" }}>
                  <Tab.Container id="left-tabs-example" defaultActiveKey="1">
                    <Row>
                      <Col>
                        <Nav variant="pills" className="flex-column">
                          <Nav.Item>
                            <Nav.Link eventKey="1" onClick={() => setTab(1)}>
                              ข้อมูลทั่วไปของโค
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link eventKey="2" onClick={() => setTab(2)}>
                              ประวัติการขุน
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link eventKey="3" onClick={() => setTab(3)}>
                              ประวัติการให้ยา
                            </Nav.Link>
                          </Nav.Item>
                        </Nav>
                      </Col>
                    </Row>
                  </Tab.Container>
                </div>
              </DivFromDown>
            </DivFrom>

            <DivFrom
              style={{
                width: "100%",
                gridRowStart: "2",
                gridRowEnd: "3",
                gridColumnStart: "3",
              }}
            >
              <DivFromTop>
                <div style={{ margin: "-3px 5px 0px 0px" }}>
                  <Icon size={20} icon={list} />
                </div>
                รายละเอียดสินค้า
              </DivFromTop>
              <DivFromDown>
                <div
                  style={{
                    margin: "auto",
                    minWidth: "100%",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr 1fr",
                    gridRowGap: "15px",
                  }}
                >
                  <div>บาร์โค๊ด : {data.Tracking.barcode}</div>
                  <div>ประเภทเนื้อ : {data.Tracking.beeftype}</div>
                  <div>เกรด : {data.Tracking.grade}</div>
                  <div></div>
                  <div>
                    ปริมาณสินค้า :{" "}
                    {data.Tracking.weight.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{" "}
                    กก.
                  </div>
                  <div>
                    ราคา :{" "}
                    {data.Tracking.price
                      ? data.Tracking.price.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }) + " บาท"
                      : "ไม่ระบุ"}
                  </div>
                  <div>
                    วันผลิต :{" "}
                    {dayjs(data.Tracking.MFG)
                      .add(543, "y")
                      .locale("th")
                      .format("DD MMMM YYYY")}
                  </div>
                  <div>
                    วันหมดอายุ :{" "}
                    {data.Tracking.BBE
                      ? dayjs(data.Tracking.BBE)
                        .add(543, "y")
                        .locale("th")
                        .format("DD MMMM YYYY")
                      : "ไม่ระบุ"}
                  </div>
                </div>
              </DivFromDown>
            </DivFrom>

            <DivFrom
              style={{
                width: "100%",
                gridRowStart: "3",
                gridRowEnd: "3",
                gridColumnStart: "3",
              }}
            >
              <DivFromTop>
                <div style={{ margin: "-3px 5px 0px 0px" }}>
                  <Icon size={20} icon={list} />
                </div>
                {tab === 1
                  ? "ข้อมูลทั่วไปของโค"
                  : tab === 2
                    ? "ประวัติการขุน"
                    : tab === 3
                      ? "ประวัติการให้ยา"
                      : ""}
              </DivFromTop>
              <DivFromDown>
                <div style={{ margin: "auto", minWidth: "100%" }}>
                  {tab === 1 ? (
                    <div
                      style={{
                        margin: "auto",
                        minWidth: "100%",
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gridRowGap: "15px",
                      }}
                    >
                      <div>เจ้าของโค : {data.Tracking.farmer}</div>
                      <div />
                      <div>ใบแจ้งขุน : {data.Tracking.numkun}</div>
                      <div>เบอร์โค : {data.Tracking.numcow}</div>
                      <div>พันธุ์โค : {data.Tracking.pun}</div>
                      {/* <div>อายุ : {data.Tracking.age}</div> */}
                      <div>
                        น้ำหนัก :{" "}
                        {data.Tracking.weightcow.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }) + " กก."}
                      </div>
                    </div>
                  ) : tab === 2 ? (
                    <Table
                      striped
                      bordered
                      responsive
                      hover
                      style={{ margin: "auto" }}
                    >
                      <thead>
                        <tr style={{ textAlign: "center" }}>
                          <th style={{ width: "140px" }}>
                            วันที่่เริ่มให้อาหาร
                          </th>
                          <th style={{ width: "140px" }}>
                            วันที่่สุดท้ายให้อาหาร
                          </th>
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
                  ) : tab === 3 ? (
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
                                {dayjs(prod.date)
                                  .add(543, "y")
                                  .locale("th")
                                  .format("DD MMMM YYYY")}
                              </td>
                              <td>{prod.nofity}</td>
                              <td>
                                {dayjs(prod.date)
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
                  ) : (
                    ""
                  )}
                </div>
              </DivFromDown>
            </DivFrom>
          </>
        ) : (
          <DivFrom style={{ gridColumnStart: "2", gridColumnEnd: "3" }}>
            <DivFromTop>
              <div style={{ margin: "-3px 5px 0px 0px" }}>
                <Icon size={20} icon={list} />
              </div>
              ผลการค้นหา{" "}
            </DivFromTop>
            <DivFromDown
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gridRowGap: "5px",
              }}
            >
              <div
                className="mb-3"
                style={{
                  margin: "auto",
                  textAlign: "center",
                  color: "#ff0000",
                }}
              >
                <Icon size={150} icon={ic_info_outline} />
                <br />
                ไม่พบข้อมูล
              </div>
            </DivFromDown>
          </DivFrom>
        )}

        {/* <Footer/> */}
      </DivBase>
    </>
  );
};

export default Index;
