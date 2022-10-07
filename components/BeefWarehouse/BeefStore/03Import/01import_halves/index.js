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
} from "../ImportFrom";
import { DivBase } from "../../../../../utils/divBase";

import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";
import { iosSearchStrong } from "react-icons-kit/ionicons/iosSearchStrong";

import Create_Import from "./Create_Import";

import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

import List_import from "./List_import";

import { enter } from 'react-icons-kit/icomoon/enter'

export const IMPORTHALVESEARCH = gql`
  query IMPORTHALVESEARCH(
    $namefarmer: String
    $userName: String
    $beeftype: String
    $enddate: String
    $startdate: String
    $beefroom: String
  ) {
    imhalveSearch(
      namefarmer: $namefarmer
      userName: $userName
      beeftype: $beeftype
      enddate: $enddate
      startdate: $startdate
      beefroom: $beefroom
    ) {
      barcode
      id
      importdate
      user {
        name
      }
      halve {
        weightwarm
        weightcool
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
  const [selectedbeeftypehalve, SetBeeftypeHalveChange] = useState("");
  const [selectedstartdate, SetStartDateChange] = useState("");
  const [selectedenddate, SetEndDateChange] = useState("");
  const [inputnamefarmer, SetInputnamefarmer] = useState("");
  const [inputusername, SetInputusername] = useState("");
  const [selectedbeefroom, setselectbeefroom] = useState("");
  const { data, loading, error } = useQuery(IMPORTHALVESEARCH, {
    variables: {
      beeftype: selectedbeeftypehalve,
      startdate: selectedstartdate,
      enddate: selectedenddate,
      namefarmer: inputnamefarmer,
      userName: inputusername,
      beefroom: selectedbeefroom,
    },
  });


  return (
    <div style={{ marginTop: "100px" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <HeaderColor>นำเข้าซากเนื้อโคผ่าซีก</HeaderColor>
      </div>
      <DivContainar>
        <div style={{ gridRowStart: "1", gridColumnStart: "1" }}>
          <div style={{ boxShadow: "0px 0px 4px grey", borderRadius: "10px" }}>
            <DivFromTop>
              <div style={{ margin: "-3px 5px -7px -11px" }}>
                <Icon size={20} icon={enter} />
              </div>
              ดำเนินการนำเข้าซากเนื้อโคผ่าซีก
            </DivFromTop>
            <DivFromDown>
              <div>
                <Create_Import />
              </div>
<<<<<<< HEAD
            </DivFromDown>
          </div>
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
                    onChange={(event) => SetBeeftypeHalveChange(event.target.value)}
=======
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
>>>>>>> dev65
                  >
                    <option value="">ทั้งหมด</option>
                    <option value="5f1000e28d55662dcc23d95e">ซากซ้าย</option>
                    <option value="5f1000ee8d55662dcc23d960">ซากขวา</option>
<<<<<<< HEAD
                  </SelectType>
                </Formfilter>
              </DivFromSearch>
              <DivFromSearch>
                <Formfilter>
                  เจ้าของซาก
                  <Inputfilter
                    name="farmer"
                    id="farmer"
                    onChange={(event) => SetInputnamefarmer(event.target.value)}
                  />
                </Formfilter>
              </DivFromSearch>
              <DivFromSearch>
                <Formfilter>
                  ผู้นำเข้า
                  <Inputfilter
                    name="user"
                    id="user"
                    onChange={(event) => SetInputusername(event.target.value)}
                  />
                </Formfilter>
              </DivFromSearch>
              <DivFromSearch>
                <Formfilter>
                  ตำแหน่ง
                  <SelectType
=======
                  </select>
                  <label
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
                      fontSize: "16px",
                      textAlign: "center",
                    }}
                    onChange={(event) => SetInputnamefarmer(event.target.value)}
                  />
                  <label
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
                    }}
                  >
                    ตำแหน่ง
                  </label>
                  <select
>>>>>>> dev65
                    name="roomname"
                    id="roomname"
                    onChange={(event) => setselectbeefroom(event.target.value)}
                  >
                    <option value="">ห้อง</option>
                    {dataroom &&
                      dataroom.allRoom.map((prod) => (
                        <option key={prod.id} value={prod.id}>
                          {prod.roomname}
                        </option>
                      ))}
<<<<<<< HEAD
                  </SelectType>
                </Formfilter>
              </DivFromSearch>
              <DivFromSearch>
                <Formfilter>
                  วันที่นำเข้า
                  <Inputfilter
=======
                  </select>
                  <label
                    style={{
                      textAlign: "center",
                      fontSize: "18px",
                      marginRight: "10px",
                      marginLeft: "10px"
                    }}
                  >
                    วันที่นำเข้า
                  </label>
                  <input
>>>>>>> dev65
                    type="date"
                    name="importdate"
                    id="importdate"
                    onChange={(event) => SetStartDateChange(event.target.value)}
<<<<<<< HEAD
                  />
                </Formfilter>
              </DivFromSearch>
              <DivFromSearch>
                <Formfilter>
                  ถึงวันที่
                  <Inputfilter
=======
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
>>>>>>> dev65
                    type="date"
                    name="enddate"
                    id="enddate"
                    onChange={(event) => SetEndDateChange(event.target.value)}
<<<<<<< HEAD
                  />
                </Formfilter>
              </DivFromSearch>
            </DivSearch>
          </DivFromDown>
        </DivGrid>
        <DivData>
          <DivFromTop>
            <Icon size={20} icon={list} style={{ margin: "-3px 5px 0px 0px" }} />
            รายการนำเข้าซากเนื้อโคผ่าซีก
          </DivFromTop>
          <DivFromDown>
            <div style={{ height: `${data && data.imhalveSearch.length > 6 ? "400px" : ""}`, overflow: `${data && data.imhalveSearch.length > 6 ? "auto" : ""}` }}>
              <Table
                striped
                bordered
                responsive
                hover
                style={{ margin: "auto" }}
              >
                <thead>
                  <tr style={{ textAlign: "center", fontSize: "18px" }}>
                    <th >เจ้าของซาก</th>
                    <th >ประเภทซาก</th>
                    <th >วันที่นำเข้า</th>
                    <th >เวลา</th>
                    <th >ทะเบียนขุน</th>
                    <th >รหัสซาก</th>
                    <th >รหัสบาร์โค้ด</th>
                    <th >คิวอาร์โค้ด</th>
                    <th >น้ำหนักอุ่น (กก.)</th>
                    <th >น้ำหนักเย็น (กก.)</th>
                    <th >ห้อง</th>
                    <th>สถานะ</th>
                    <th>ผู้นำเข้า</th>
                  </tr>
                </thead>
                <tbody>
                  {data && data.imhalveSearch.length > 0 ? (
                    data.imhalveSearch.map((prod) => (
                      <List_import key={prod.id} imhalve={prod} />
                    ))
                  ) : (
                    <tr style={{ textAlign: "center" }}>
                      <td colSpan="13">ไม่พบข้อมูล</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
            <div style={{ float: "right", textAlign: "right" }}>
              จำนวนรายการ {data ? data.imhalveSearch.length : "0"} รายการ
              <br />
              น้ำหนักอุ่น{" "}
              {data &&
                data.imhalveSearch.reduce(
                  (sum, nex) => sum + nex.halve.weightwarm,
                  0
                ).toFixed(2)}{" "}
              กิโลกรัม / น้ำหนักเย็น{" "}
              {data &&
                data.imhalveSearch.reduce(
                  (sum, nex) => sum + nex.halve.weightcool,
                  0
                ).toFixed(2)}{" "}
              กิโลกรัม
            </div>
          </DivFromDown >
        </DivData >
      </DivContainar >
    </div >
=======
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
              รายการนำเข้าซากเนื้อโคผ่าซีก
            </DivFromTop>
            <DivFromDown>
              <div style={{ height: `${data && data.imhalveSearch.length > 6 ? "400px" : ""}`, overflow: `${data && data.imhalveSearch.length > 6 ? "auto" : ""}` }}>
                <Table
                  striped
                  bordered
                  responsive
                  hover
                  style={{ margin: "auto" }}
                >
                  <thead>
                    <tr style={{ textAlign: "center", fontSize: "18px" }}>
                      <th >เจ้าของซาก</th>
                      <th >ประเภทซาก</th>
                      <th >วันที่นำเข้า</th>
                      <th >เวลา</th>
                      <th >ทะเบียนขุน</th>
                      <th >รหัสซาก</th>
                      <th >รหัสบาร์โค้ด</th>
                      <th >คิวอาร์โค้ด</th>
                      <th >น้ำหนักอุ่น (กก.)</th>
                      <th >น้ำหนักเย็น (กก.)</th>
                      <th >ห้อง</th>
                      <th>สถานะ</th>
                      <th>ผู้นำเข้า</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data && data.imhalveSearch.length > 0 ? (
                      data.imhalveSearch.map((prod) => (
                        <List_import key={prod.id} imhalve={prod} />
                      ))
                    ) : (
                      <tr style={{ textAlign: "center" }}>
                        <td colSpan="13">ไม่พบข้อมูล</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>

              <div style={{ float: "right", textAlign: "right" }}>
                จำนวนรายการ {data ? data.imhalveSearch.length : "0"} รายการ
                <br />
                น้ำหนักอุ่น{" "}
                {data &&
                  data.imhalveSearch.reduce(
                    (sum, nex) => sum + nex.halve.weightwarm,
                    0
                  ).toFixed(2)}{" "}
                กิโลกรัม / น้ำหนักเย็น{" "}
                {data &&
                  data.imhalveSearch.reduce(
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
>>>>>>> dev65
  );
};

export default index;
