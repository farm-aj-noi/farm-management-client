import React from "react";

import Sidemenu from "../Nav_notify";

import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";

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

import dayjs from "dayjs";
import "dayjs/locale/th";

import Qrcode from "./Qrcode";

const NOTIFYIM = gql`
  query NOTIFYIM {
    cardImP {
      id
      importdate

      user {
        name
      }
      beefproduct {
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
      }
      freezer {
        freezername
      }
      pbasket
    }
  }
`;

const index = () => {
  const { data } = useQuery(NOTIFYIM);
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
          การแจ้งเตือน
        </HeaderColor>
      </div>
      <DivBase1
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 237.5px 1100px 1fr",
          gridRowGap: "15px",
          gridColumnGap: "50px",
          textAlign: "start",
        }}
      >
        <Sidemenu Sidenumber={3} />
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
            รายการนำเข้าผลิตภัณฑ์ (วัน)
          </DivFromTop>
          <DivFromDown>
            <div style={{ height: `${data && data.cardImP.length > 9 ? "500px" : ""}`, overflow: `${data && data.cardImP.length > 9 ? "auto" : ""}` }}>
              <Table striped bordered responsive hover style={{ margin: "auto" }}>
                <thead>
                  <tr style={{ textAlign: "center", fontSize: "18px" }}>
                    <th>ประเภทสินค้า</th>
                    <th>วันที่นำเข้า</th>
                    <th>เวลา</th>
                    <th>รหัสสินค้า</th>
                    <th>รหัสบาร์โค้ด</th>
                    <th>คิวอาร์โค้ด</th>
                    <th>น้ำหนัก</th>
                    <th>วันที่ผลิต</th>
                    <th>วันหมดอายุ</th>
                    <th>ตู้แช่ </th>
                    <th>ชั้น</th>
                    <th>ตะกร้า</th>
                    <th>ผู้นำเข้า</th>
                  </tr>
                </thead>
                <tbody>
                  {data && data.cardImP.length > 0 ? (
                    data.cardImP.map((prod) => (
                      <tr style={{ textAlign: "center" }}>
                        <td>{prod.beefproduct.producttype.nameTH}</td>
                        <td>
                          {dayjs(prod.importdate)
                            .locale("th")
                            .add(543, "year")
                            .format("DD/MM/YYYY")}
                        </td>
                        <td>
                          {dayjs(prod.importdate)
                            .locale("th")
                            .add(543, "year")
                            .format("h:mm:ss A")}
                        </td>
                        <td>{prod.beefproduct.producttype.code}</td>
                        <td>{prod.beefproduct.barcode}</td>
                        <td>
                          <Qrcode key={prod.id} notifyim={prod} />
                        </td>
                        <td>{prod.beefproduct.weight}</td>
                        <td> {dayjs(prod.beefproduct.MFG)
                          .locale("th")
                          .add(543, "year")
                          .format("DD/MM/YYYY")}
                        </td>
                        <td>{dayjs(prod.beefproduct.BBE)
                          .locale("th")
                          .add(543, "year")
                          .format("DD/MM/YYYY")}
                        </td>
                        <td>{prod.productroom.roomname}</td>
                        <td>{prod.freezer.freezername}</td>
                        <td>{prod.pbasket}</td>
                        <td>{prod.user.name}</td>
                      </tr>
                    ))
                  ) : (
                    <tr style={{ textAlign: "center" }}>
                      <td colSpan="13">ไม่พบข้อมูล</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </DivFromDown>
        </DivFrom>
      </DivBase1>
    </div>
  );
};

export default index;
