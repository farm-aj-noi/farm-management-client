import React, { useState } from "react";
import { DivFrom, DivFromTop, DivFromDown, HeaderColor } from "./StoreFrom";
import { DivBase } from "../../../../utils/divBase";
import { Table } from "react-bootstrap";

import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";

import { iosSearchStrong } from "react-icons-kit/ionicons/iosSearchStrong";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Listall from "./liststore";

export const ALLPRODUCT = gql`
  query Allproduct(
    $producttype: String
    $productroom: String
    $freezer: String
  ) {
    allproduct(
      producttype: $producttype
      productroom: $productroom
      freezer: $freezer
    ) {
      barcode
      status
      producttype
      code
      weight
      importdate
      productroom
      freezer
      pbasket
      producttypeid
      productroomid
      freezerid
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
  const { data } = useQuery(ALLPRODUCT, {
    variables: {
      producttype: producttype,
      productroom: selectroom,
      freezer: selectfreezer,
    },
  });
  console.log(data);
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
          คงคลังผลิตภัณฑ์
        </HeaderColor>
      </div>
      <DivBase
        style={{
          display: "grid",
          gridTemplateColumns: "1fr  1150px 1fr",
          gridRowGap: "15px",
          gridColumnGap: "10px",
          textAlign: "start",
        }}
      >
        {" "}
        <DivFrom
          style={{
            width: "100%",
            gridRowStart: "2",
            gridRowEnd: "3",
            gridColumnStart: "2",
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
                  for="producttype"
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
                    fontSize: "16px",
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
                  for="beef"
                  style={{
                    textAlign: "center",
                    fontSize: "18px",
                    marginLeft: "10px",
                    marginRight: "10px",
                  }}
                >
                  รหัสสินค้า
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
                />
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
                    width: "50px",
                    border: "1px solid #AFAFAF",
                    borderRadius: "4px 0px 0px 4px",
                    textAlign: "center",
                    fontSize: "16px",
                  }}
                  onChange={(event) => setselectroom(event.target.value)}
                >
                  <option value="">ห้อง</option>
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
                    fontSize: "16px",
                  }}
                  onChange={(event) => setselectfreezer(event.target.value)}
                >
                  <option value="">ตู้แช่</option>
                  {freezer &&
                    freezer.listFreezer.map((prod) => (
                      <option key={prod.id} value={prod.id}>
                        {prod.freezername}
                      </option>
                    ))}
                </select>
                <select
                  name="basketname"
                  disabled={!selectroom || !selectfreezer}
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
                  onChange={(event) => setselectpbasket(event.target.value)}
                >
                  <option value="">ชั้นวาง</option>
                  {basket &&
                    basket.allpbasket.map((prod) => (
                      <option key={prod.id} value={prod.id}>
                        {prod.basketname}
                      </option>
                    ))}
                </select>
                <label
                  for="date"
                  style={{
                    textAlign: "center",
                    fontSize: "18px",
                    marginRight: "10px",
                  }}
                >
                  วันที่ผลิต
                </label>
                <input
                  type="date"
                  id="ex_chill"
                  name="date"
                  style={{
                    height: "35px",
                    border: "1px solid #AFAFAF",
                    borderRadius: "4px",

                    textAlign: "center",
                    fontSize: "16px",
                  }}
                ></input>

                <label
                  for="date"
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
                  id="ex_chill"
                  name="date"
                  style={{
                    height: "35px",
                    border: "1px solid #AFAFAF",
                    borderRadius: "4px",
                    fontSize: "16px",
                    textAlign: "center",
                  }}
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
            gridColumnStart: "2",
            gridColumnEnd: "2",
            marginTop: "10px",
          }}
        >
          <DivFromTop>
            <div style={{ margin: "-3px 5px 0px 0px" }}>
              <Icon size={20} icon={list} />
            </div>
            รายการคงคลังผลิตภัณฑ์
          </DivFromTop>
          <DivFromDown>
            <div style={{ height: `${data && data.allproduct.length > 7 ? "430px" : ""}`, overflow: `${data && data.allproduct.length > 7 ? "auto" : ""}` }}>
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
                    <th>รหัสสินค้า</th>
                    <th>รหัสบาร์โค้ด</th>
                    <th>คิวอาร์โค้ด</th>
                    <th>น้ำหนัก</th>
                    <th>วันที่ผลิต</th>
                    <th>วันหมดอายุ</th>
                    <th>ห้อง</th>
                    <th>ตู้แช่</th>
                    <th>ชั้นวาง</th>
                    <th>หมายเหตุ</th>
                    <th>จัดการ</th>
                  </tr>
                </thead>
                <tbody>
                  {data && data.allproduct.length > 0 ? (
                    data.allproduct.map((prod) => (
                      <Listall key={prod.id} listall={prod} />
                    ))
                  ) : (
                    <tr style={{ textAlign: "center" }}>
                      <td colSpan="12">ไม่พบข้อมูล</td>

                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
            <div style={{ float: "right", textAlign: "right" }}>
              จำนวนรายการ {data ? data.allproduct.length : "0"} รายการ
              <br />
              น้ำหนัก{" "}
              {data &&
                data.allproduct.reduce((sum, nex) => sum + nex.weight, 0)}{" "}
              กิโลกรัม
            </div>
          </DivFromDown>
        </DivFrom>
      </DivBase>
    </div>
  );
};

export default index;
