import React from "react";

import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";

import { DivBase } from "../../../../../utils/divBase";
import { DivFrom, DivFromTop, DivFromDown, HeaderColor } from "../NavFrom";

import { Table } from "react-bootstrap";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import dayjs from "dayjs";

import Paperdate from "./paperc";

const EXPC = gql`
  query EXPC {
    Card8c {
      id
      chop {
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

const listchop = () => {
  const { data } = useQuery(EXPC);
  return (
    <div>
      <Table striped bordered responsive hover style={{ margin: "auto" }}>
        <thead>
          <tr style={{ textAlign: "center" }}>
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
          {data && data.Card8c.length > 0 ? (
            data.Card8c.map((prod) => (
              <tr style={{ textAlign: "center" }}>
                <td>{prod.chop.beeftype.nameTH}</td>
                <td>{prod.chop.beeftype.code}</td>
                <td>{prod.chop.barcode}</td>
                <td>คิวอาร์โค้ด</td>
                <td>{prod.beefroom.roomname}</td>
                <td>{prod.shelf.shelfname}</td>
                <td>{prod.basket}</td>
                <td>
                  {dayjs(prod.Expdate).add(543, "year").format("DD/MM/YYYY")}
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
            </tr>
          )}
        </tbody>
      </Table>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {data && data.Card8c.length > 0 ? (
          <div>
            <Paperdate prod={data.Card8c} />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default listchop;
