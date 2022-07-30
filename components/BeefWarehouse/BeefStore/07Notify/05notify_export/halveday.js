import React from "react";

import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";

import { DivBase } from "../../../../../utils/divBase";
import { DivFrom, DivFromTop, DivFromDown, HeaderColor } from "../NavFrom";

import { Table } from "react-bootstrap";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import dayjs from "dayjs";
import Modalqrcode from "../../12Qrcode/Notify/Export/exhqr";

export const QUERY_EXHALVEDAY = gql`
  query QUERY_EXHALVEDAY {
    CardExh {
      exporter
      id
      exportdate
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
      storestatus {
        nameTH
      }
    }
  }
`;

const halveday = () => {
  const { data } = useQuery(QUERY_EXHALVEDAY);
  return (
    <div>
      <DivFromTop>
        <div style={{ margin: "-3px 5px 0px 0px" }}>
          <Icon size={20} icon={list} />
        </div>
        รายการเบิกออกซากโคผ่าซีก (วัน)
      </DivFromTop>{" "}
      <DivFromDown>
        <div
          style={{ height: `${data && data.CardExh.length > 9 ? "550px" : ""}`, overflow: "auto" }}
        >
          <Table striped bordered responsive hover style={{ margin: "auto" }}>
            <thead>
              <tr style={{ textAlign: "center", fontSize: "18px" }}>
                <th>ประเภทซาก</th>
                <th>วันที่เบิกออก</th>
                <th>เวลา</th>
                <th>ทะเบียนขุน</th>
                <th>รหัสซาก</th>
                <th>รหัสบาร์โค้ด</th>
                <th>คิวอาร์โค้ด</th>
                <th>น้ำหนักอุ่น (กก.)</th>
                <th>น้ำหนักเย็น (กก.)</th>
                <th>สถานะ</th>
                <th>ผู้ขอเบิก</th>
                <th>ผูเบิกออก</th>
              </tr>
            </thead>
            <tbody>
              {data && data.CardExh.length > 0 ? (
                data.CardExh.map((prod) => (
                  <tr key={prod.id} style={{ textAlign: "center" }}>
                    <td>{prod.halve.beeftype.nameTH}</td>
                    <td>
                      {dayjs(prod.exportdete)
                        .add(543, "year")
                        .format("DD/MM/YYYY")}
                    </td>
                    <td>
                      {dayjs(prod.exportdete)
                        .add(543, "year")
                        .format("h:mm:ss A")}
                    </td>
                    <td>{prod.halve.imslaughter.numcow}</td>
                    <td>{prod.halve.beeftype.code}</td>
                    <td>{prod.halve.barcode}</td>
                    <td><Modalqrcode key={prod.id} notifyhalve={prod} /></td>
                    <td>{prod.halve.weightwarm}</td>
                    <td>
                      {prod.halve.weightcool ? prod.halve.weightcool : "-"}
                    </td>
                    <td>{prod.storestatus.nameTH}</td>
                    <td>{prod.exporter}</td>
                    <td>{prod.user.name}</td>
                  </tr>
                ))
              ) : (
                <tr style={{ textAlign: "center" }}>
                  <td colSpan="12">ไม่พบข้อมูล</td>
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
