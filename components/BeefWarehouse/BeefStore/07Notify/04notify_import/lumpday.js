import React from "react";

import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";

import { DivBase } from "../../../../../utils/divBase";
import { DivFrom, DivFromTop, DivFromDown, HeaderColor } from "../NavFrom";

import { Table } from "react-bootstrap";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import dayjs from "dayjs";

export const QUERY_IMLUMPDAY = gql`
  query QUERY_IMLUMPDAY {
    CardIml {
      id
      importdate
      user {
        name
      }
      lump {
        weight
        beeftype {
          nameTH
          code
        }
        imslaughter {
          numcow
          namefarmer
        }
        barcode
        status {
          nameTH
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

const lumpday = () => {
  const { data } = useQuery(QUERY_IMLUMPDAY);
  return (
    <div>
      <DivFromTop>
        <div style={{ margin: "-3px 5px 0px 0px" }}>
          <Icon size={20} icon={list} />
        </div>
        รายการนำเข้าก้อนเนื้อ (วัน)
      </DivFromTop>{" "}
      <DivFromDown>
        <div
          style={{
            margin: "auto",
            minWidth: "100%",
            float: "right",
            marginBottom: "15px",
          }}
        >
          <Table striped bordered responsive hover style={{ margin: "auto" }}>
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
                <th>น้ำหนัก</th>
                <th>ห้อง</th>
                <th>ชั้น</th>
                <th>ตะกร้า</th>
                <th>สถานะ</th>
                <th>ผู้นำเข้า</th>
              </tr>
            </thead>
            <tbody>
              {data && data.CardIml.length > 0 ? (
                data.CardIml.map((prod) => (
                  <tr key={prod.id} style={{ textAlign: "center" }}>
                    <td>{prod.lump.imslaughter.namefarmer}</td>
                    <td>{prod.lump.beeftype.nameTH}</td>
                    <td>
                      {dayjs(prod.importdate)
                        .add(543, "year")
                        .format("DD/MM/YYYY")}
                    </td>
                    <td>
                      {dayjs(prod.importdate)
                        .add(543, "year")
                        .format("h:mm:ss A")}
                    </td>
                    <td>{prod.lump.imslaughter.numcow}</td>
                    <td>{prod.lump.beeftype.code}</td>
                    <td>{prod.lump.barcode}</td>
                    <td>คิวอาร์โค้ด</td>
                    <td>{prod.lump.weight}</td>
                    <td>{prod.beefroom.roomname}</td>
                    <td>{prod.shelf.shelfname}</td>
                    <td>{prod.basket}</td>
                    <td>{prod.lump.status.nameTH}</td>
                    <td>{prod.user.name}</td>
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
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </DivFromDown>
    </div>
  );
};

export default lumpday;
