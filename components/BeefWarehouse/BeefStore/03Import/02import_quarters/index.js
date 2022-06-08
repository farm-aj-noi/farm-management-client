import React, { useState } from "react";

import { Table } from "react-bootstrap";
import { DivFrom, DivFromTop, DivFromDown, HeaderColor } from "../ImportFrom";
import { DivBase } from "../../../../../utils/divBase";

import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";
import { iosSearchStrong } from "react-icons-kit/ionicons/iosSearchStrong";

import Create_Import from "./Create_Import";
import List_import from "./List_import";

import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

export const IMPORTQUARTERSEARCH = gql`
  query IMPORTQUARTERSEARCH(
    $startdate: String
    $enddate: String
    $beeftype: String
    $namefarmer: String
    $userName: String
    $beefroom: String
  ) {
    imquartSearch(
      namefarmer: $namefarmer
      userName: $userName
      startdate: $startdate
      enddate: $enddate
      beeftype: $beeftype
      beefroom: $beefroom
    ) {
      id
      importdate
      user {
        name
      }
      quarter {
        weight
        barcode
        status {
          nameTH
        }
        beeftype {
          code
          nameTH
        }
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
  const [selectedbeeftypequarter, SetBeeftypeQuarterChange] = useState("");
  const [selectedstartdate, SetStartDateChange] = useState("");
  const [selectedenddate, SetEndDateChange] = useState("");
  const [inputnamefarmer, SetInputnamefarmer] = useState("");
  const [inputusername, SetInputusername] = useState("");
  const [selectedbeefroom, setselectbeefroom] = useState("");
  const { data, loading, error } = useQuery(IMPORTQUARTERSEARCH, {
    variables: {
      beeftype: selectedbeeftypequarter,
      startdate: selectedstartdate,
      enddate: selectedenddate,
      namefarmer: inputnamefarmer,
      userName: inputusername,
      beefroom: selectedbeefroom,
    },
  });
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "30px",
        }}
      >
        <HeaderColor
          style={{
            width: "fit-content",
            height: "fit-content",
            padding: "5px 30px",
          }}
        >
          นำเข้าซากเนื้อโคสี่เสี้ยว
        </HeaderColor>
      </div>
      <DivBase
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 270px 900px 1fr",
          gridRowGap: "15px",
          gridColumnGap: "10px",
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
            <DivFromTop>
              <div style={{ margin: "-3px 5px 0px 0px" }}>
                <Icon size={20} icon={list} />
              </div>
              ดำเนินการนำเข้าซากเนื้อโคสี่เสี้ยว
            </DivFromTop>
            <DivFromDown>
              <Create_Import />
            </DivFromDown>
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
                <from style={{ fontSize: "20px" }}>
                  <label
                    for="beef"
                    style={{
                      textAlign: "center",
                      fontSize: "18px",
                      marginRight: "10px",
                    }}
                  >
                    ประเภทซาก
                  </label>
                  <select
                    name="beef"
                    id="beef"
                    style={{
                      height: "35px",
                      width: "120px",
                      border: "1px solid #AFAFAF",
                      borderRadius: "4px",
                      textAlign: "center",
                      fontSize: "14px",
                    }}
                    onChange={(event) =>
                      SetBeeftypeQuarterChange(event.target.value)
                    }
                  >
                    <option value="">ทั้งหมด</option>
                    <option value="5f338f035f7703096453abb8">
                      ซากขวา-ขาหน้า
                    </option>
                    <option value="5f338f0d5f7703096453abb9">
                      ซากขวา-ขาหลัง
                    </option>
                    <option value="5f338eeb5f7703096453abb6">
                      ซากซ้าย-ขาหน้า
                    </option>
                    <option value="5f338ef65f7703096453abb7">
                      ซากซ้าย-ขาหลัง
                    </option>
                  </select>
                  <label
                    for="beef"
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
                      fontSize: "14px",
                      textAlign: "center",
                    }}
                    onChange={(event) => SetInputnamefarmer(event.target.value)}
                  />
                  <label
                    for="beef"
                    style={{
                      textAlign: "center",
                      fontSize: "18px",
                      marginLeft: "10px",
                      marginRight: "10px",
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
                      fontSize: "14px",
                      textAlign: "center",
                    }}
                    onChange={(event) => SetInputusername(event.target.value)}
                  />
                  <label
                    for="beef"
                    style={{
                      textAlign: "center",
                      fontSize: "18px",
                      margin: "10px 10px",
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
                      fontSize: "14px",
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
                </from>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "10px",
                }}
              >
                <from style={{ fontSize: "20px" }}>
                  <label
                    for="date"
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
                      fontSize: "16px",
                      textAlign: "center",
                    }}
                    onChange={(event) => SetStartDateChange(event.target.value)}
                  ></input>
                  <label
                    for="date"
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
                      fontSize: "16px",
                      textAlign: "center",
                    }}
                    onChange={(event) => SetEndDateChange(event.target.value)}
                  ></input>
                </from>
              </div>
            </DivFromDown>
          </DivFrom>
          <DivFrom
            style={{
              width: "1180px",
              gridRowStart: "5",
              gridRowEnd: "5",
              gridColumnStart: "2",
              gridColumnEnd: "4",
              marginTop: "20px",
            }}
          >
            <DivFromTop>
              <div style={{ margin: "-3px 5px 0px 0px" }}>
                <Icon size={20} icon={list} />
              </div>
              รายการนำเข้าซากเนื้อโคสี่เสี้ยว
            </DivFromTop>
            <DivFromDown>
              <div style={{ height: "320px", overflow: "auto" }}>
                <Table
                  striped
                  bordered
                  responsive
                  hover
                  style={{ margin: "auto" }}
                >
                  <thead>
                    <tr style={{ textAlign: "center" }}>
                      <th>เจ้าของซาก</th>
                      <th>ประเภทซาก</th>
                      <th>วันที่นำเข้า</th>
                      <th>เวลา</th>
                      <th>ทะเบียนขุน</th>
                      <th>รหัสซาก</th>
                      <th>รหัสบาร์โค้ด</th>
                      <th>คิวอาร์โค้ด</th>
                      <th>น้ำหนัก (กก.)</th>
                      <th>ห้อง</th>

                      <th>สถานะ</th>
                      <th>ผู้นำเข้า</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data && data.imquartSearch.length > 0 ? (
                      data.imquartSearch.map((prod) => (
                        <List_import key={prod.id} imquarter={prod} />
                      ))
                    ) : (
                      <tr style={{ textAlign: "center" }}>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
              <div style={{ float: "right", textAlign: "right" }}>
                จำนวนรายการ {data ? data.imquartSearch.length : "0"} รายการ
                <br />
                น้ำหนัก{" "}
                {data &&
                  data.imquartSearch.reduce(
                    (sum, nex) => sum + nex.quarter.weight,
                    0
                  )}{" "}
                กิโลกรัม
              </div>
            </DivFromDown>
          </DivFrom>
        </>
      </DivBase>
    </>
  );
};

export default index;
