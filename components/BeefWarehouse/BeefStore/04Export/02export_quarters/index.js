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

export const EXPORTQUARTERSEARCH = gql`
  query EXPORTQUARTERSEARCH(
    $startdate: String
    $enddate: String
    $beeftype: String
    $namefarmer: String
    $userName: String
    $exporter: String
    $exportstatus: String
  ) {
    exportquart(
      startdate: $startdate
      enddate: $enddate
      beeftype: $beeftype
      namefarmer: $namefarmer
      userName: $userName
      exporter: $exporter
      exportstatus:$exportstatus
    ) {
      exporter
      id
      exportdate
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
      storestatus {
        nameTH
      }
    }
  }
`;
const index = () => {
  const [selectedbeeftypequarter, SetBeeftypeQuarterChange] = useState("");
  const [selectedstartdate, SetStartDateChange] = useState("");
  const [selectedenddate, SetEndDateChange] = useState("");
  const [inputusername, SetInputusername] = useState("");
  const [inputexporter, SetinputExporter] = useState("");
  const [exportstatus, Setexportstatus] = useState("");
  const { data, loading, error } = useQuery(EXPORTQUARTERSEARCH, {
    variables: {
      beeftype: selectedbeeftypequarter,
      startdate: selectedstartdate,
      enddate: selectedenddate,
      userName: inputusername,
      exporter: inputexporter,
      exportstatus: exportstatus
    },
  });
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
          เบิกออกซากเนื้อโคสี่เสี้ยว
        </HeaderColor>
      </div>
      <DivBase
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 270px 1150px 1fr",
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
              ดำเนินการเบิกออกซากเนื้อโคสี่เสี้ยว
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
                      fontSize: "16px",
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
                      fontSize: "16px",
                      textAlign: "center",
                    }}
                    onChange={(event) => SetInputusername(event.target.value)}
                  />
                  <label
                    for="status"
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
                      <option value="6281fb683dd2ff4e1495d6bd">
                        นำตัดเเต่ง(ก้อนเนื้อ)
                      </option>
                      <option value="6280fac6d3dbf7345093676f">นำจำหน่าย</option>
                    </select>
                  </label>
                  <label
                    for="date"
                    style={{
                      textAlign: "center",
                      fontSize: "18px",
                      margin: "10px 10px",
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
                    for="date"
                    style={{
                      textAlign: "center",
                      fontSize: "18px",
                      margin: "10px 10px",
                    }}
                    onChange={(event) => SetEndDateChange(event.target.value)}
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
              รายการเบิกออกซากเนื้อโคสี่เสี้ยว
            </DivFromTop>
            <DivFromDown>
              <div style={{ height: `${data && data.exportquart.length > 6 ? "400px" : ""}`, overflow: `${data && data.exportquart.length > 6 ? "auto" : ""}` }}>
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
                      <th>น้ำหนัก (กก.)</th>
                      <th>สถานะ</th>
                      <th>ผู้ขอเบิก</th>
                      <th>ผู้เบิกออก</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data && data.exportquart.length > 0 ? (data.exportquart.map((prod) => (
                      <List_export key={prod.id} exquarter={prod} />
                    ))) : (<tr style={{ textAlign: "center" }}>
                      <td colSpan="12">ไม่พบข้อมูล</td>
                    </tr>)
                    }
                  </tbody>
                </Table>
              </div>
              <div style={{ float: "right", textAlign: "right" }}>
                จำนวนรายการ {data ? data.exportquart.length : "0"} รายการ
                <br />
                น้ำหนักอุ่น{" "}
                {data &&
                  data.exportquart.reduce(
                    (sum, nex) => sum + nex.quarter.weight,
                    0
                  )}{" "}
                กิโลกรัม
              </div>
            </DivFromDown>
          </DivFrom>
        </>
      </DivBase>
    </div >
  );
};

export default index;
