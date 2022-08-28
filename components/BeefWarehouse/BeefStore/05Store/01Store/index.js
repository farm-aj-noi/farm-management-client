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

export const STORELIST = gql`
  query STORELIST(
    $beeftype: String
    $type: String
    $beefroom: String
    $shelf: String
    $expdate: String
    $cownum: String
    $basket: String
    $grade: String
  ) {
    liststore(
      beeftype: $beeftype
      type: $type
      beefroom: $beefroom
      shelf: $shelf
      expdate: $expdate
      cownum: $cownum
      basket: $basket
      grade: $grade
    ) {
      beefname
      id
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
      info
      grade
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
  const [inputnumcow, setnumcow] = useState("");
  const [expdate, setexpdate] = useState("");
  const [selectedgrade, setInputgrade] = useState("");
  console.log(expdate)
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
      basket: selectedbasket,
      cownum: inputnumcow,
      grade: selectedgrade,

    },
  });
  console.log(selecttype)
  /*   console.log(selectedbeeftype); */
  return (
    <div style={{ marginTop: "100px" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <HeaderColor>คงคลังซากเนื้อโค</HeaderColor>
      </div>
      <DivContainar>
        <div><Nav_store Sidenumber={1} /></div>
        <DivGrid>
          <DivFromTop>
            <Icon size={20} icon={iosSearchStrong} style={{ margin: "-3px 5px 0px 0px" }} />
            ค้นหารายการ
          </DivFromTop>
          <DivFromDown>
            <DivSearch>
              <DivFromSearch>
                <Formfilter>
                  ซากโค
                  <SelectType
                    name="type"
                    id="type"
                    onChange={(event) => SettypeChange(event.target.value)}
                  >
                    <option value="">ทั้งหมด</option>
                    <option value="ซากโคผ่าซีก">ซากโคผ่าซีก</option>
                    <option value="ซากโคสี่เสี้ยว">ซากโคสี่เสี้ยว</option>
                    <option value="ก้อนเนื้อ">ก้อนเนื้อ</option>
                    <option value="ชิ้นเนื้อ">ชิ้นเนื้อ</option>
                  </SelectType>
                </Formfilter>
              </DivFromSearch>
              <DivFromSearch>
                <Formfilter>
                  ประเภทซากโค
                  <SelectType
                    name="beeftype"
                    id="beeftype"
                    disabled={!selecttype}
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
                  </SelectType>
                </Formfilter>
              </DivFromSearch>
              <DivFromSearch>
                <Formfilter>
                  ทะเบียนขุน
                  <Inputfilter
                    name="numcow"
                    id="numcow"
                    onChange={(event) => setnumcow(event.target.value)}
                  />
                </Formfilter>
              </DivFromSearch>
              <DivFromSearch>
                <Formfilter1>
                  ตำแหน่ง
                  <FormfilterRoom>
                    <SelectRoom
                      name="roomname"
                      id="roomname"
                      style={{
                        marginRight: "0px",
                        borderRadius: "4px 0px 0px 4px",
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
                    </SelectRoom>
                    <SelectRoom
                      name="shelfname"
                      id="shelfname"
                      disabled={!selectedbeefroom}
                      style={{
                        borderRadius: "0px",
                        borderLeft: "none",
                        borderRight: "none",
                        margin: "0px",
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
                    </SelectRoom>
                    <SelectRoom
                      name="basket"
                      id="basket"
                      disabled={!selectedbeefroom || !selectedshelf}
                      style={{

                        borderRadius: "0px 4px 4px 0px",
                        marginLeft: "0px"
                      }}
                      onChange={(event) => setselectbasket(event.target.value)}
                    >
                      <option value="">ตะกร้า</option>
                      {basketdata &&
                        basketdata.allBasket.map((prod) => (
                          <option key={prod.id} value={prod.basketname}>
                            {prod.basketname}
                          </option>
                        ))}
                    </SelectRoom>
                  </FormfilterRoom>
                </Formfilter1>
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
              <DivFromSearch>
                <Formfilter>
                  เกรด
                  <SelectType
                    name="grade"
                    id="grade"
                    onChange={(event) => setInputgrade(event.target.value)}
                  >
                    <option value="">ทั้งหมด</option>
                    <option value="2">2</option>
                    <option value="2.5">2.5</option>
                    <option value="3">3</option>
                    <option value="3.5">3.5</option>
                    <option value="4">4</option>
                    <option value="4.5">4.5</option>
                    <option value="5">5</option>
                  </SelectType>
                </Formfilter>
              </DivFromSearch>
            </DivSearch>
          </DivFromDown>
        </DivGrid>
        <DivData>
          <DivFromTop>
            <Icon size={20} icon={list} style={{ margin: "-3px 5px 0px 0px" }} />
            รายการยอดคงคลังซากเนื้อโค
          </DivFromTop>
          <DivFromDown>
            <div style={{ height: `${data && data.liststore.length > 5 ? "420px" : ""}`, overflow: "auto" }}>
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
                      <List_Store key={prod.id} Liststore={prod} />
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
        </DivData>
      </DivContainar>
    </div>
  );
};

export default index;
