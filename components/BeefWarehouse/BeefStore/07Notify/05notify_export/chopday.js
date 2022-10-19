import React from "react";

import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";

import { DivBase } from "../../../../../utils/divBase";
import { DivFrom, DivFromTop, DivFromDown, HeaderColor } from "../NavFrom";

import { Table } from "react-bootstrap";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import dayjs from "dayjs";

import Modalqrcode from "../../12Qrcode/Notify/Export/excqr";

export const QUERY_EXCHOPDAY = gql`
  query QUERY_EXCHOPDAY {
    CardExc {
      id
      exporter
      exportdate
      user {
        name
      }
      chop {
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
      storestatus {
        nameTH
      }
  }
  }
`;

const chopday = () => {
  const { data } = useQuery(QUERY_EXCHOPDAY);
  return (
    <div>
      <DivFromTop>
        <div style={{ margin: "-3px 5px 0px 0px" }}>
          <Icon size={20} icon={list} />
        </div>
        รายการนำออกชิ้นเนื้อ (วัน)
      </DivFromTop>{" "}
      <DivFromDown>
        <div
          style={{ height: `${data && data.CardExc.length > 9 ? "550px" : ""}`, overflow: "auto" }}
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
                <th>น้ำหนัก (กก.)</th>
                <th>สถานะ</th>
                <th>ผู้ขอเบิก</th>
                <th>ผู้เบิกออก</th>
              </tr>
            </thead>
            <tbody>
              {data && data.CardExc.length > 0 ? (
                data.CardExc.map((prod) => (
                  <tr key={prod.id} style={{ textAlign: "center" }}>
                    <td>{prod.chop.beeftype.nameTH}</td>
                    <td>
                      {dayjs(prod.exportdate)
                        .add(543, "year")
                        .format("DD/MM/YYYY")}
                    </td>
                    <td>
                      {dayjs(prod.exportdate)
                        .add(543, "year")
                        .format("h:mm:ss A")}
                    </td>
                    <td>{prod.chop.imslaughter.numcow}</td>
                    <td>{prod.chop.beeftype.code}</td>
                    <td>{prod.chop.barcode}</td>
                    <td>
                      <Modalqrcode key={prod.id} notifychop={prod} />
                    </td>
                    <td>{prod.chop.weight}</td>
                    <td>{prod.storestatus.nameTH}</td>
                    <td>{prod.exporter}</td>
                    <td>{prod.user.name}</td>
                  </tr>
                ))
              ) : (
                <tr style={{ textAlign: "center" }}>
                  <td colSpan="11">ไม่พบข้อมูล</td>

                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </DivFromDown>
    </div>
  );
};

export default chopday;
