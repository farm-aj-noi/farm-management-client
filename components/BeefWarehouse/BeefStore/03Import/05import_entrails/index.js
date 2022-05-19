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

export const IMPOERTENTRAILSEARCH = gql`
  query IMPOERTENTRAILSEARCH(
    $namefarmer: String
    $userName: String
    $startdate: String
    $enddate: String
  ) {
    imentrailSearch(
      namefarmer: $namefarmer
      userName: $userName
      startdate: $startdate
      enddate: $enddate
    ) {
      importdate
      user {
        name
      }
      entrail {
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
        barcode
        imslaughter {
          numcow
          namefarmer
        }
      }
    }
  }
`;

const index = () => {
  const [inputnamefarmer, SetInputnamefarmer] = useState("");
  const [inputusername, SetInputusername] = useState("");
  const [selectedstartdate, SetStartDateChange] = useState("");
  const [selectedenddate, SetEndDateChange] = useState("");
  const { data, loading, error } = useQuery(IMPOERTENTRAILSEARCH, {
    variables: {
      startdate: selectedstartdate,
      enddate: selectedenddate,
      namefarmer: inputnamefarmer,
      userName: inputusername,
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
          นำเข้าซากเนื้อโคชิ้นเนื้อส่วนอื่น ๆ
        </HeaderColor>
      </div>
      <DivBase
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 270px 1100px 1fr",
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
              ดำเนินการนำเข้าซากเนื้อโคส่วนอื่น ๆ
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
            <DivFromDown style={{ height: "110px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "15px",
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
                      color: "#AFAFAF",
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
                      color: "#AFAFAF",
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
              width: "1380px",
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
              รายการนำเข้าซากเนื้อโคส่วนอื่น ๆ
            </DivFromTop>
            <DivFromDown>
              <div style={{ height: "280px", overflow: "auto" }}>
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
                      <th>วันที่นำเข้า</th>
                      <th>เวลา</th>
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
                      <th>ห้อง</th>
                      <th>ชั้น</th>
                      <th>ตะกร้า</th>
                      <th>ผู้นำเข้า</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data &&
                      data.imentrailSearch.map((prod) => (
                        <List_import key={prod.id} imentrail={prod} />
                      ))}
                  </tbody>
                </Table>
              </div>
            </DivFromDown>
          </DivFrom>
        </>
      </DivBase>
    </>
  );
};

export default index;
