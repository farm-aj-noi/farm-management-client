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
          คงคลังชิ้นส่วนอื่น ๆ
        </HeaderColor>
      </div>
      <DivBase
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 200px 1300px 1fr",
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
          <Nav_store Sidenumber={2} />
        </DivFrom>
        <DivFrom
          style={{
            width: "100%",
            gridRowStart: "2",
            gridRowEnd: "3",
            gridColumnStart: "3",
            marginTop: "0px",
            height: "500px",
          }}
        >
          <DivFromTop>
            <div style={{ margin: "-3px 5px 0px 0px" }}>
              <Icon size={20} icon={list} />
            </div>
            รายการยอดคงคลังซากโค
          </DivFromTop>
          <DivFromDown>
            <div style={{ height: "350px", overflowY: "auto" }}>
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
                    <th>เจ้าของซาก</th>
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
      </DivBase>
    </DivBase>
  );
};

export default index;
