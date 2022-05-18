import React from "react";

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
  query STORELIST {
    liststore {
      beeftype
      cownum
      code
      barcode
      weightwarm
      weight
      status
    }
  }
`;

const index = () => {
  const { data, loading, error } = useQuery(STORELIST);
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
                    }}
                  >
                    <option value="">ทั้งหมด</option>
                    <option value="">ซากซ้าย</option>
                    <option value="">ซากขวา</option>
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
                    อายุ
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
                      <th>อายุ</th>
                      <th>เกรด</th>
                      <th>ห้อง</th>
                      <th>ชั้น</th>
                      <th>ตะกร้า</th>
                      <th>สถานะ</th>
                      <th>หมายเหตุ</th>
                      <th>แก้ไข</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data &&
                      data.liststore.map((prod) => (
                        <List_Store key={prod.id} ListStore={prod} />
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
