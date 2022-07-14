import React, { useState } from "react";
import {
  DivFrom,
  DivFromTop,
  DivFromDown,
  HeaderColor,
 
} from "../SettingFrom";
import { DivBase } from "../../../../../utils/divBase";
import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";


import Nav_seting from "../Nav_setting";

import Type from "./type";
import Unit from "./unit";
import List from "./list";

import { Table } from "react-bootstrap";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

export const QUERYTYPE = gql`
  query QUERYTYPE {
    allproducttype {
      id
      code
      nameTH
      nameEN
      BBE
      unit {
        name
        id
      }
    }
  }
`;

const index = () => {
  const { data } = useQuery(QUERYTYPE);

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
          การตั้งค่า
        </HeaderColor>
      </div>
      <DivBase
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 200px 330px 700px 1fr",
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
          <Nav_seting />
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
          {" "}
          <DivFromTop>
            <div style={{ margin: "-3px 5px 0px 0px" }}>
              <Icon size={20} icon={list} />
            </div>
            ตั้งค่ารายการหน่วยผลิตภัณฑ์
          </DivFromTop>
          <DivFromDown>
            {" "}
            <Unit />
          </DivFromDown>
        </DivFrom>
        <DivFrom
          style={{
            width: "100%",
            gridRowStart: "2",
            gridRowEnd: "3",
            gridColumnStart: "4",
            marginTop: "0px",
          }}
        >
          {" "}
          <DivFromTop>
            <div style={{ margin: "-3px 5px 0px 0px" }}>
              <Icon size={20} icon={list} />
            </div>
            ตั้งค่ารายการประเภทสินค้าผลิตภัณฑ์
          </DivFromTop>
          <DivFromDown>
            {" "}
            <Type />
          </DivFromDown>
        </DivFrom>
        <DivFrom
          style={{
            width: "1050px",
            gridRowStart: "3",
            gridRowEnd: "4",
            gridColumnStart: "3",
            marginTop: "0px",
          }}
        >
          <DivFromTop>
            <div style={{ margin: "-3px 5px 0px 0px" }}>
              <Icon size={20} icon={list} />
            </div>
            รายการประเภทสินค้าผลิตภัณฑ์
          </DivFromTop>
          <DivFromDown>
            <div style={{ height: `${data && data.allproducttype.length > 7 ? "400px" : ""}`, overflow: `${data && data.allproducttype.length > 7 ? "auto" : ""}` }}>
              <Table striped bordered responsive hover style={{ margin: "auto" }}>
                <thead>
                  <tr style={{ textAlign: "center", fontSize: "18px" }}>
                    <th>รหัสสินค้า</th>
                    <th>ชื่อประเภทสินค้า (ไทย)</th>
                    <th>ชื่อประเภทสินค้า (อังกฤษ)</th>
                    <th>วันหมดอายุ (วัน)</th>
                    <th>หน่วย</th>
                    <th>แก้ไข</th>
                    <th>ลบ</th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.allproducttype.map((prod) => (
                      <List key={prod.id} listtype={prod} />
                    ))}
                </tbody>
              </Table>
            </div>
          </DivFromDown>
        </DivFrom>
      </DivBase>
    </div>
  );
};

export default index;
