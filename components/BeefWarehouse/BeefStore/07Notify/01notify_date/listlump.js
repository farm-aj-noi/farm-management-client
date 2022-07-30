import React from "react";

import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";

import { DivBase } from "../../../../../utils/divBase";
import { DivFrom, DivFromTop, DivFromDown, HeaderColor } from "../NavFrom";

import { Table } from "react-bootstrap";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import dayjs from "dayjs";
import Paperdate from "./paperl";

import Modalqrcode from "../../12Qrcode/Notify/date/explqr";

const EXPL = gql`
  query EXPL {
    Card8l {
      id

      lump {
        beeftype {
          code
          nameTH
        }
        barcode
      }
      beefroom {
        roomname
      }
      shelf {
        shelfname
      }
      basket
      Expdate
    }
  }
`;

const listlump = () => {
  const { data } = useQuery(EXPL);
  console.log(data);
  return (
    <>
      <div style={{ height: `${data && data.Card8l.length > 10 ? "550px" : ""}`, overflow: "auto" }}>
        <Table striped bordered responsive hover style={{ margin: "auto" }}>
          <thead>
            <tr style={{ textAlign: "center", fontSize: "18px" }}>
              <th>ประเภทซาก</th>
              <th>รหัสซาก</th>
              <th>รหัสบาร์โค้ด</th>
              <th>คิวอาร์โค้ด</th>
              <th>ห้อง</th>
              <th>ชั้น</th>
              <th>ตะกร้า</th>
              <th>วันหมดอายุ</th>
            </tr>
          </thead>
          <tbody>
            {data && data.Card8l.length > 0 ? (
              data.Card8l.map((prod) => (
                <tr style={{ textAlign: "center" }}>
                  <td>{prod.lump.beeftype.nameTH}</td>
                  <td>{prod.lump.beeftype.code}</td>
                  <td>{prod.lump.barcode}</td>
                  <td>
                    <Modalqrcode key={prod.id} datel={prod} />
                  </td>
                  <td>{prod.beefroom.roomname}</td>
                  <td>{prod.shelf.shelfname}</td>
                  <td>{prod.basket}</td>
                  <td>
                    {" "}
                    {dayjs(prod.Expdate).add(543, "year").format("DD/MM/YYYY")}
                  </td>
                </tr>
              ))
            ) : (
              <tr style={{ textAlign: "center" }}>
                <td colSpan="8">ไม่พบข้อมูล</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {data && data.Card8l.length > 0 ? (
          <div>
            <Paperdate prod={data.Card8l} />
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default listlump;
