import React, { useState, useRef, useEffect } from "react";

import { Table } from "react-bootstrap";
import { DivFrom, DivFromTop, DivFromDown, HeaderColor } from "./ImportFrom";
import { DivBase } from "../../../../utils/divBase";

import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";
import { iosSearchStrong } from "react-icons-kit/ionicons/iosSearchStrong";

import Create from "./create";

import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

import Listim from "./listimproduct";
import { enter } from 'react-icons-kit/icomoon/enter'

export const IMPRODUCTSEARCH = gql`
  query ImproductSearch(
    $startdate: String
    $enddate: String
    $producttype: String
    $userName: String
    $productroom: String
    $freezer: String
    $pbasket: String
  ) {
    improductSearch(
      startdate: $startdate
      enddate: $enddate
      producttype: $producttype
      userName: $userName
      productroom: $productroom
      freezer: $freezer
      pbasket: $pbasket
    ) {
      id
      importdate
      name
      user {
        name
      }
      beefproduct {
        weight
        barcode
        MFG
        BBE
        status {
          code
          nameTH
        }
        producttype {
          code
          nameTH
        }
      }
      productroom {
        roomname
      }
      freezer {
        freezername
      }
      pbasket
    }
  }
`;

const QUERYTYPE = gql`
  query QUERYTYPE {
    allproducttype {
      id
      code
      nameTH
    }
  }
`;

const PRODUCTROOM = gql`
  query PRODUCTROOM {
    allproductroom {
      id
      roomname
    }
  }
`;

const PRODUCTFREEZER = gql`
  query ListFreezer($id: ID) {
    listFreezer(id: $id) {
      id
      freezername
    }
  }
`;

const PRODUCTBASKET = gql`
  query Allpbasket($id: ID) {
    allpbasket(id: $id) {
      id
      basketname
    }
  }
`;

const index = () => {
  const [selectstartdate, setselectstartdate] = useState("");
  const [selectenddate, setselectenddate] = useState("");
  const [importer, setimporter] = useState("");
  const [producttype, setproducttype] = useState("");
  const [selectroom, setselectroom] = useState("");
  const [selectfreezer, setselectfreezer] = useState("");
  const [selectpbasket, setselectpbasket] = useState("");

  const { data: type } = useQuery(QUERYTYPE);
  const { data: room } = useQuery(PRODUCTROOM);
  const { data: freezer } = useQuery(PRODUCTFREEZER, {
    variables: {
      id: selectroom,
    },
  });
  const { data: basket } = useQuery(PRODUCTBASKET, {
    variables: {
      id: selectfreezer,
    },
  });

  const { data } = useQuery(IMPRODUCTSEARCH, {
    variables: {
      startdate: selectstartdate,
      enddate: selectenddate,
      producttype: producttype,
      userName: importer,
      productroom: selectroom,
      freezer: selectfreezer,
      pbasket: selectpbasket,
    },
  });


  return (
    <div style={{ marginTop: "100px" }}>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
      >
        <HeaderColor
          style={{
            width: "fit-content",
            height: "fit-content",
            padding: "5px 30px",
          }}
        >
          นำเข้าผลิตภัณฑ์
        </HeaderColor>
      </div>
      <DivBase
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 270px 1150px 1fr",
          gridRowGap: "15px",
          gridColumnGap: "10px",
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
          <DivFromTop>
            <div style={{ margin: "-1px 5px 0px -5px" }}>
              <Icon size={20} icon={enter} />
            </div>
            ดำเนินการนำเข้าผลิตภัณฑ์
          </DivFromTop>
          <DivFromDown>
            <Create />
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
          <DivFromDown>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div>
                <label
                  style={{
                    textAlign: "center",
                    fontSize: "18px",
                    marginRight: "10px",
                  }}
                >
                  ประเภทสินค้า
                </label>
                <select
                  name="producttype"
                  id="producttype"
                  style={{
                    height: "35px",
                    width: "120px",
                    border: "1px solid #AFAFAF",
                    borderRadius: "4px",
                    textAlign: "center",
                    fontSize: "14px",
                  }}
                  onChange={(event) => setproducttype(event.target.value)}
                >
                  <option value="">ทั้งหมด</option>
                  {type &&
                    type.allproducttype.map((prod) => (
                      <option key={prod.id} value={prod.id}>
                        {prod.nameTH}
                      </option>
                    ))}
                </select>
                <label
                  name="userName"
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
                    fontSize: "14px",
                    textAlign: "center",
                  }}
                  onChange={(event) => setimporter(event.target.value)}
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
                  name="roomname"
                  style={{
                    height: "35px",
                    width: "50px",
                    border: "1px solid #AFAFAF",
                    borderRadius: "4px 0px 0px 4px",
                    textAlign: "center",
                    fontSize: "14px",
                  }}
                  onChange={(event) => setselectroom(event.target.value)}
                >
                  <option value="">ตู้แช่</option>
                  {room &&
                    room.allproductroom.map((prod) => (
                      <option key={prod.id} value={prod.id}>
                        {prod.roomname}
                      </option>
                    ))}
                </select>
                <select
                  name="freezername"
                  disabled={!selectroom}
                  style={{
                    height: "35px",
                    width: "50px",
                    border: "1px solid #AFAFAF",
                    borderLeft: "none",
                    textAlign: "center",
                    fontSize: "14px",
                  }}
                  onChange={(event) => setselectfreezer(event.target.value)}
                >
                  <option value="">ชั้น</option>
                  {freezer &&
                    freezer.listFreezer.map((prod) => (
                      <option key={prod.id} value={prod.id}>
                        {prod.freezername}
                      </option>
                    ))}
                </select>
                <select
                  name="basketname"
                  disabled={!selectfreezer || !selectroom}
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
                  onChange={(event) => setselectpbasket(event.target.value)}
                >
                  <option value="">ตะกร้า</option>
                  {basket &&
                    basket.allpbasket.map((prod) => (
                      <option key={prod.id} value={prod.basketname}>
                        {prod.basketname}
                      </option>
                    ))}
                </select>
                <label
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
                  id="startdate"
                  name="startdate"
                  style={{
                    height: "35px",
                    border: "1px solid #AFAFAF",
                    borderRadius: "4px",
                    textAlign: "center",
                    fontSize: "16px",
                  }}
                  onChange={(event) => setselectstartdate(event.target.value)}
                />
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
                  onChange={(event) => setselectenddate(event.target.value)}
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
            marginTop: "10px",
          }}
        >
          <DivFromTop>
            <div style={{ margin: "-3px 5px 0px 0px" }}>
              <Icon size={20} icon={list} />
            </div>
            รายการนำเข้าผลิตภัณฑ์
          </DivFromTop>
          <DivFromDown>
            <div style={{ height: `${data && data.improductSearch.length > 7 ? "430px" : ""}`, overflow: `${data && data.improductSearch.length > 7 ? "auto" : ""}` }}>
              <Table
                striped
                bordered
                responsive
                hover
                style={{ margin: "auto" }}
              >
                <thead>
                  <tr style={{ textAlign: "center", fontSize: "18px" }}>
                    <th>ประเภทสินค้า</th>
                    <th>วันที่นำเข้า</th>
                    <th>เวลา</th>
                    <th>รหัสสินค้า</th>
                    <th>รหัสบาร์โค้ด</th>
                    <th>คิวอาร์โค้ด</th>
                    <th>น้ำหนัก (กก.)</th>
                    <th>วันที่ผลิต</th>
                    <th>วันหมดอายุ</th>
                    <th>ตู้แช่</th>
                    <th>ชั้น</th>
                    <th>ตะกร้า</th>
                    <th>ผู้นำเข้า</th>
                  </tr>
                </thead>
                <tbody>
                  {data && data.improductSearch.length > 0 ? (
                    data.improductSearch.map((prod) => (
                      <Listim key={prod.id} listim={prod} />
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
              จำนวนรายการ {data ? data.improductSearch.length : "0"} รายการ
              <br />
              น้ำหนัก{" "}
              {data &&
                data.improductSearch.reduce(
                  (sum, nex) => sum + nex.beefproduct.weight,
                  0
                ).toFixed(2)}{" "}
              กิโลกรัม
            </div>
          </DivFromDown>
        </DivFrom>
      </DivBase>
    </div>
  );
};

export default index;
