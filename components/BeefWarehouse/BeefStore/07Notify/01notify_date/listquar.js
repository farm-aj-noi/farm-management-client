import React from "react";

import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";

import { DivBase } from "../../../../../utils/divBase";
import { DivFrom, DivFromTop, DivFromDown, HeaderColor } from "../NavFrom";

import { Table } from "react-bootstrap";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import dayjs from "dayjs";
import Paperdate from "./paperq";

import Modalqrcode from "../../12Qrcode/Notify/date/expqqr";

const EXPQ = gql`
  query EXPQ {
    Card8q {
      id

      quarter {
        beeftype {
          code
          nameTH
        }
        barcode
      }
      beefroom {
        roomname
      }
      Expdate
    }
  }
`;

const listquar = () => {
  const { data } = useQuery(EXPQ);
  return (
    <>
      <div style={{ height: `${data && data.Card8q.length > 10 ? "550px" : ""}`, overflow: "auto" }}>
        <Table striped bordered responsive hover style={{ margin: "auto" }}>
          <thead>
            <tr style={{ textAlign: "center", fontSize: "18px" }}>
              <th>ประเภทซาก</th>
              <th>รหัสซาก</th>
              <th>รหัสบาร์โค้ด</th>
              <th>คิวอาร์โค้ด</th>
              <th>ห้อง</th>
              <th>วันหมดอายุ</th>
            </tr>
          </thead>
          <tbody>
            {data && data.Card8q.length > 0 ? (
              data.Card8q.map((prod) => (
                <tr style={{ textAlign: "center" }}>
                  <td>{prod.quarter.beeftype.nameTH}</td>
                  <td>{prod.quarter.beeftype.code}</td>
                  <td>{prod.quarter.barcode}</td>
                  <td>
                    <Modalqrcode key={prod.id} dateq={prod} />
                  </td>
                  <td>{prod.beefroom.roomname}</td>

                  <td>
                    {dayjs(prod.Expdate).add(543, "year").format("DD/MM/YYYY")}
                  </td>
                </tr>
              ))
            ) : (
              <tr style={{ textAlign: "center" }}>
                <td colSpan="6">ไม่พบข้อมูล</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {data && data.Card8q.length > 0 ? (
          <div>
            <Paperdate prod={data.Card8q} />
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default listquar;
