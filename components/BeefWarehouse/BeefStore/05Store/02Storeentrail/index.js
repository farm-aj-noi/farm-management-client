import React, { useState } from "react";

import { Table } from "react-bootstrap";
import { DivFrom, DivFromTop, DivFromDown, HeaderColor } from "../StoreFrom.js";
import { DivBase } from "../../../../../utils/divBase";

import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";
import { iosSearchStrong } from "react-icons-kit/ionicons/iosSearchStrong";

import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

import List_Store from "./ListStore.js";

import Nav_store from "../Nav_store";

export const STOREENTRAIL = gql`
  query STOREENTRAIL($beefroom: String, $expdate: String) {
    listentrail(beefroom: $beefroom, expdate: $expdate) {
      namefarmer
      barcode
      cownum
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
      beefroom
      Expdate
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
  const [selectedbeefroom, setselectbeefroom] = useState("");
  const [expdate, setexpdate] = useState("");
  const { data, loading, error } = useQuery(STOREENTRAIL, {
    variables: {
      beefroom: selectedbeefroom,
      expdate: expdate,
    },
  });
  const { data: dataroom } = useQuery(QUERYROOM);
  return (
    <div style={{ marginTop: "100px" }}>
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
          คงคลังชิ้นส่วนอื่น ๆ
        </HeaderColor>
      </div>
      <DivBase
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 200px 1300px 1fr",
          gridRowGap: "15px",
          gridColumnGap: "20px",
          textAlign: "start",
        }}
      >
        <DivFrom
          style={{
            width: "100%",
            marginTop: "0",
            gridRowStart: "2",
            gridRowEnd: "5",
            gridColumnStart: "2",
          }}
        >
          <Nav_store Sidenumber={2} />
        </DivFrom>
        <DivFrom
          style={{
            width: "100%",
            gridRowStart: "2",
            gridRowEnd: "2",
            gridColumnStart: "3",
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
                    marginLeft: "10px",
                    marginRight: "10px",
                  }}
                >
                  ทะเบียนขุน
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
                  for="expdate"
                  style={{
                    textAlign: "center",
                    fontSize: "18px",
                    margin: "10px 10px",
                  }}
                >
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
                    name="roomname"
                    style={{
                      height: "35px",
                      width: "110px",
                      border: "1px solid #AFAFAF",
                      borderRadius: "4px ",
                      textAlign: "center",
                      fontSize: "14px",
                      marginRight: "10px",
                    }}
                    onChange={(event) => setselectbeefroom(event.target.value)}
                  >
                    <option value="">ห้อง</option>
                    {dataroom &&
                      dataroom.allRoom.map((prod) => (
                        <option key={prod.id} value={prod.id}>
                          {prod.roomname}
                        </option>
                      ))}
                  </select>
                  วันหมดอายุ
                </label>
                <input
                  type="date"
                  name="expdate"
                  id="date"
                  style={{
                    height: "35px",
                    border: "1px solid #AFAFAF",
                    borderRadius: "4px ",
                    textAlign: "center",
                    fontSize: "16px",
                  }}
                  onChange={(event) => setexpdate(event.target.value)}
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
            marginTop: "0px",
          }}
        >
          <DivFromTop>
            <div style={{ margin: "-3px 5px 0px 0px" }}>
              <Icon size={20} icon={list} />
            </div>
            รายการยอดคงคลังซากโค
          </DivFromTop>
          <DivFromDown>
            <div style={{ height: `${data && data.listentrail.length > 7 ? "380px" : ""}`, overflow: "auto" }}>
              <Table
                striped
                bordered
                responsive
                hover
                style={{ margin: "auto" }}
              >
                <thead>
                  <tr style={{ textAlign: "center" }}>
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
                    <th>วันหมดอายุ</th>
                    <th>ห้อง</th>
                    <th>หมายเหตุ</th>
                    <th>แก้ไข</th>
                  </tr>
                </thead>
                <tbody>
                  {data && data.listentrail.length > 0 ? (
                    data.listentrail.map((prod) => (
                      <List_Store key={prod.id} Listentrail={prod} />
                    ))
                  ) : (
                    <tr style={{ textAlign: "center" }}>
                      <td colSpan="17">ไม่พบข้อมูล</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
            <div style={{ float: "right", textAlign: "right" }}>
              จำนวนรายการ {data ? data.listentrail.length : "0"} รายการ
            </div>
          </DivFromDown>
        </DivFrom>
      </DivBase>
    </div>
  );
};

export default index;
