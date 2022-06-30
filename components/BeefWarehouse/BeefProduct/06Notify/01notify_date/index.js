import React from "react";

import Sidemenu from "../Nav_notify";

import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";

import { DivBase } from "../../../../../utils/divBase";
import {
  DivFrom,
  DivFromTop,
  DivFromDown,
  HeaderColor,
  DivBase1,
} from "../NavFrom";

import { Table } from "react-bootstrap";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Qrcode from "./Qrcode";

import dayjs from "dayjs";

const EXPDATE = gql`
  query EXPDATE {
    card8product {
      id
      beefproduct {
        id
        weight
        barcode
        MFG
        BBE
        producttype {
          code
          nameTH
        }
      }
      productroom {
        roomname
        id
      }
      freezer {
        id
        freezername
      }
      pbasket
    }
  }
`;

const index = () => {
  const { data } = useQuery(EXPDATE);
  return (
    <div>
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
          การแจ้งเตือน
        </HeaderColor>
      </div>
      <DivBase1
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 237.5px 1000px 1fr",
          gridRowGap: "15px",
          gridColumnGap: "50px",
          textAlign: "start",
          /*  width:"950px",
        margin:"auto" */
        }}
      >
        <Sidemenu Sidenumber={1} />
        <DivFrom
          style={{
            width: "100%",
            gridRowEnd: "3",
            gridColumnStart: "3",
            marginTop: "0px",
          }}
        >
          <DivFromTop>
            <div style={{ margin: "-3px 5px 0px 0px" }}>
              <Icon size={20} icon={list} />
            </div>
            รายการใกล้หมดผลิตภัณฑ์
          </DivFromTop>
          <DivFromDown>
            {" "}
            <Table striped bordered responsive hover style={{ margin: "auto" }}>
              <thead>
                <tr style={{ textAlign: "center" }}>
                  <th>ประเภทสินค้า</th>
                  <th>รหัสสินค้า</th>
                  <th>รหัสบาร์โค้ด</th>
                  <th>คิวอาร์โค้ด</th>
                  <th>น้ำหนัก</th>
                  <th>ห้อง</th>
                  <th>ตู้แช่</th>
                  <th>ชั้นวาง</th>
                  <th>วันที่ผลิต</th>
                  <th>วันหมดอายุ</th>
                </tr>
              </thead>
              <tbody>
                {data && data.card8product.length > 0 ? (
                  data.card8product.map((prod) => (
                    <tr style={{ textAlign: "center" }}>
                      <td>{prod.beefproduct.producttype.nameTH}</td>
                      <td>{prod.beefproduct.producttype.code}</td>
                      <td>{prod.beefproduct.barcode}</td>
                      <td>
                        <Qrcode key={prod.id} notifydate={prod} />
                      </td>
                      <td>{prod.beefproduct.weight}</td>
                      <td>{prod.productroom.roomname}</td>
                      <td>{prod.freezer.freezername}</td>
                      <td>{prod.pbasket}</td>
                      <td>
                        {dayjs(prod.beefproduct.MFG)
                          .add(543, "y")
                          .locale("th")
                          .format("DD MMMM YYYY")}
                      </td>
                      <td>
                        {dayjs(prod.beefproduct.BBE)
                          .add(543, "y")
                          .locale("th")
                          .format("DD MMMM YYYY")}
                      </td>
                    </tr>
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
                  </tr>
                )}
              </tbody>
            </Table>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              {data && data.card8product.length > 0 ? (
                <Paper prod={data.card8product} />
              ) : (
                ""
              )}
            </div>
          </DivFromDown>
        </DivFrom>
      </DivBase1>
    </div>
  );
};

export default index;
