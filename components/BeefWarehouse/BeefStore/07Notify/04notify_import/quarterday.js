import React from "react";

import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";

import { DivBase } from "../../../../../utils/divBase";
import { DivFrom, DivFromTop, DivFromDown, HeaderColor } from "../NavFrom";

import { NavItem, Table } from "react-bootstrap";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import dayjs from "dayjs";

export const QUERY_IMQUARTERDAY = gql`
  query QUERY_IMQUARTERDAY {
    CardImq {
      id
      importdate
      user {
        name
      }
      quarter {
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
    }
  }
`;

const quarterday = () => {
  const { data } = useQuery(QUERY_IMQUARTERDAY);
  return (
    <div>
      <DivFromTop>
        <div style={{ margin: "-3px 5px 0px 0px" }}>
          <Icon size={20} icon={list} />
        </div>
        รายการนำเข้าซากโคสี่เสี้ยว (วัน)
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
                <th>น้ำหนัก (กก.)</th>
                <th>ห้อง</th>
                <th>ชั้น</th>
                <th>ตะกร้า</th>
                <th>สถานะ</th>
                <th>ผู้นำเข้า</th>
              </tr>
            </thead>
            <tbody>
              {data && data.CardImq.length > 0 ? (
                data.CardImq.map((prod) => (
                  <tr key={prod.id} style={{ textAlign: "center" }}>
                    <td>{prod.quarter.imslaughter.namefarmer}</td>
                    <td>{prod.quarter.beeftype.nameTH}</td>
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
                    <td>{prod.quarter.imslaughter.numcow}</td>
                    <td>{prod.quarter.beeftype.code}</td>
                    <td>{prod.quarter.barcode}</td>
                    <td>คิวอาร์โค้ด</td>
                    <td>{prod.quarter.weight}</td>
                    <td>{prod.beefroom.roomname}</td>
                    <td>-</td>
                    <td>-</td>
                    <td>{prod.quarter.status.nameTH}</td>
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

export default quarterday;
