import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";

import { Icon } from "react-icons-kit";
import { Table, Accordion, Card } from "react-bootstrap";

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
  query QUERY($numkun: String) {
    trace(numkun: $numkun) {
      numcow
      numkun
      namefarmer
      grade
      halves {
        id
        barcode
        createdAt
        beeftype {
          nameTH
        }
        quarters {
          barcode
        }
        transports {
          date
          name
          place
          note
        }
      }
      quarters {
        id
        barcode
        createdAt
        beeftype {
          nameTH
        }
        lumps {
          barcode
        }
        transports {
          date
          name
          place
          note
        }
      }
      lumps {
        id
        barcode
        createdAt
        beeftype {
          nameTH
        }
        chops {
          barcode
        }
        transports {
          date
          name
          place
          note
        }
      }
      chops {
        id
        barcode
        createdAt
        beeftype {
          nameTH
        }
        transports {
          date
          name
          place
          note
        }
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
      numkun: router.query.trackingId,
    },
  });

  // console.log(router.query.trackingId);
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      router.replace(
        `/slaughter/trace/[trackingId]`,
        `/slaughter/trace/${inputnumkun}`
      );
      setInputnumkun("");
    }
  };

  return (
    <>
      <DivBase
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 237.5px 712.5px 1fr",
          gridRowGap: "15px",
          gridColumnGap: "10px",
          // width:"950px",
          // margin:"auto"
        }}
      >
        <DivFrom style={{ gridColumnStart: "2", gridColumnEnd: "3" }}>
          <DivFromTop>
            <div style={{ margin: "-3px 5px 0px 0px" }}>
              <Icon size={20} icon={list} />
            </div>
            ติดตามสินค้า{" "}
          </DivFromTop>
          <DivFromDown
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gridRowGap: "5px",
            }}
          >
            <div className="mb-3" style={{ margin: "auto" }}>
              กรุณากรอกเลขใบแจ้งขุน : {}
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
        {data && data.trace ? (
          <>
            <DivFrom
              style={{
                width: "100%",
                gridRowStart: "2",
                gridRowEnd: "3",
                gridColumnStart: "2",
                gridColumnEnd: "4",
              }}
            >
              <DivFromTop>
                <div style={{ margin: "-3px 5px 0px 0px" }}>
                  <Icon size={20} icon={list} />
                </div>
                รายละเอียดโค
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
                  <div>ใบแจ้งขุน : {data.trace.numkun}</div>
                  <div>เบอร์โค : {data.trace.numcow}</div>
                  <div>เกรด : {data.trace.grade ? data.trace.grade : "-"}</div>
                  <div>เจ้าของ : {data.trace.namefarmer}</div>
                  <div></div>
                </div>
              </DivFromDown>
            </DivFrom>

            <DivFrom
              style={{
                width: "100%",
                gridRowStart: "3",
                gridRowEnd: "3",
                gridColumnStart: "2",
                gridColumnEnd: "4",
              }}
            >
              <DivFromTop>
                <div style={{ margin: "-3px 5px 0px 0px" }}>
                  <Icon size={20} icon={list} />
                </div>
                ข้อมูลgเนื้อโค
              </DivFromTop>
              <DivFromDown>
                <div style={{ margin: "auto", minWidth: "100%" }}>
                  <Accordion>
                    {data &&
                      data.trace &&
                      data.trace.halves &&
                      data.trace.halves.map((prod) =>
                        prod.quarters.length === 0 ? (
                          <Card>
                            <Card.Header>
                              <div
                                style={{
                                  display: "grid",
                                  gridTemplateColumns: "1fr 1fr 1fr 1fr",
                                  // width:"950px",
                                  // margin:"auto"
                                }}
                              >
                                <div style={{ margin: "auto 0" }}>
                                  บาร์โค๊ด : {prod.barcode}
                                </div>
                                <div style={{ margin: "auto 0" }}>
                                  ชื่อเนื้อ : {prod.beeftype.nameTH}
                                </div>
                                <div />
                                <Accordion.Toggle
                                  as={Button}
                                  variant="link"
                                  eventKey={prod.id}
                                  style={{
                                    float: "right",
                                    margin: "0px 0",
                                    padding: "5px 8px",
                                    color: "white",
                                    background: "#3bafda",
                                  }}
                                >
                                  รายละเอียด
                                </Accordion.Toggle>
                              </div>
                            </Card.Header>
                            <Accordion.Collapse eventKey={prod.id}>
                              <Card.Body>
                                <Table
                                  striped
                                  bordered
                                  responsive
                                  hover
                                  style={{ margin: "auto" }}
                                >
                                  <thead>
                                    <tr style={{ textAlign: "center" }}>
                                      <th>วันที่่</th>
                                      <th>เวลา</th>
                                      <th>ผู้รับ/ส่ง</th>
                                      <th>สถานที่</th>
                                      <th>หมายเหตุ</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr style={{ textAlign: "center" }}>
                                      <td>
                                        {prod.createdAt
                                          ? dayjs(prod.createdAt)
                                              .add(543, "y")
                                              .locale("th")
                                              .format("DD MMMM YYYY")
                                          : "ไม่ระบุ"}
                                      </td>
                                      <td>
                                        {prod.createdAt
                                          ? dayjs(prod.createdAt)
                                              .add(543, "y")
                                              .locale("th")
                                              .format("HH : MM น.")
                                          : "ไม่ระบุ"}
                                      </td>
                                      <td>-</td>
                                      <td>สหกรณ์</td>
                                      <td>-</td>
                                    </tr>
                                    {prod.transports &&
                                      prod.transports.map((prod) => (
                                        <tr style={{ textAlign: "center" }}>
                                          <td>
                                            {prod.date
                                              ? dayjs(prod.date)
                                                  .add(543, "y")
                                                  .locale("th")
                                                  .format("DD MMMM YYYY")
                                              : "ไม่ระบุ"}
                                          </td>
                                          <td>
                                            {prod.date
                                              ? dayjs(prod.date)
                                                  .add(543, "y")
                                                  .locale("th")
                                                  .format("HH : MM น.")
                                              : "ไม่ระบุ"}
                                          </td>
                                          <td>{prod.name}</td>
                                          <td>{prod.place}</td>
                                          <td>{prod.note}</td>
                                        </tr>
                                      ))}
                                  </tbody>
                                </Table>
                              </Card.Body>
                            </Accordion.Collapse>
                          </Card>
                        ) : (
                          ""
                        )
                      )}

                    {/* -------------------------------------------------------------------------- */}

                    {data &&
                      data.trace &&
                      data.trace.quarters &&
                      data.trace.quarters.map((prod) =>
                        prod.lumps.length === 0 ? (
                          <Card>
                            <Card.Header>
                              <div
                                style={{
                                  display: "grid",
                                  gridTemplateColumns: "1fr 1fr 1fr 1fr",
                                  // width:"950px",
                                  // margin:"auto"
                                }}
                              >
                                <div style={{ margin: "auto 0" }}>
                                  บาร์โค๊ด : {prod.barcode}
                                </div>
                                <div style={{ margin: "auto 0" }}>
                                  ชื่อเนื้อ : {prod.beeftype.nameTH}
                                </div>
                                <div />
                                <Accordion.Toggle
                                  as={Button}
                                  variant="link"
                                  eventKey={prod.id}
                                  style={{
                                    float: "right",
                                    margin: "0px 0",
                                    padding: "5px 8px",
                                    color: "white",
                                    background: "#3bafda",
                                  }}
                                >
                                  รายละเอียด
                                </Accordion.Toggle>
                              </div>
                            </Card.Header>
                            <Accordion.Collapse eventKey={prod.id}>
                              <Card.Body>
                                <Table
                                  striped
                                  bordered
                                  responsive
                                  hover
                                  style={{ margin: "auto" }}
                                >
                                  <thead>
                                    <tr style={{ textAlign: "center" }}>
                                      <th>วันที่่</th>
                                      <th>เวลา</th>
                                      <th>ผู้รับ/ส่ง</th>
                                      <th>สถานที่</th>
                                      <th>หมายเหตุ</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr style={{ textAlign: "center" }}>
                                      <td>
                                        {prod.createdAt
                                          ? dayjs(prod.createdAt)
                                              .add(543, "y")
                                              .locale("th")
                                              .format("DD MMMM YYYY")
                                          : "ไม่ระบุ"}
                                      </td>
                                      <td>
                                        {prod.createdAt
                                          ? dayjs(prod.createdAt)
                                              .add(543, "y")
                                              .locale("th")
                                              .format("HH : MM น.")
                                          : "ไม่ระบุ"}
                                      </td>
                                      <td>-</td>
                                      <td>สหกรณ์</td>
                                      <td>-</td>
                                    </tr>
                                    {prod.transports &&
                                      prod.transports.map((prod) => (
                                        <tr style={{ textAlign: "center" }}>
                                          <td>
                                            {prod.date
                                              ? dayjs(prod.date)
                                                  .add(543, "y")
                                                  .locale("th")
                                                  .format("DD MMMM YYYY")
                                              : "ไม่ระบุ"}
                                          </td>
                                          <td>
                                            {prod.date
                                              ? dayjs(prod.date)
                                                  .add(543, "y")
                                                  .locale("th")
                                                  .format("HH : MM น.")
                                              : "ไม่ระบุ"}
                                          </td>
                                          <td>{prod.name}</td>
                                          <td>{prod.place}</td>
                                          <td>{prod.note}</td>
                                        </tr>
                                      ))}
                                  </tbody>
                                </Table>
                              </Card.Body>
                            </Accordion.Collapse>
                          </Card>
                        ) : (
                          ""
                        )
                      )}

                    {/* -------------------------------------------------------------------------- */}

                    {data &&
                      data.trace &&
                      data.trace.lumps &&
                      data.trace.lumps.map((prod) =>
                        prod.chops.length === 0 ? (
                          <Card>
                            <Card.Header>
                              <div
                                style={{
                                  display: "grid",
                                  gridTemplateColumns: "1fr 1fr 1fr 1fr",
                                  // width:"950px",
                                  // margin:"auto"
                                }}
                              >
                                <div style={{ margin: "auto 0" }}>
                                  บาร์โค๊ด : {prod.barcode}
                                </div>
                                <div style={{ margin: "auto 0" }}>
                                  ชื่อเนื้อ : {prod.beeftype.nameTH}
                                </div>
                                <div />
                                <Accordion.Toggle
                                  as={Button}
                                  variant="link"
                                  eventKey={prod.id}
                                  style={{
                                    float: "right",
                                    margin: "0px 0",
                                    padding: "5px 8px",
                                    color: "white",
                                    background: "#3bafda",
                                  }}
                                >
                                  รายละเอียด
                                </Accordion.Toggle>
                              </div>
                            </Card.Header>
                            <Accordion.Collapse eventKey={prod.id}>
                              <Card.Body>
                                <Table
                                  striped
                                  bordered
                                  responsive
                                  hover
                                  style={{ margin: "auto" }}
                                >
                                  <thead>
                                    <tr style={{ textAlign: "center" }}>
                                      <th>วันที่่</th>
                                      <th>เวลา</th>
                                      <th>ผู้รับ/ส่ง</th>
                                      <th>สถานที่</th>
                                      <th>หมายเหตุ</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr style={{ textAlign: "center" }}>
                                      <td>
                                        {prod.createdAt
                                          ? dayjs(prod.createdAt)
                                              .add(543, "y")
                                              .locale("th")
                                              .format("DD MMMM YYYY")
                                          : "ไม่ระบุ"}
                                      </td>
                                      <td>
                                        {prod.createdAt
                                          ? dayjs(prod.createdAt)
                                              .add(543, "y")
                                              .locale("th")
                                              .format("HH : MM น.")
                                          : "ไม่ระบุ"}
                                      </td>
                                      <td>-</td>
                                      <td>สหกรณ์</td>
                                      <td>-</td>
                                    </tr>
                                    {prod.transports &&
                                      prod.transports.map((prod) => (
                                        <tr style={{ textAlign: "center" }}>
                                          <td>
                                            {prod.date
                                              ? dayjs(prod.date)
                                                  .add(543, "y")
                                                  .locale("th")
                                                  .format("DD MMMM YYYY")
                                              : "ไม่ระบุ"}
                                          </td>
                                          <td>
                                            {prod.date
                                              ? dayjs(prod.date)
                                                  .add(543, "y")
                                                  .locale("th")
                                                  .format("HH : MM น.")
                                              : "ไม่ระบุ"}
                                          </td>
                                          <td>{prod.name}</td>
                                          <td>{prod.place}</td>
                                          <td>{prod.note}</td>
                                        </tr>
                                      ))}
                                  </tbody>
                                </Table>
                              </Card.Body>
                            </Accordion.Collapse>
                          </Card>
                        ) : (
                          ""
                        )
                      )}

                    {/* -------------------------------------------------------------------------- */}

                    {data &&
                      data.trace &&
                      data.trace.chops &&
                      data.trace.chops.map((prod) => (
                        <Card>
                          <Card.Header>
                            <div
                              style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr 1fr 1fr",
                                // width:"950px",
                                // margin:"auto"
                              }}
                            >
                              <div style={{ margin: "auto 0" }}>
                                บาร์โค๊ด : {prod.barcode}
                              </div>
                              <div style={{ margin: "auto 0" }}>
                                ชื่อเนื้อ : {prod.beeftype.nameTH}
                              </div>
                              <div />
                              <Accordion.Toggle
                                as={Button}
                                variant="link"
                                eventKey={prod.id}
                                style={{
                                  float: "right",
                                  margin: "0px 0",
                                  padding: "5px 8px",
                                  color: "white",
                                  background: "#3bafda",
                                }}
                              >
                                รายละเอียด
                              </Accordion.Toggle>
                            </div>
                          </Card.Header>
                          <Accordion.Collapse eventKey={prod.id}>
                            <Card.Body>
                              <Table
                                striped
                                bordered
                                responsive
                                hover
                                style={{ margin: "auto" }}
                              >
                                <thead>
                                  <tr style={{ textAlign: "center" }}>
                                    <th>วันที่่</th>
                                    <th>เวลา</th>
                                    <th>ผู้รับ/ส่ง</th>
                                    <th>สถานที่</th>
                                    <th>หมายเหตุ</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr style={{ textAlign: "center" }}>
                                    <td>
                                      {prod.createdAt
                                        ? dayjs(prod.createdAt)
                                            .add(543, "y")
                                            .locale("th")
                                            .format("DD MMMM YYYY")
                                        : "ไม่ระบุ"}
                                    </td>
                                    <td>
                                      {prod.createdAt
                                        ? dayjs(prod.createdAt)
                                            .add(543, "y")
                                            .locale("th")
                                            .format("HH : MM น.")
                                        : "ไม่ระบุ"}
                                    </td>
                                    <td>-</td>
                                    <td>สหกรณ์</td>
                                    <td>-</td>
                                  </tr>
                                  {prod.transports &&
                                    prod.transports.map((prod) => (
                                      <tr style={{ textAlign: "center" }}>
                                        <td>
                                          {prod.date
                                            ? dayjs(prod.date)
                                                .add(543, "y")
                                                .locale("th")
                                                .format("DD MMMM YYYY")
                                            : "ไม่ระบุ"}
                                        </td>
                                        <td>
                                          {prod.date
                                            ? dayjs(prod.date)
                                                .add(543, "y")
                                                .locale("th")
                                                .format("HH : MM น.")
                                            : "ไม่ระบุ"}
                                        </td>
                                        <td>{prod.name}</td>
                                        <td>{prod.place}</td>
                                        <td>{prod.note}</td>
                                      </tr>
                                    ))}
                                </tbody>
                              </Table>
                            </Card.Body>
                          </Accordion.Collapse>
                        </Card>
                      ))}
                  </Accordion>
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
