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
} from "../StoreFrom.js";
import { DivBase } from "../../../../../utils/divBase";

import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";
import { iosSearchStrong } from "react-icons-kit/ionicons/iosSearchStrong";

import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

import List_Store from "./ListStore.js";

import Nav_store from "../Nav_store";

export const STOREENTRAIL = gql`
  query STOREENTRAIL($beefroom: String, $expdate: String,$cownum: String) {
    listentrail(beefroom: $beefroom, expdate: $expdate, cownum: $cownum) {
      id
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
      info
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
  const [inputcownum, setinputcownum] = useState("");
  const { data, loading, error } = useQuery(STOREENTRAIL, {
    variables: {
      beefroom: selectedbeefroom,
      expdate: expdate,
      cownum: inputcownum,
    },
  });
  const { data: dataroom } = useQuery(QUERYROOM);
  return (
    <div style={{ marginTop: "100px" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <HeaderColor>คงคลังชิ้นส่วนอื่น ๆ</HeaderColor>
      </div>
      <DivContainar>
        <div><Nav_store Sidenumber={2} /></div>
        <DivGrid>
          <DivFromTop>
            <Icon size={20} icon={iosSearchStrong} style={{ margin: "-3px 5px 0px 0px" }} />
            ค้นหารายการ
          </DivFromTop>
          <DivFromDown>
            <DivSearch>
              <DivFromSearch>
                <Formfilter>
                  ทะเบียนขุน
                  <Inputfilter
                    name="numcow"
                    id="numcow"
                    onChange={(event) => setinputcownum(event.target.value)}
                  />
                </Formfilter>
              </DivFromSearch>
              <DivFromSearch>
                <Formfilter>
                  ตำแหน่ง
                  <SelectType
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
                  </SelectType>
                </Formfilter>
              </DivFromSearch>
              <DivFromSearch>
                <Formfilter>
                  วันหมดอายุ
                  <Inputfilter
                    type="date"
                    name="date"
                    id="date"
                    onChange={(event) => setexpdate(event.target.value)}
                  />
                </Formfilter>
              </DivFromSearch>
            </DivSearch>
          </DivFromDown>
        </DivGrid>
        <DivData>
          <DivFromTop>
            <Icon size={20} icon={list} style={{ margin: "-3px 5px 0px 0px" }} />
            รายการยอดคงคลังซากโคส่วนอื่น ๆ
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
        </DivData>
      </DivContainar>
    </div>
  );
};

export default index;
