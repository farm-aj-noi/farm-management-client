import React from "react";

import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";

import { DivBase } from "../../../../../utils/divBase";
import { DivFrom, DivFromTop, DivFromDown, HeaderColor } from "../NavFrom";

import { Table } from "react-bootstrap";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import dayjs from "dayjs";
import Modalqrcode from "../../12Qrcode/Notify/Import/imhqr";

export const QUERY_IMHALVEDAY = gql`
  query QUERY_IMHALVEDAY {
    CardImh {
      id
      importdate
      user {
        name
      }
      halve {
        weightwarm
        weightcool
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

const halveday = () => {
  const { data } = useQuery(QUERY_IMHALVEDAY);
  return (
    <div>
      <DivFromTop>
        <div style={{ margin: "-3px 5px 0px 0px" }}>
          <Icon size={20} icon={list} />
        </div>
        รายการนำเข้าซากโคผ่าซีก (วัน)
      </DivFromTop>{" "}
      <DivFromDown>
        <div
          style={{ height: `${data && data.CardImh.length > 9 ? "550px" : ""}`, overflow: "auto" }}
        >
          <Table striped bordered responsive hover style={{ margin: "auto" }}>
            <thead>
              <tr style={{ textAlign: "center", fontSize: "18px" }}>
                <th>เจ้าของซาก</th>
                <th>ประเภทซาก</th>
                <th>วันที่นำเข้า</th>
                <th>เวลา</th>
                <th>ทะเบียนขุน</th>
                <th>รหัสซาก</th>
                <th>รหัสบาร์โค้ด</th>
                <th>คิวอาร์โค้ด</th>
                <th>น้ำหนักอุ่น (กก.)</th>
                <th>น้ำหนักเย็น (กก.)</th>
                <th>ห้อง</th>
                <th>สถานะ</th>
                <th>ผู้นำเข้า</th>
              </tr>
            </thead>
            <tbody>
              {data && data.CardImh.length > 0 ? (
                data.CardImh.map((prod) => (
                  <tr key={prod.id} style={{ textAlign: "center" }}>
                    <td>{prod.halve.imslaughter.namefarmer}</td>
                    <td>{prod.halve.beeftype.nameTH}</td>
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
                    <td>{prod.halve.imslaughter.numcow}</td>
                    <td>{prod.halve.beeftype.code}</td>
                    <td>{prod.halve.barcode}</td>
                    <td>
                      <Modalqrcode key={prod.id} notifyimh={prod} />
                    </td>
                    <td>{prod.halve.weightwarm}</td>
                    <td>
                      {prod.halve.weightcool ? prod.halve.weightcool : "-"}
                    </td>
                    <td>{prod.beefroom.roomname}</td>
                    <td>{prod.halve.status.nameTH}</td>
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
    </div>
  );
};

export default halveday;
