import React, { useState } from "react";

import { Table } from "react-bootstrap";
import { DivFrom, DivFromTop, DivFromDown, HeaderColor } from "./ChillFrom";
import { DivBase } from "../../../../utils/divBase";

import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";
import { iosSearchStrong } from "react-icons-kit/ionicons/iosSearchStrong";

import Submit_Chill from "./Submit_Chill";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import List_chill from "./List_chill";
import { Iconchill } from "./ChillFrom"

export const CHILLSEARCHLIST = gql`
  query CHILLSEARCHLIST(
  $startdate: String
  $enddate: String
  $beeftype: String
  $startdate2: String
  $enddate2: String
  $name: String
  $chillstatus: String
) {
  listchill(
    startdate: $startdate
    enddate: $enddate
    beeftype: $beeftype
    startdate2: $startdate2
    enddate2: $enddate2
    name: $name
    chillstatus: $chillstatus
  ) {
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
  const [selectedstartdate2, SetStartDateChange2] = useState("");
  const [selectedenddate2, SetEndDateChange2] = useState("");
  const [selectname, SetnameChange] = useState("");
  const [selectchillstatus, SetchillStatus] = useState("");
  const { data, loading, error } = useQuery(CHILLSEARCHLIST, {
    variables: {
      beeftype: selectedbeeftypeChill,
      startdate: selectedstartdate,
      enddate: selectedenddate,
      startdate2: selectedstartdate2,
      enddate2: selectedenddate2,
      name: selectname,
      chillstatus: selectchillstatus,
    },
  });
  /*   console.log(data); */
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
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          }}
        >
          บ่มซากเนื้อโค
        </HeaderColor>
      </div>
      <DivBase
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 270px 1350px 1fr",
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
            <DivFromTop /* style={{ border: "3px solid #FFFFFF", }} */>
              <div style={{ margin: "-3px 0px -7px -11px" }}>
                <Iconchill height="30px" weight="30px" />
              </div>
              ดำเนินการบ่มซากเนื้อโค
            </DivFromTop>
            <DivFromDown >
              <Submit_Chill />
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
            <DivFromTop /* style={{ border: "3px solid #FFFFFF", }} */>
              <div style={{ margin: "-4px 5px 0px 0px" }}>
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
                      marginLeft: "10px"

                    }}
                    onChange={(event) =>
                      SetBeeftypeChillChange(event.target.value)
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
                      marginRight: "10px",
                      marginLeft: "10px",
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
                      fontSize: "16px",
                      textAlign: "center",
                      marginRight: "10px",
                    }}
                    onChange={(event) => SetnameChange(event.target.value)}
                  />
                  <label
                    for="date"
                    style={{
                      textAlign: "center",
                      fontSize: "18px",
                      marginRight: "10px",
                    }}
                  >
                    วันที่บ่ม
                  </label>
                  <input
                    type="date"
                    name="date"
                    style={{
                      height: "35px",
                      border: "1px solid #AFAFAF",
                      borderRadius: "4px",
                      textAlign: "center",
                      fontSize: "16px",
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
                    name="date"
                    style={{
                      height: "35px",
                      border: "1px solid #AFAFAF",
                      borderRadius: "4px",
                      textAlign: "center",
                      fontSize: "16px",
                    }}
                    onChange={(event) => SetEndDateChange(event.target.value)}
                  ></input>
                  <label
                    for="date"
                    style={{
                      textAlign: "center",
                      fontSize: "18px",
                      margin: "10px 10px",
                    }}
                  >
                    วันที่บ่มเสร็จ
                  </label>
                  <input
                    type="date"
                    name="date"
                    style={{
                      height: "35px",
                      border: "1px solid #AFAFAF",
                      borderRadius: "4px",
                      textAlign: "center",
                      fontSize: "16px",
                    }}
                    onChange={(event) => SetStartDateChange2(event.target.value)}
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
                    name="date"
                    style={{
                      height: "35px",
                      border: "1px solid #AFAFAF",
                      borderRadius: "4px",
                      textAlign: "center",
                      fontSize: "16px",
                    }}
                    onChange={(event) => SetEndDateChange2(event.target.value)}
                  ></input>
                  <label
                    for="beef"
                    style={{
                      textAlign: "center",
                      fontSize: "18px",
                      marginLeft: "10px",
                    }}
                  >
                    สถานะบ่ม
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
                      marginLeft: "10px"

                    }}
                    onChange={(event) =>
                      SetchillStatus(event.target.value)
                    }
                  >
                    <option value="">ทั้งหมด</option>
                    <option value="6284ad73fbfac22364a6e430">กำลังบ่ม</option>
                    <option value="6284ad91fbfac22364a6e431">บ่มเสร็จสิ้น</option>
                  </select>
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
            <DivFromTop /* style={{ border: "3px solid #FFFFFF", }} */>
              <div style={{ margin: "-3px 5px 0px 0px" }}>
                <Icon size={20} icon={list} />
              </div>
              รายการบ่มซากเนื้อโค
            </DivFromTop>
            <DivFromDown>
              <div style={{ height: `${data && data.listchill.length > 7 ? "420px" : ""}`, overflow: `${data && data.listchill.length > 7 ? "auto" : ""}` }}>
                <Table
                  striped
                  bordered
                  responsive
                  hover
                  style={{ margin: "auto" }}
                >
                  <thead>
                    <tr style={{ textAlign: "center", fontSize: "18px" }}>
                      <th>ผู้บ่มซาก</th>
                      <th>วันที่บ่ม</th>
                      <th>วันที่บ่มเสร็จ</th>
                      <th>เวลา</th>
                      <th>ประเภทซาก</th>
                      <th>จำนวนวันที่บ่ม</th>
                      <th>ทะเบียนขุน</th>
                      <th>รหัสซาก</th>
                      <th>รหัสบาร์โค้ด</th>
                      <th>คิวอาร์โค้ด</th>
                      <th>น้ำหนักอุ่น</th>
                      <th>ห้องบ่ม</th>
                      <th>สถานะ</th>
                      <th>อัพเดตสถานะ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data && data.listchill.length > 0 ? (
                      data.listchill.map((prod) => (
                        <List_chill key={prod.id} listchill={prod} />
                      ))
                    ) : (
                      <tr style={{ textAlign: "center" }}>
                        <td colSpan="14">ไม่พบข้อมูล</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
              <div style={{ float: "right", textAlign: "right" }}>
                จำนวนรายการ {data ? data.listchill.length : "0"} รายการ
                <br />
                น้ำหนักอุ่น{" "}
                {data && data.listchill.length > 0
                  ? data.listchill.reduce(
                    (sum, nex) => sum + nex.halve.weightwarm,
                    0
                  ).toFixed(2)
                  : "0"}{" "}
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
