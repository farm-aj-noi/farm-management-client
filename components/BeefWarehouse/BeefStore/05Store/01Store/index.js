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

export const STORELIST = gql`
  query STORELIST(
    $beeftype: String
    $type: String
    $beefroom: String
    $shelf: String
    $expdate: String
  ) {
    liststore(
      beeftype: $beeftype
      type: $type
      beefroom: $beefroom
      shelf: $shelf
      expdate: $expdate
    ) {
      barcode
      status
      cownum
      beeftype
      code
      weightwarm
      weight
      importdate
      namefarmer
      beefroom
      beeftypeid
      shelf
      basket
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

export const QUERYSHELF = gql`
  query QUERYSHELF($id: ID) {
    listShelf(id: $id) {
      shelfname
      id
    }
  }
`;

export const QUERYBASKET = gql`
  query QUERYBASKET($id: ID) {
    allBasket(id: $id) {
      id
      basketname
    }
  }
`;

const index = () => {
  const { data: dataroom } = useQuery(QUERYROOM);
  const [selectedbeeftype, SetBeeftypeChange] = useState("");
  const [selecttype, SettypeChange] = useState("");
  const [selectedbeefroom, setselectbeefroom] = useState("");
  const [selectedshelf, setselectshelf] = useState("");
  const [selectedbasket, setselectbasket] = useState("");
  const [expdate, setexpdate] = useState("");
  const { data: datashelf } = useQuery(QUERYSHELF, {
    variables: {
      id: selectedbeefroom,
    },
  });

  const { data: basketdata } = useQuery(QUERYBASKET, {
    variables: {
      id: selectedshelf,
    },
  });
  const { data, loading, error } = useQuery(STORELIST, {
    variables: {
      beeftype: selectedbeeftype,
      type: selecttype,
      beefroom: selectedbeefroom,
      shelf: selectedshelf,
      expdate: expdate,
    },
  });

  /*   console.log(selectedbeeftype); */
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
          คงคลังซากเนื้อโค
        </HeaderColor>
      </div>
      <DivBase
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 200px 1000px 1fr",
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
            <Nav_store Sidenumber={1} />
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
                    ซาก
                  </label>
                  <select
                    name="type"
                    id="type"
                    style={{
                      height: "35px",
                      width: "120px",
                      border: "1px solid #AFAFAF",
                      borderRadius: "4px",
                      textAlign: "center",
                      fontSize: "16px",
                      marginRight: "10px",
                    }}
                    onChange={(event) => SettypeChange(event.target.value)}
                  >
                    <option value="">ทั้งหมด</option>
                    <option value="ซากโคผ่าซีก">ซากโคผ่าซีก</option>
                    <option value="ซากโคสี่เสี้ยว">ซากโคสี่เสี้ยว</option>
                    <option value="ก้อนเนื้อ">ก้อนเนื้อ</option>
                    <option value="ชิ้นเนื้อ">ชิ้นเนื้อ</option>
                  </select>
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
                    name="beeftype"
                    id="beeftype"
                    style={{
                      height: "35px",
                      width: "120px",
                      border: "1px solid #AFAFAF",
                      borderRadius: "4px",
                      textAlign: "center",
                      fontSize: "16px",
                    }}
                    onChange={(event) => SetBeeftypeChange(event.target.value)}
                  >
                    {selecttype == "ซากโคผ่าซีก" ? (
                      <>
                        <option value="">ทั้งหมด</option>
                        <option value="5f1000e28d55662dcc23d95e">
                          ซากซ้าย
                        </option>
                        <option value="5f1000ee8d55662dcc23d960">ซากขวา</option>
                      </>
                    ) : selecttype == "ซากโคสี่เสี้ยว" ? (
                      <>
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
                      </>
                    ) : selecttype == "ก้อนเนื้อ" ? (
                      <>
                        <option value="">ทั้งหมด</option>
                        <option value="5f446195ecd6732ad8108684">
                          เนื้อสันคอ
                        </option>
                        <option value="5f4461a8ecd6732ad8108685">ที-โบน</option>
                        <option value="5f4461bfecd6732ad8108686">
                          เนื้อสันนอก
                        </option>
                        <option value="5f4461d6ecd6732ad8108687">
                          ที-โบน สเต็ก
                        </option>
                        <option value="5f44620cecd6732ad8108688">ริบอาย</option>
                        <option value="5f446224ecd6732ad8108689">
                          ใบบัวสเต็ก
                        </option>
                        <option value="5f44623aecd6732ad810868a">
                          เนื้อสันใน
                        </option>
                        <option value="5f44624fecd6732ad810868b">
                          สันสะโพก
                        </option>
                        <option value="5f446262ecd6732ad810868c">
                          เสือร้องไห้
                        </option>
                        <option value="5f44628decd6732ad810868d">
                          เนื้อซี่โครง
                        </option>
                        <option value="5f4462a4ecd6732ad810868e">พับใน</option>
                        <option value="5f4462b6ecd6732ad810868f">ตะพาบ</option>
                        <option value="5f4462c8ecd6732ad8108690">
                          ลูกมะพร้าว
                        </option>
                        <option value="5f4462ddecd6732ad8108691">
                          ปลาบู่ทอง
                        </option>
                        <option value="5f4462eeecd6732ad8108692">ใบพาย</option>
                        <option value="5f4462feecd6732ad8108693">
                          หางตะเข้
                        </option>
                        <option value="5f44630fecd6732ad8108694">น่อง</option>
                        <option value="5f446320ecd6732ad8108695">พับนอก</option>
                      </>
                    ) : selecttype == "ชิ้นเนื้อ" ? (
                      <>
                        <option value="">ทั้งหมด</option>
                        <option value="5f446195ecd6732ad8108684">
                          เนื้อสันคอ
                        </option>
                        <option value="5f4461a8ecd6732ad8108685">ที-โบน</option>
                        <option value="5f4461bfecd6732ad8108686">
                          เนื้อสันนอก
                        </option>
                        <option value="5f4461d6ecd6732ad8108687">
                          ที-โบน สเต็ก
                        </option>
                        <option value="5f44620cecd6732ad8108688">ริบอาย</option>
                        <option value="5f446224ecd6732ad8108689">
                          ใบบัวสเต็ก
                        </option>
                        <option value="5f44623aecd6732ad810868a">
                          เนื้อสันใน
                        </option>
                        <option value="5f44624fecd6732ad810868b">
                          สันสะโพก
                        </option>
                        <option value="5f446262ecd6732ad810868c">
                          เสือร้องไห้
                        </option>
                        <option value="5f44628decd6732ad810868d">
                          เนื้อซี่โครง
                        </option>
                        <option value="5f4462a4ecd6732ad810868e">พับใน</option>
                        <option value="5f4462b6ecd6732ad810868f">ตะพาบ</option>
                        <option value="5f4462c8ecd6732ad8108690">
                          ลูกมะพร้าว
                        </option>
                        <option value="5f4462ddecd6732ad8108691">
                          ปลาบู่ทอง
                        </option>
                        <option value="5f4462eeecd6732ad8108692">ใบพาย</option>
                        <option value="5f4462feecd6732ad8108693">
                          หางตะเข้
                        </option>
                        <option value="5f44630fecd6732ad8108694">น่อง</option>
                        <option value="5f446320ecd6732ad8108695">พับนอก</option>
                      </>
                    ) : (
                      <option value="">ทั้งหมด</option>
                    )}
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
                    ทะเบียนขุน
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
                  />
                </from>
              </div>
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
                      margin: "10px 10px",
                    }}
                  >
                    ตำแหน่ง
                  </label>
                  <select
                    name="roomname"
                    id="roomname"
                    style={{
                      height: "35px",
                      width: "50px",
                      border: "1px solid #AFAFAF",
                      borderRadius: "4px 0px 0px 4px",
                      textAlign: "center",
                      fontSize: "16px",
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
                  <select
                    name="shelfname"
                    id="shelfname"
                    style={{
                      height: "35px",
                      width: "50px",
                      border: "1px solid #AFAFAF",
                      borderLeft: "none",
                      textAlign: "center",
                      fontSize: "16px",
                    }}
                    onChange={(event) => setselectshelf(event.target.value)}
                  >
                    <option value="">ชั้น</option>
                    {datashelf &&
                      datashelf.listShelf.map((prod) => (
                        <option key={prod.id} value={prod.id}>
                          {prod.shelfname}
                        </option>
                      ))}
                  </select>
                  <select
                    name="basket"
                    id="basket"
                    style={{
                      height: "35px",
                      width: "60px",
                      border: "1px solid #AFAFAF",
                      borderRadius: "0px 4px 4px 0px",
                      borderLeft: "none",
                      textAlign: "center",
                      fontSize: "16px",
                      marginRight: "10px",
                    }}
                  >
                    <option value="">ตะกร้า</option>
                    {basketdata &&
                      basketdata.allBasket.map((prod) => (
                        <option key={prod.id} value={prod.id}>
                          {prod.basketname}
                        </option>
                      ))}
                  </select>
                  <label
                    for="expdate"
                    style={{
                      textAlign: "center",
                      fontSize: "18px",
                      margin: "10px 10px",
                    }}
                  >
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
                  <label
                    for="beef"
                    style={{
                      textAlign: "center",
                      fontSize: "18px",
                      margin: "10px 10px",
                    }}
                  >
                    เกรด
                  </label>
                  <select
                    name="room"
                    id="room"
                    style={{
                      height: "35px",
                      width: "70px",
                      border: "1px solid #AFAFAF",
                      borderRadius: "4px",
                      textAlign: "center",
                      fontSize: "16px",
                    }}
                  >
                    <option value="halve">ทั้งหมด</option>
                    <option value="quarter">1</option>
                    <option value="lamp">2</option>
                    <option value="chop">3</option>
                    <option value="chop">4</option>
                    <option value="chop">5</option>
                  </select>
                </from>
              </div>
            </DivFromDown>
          </DivFrom>
          <DivFrom
            style={{
              width: "1220px",
              gridRowStart: "5",
              gridRowEnd: "5",
              gridColumnStart: "2",
              gridColumnEnd: "4",
            }}
          >
            <DivFromTop>
              <div style={{ margin: "-3px 5px 0px 0px" }}>
                <Icon size={20} icon={list} />
              </div>
              รายการยอดคงคลังซากเนื้อโค
            </DivFromTop>
            <DivFromDown>
              <div style={{ height: `${data && data.liststore.length > 5 ? "320px" : ""}`, overflow: "auto" }}>
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
                      <th>ทะเบียนขุน</th>
                      <th>รหัสซาก</th>
                      <th>รหัสบาร์โค้ด</th>
                      <th>คิวอาร์โค้ด</th>
                      <th>น้ำหนักอุ่น (กก.)</th>
                      <th>น้ำหนักเย็น (กก.)</th>
                      <th>วันหมดอายุ</th>
                      <th>เกรด</th>
                      <th>ห้อง</th>
                      <th>ชั้น</th>
                      <th>ตะกร้า</th>
                      <th>สถานะ</th>
                      <th>หมายเหตุ</th>
                      <th>จัดการ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data && data.liststore.length > 0 ? (
                      data.liststore.map((prod) => (
                        <List_Store key={prod.beeftypeid} Liststore={prod} />
                      ))
                    ) : (
                      <tr style={{ textAlign: "center" }}>
                        <td colSpan="15">ไม่พบข้อมูล</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
              <div
                style={{ float: "right", textAlign: "right", marginTop: "5px" }}
              >
                จำนวนรายการ {data ? data.liststore.length : "0"} รายการ
                <br />
                น้ำหนักอุ่น{" "}
                {data && data.liststore.length > 0
                  ? data.liststore.reduce((sum, nex) => sum + nex.weightwarm, 0)
                  : "0"}{" "}
                กิโลกรัม / น้ำหนักเย็น{" "}
                {data &&
                  data.liststore.reduce((sum, nex) => sum + nex.weight, 0)}{" "}
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
