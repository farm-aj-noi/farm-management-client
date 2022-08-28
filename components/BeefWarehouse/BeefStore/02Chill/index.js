import React, { useState } from "react";

import { Table } from "react-bootstrap";
import {
  DivFrom,
  DivFromTop,
  DivFromDown,
  HeaderColor,
  DivContainar,
  DivSearch,
  DivFromSearch,
  Formfilter,
  SelectType,
  Inputfilter,
  Formfilter1,
  FormfilterRoom,
  SelectRoom,
  DivGrid,
  DivData,

} from "./ChillFrom.js";
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
      <div style={{ display: "flex", justifyContent: "center" }}>
        <HeaderColor>บ่มซากเนื้อโค</HeaderColor>
      </div>
      <DivContainar>
        <div style={{ gridRowStart: "1", gridColumnStart: "1" }}>
          <DivFromTop>
            <div style={{ margin: "-3px 0px -7px -11px" }}>
              <Iconchill height="30px" weight="30px" />
            </div>
            ดำเนินการบ่มซากเนื้อโค
          </DivFromTop>
          <DivFromDown>
            <div>
              <Submit_Chill />
            </div>
          </DivFromDown>
        </div>
        <DivGrid>
          <DivFromTop>
            <Icon size={20} icon={iosSearchStrong} style={{ margin: "-3px 5px 0px 0px" }} />
            ค้นหารายการ
          </DivFromTop>
          <DivFromDown>
            <DivSearch>
              <DivFromSearch>
                <Formfilter>
                  ประเภทซาก
                  <SelectType
                    name="beeftype"
                    id="beeftype"
                    onChange={(event) => SetBeeftypeChillChange(event.target.value)}
                  >
                    <option value="">ทั้งหมด</option>
                    <option value="5f1000e28d55662dcc23d95e">ซากซ้าย</option>
                    <option value="5f1000ee8d55662dcc23d960">ซากขวา</option>
                  </SelectType>
                </Formfilter>
              </DivFromSearch>
              <DivFromSearch>
                <Formfilter>
                  ผู้บ่มซาก
                  <Inputfilter
                    name="user"
                    id="user"
                    onChange={(event) => SetnameChange(event.target.value)}
                  />
                </Formfilter>
              </DivFromSearch>
              <DivFromSearch>
                <Formfilter>
                  วันที่บ่ม
                  <Inputfilter
                    type="date"
                    name="chilldate"
                    id="chilldate"
                    onChange={(event) => SetStartDateChange(event.target.value)}
                  />
                </Formfilter>
              </DivFromSearch>
              <DivFromSearch>
                <Formfilter>
                  ถึงวันที่
                  <Inputfilter
                    type="date"
                    name="chilldateend"
                    id="chilldateend"
                    onChange={(event) => SetEndDateChange(event.target.value)}
                  />
                </Formfilter>
              </DivFromSearch>
              <DivFromSearch>
                <Formfilter>
                  วันที่บ่มเสร็จ
                  <Inputfilter
                    type="date"
                    name="chilldonedate"
                    id="chilldonedate"
                    onChange={(event) => SetStartDateChange2(event.target.value)}
                  />
                </Formfilter>
              </DivFromSearch>
              <DivFromSearch>
                <Formfilter>
                  ถึงวันที่
                  <Inputfilter
                    type="date"
                    name="chilldonedateend"
                    id="chilldonedateend"
                    onChange={(event) => SetEndDateChange2(event.target.value)}
                  />
                </Formfilter>
              </DivFromSearch>
              <DivFromSearch>
                <Formfilter>
                  สถานะบ่ม
                  <SelectType
                    name="chillstatus"
                    id="chillstatus"
                    onChange={(event) => SetchillStatus(event.target.value)}
                  >
                    <option value="">ทั้งหมด</option>
                    <option value="6284ad73fbfac22364a6e430">กำลังบ่ม</option>
                    <option value="6284ad91fbfac22364a6e431">บ่มเสร็จสิ้น</option>
                  </SelectType>
                </Formfilter>
              </DivFromSearch>
            </DivSearch>
          </DivFromDown>
        </DivGrid>
        <DivData>
          <DivFromTop /* style={{ border: "3px solid #FFFFFF", }} */>
            <Icon size={20} icon={list} style={{ margin: "-3px 5px 0px 0px" }} />
            รายการบ่มซากเนื้อโค
          </DivFromTop>
          <DivFromDown>
            <div style={{ height: `${data && data.listchill.length > 6 ? "320px" : ""}`, overflow: "auto" }}>
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
                )
                : "0"}{" "}
              กิโลกรัม
            </div>
          </DivFromDown>
        </DivData>
      </DivContainar>
    </div>
  );
};

export default index;
