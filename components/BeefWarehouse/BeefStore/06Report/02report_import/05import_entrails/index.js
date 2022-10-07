import React, { useState } from "react";

import { Table } from "react-bootstrap";
import {
  DivFrom,
  DivFromTop,
  DivFromDown,
  HeaderColor,
} from "../../ReportFrom.js";
import { DivBase } from "../../../../../../utils/divBase";

import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";
import { iosSearchStrong } from "react-icons-kit/ionicons/iosSearchStrong";

import Paper_import from "./Paper_import.js";
import Excel_import from "./Excel_import.js";

import Nav_imports from "../Nav_import";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import dayjs from "dayjs";

export const IMPOERTENTRAILSEARCH = gql`
  query IMPOERTENTRAILSEARCH(
    $namefarmer: String
    $userName: String
    $startdate: String
    $enddate: String
    $beefroom: String
  ) {
    imentrailSearch(
      namefarmer: $namefarmer
      userName: $userName
      startdate: $startdate
      enddate: $enddate
      beefroom: $beefroom
    ) {
      importdate
      user {
        name
      }
      entrail {
        offal
        toe
        head
        skin
        liver
        fat
        onkale
        tail
        gallbladder
        scrap
        barcode
        imslaughter {
          numcow
          namefarmer
        }
      }
      beefroom {
        roomname
      }
    }
  }
`;

export const QUERYROOM = gql`
  query Query {
    allRoom {
      id
      roomname
    }
  }
`;

const index = () => {
  const { data: dataroom } = useQuery(QUERYROOM);
  const [inputnamefarmer, SetInputnamefarmer] = useState("");
  const [inputusername, SetInputusername] = useState("");
  const [selectedstartdate, SetStartDateChange] = useState("");
  const [selectedenddate, SetEndDateChange] = useState("");
  const [selectedbeefroom, setselectbeefroom] = useState("");
  const { data, loading, error } = useQuery(IMPOERTENTRAILSEARCH, {
    variables: {
      startdate: selectedstartdate,
      enddate: selectedenddate,
      namefarmer: inputnamefarmer,
      userName: inputusername,
      beefroom: selectedbeefroom,
    },
  });
  return (
    <div style={{ marginTop: "100px" }}>
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <HeaderColor
            style={{
              width: "fit-content",
              height: "fit-content",
              padding: "5px 30px",
            }}
          >
            ออกรายงานนำเข้าซากโคส่วนอื่น ๆ
          </HeaderColor>
        </div>
        <DivBase
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 270px 1250px 1fr",
            gridRowGap: "15px",
            gridColumnGap: "20px",
            textAlign: "start",
          }}
        >
          <>
            <DivFrom
              style={{
                width: "100%",
                marginTop: "0",
                gridRowStart: "2",
                gridRowEnd: "5",
                gridColumnStart: "2",
              }}
            >
              <Nav_imports Sidenumber={5} />
            </DivFrom>
            <DivFrom
              style={{
                width: "100%",
                gridRowStart: "2",
                gridRowEnd: "3",
                gridColumnStart: "3",
                marginTop: "0px",
              }}
            >
              <DivFromTop>
                <div style={{ margin: "-3px 5px 0px 0px" }}>
                  <Icon size={20} icon={iosSearchStrong} />
                </div>
                ค้นหารายการ
              </DivFromTop>
              <DivFromDown>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ fontSize: "20px" }}>
                    <label
                      style={{
                        textAlign: "center",
                        fontSize: "18px",
                        marginLeft: "10px",
                        marginRight: "10px",
                      }}
                    >
                      เจ้าของซาก
                    </label>
                    <input
                      style={{
                        height: "35px",
                        width: "110px",
                        borderRadius: "4px",
                        border: "1px solid #AFAFAF",
                        fontSize: "16px",
                        textAlign: "center",
                      }}
                      onChange={(event) =>
                        SetInputnamefarmer(event.target.value)
                      }
                    />
                    <label
                      style={{
                        textAlign: "center",
                        fontSize: "18px",
                        marginRight: "10px",
                        marginLeft: "10px",
                      }}
                    >
                      ผู้นำเข้า
                    </label>
                    <input
                      style={{
                        height: "35px",
                        width: "110px",
                        borderRadius: "4px",
                        border: "1px solid #AFAFAF",
                        fontSize: "16px",
                        textAlign: "center",
                        marginRight: "10px",
                      }}
                      onChange={(event) => SetInputusername(event.target.value)}
                    />
                    <label
                      style={{
                        textAlign: "center",
                        fontSize: "18px",
                        marginRight: "10px",
                      }}
                    >
                      ตำแหน่ง
                    </label>
                    <select
                      name="roomname"
                      id="roomname"
                      style={{
                        height: "35px",
                        width: "110px",
                        border: "1px solid #AFAFAF",
                        borderRadius: "4px ",
                        textAlign: "center",
                        fontSize: "16px",
                        marginRight: "10px",
                      }}
                      onChange={(event) => setselectbeefroom(event.target.value)}
                    >
                      <option value="">ห้อง</option>
                      {dataroom &&
                        dataroom.allRoom.map((prod) => (
                          <option key={prod.id} value={prod.id}>
                            {prod.roomname}
                          </option>
                        ))}
                    </select>
                    <label
                      style={{
                        textAlign: "center",
                        fontSize: "18px",
                        marginRight: "10px",
                      }}
                    >
                      วันที่นำเข้า
                    </label>
                    <input
                      type="date"
                      id="ex_chill"
                      name="date"
                      style={{
                        height: "35px",
                        border: "1px solid #AFAFAF",
                        borderRadius: "4px",
                        color: "#AFAFAF",
                        textAlign: "center",
                      }}
                      onChange={(event) =>
                        SetStartDateChange(event.target.value)
                      }
                    ></input>
                    <label
                      style={{
                        textAlign: "center",
                        fontSize: "18px",
                        margin: "10px 10px",
                      }}
                    >
                      ถึงวันที่
                    </label>
                    <input
                      type="date"
                      id="ex_chill"
                      name="date"
                      style={{
                        height: "35px",
                        border: "1px solid #AFAFAF",
                        borderRadius: "4px",
                        color: "#AFAFAF",
                        textAlign: "center",
                      }}
                      onChange={(event) => SetEndDateChange(event.target.value)}
                    ></input>
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
                gridColumnEnd: "3",
              }}
            >
              <DivFromTop>
                <div style={{ margin: "-3px 5px 0px 0px" }}>
                  <Icon size={20} icon={list} />
                </div>
                รายการที่ค้นหา
              </DivFromTop>
              <DivFromDown>
                <div style={{ height: `${data && data.imentrailSearch.length > 6 ? "380px" : ""}`, overflowY: "auto" }}>
                  <Table
                    striped
                    bordered
                    responsive
                    hover
                    style={{ margin: "auto" }}
                  >
                    {/* <LoadingSmall/> */}
                    <thead>
                      <tr style={{ textAlign: "center", fontSize: "18px" }}>
                        <th>เจ้าของซาก</th>
                        <th>วันที่นำเข้า</th>
                        <th>เวลา</th>
                        <th>ทะเบียนขุน</th>
                        <th>เครื่องใน</th>
                        <th>ปลายเท้า</th>
                        <th>หัว</th>
                        <th>หนังสด</th>
                        <th>ตับ</th>
                        <th>ไขมันอุ่น</th>
                        <th>องแคล</th>
                        <th>หาง</th>
                        <th>ถุงน้ำดี</th>
                        <th>เศษซาก</th>
                        <th>รหัสบาร์โค้ด</th>
                        <th>ห้อง</th>
                        <th>ผู้นำเข้า</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data && data.imentrailSearch.length > 0 ? (data.imentrailSearch.map((prod) => (
                        <tr style={{ textAlign: "center" }}>
                          <td>{prod.entrail.imslaughter.namefarmer}</td>
                          <td>
                            {dayjs(prod.importdate)
                              .add(543, "year")
                              .format("DD/MM/YYYY")}
                          </td>
                          <td>
                            {dayjs(prod.importdate)
                              .add(543, "year")
                              .format("h:mm:ss A")}
                          </td>
                          <td>{prod.entrail.imslaughter.numcow}</td>
                          <td>{prod.entrail.offal}</td>
                          <td>{prod.entrail.toe}</td>
                          <td>{prod.entrail.head}</td>
                          <td>{prod.entrail.skin}</td>
                          <td>{prod.entrail.liver}</td>
                          <td>{prod.entrail.fat}</td>
                          <td>{prod.entrail.onkale}</td>
                          <td>{prod.entrail.tail}</td>
                          <td>{prod.entrail.gallbladder}</td>
                          <td>{prod.entrail.scrap}</td>
                          <td>{prod.entrail.barcode}</td>
                          <td>{prod.beefroom.roomname}</td>
                          <td>{prod.user.name}</td>
                        </tr>
                      ))) : (<tr style={{ textAlign: "center" }}>
                        <td colSpan="17">ไม่พบข้อมูล</td>
                      </tr>)
                      }
                    </tbody>
                  </Table>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {data && data.imentrailSearch.length > 0 ? (
                    <div>
                      <Paper_import prod={data.imentrailSearch} />
                      <Excel_import prod={data.imentrailSearch} />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </DivFromDown>
            </DivFrom>
          </>
        </DivBase>
      </>
    </div>
  );
};

export default index;
