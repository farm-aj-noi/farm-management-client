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

export const EXPORTENTRAILSEARCH = gql`
  query EXPORTENTRAILSEARCH(
    $startdate: String
    $enddate: String
    $userName: String
  ) {
    exportentrail(
      startdate: $startdate
      enddate: $enddate
      userName: $userName
    ) {
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
      exportdate
      exporter
      storestatus {
        nameTH
      }
    }
  }
`;
const index = () => {
  const [selectedstartdate, SetStartDateChange] = useState("");
  const [selectedenddate, SetEndDateChange] = useState("");
  const [inputusername, SetInputusername] = useState("");
  const { data, loading, error } = useQuery(EXPORTENTRAILSEARCH, {
    variables: {
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
          เบิกออกซากเนื้อโคส่วนอื่น ๆ
        </HeaderColor>
      </div>
      <DivBase
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 270px 1100px 1fr",
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
              ดำเนินการเบิกออก
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
            <DivFromDown style={{ height: "110px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "15px",
                }}
              >
                <from style={{ fontSize: "20px" }}>
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
              width: "1380px",
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
              รายการเบิกออก
            </DivFromTop>
            <DivFromDown>
              <div style={{ height: "300px", overflow: "auto" }}>
                <Table
                  striped
                  bordered
                  responsive
                  hover
                  style={{ margin: "auto" }}
                >
                  <thead>
                    <tr style={{ textAlign: "center" }}>
                      <th>วันที่เบิกออก</th>
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
                      <th>คิวอาร์โค้ด</th>
                      <th>ผู้ขอเบิก</th>
                      <th>ผู้เบิกออก</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data &&
                      data.exportentrail.map((prod) => (
                        <List_export key={prod.id} exportentrail={prod} />
                      ))}
                  </tbody>
                </Table>
              </div>
              <div style={{ float: "right", textAlign: "right" }}>
                จำนวนรายการ {data ? data.exportentrail.length : "0"} รายการ
              </div>
            </DivFromDown>
          </DivFrom>
        </>
      </DivBase>
    </>
  );
};

export default index;
