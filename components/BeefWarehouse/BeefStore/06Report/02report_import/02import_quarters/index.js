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

export const IMPORTQUARTERSEARCH = gql`
  query IMPORTQUARTERSEARCH(
    $startdate: String
    $enddate: String
    $beeftype: String
    $namefarmer: String
    $userName: String
  ) {
    imquartSearch(
      namefarmer: $namefarmer
      userName: $userName
      startdate: $startdate
      enddate: $enddate
      beeftype: $beeftype
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

const index = () => {
  const [selectedbeeftypequarter, SetBeeftypeQuarterChange] = useState("");
  const [selectedstartdate, SetStartDateChange] = useState("");
  const [selectedenddate, SetEndDateChange] = useState("");
  const [inputnamefarmer, SetInputnamefarmer] = useState("");
  const [inputusername, SetInputusername] = useState("");
  const { data, loading, error } = useQuery(IMPORTQUARTERSEARCH, {
    variables: {
      beeftype: selectedbeeftypequarter,
      startdate: selectedstartdate,
      enddate: selectedenddate,
      namefarmer: inputnamefarmer,
      userName: inputusername,
    },
  });
  return (
    <DivBase>
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
            ออกรายงานนำเข้าซากโคสี่เสี้ยว
          </HeaderColor>
        </div>
        <DivBase
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 270px 1100px 1fr",
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
              <Nav_imports Sidenumber={2} />
            </DivFrom>
            <DivFrom
              style={{
                width: "100%",
                gridRowStart: "2",
                gridRowEnd: "3",
                gridColumnStart: "3",
                marginTop: "0px",
                height: "130px",
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
                    marginBottom: "10px",
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
                        marginRight: "10px",
                      }}
                      onChange={(event) =>
                        SetBeeftypeQuarterChange(event.target.value)
                      }
                    >
                      <option value="">ทั้งหมด</option>
                      <option value="5f1000e28d55662dcc23d95e">ซากซ้าย</option>
                      <option value="5f1000ee8d55662dcc23d960">ซากขวา</option>
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
                      onChange={(event) =>
                        SetInputnamefarmer(event.target.value)
                      }
                    />
                    <label
                      for="beef"
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
                        fontSize: "14px",
                        textAlign: "center",
                        marginRight: "10px",
                      }}
                      onChange={(event) => SetInputusername(event.target.value)}
                    />
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
                        color: "#AFAFAF",
                        textAlign: "center",
                      }}
                      onChange={(event) =>
                        SetStartDateChange(event.target.value)
                      }
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
                <div style={{ height: "250px", overflowY: "auto" }}>
                  <Table
                    striped
                    bordered
                    responsive
                    hover
                    style={{ margin: "auto" }}
                  >
                    {/* <LoadingSmall/> */}
                    <thead>
                      <tr style={{ textAlign: "center" }}>
                        <th>เจ้าของซาก</th>
                        <th>ประเภทซาก</th>
                        <th>วันที่นำเข้า</th>
                        <th>เวลา</th>
                        <th>ทะเบียนขุน</th>
                        <th>รหัสซาก</th>
                        <th>รหัสบาร์โค้ด</th>
                        <th>น้ำหนัก (กก.)</th>
                        <th>ห้อง</th>
                        <th>ชั้น</th>
                        <th>ตะกร้า</th>
                        <th>สถานะ</th>
                        <th>ผู้นำเข้า</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data &&
                        data.imquartSearch.map((prod) => (
                          <tr style={{ textAlign: "center" }}>
                            <td>{prod.quarter.imslaughter.namefarmer}</td>
                            <td>{prod.quarter.beeftype.nameTH}</td>
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
                            <td>{prod.quarter.imslaughter.numcow}</td>
                            <td>{prod.quarter.beeftype.code}</td>
                            <td>{prod.quarter.barcode}</td>
                            <td>{prod.quarter.weight}</td>
                            <td>{prod.beefroom.roomname}</td>
                            <td>-</td>
                            <td>-</td>
                            <td>{prod.quarter.status.nameTH}</td>
                            <td>{prod.user.name}</td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {data && data.imquartSearch.length > 0 ? (
                    <div>
                      <Paper_import prod={data.imquartSearch} />
                      <Excel_import prod={data.imquartSearch} />
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
    </DivBase>
  );
};

export default index;
