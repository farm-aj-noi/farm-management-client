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

import Paper_export from "./Paper_export.js";
import Excel_export from "./Excel_export.js";

import Nav_exports from "../Nav_export";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import dayjs from "dayjs";

export const EXPORTHALVESSEARCH = gql`
  query EXPORTHALVESSEARCH(
    $startdate: String
    $enddate: String
    $beeftype: String
    $namefarmer: String
    $userName: String
    $exporter: String
  ) {
    exporthalve(
      startdate: $startdate
      enddate: $enddate
      beeftype: $beeftype
      namefarmer: $namefarmer
      userName: $userName
      exporter: $exporter
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
  const { data, loading, error } = useQuery(EXPORTHALVESSEARCH, {
    variables: {
      beeftype: selectedbeeftypehalve,
      startdate: selectedstartdate,
      enddate: selectedenddate,
      userName: inputusername,
      exporter: inputexporter,
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
            ออกรายงานนำออกซากโคผ่าซีก
          </HeaderColor>
        </div>
        <DivBase
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 270px 1150px 1fr",
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
              <Nav_exports Sidenumber={1} />
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
                        marginRight: "10px",
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
                        margin: "10px 10px",
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
                <div style={{ height: `${data && data.exporthalve.length > 6 ? "380px" : ""}`, overflow: "auto" }}>
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
                        <th>ประเภทซาก</th>
                        <th>วันที่เบิกออก</th>
                        <th>เวลา</th>
                        <th>ทะเบียนขุน</th>
                        <th>รหัสซาก</th>
                        <th>รหัสบาร์โค้ด</th>
                        <th>น้ำหนัก (กก.)</th>
                        <th>สถานะ</th>
                        <th>ผู้ขอเบิก</th>
                        <th>ผู้เบิกออก</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data && data.exporthalve.length > 0 ? (data.exporthalve.map((prod) => (
                        <tr style={{ textAlign: "center" }}>
                          <td>{prod.halve.beeftype.nameTH}</td>
                          <td>
                            {dayjs(prod.exportdate)
                              .add(543, "year")
                              .format("DD/MM/YYYY")}
                          </td>
                          <td>
                            {dayjs(prod.exportdate)
                              .add(543, "year")
                              .format("h:mm:ss A")}
                          </td>
                          <td>{prod.halve.imslaughter.numcow}</td>
                          <td>{prod.halve.beeftype.code}</td>
                          <td>{prod.halve.barcode}</td>
                          <td>{prod.halve.weightwarm}</td>
                          <td>{prod.storestatus.nameTH}</td>
                          <td>{prod.exporter}</td>
                          <td>{prod.user.name}</td>
                        </tr>
                      ))) : (<tr style={{ textAlign: "center" }}>
                        <td colSpan="12">ไม่พบข้อมูล</td>
                      </tr>)
                      }
                    </tbody>
                  </Table>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {data && data.exporthalve.length > 0 ? (
                    <div>
                      <Paper_export prod={data.exporthalve} />
                      <Excel_export prod={data.exporthalve} />
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
    </div >
  );
};

export default index;
