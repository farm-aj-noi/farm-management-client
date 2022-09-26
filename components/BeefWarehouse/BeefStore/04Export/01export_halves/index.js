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
import { exit } from 'react-icons-kit/icomoon/exit'


export const EXPORTHALVESSEARCH = gql`
  query EXPORTHALVESSEARCH(
    $startdate: String
    $enddate: String
    $beeftype: String
    $namefarmer: String
    $userName: String
    $exporter: String
    $exportstatus: String
  ) {
    exporthalve(
      startdate: $startdate
      enddate: $enddate
      beeftype: $beeftype
      namefarmer: $namefarmer
      userName: $userName
      exporter: $exporter
      exportstatus: $exportstatus
    ) {
      id
      exporter
      exportdate
      user {
        name
      }
      halve {
        weightwarm
        weightcool
        barcode
        beeftype {
          code
          nameTH
        }
        imslaughter {
          numcow
          namefarmer
        }
      }
      storestatus {
        nameTH
      }
    }
  }
`;

const index = () => {
  const [selectedbeeftypehalve, SetBeeftypeHalveChange] = useState("");
  const [selectedstartdate, SetStartDateChange] = useState("");
  const [selectedenddate, SetEndDateChange] = useState("");
  const [inputusername, SetInputusername] = useState("");
  const [inputexporter, SetinputExporter] = useState("");
  const [exportstatus, Setexportstatus] = useState("");
  const { data, loading, error } = useQuery(EXPORTHALVESSEARCH, {
    variables: {
      beeftype: selectedbeeftypehalve,
      startdate: selectedstartdate,
      enddate: selectedenddate,
      userName: inputusername,
      exporter: inputexporter,
      exportstatus: exportstatus,
    },
  });
  /*  console.log(data); */

  return (
    <div style={{ marginTop: "100px" }}>
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
          นำออกซากเนื้อโคผ่าซีก
        </HeaderColor>
      </div>
      <DivBase
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 270px 1300px 1fr",
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
              <div style={{ margin: "-1px 5px 0px -5px" }}>
                <Icon size={20} icon={exit} />
              </div>
              ดำเนินการนำออกซากเนื้อโคผ่าซีก
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
                <div style={{ fontSize: "20px" }}>
                  <label
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
                      fontSize: "16px",
                    }}
                    onChange={(event) =>
                      SetBeeftypeHalveChange(event.target.value)
                    }
                  >
                    <option value="">ทั้งหมด</option>
                    <option value="5f1000e28d55662dcc23d95e">ซากซ้าย</option>
                    <option value="5f1000ee8d55662dcc23d960">ซากขวา</option>
                  </select>
                  <label
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
                      fontSize: "16px",
                      textAlign: "center",
                    }}
                    onChange={(event) => SetinputExporter(event.target.value)}
                  />
                  <label
                    style={{
                      textAlign: "center",
                      fontSize: "18px",
                      marginLeft: "10px",
                      marginRight: "10px",
                    }}
                  >
                    ผู้เเบิกออก
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
                    onChange={(event) => SetInputusername(event.target.value)}
                  />
                  <label
                    style={{
                      textAlign: "center",
                      fontSize: "18px",
                      margin: "10px 10px",
                    }}>
                    สถานะ
                    <select
                      style={{
                        height: "35px",
                        width: "110px",
                        border: "1px solid #AFAFAF",
                        borderRadius: "4px",
                        textAlign: "center",
                        fontSize: "16px",
                        marginLeft: "10px"
                      }}
                      onChange={(event) => Setexportstatus(event.target.value)}
                    >
                      <option value="">เลือก</option>
                      <option value="6280fa87d3dbf7345093676e">
                        นำตัดเเต่ง(ซาก4)
                      </option>
                      <option value="6280fac6d3dbf7345093676f">นำจำหน่าย</option>
                    </select>
                  </label>
                  <label
                    style={{
                      textAlign: "center",
                      fontSize: "18px",
                      marginRight: "10px",
                      marginLeft: "10px",
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
                      fontSize: "16px",
                      textAlign: "center",
                    }}
                    onChange={(event) => SetStartDateChange(event.target.value)}
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
                      fontSize: "16px",
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
              marginTop: "20px",
            }}
          >
            <DivFromTop>
              <div style={{ margin: "-3px 5px 0px 0px" }}>
                <Icon size={20} icon={list} />
              </div>
              รายการนำออกซากเนื้อโคผ่าซีก
            </DivFromTop>
            <DivFromDown>
              <div style={{ height: `${data && data.exporthalve.length > 6 ? "400px" : ""}`, overflow: `${data && data.exporthalve.length > 6 ? "auto" : ""}` }}>
                <Table
                  striped
                  bordered
                  responsive
                  hover
                  style={{ margin: "auto" }}
                >
                  <thead>
                    <tr style={{ textAlign: "center", fontSize: "18px" }}>
                      <th>ประเภทซาก</th>
                      <th>วันที่เบิกออก</th>
                      <th>เวลา</th>
                      <th>ทะเบียนขุน</th>
                      <th>รหัสซาก</th>
                      <th>รหัสบาร์โค้ด</th>
                      <th>คิวอาร์โค้ด</th>
                      <th>น้ำหนักอุ่น (กก.)</th>
                      <th>น้ำหนักเย็น (กก.)</th>
                      <th>สถานะ</th>
                      <th>ผู้ขอเบิก</th>
                      <th>ผู้เบิกออก</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data && data.exporthalve.length > 0 ? (
                      data.exporthalve.map((prod) => (
                        <List_export key={prod.id} exhalve={prod} />
                      ))
                    ) : (
                      <tr style={{ textAlign: "center" }}>
                        <td colSpan="12">ไม่พบข้อมูล</td>
                      </tr>
                    )
                    }
                  </tbody>
                </Table>
              </div>
              <div style={{ float: "right", textAlign: "right" }}>
                จำนวนรายการ {data ? data.exporthalve.length : "0"} รายการ
                <br />
                น้ำหนักอุ่น{" "}
                {data &&
                  data.exporthalve.reduce(
                    (sum, nex) => sum + nex.halve.weightwarm,
                    0
                  ).toFixed(2)}{" "}
                กิโลกรัม / น้ำหนักเย็น{" "}
                {data &&
                  data.exporthalve.reduce(
                    (sum, nex) => sum + nex.halve.weightcool,
                    0
                  ).toFixed(2)}{" "}
                กิโลกรัม
              </div>
            </DivFromDown>
          </DivFrom>
        </>
      </DivBase>
    </div>
  );
};

export default index;
