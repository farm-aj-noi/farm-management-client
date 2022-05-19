import React, { useState } from "react";

import { Table } from "react-bootstrap";
import { DivFrom, DivFromTop, DivFromDown, HeaderColor } from "../ExportFrom";
import { DivBase } from "../../../../../utils/divBase";

import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";
import { iosSearchStrong } from "react-icons-kit/ionicons/iosSearchStrong";

import Submit_Export from "./Submit_Export";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import List_export from "./ListExport";

export const CREATEEXPORTLUMP = gql`
  query CREATEEXPORTLUMP(
    $startdate: String
    $enddate: String
    $beeftype: String
    $userName: String
  ) {
    exportlump(
      startdate: $startdate
      enddate: $enddate
      beeftype: $beeftype
      userName: $userName
    ) {
      id
      user {
        name
      }
      lump {
        weight
        barcode
        status {
          nameTH
        }
        beeftype {
          nameTH
          code
        }
        imslaughter {
          numcow
          namefarmer
        }
      }
      storestatus {
        nameTH
      }
      exportdate
    }
  }
`;
const index = () => {
  const [selectedbeeftypelump, SetBeeftypeLumpChange] = useState("");
  const [selectedstartdate, SetStartDateChange] = useState("");
  const [selectedenddate, SetEndDateChange] = useState("");
  const [inputusername, SetInputusername] = useState("");
  const { data, loading, error } = useQuery(CREATEEXPORTLUMP, {
    variables: {
      beeftype: selectedbeeftypelump,
      startdate: selectedstartdate,
      enddate: selectedenddate,
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
          เบิกออกซากเนื้อโคก้อนเนื้อ
        </HeaderColor>
      </div>
      <DivBase
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 270px 900px 1fr",
          gridRowGap: "15px",
          gridColumnGap: "10px",
          textAlign: "start",
          // width:"950px",
          // margin:"auto"
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
              ดำเนินการเบิกออกซากเนื้อโคก้อนเนื้อ
            </DivFromTop>
            <DivFromDown>
              <Submit_Export />
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
                      SetBeeftypeLumpChange(event.target.value)
                    }
                  >
                    <option value="">ทั้งหมด</option>
                    <option value="">ซากซ้าย</option>
                    <option value="">ซากขวา</option>
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
                    ผู้ขอเบิก
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
                    ผู้เบิกออก
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
                    name="room"
                    id="room"
                    style={{
                      height: "35px",
                      width: "50px",
                      border: "1px solid #AFAFAF",
                      borderRadius: "4px 0px 0px 4px",
                      textAlign: "center",
                      fontSize: "14px",
                    }}
                  >
                    <option value="">ห้อง</option>
                    <option value="">1</option>
                    <option value="">2</option>
                    <option value="">3</option>
                  </select>
                  <select
                    name="shelf"
                    id="shelf"
                    style={{
                      height: "35px",
                      width: "50px",
                      border: "1px solid #AFAFAF",
                      borderLeft: "none",
                      textAlign: "center",
                      fontSize: "14px",
                    }}
                  >
                    <option value="">ชั้น</option>
                    <option value="">1</option>
                    <option value="">2</option>
                    <option value="">3</option>
                  </select>
                  <select
                    name="bucket"
                    id="bucket"
                    style={{
                      height: "35px",
                      width: "60px",
                      border: "1px solid #AFAFAF",
                      borderRadius: "0px 4px 4px 0px",
                      borderLeft: "none",
                      textAlign: "center",
                      fontSize: "14px",
                      marginRight: "10px",
                    }}
                  >
                    <option value="">ตะกร้า</option>
                    <option value="">1</option>
                    <option value="">2</option>
                    <option value="">3</option>
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
                    วันที่เบิกออก
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
                  ></input>
                  <label
                    for="date"
                    style={{
                      textAlign: "center",
                      fontSize: "18px",
                      margin: "10px 10px",
                    }}
                    onChange={(event) => SetStartDateChange(event.target.value)}
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
              รายการเบิกออกซากเนื้อโคก้อนเนื้อ
            </DivFromTop>
            <DivFromDown>
              <div style={{ height: "280px", overflow: "auto" }}>
                <Table
                  striped
                  bordered
                  responsive
                  hover
                  style={{ margin: "auto" }}
                >
                  <thead>
                    <tr style={{ textAlign: "center" }}>
                      <th>ประเภทซาก</th>
                      <th>วันที่เบิกออก</th>
                      <th>เวลา</th>
                      <th>ทะเบียนขุน</th>
                      <th>รหัสซาก</th>
                      <th>รหัสบาร์โค้ด</th>
                      <th>คิวอาร์โค้ด</th>
                      <th>น้ำหนัก</th>
                      <th>ห้อง</th>
                      <th>ชั้น</th>
                      <th>ตะกร้า</th>
                      <th>สถานะ</th>
                      <th>ผู้ขอเบิก</th>
                      <th>ผู้เบิกออก</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data &&
                      data.exportlump.map((prod) => (
                        <List_export key={prod.id} exlump={prod} />
                      ))}
                  </tbody>
                </Table>
              </div>
            </DivFromDown>
          </DivFrom>
        </>
      </DivBase>
    </>
  );
};

export default index;
