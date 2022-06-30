import React, { useState } from "react";

import { Table } from "react-bootstrap";
import { DivFrom, DivFromTop, DivFromDown, HeaderColor } from "../ImportFrom";
import { DivBase } from "../../../../../utils/divBase";

import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";
import { iosSearchStrong } from "react-icons-kit/ionicons/iosSearchStrong";

import Create_Import from "./Create_Import";

import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

import List_import from "./List_import";

export const IMPORTCHOPSEARCH = gql`
  query IMPORTCHOPSEARCH(
    $namefarmer: String
    $userName: String
    $startdate: String
    $enddate: String
    $beeftype: String
    $beefroom: String
    $shelf: String
  ) {
    imchopSearch(
      startdate: $startdate
      enddate: $enddate
      beeftype: $beeftype
      namefarmer: $namefarmer
      userName: $userName
      beefroom: $beefroom
      shelf: $shelf
    ) {
      id
      importdate
      user {
        name
      }
      chop {
        weight
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
      shelf {
        shelfname
      }
      basket
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
  const [selectedbeeftypechop, SetBeeftypechopsChange] = useState("");
  const [selectedstartdate, SetStartDateChange] = useState("");
  const [selectedenddate, SetEndDateChange] = useState("");
  const [inputnamefarmer, SetInputnamefarmer] = useState("");
  const [inputusername, SetInputusername] = useState("");
  const [selectedbeefroom, setselectbeefroom] = useState("");
  const [selectedshelf, setselectshelf] = useState("");
  const [selectedbasket, setselectbasket] = useState("");
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
  const { data, loading, error } = useQuery(IMPORTCHOPSEARCH, {
    variables: {
      beeftype: selectedbeeftypechop,
      startdate: selectedstartdate,
      enddate: selectedenddate,
      namefarmer: inputnamefarmer,
      userName: inputusername,
      beefroom: selectedbeefroom,
      shelf: selectedshelf,
    },
  });
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "30px",
        }}
      >
        <HeaderColor
          style={{
            width: "fit-content",
            height: "fit-content",
            padding: "5px 30px",
          }}
        >
          นำเข้าซากเนื้อโคชิ้นเนื้อ
        </HeaderColor>
      </div>
      <DivBase
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 270px 900px 1fr",
          gridRowGap: "15px",
          gridColumnGap: "10px",
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
            <DivFromTop>
              <div style={{ margin: "-3px 5px 0px 0px" }}>
                <Icon size={20} icon={list} />
              </div>
              ดำเนินการนำเข้าซากเนื้อโคชิ้นเนื้อ
            </DivFromTop>
            <DivFromDown style={{ backgroundColore: "red" }}>
              <Create_Import />
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
                    onChange={(event) =>
                      SetBeeftypechopsChange(event.target.value)
                    }
                  >
                    <option value="">ทั้งหมด</option>
                    <option value="5f446195ecd6732ad8108684">เนื้อสันคอ</option>
                    <option value="5f4461a8ecd6732ad8108685">ที-โบน</option>
                    <option value="5f4461bfecd6732ad8108686">
                      เนื้อสันนอก
                    </option>
                    <option value="5f4461d6ecd6732ad8108687">
                      ที-โบน สเต็ก
                    </option>
                    <option value="5f44620cecd6732ad8108688">ริบอาย</option>
                    <option value="5f446224ecd6732ad8108689">ใบบัวสเต็ก</option>
                    <option value="5f44623aecd6732ad810868a">เนื้อสันใน</option>
                    <option value="5f44624fecd6732ad810868b">สันสะโพก</option>
                    <option value="5f446262ecd6732ad810868c">
                      เสือร้องไห้
                    </option>
                    <option value="5f44628decd6732ad810868d">
                      เนื้อซี่โครง
                    </option>
                    <option value="5f4462a4ecd6732ad810868e">พับใน</option>
                    <option value="5f4462b6ecd6732ad810868f">ตะพาบ</option>
                    <option value="5f4462c8ecd6732ad8108690">ลูกมะพร้าว</option>
                    <option value="5f4462ddecd6732ad8108691">ปลาบู่ทอง</option>
                    <option value="5f4462eeecd6732ad8108692">ใบพาย</option>
                    <option value="5f4462feecd6732ad8108693">หางตะเข้</option>
                    <option value="5f44630fecd6732ad8108694">น่อง</option>
                    <option value="5f446320ecd6732ad8108695">พับนอก</option>
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
                    เจ้าของซาก
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
                    onChange={(event) => SetInputnamefarmer(event.target.value)}
                  />
                  <label
                    for="beef"
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
                    onChange={(event) => SetInputusername(event.target.value)}
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
                    id="roomname"
                    style={{
                      height: "35px",
                      width: "50px",
                      border: "1px solid #AFAFAF",
                      borderRadius: "4px 0px 0px 4px",
                      textAlign: "center",
                      fontSize: "14px",
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
                      fontSize: "14px",
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
                      fontSize: "14px",
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
                    for="date"
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
                    id="ex_chill"
                    name="date"
                    style={{
                      height: "35px",
                      border: "1px solid #AFAFAF",
                      borderRadius: "4px",
                      fontSize: "16px",
                      textAlign: "center",
                    }}
                    onChange={(event) => SetStartDateChange(event.target.value)}
                  ></input>
                  <label
                    for="date"
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
                    onChange={(event) => SetEndDateChange(event.target.value)}
                  ></input>
                </from>
              </div>
            </DivFromDown>
          </DivFrom>
          <DivFrom
            style={{
              width: "1180px",
              gridRowStart: "5",
              gridRowEnd: "5",
              gridColumnStart: "2",
              gridColumnEnd: "4",
              marginTop: "20px",
            }}
          >
            <DivFromTop>
              <div style={{ margin: "-3px 5px 0px 0px" }}>
                <Icon size={20} icon={list} />
              </div>
              รายการนำเข้าซากเนื้อโคชิ้นเนื้อ
            </DivFromTop>
            <DivFromDown>
              <div style={{ height: "320px", overflow: "auto" }}>
                <Table
                  striped
                  bordered
                  responsive
                  hover
                  style={{ margin: "auto" }}
                >
                  <thead>
                    <tr style={{ textAlign: "center" }}>
                      <th>เจ้าของซาก</th>
                      <th>ประเภทซาก</th>
                      <th>วันที่นำเข้า</th>
                      <th>เวลา</th>
                      <th>ทะเบียนขุน</th>
                      <th>รหัสซาก</th>
                      <th>รหัสบาร์โค้ด</th>
                      <th>คิวอาร์โค้ด</th>
                      <th>น้ำหนัก (กก.)</th>
                      <th>ห้อง</th>
                      <th>ชั้น</th>
                      <th>ตะกร้า</th>
                      <th>สถานะ</th>
                      <th>ผู้นำเข้า</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data && data.imchopSearch.length > 0 ? (
                      data.imchopSearch.map((prod) => (
                        <List_import key={prod.id} imchop={prod} />
                      ))
                    ) : (
                      <tr style={{ textAlign: "center" }}>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
              <div style={{ float: "right", textAlign: "right" }}>
                จำนวนรายการ {data ? data.imchopSearch.length : "0"} รายการ
                <br />
                น้ำหนัก{" "}
                {data &&
                  data.imchopSearch.reduce(
                    (sum, nex) => sum + nex.chop.weight,
                    0
                  )}{" "}
                กิโลกรัม
              </div>
            </DivFromDown>
          </DivFrom>
        </>
      </DivBase>
    </>
  );
};

export default index;
