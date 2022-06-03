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
  query STORELIST($beeftype: String, $type: String) {
    liststore(beeftype: $beeftype, type: $type) {
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
    }
  }
`;

const index = () => {
  const [selectedbeeftype, SetBeeftypeChange] = useState("");
  const [selecttype, SettypeChange] = useState("");
  const { data, loading, error } = useQuery(STORELIST, {
    variables: {
      beeftype: selectedbeeftype,
      type: selecttype,
    },
  });
  console.log(selectedbeeftype);
  return (
    <DivBase>
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
              height: "170px",
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
                      fontSize: "14px",
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
                      fontSize: "14px",
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
                      fontSize: "14px",
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
                    name="room"
                    id="room"
                    style={{
                      height: "35px",
                      width: "50px",
                      border: "1px solid #AFAFAF",
                      borderRadius: "4px 0px 0px 4px",
                      textAlign: "center",
                      fontSize: "14px",
                    }}
                  >
                    <option value="">ห้อง</option>
                    <option value="">1</option>
                    <option value="">2</option>
                    <option value="">3</option>
                  </select>
                  <select
                    name="shelf"
                    id="shelf"
                    style={{
                      height: "35px",
                      width: "50px",
                      border: "1px solid #AFAFAF",
                      borderLeft: "none",
                      textAlign: "center",
                      fontSize: "14px",
                    }}
                  >
                    <option value="">ชั้น</option>
                    <option value="">1</option>
                    <option value="">2</option>
                    <option value="">3</option>
                  </select>
                  <select
                    name="bucket"
                    id="bucket"
                    style={{
                      height: "35px",
                      width: "60px",
                      border: "1px solid #AFAFAF",
                      borderRadius: "0px 4px 4px 0px",
                      borderLeft: "none",
                      textAlign: "center",
                      fontSize: "14px",
                      marginRight: "10px",
                    }}
                  >
                    <option value="">ตะกร้า</option>
                    <option value="">1</option>
                    <option value="">2</option>
                    <option value="">3</option>
                  </select>
                  <label
                    for="beef"
                    style={{
                      textAlign: "center",
                      fontSize: "18px",
                      margin: "10px 10px",
                    }}
                  >
                    วันหมดอายุ
                  </label>
                  <select
                    name="room"
                    id="room"
                    style={{
                      height: "35px",
                      width: "70px",
                      border: "1px solid #AFAFAF",
                      borderRadius: "4px ",
                      textAlign: "center",
                      fontSize: "14px",
                    }}
                  >
                    <option value="halve">ทั้งหมด</option>
                    <option value="quarter">1</option>
                    <option value="lamp">2</option>
                    <option value="chop">3</option>
                  </select>
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
                      fontSize: "14px",
                    }}
                  >
                    <option value="halve">ทั้งหมด</option>
                    <option value="quarter">1</option>
                    <option value="lamp">2</option>
                    <option value="chop">3</option>
                    <option value="chop">4</option>
                    <option value="chop">5</option>
                  </select>
                  <label
                    for="beef"
                    style={{
                      textAlign: "center",
                      fontSize: "18px",
                      margin: "10px 10px",
                    }}
                  >
                    สถานะ
                  </label>
                  <select
                    name="beef"
                    id="beef"
                    style={{
                      height: "35px",
                      width: "120px",
                      border: "1px solid #AFAFAF",
                      textAlign: "center",
                      borderRadius: "4px",
                      fontSize: "14px",
                    }}
                  >
                    <option value="all">ทั้งหมด</option>
                    <option value="halve">ตัดแต่งซ้ายขวา</option>
                    <option value="quarter">ตัดแต่ง(สี่เสี้ยว)</option>
                    <option value="lamp">ตัดแต่ง(สี่เสี้ยว)</option>
                    <option value="chop">ตัดแต่ง(ก้อนเนื้อ)</option>
                    <option value="chop">ตัดแต่ง(ชิ้นเนื้อ)</option>
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
              <div style={{ height: "280px", overflowY: "auto" }}>
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
                      <th>ประเภทซาก</th>
                      <th>ทะเบียนขุน</th>
                      <th>รหัสซาก</th>
                      <th>รหัสบาร์โค้ด</th>
                      <th>คิวอาร์โค้ด</th>
                      <th>น้ำหนักอุ่น</th>
                      <th>น้ำหนักเย็น</th>
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
                    {data &&
                      data.liststore.map((prod) => (
                        <List_Store key={prod.beeftypeid} Liststore={prod} />
                      ))}
                  </tbody>
                </Table>
              </div>
            </DivFromDown>
          </DivFrom>
        </>
      </DivBase>
    </DivBase>
  );
};

export default index;
