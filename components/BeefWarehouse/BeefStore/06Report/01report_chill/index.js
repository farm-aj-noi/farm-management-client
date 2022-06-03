import React, { useState } from "react";

import { Table } from "react-bootstrap";
import {
  DivFrom,
  DivFromTop,
  DivFromDown,
  HeaderColor,
} from "../ReportFrom.js";
import { DivBase } from "../../../../../utils/divBase";

import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";
import { iosSearchStrong } from "react-icons-kit/ionicons/iosSearchStrong";

import Paper_chill from "./Paper_chill.js";
import Excel_chill from "./Excel_chill.js";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import dayjs from "dayjs";

export const CHILLSEARCHLIST = gql`
  query CHILLSEARCHLIST(
    $startdate: String
    $enddate: String
    $beeftype: String
  ) {
    listchill(startdate: $startdate, enddate: $enddate, beeftype: $beeftype) {
      id
      chilldateStart
      chilldateEnd
      chillroom {
        roomnum
      }
      user {
        name
      }
      halve {
        barcode
        beeftype {
          nameTH
          code
        }
        weightwarm
        imslaughter {
          numcow
        }
      }
      chillstatus {
        id
        nameTH
      }
      chillday {
        id
        day
      }
    }
  }
`;

const index = () => {
  const [selectedbeeftypeChill, SetBeeftypeChillChange] = useState("");
  const [selectedstartdate, SetStartDateChange] = useState("");
  const [selectedenddate, SetEndDateChange] = useState("");
  const { data, loading, error } = useQuery(CHILLSEARCHLIST, {
    variables: {
      beeftype: selectedbeeftypeChill,
      startdate: selectedstartdate,
      enddate: selectedenddate,
    },
  });
  return (
    <DivBase>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "10px",
        }}
      >
        <HeaderColor
          style={{
            width: "fit-content",
            height: "fit-content",
            padding: "5px 30px",
          }}
        >
          ออกรายงานบ่มซาก
        </HeaderColor>
      </div>
      <DivFrom
        style={{
          marginTop: "30px",
          marginBottom: "30px",
          height: "130px",
          width: "900px",
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
                onChange={(event) => SetBeeftypeChillChange(event.target.value)}
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
                  marginRight: "10px",
                }}
              >
                ผู้บ่มซาก
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
                  color: "#AFAFAF",
                  textAlign: "center",
                }}
                onChange={(event) => SetEndDateChange(event.target.value)}
              ></input>
            </from>
          </div>
        </DivFromDown>
      </DivFrom>
      <DivFrom style={{ width: "1400px" }}>
        <DivFromTop>
          <div style={{ margin: "-3px 5px 0px 0px" }}>
            <Icon size={20} icon={list} />
          </div>
          รายการที่ค้นหา
        </DivFromTop>
        <DivFromDown>
          <div style={{ height: "250px", overflowY: "auto" }}>
            <Table striped bordered responsive hover style={{ margin: "auto" }}>
              {/* <LoadingSmall/> */}
              <thead>
                <tr style={{ textAlign: "center" }}>
                  <th>ผู้บ่มซาก</th>
                  <th>วันที่บ่ม</th>
                  <th>วันที่บ่มเสร็จ</th>
                  <th>เวลา</th>
                  <th>ประเภทซาก</th>
                  <th>จำนวนวันที่บ่ม</th>
                  <th>ทะเบียนขุน</th>
                  <th>รหัสซาก</th>
                  <th>รหัสบาร์โค้ด</th>
                  <th>น้ำหนักอุ่น</th>
                  <th>ห้องบ่ม</th>
                  <th>สถานะ</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.listchill.map((prod) => (
                    <tr style={{ textAlign: "center" }}>
                      <td>{prod.user.name}</td>
                      <td>
                        {dayjs(prod.chilldateStart)
                          .locale("th")
                          .add(543, "year")
                          .format("DD/MM/YYYY")}
                      </td>
                      <td>
                        {dayjs(prod.chilldateEnd)
                          .locale("th")
                          .add(543, "year")
                          .format("DD/MM/YYYY")}
                      </td>
                      <td>
                        {dayjs(prod.chilldateEnd)
                          .locale("th")
                          .add(543, "year")
                          .format("h:mm:ss A")}
                      </td>
                      <td>{prod.halve.beeftype.nameTH}</td>
                      <td>{prod.chillday.day} วัน</td>
                      <td>{prod.halve.imslaughter.numcow}</td>
                      <td>{prod.halve.beeftype.code}</td>
                      <td>{prod.halve.barcode}</td>
                      <td>{prod.halve.weightwarm}</td>
                      <td>{prod.chillroom.roomnum}</td>
                      <td>{prod.chillstatus.nameTH}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {data && data.listchill.length > 0 ? (
              <div>
                <Paper_chill prod={data.listchill} />
                <Excel_chill prod={data.listchill} />
              </div>
            ) : (
              ""
            )}
          </div>
        </DivFromDown>
      </DivFrom>
    </DivBase>
  );
};

export default index;
