import React from "react";

import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";

import { DivBase } from "../../../../../utils/divBase";
import { DivFrom, DivFromTop, DivFromDown, HeaderColor } from "../NavFrom";

import { Table } from "react-bootstrap";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import dayjs from "dayjs";
import Modalqrcode from "../../12Qrcode/Notify/Export/exlqr";

export const QUERY_EXLUMPDAY = gql`
  query QUERY_EXLUMPDAY {
    CardExl {
      id
      exporter
      exportdate
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
      storestatus {
        nameTH
      }
    }
  }
`;

const lumpday = () => {
  const { data } = useQuery(QUERY_EXLUMPDAY);
  return (
    <div>
      <DivFromTop>
        <div style={{ margin: "-3px 5px 0px 0px" }}>
          <Icon size={20} icon={list} />
        </div>
        รายการเบิกออกก้อนเนื้อ (วัน)
      </DivFromTop>{" "}
      <DivFromDown>
        <div
          style={{ height: `${data && data.CardExl.length > 9 ? "550px" : ""}`, overflow: "auto" }}
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
              {data && data.CardExl.length > 0 ? (
                data.CardExl.map((prod) => (
                  <tr key={prod.id} style={{ textAlign: "center" }}>
                    <td>{prod.lump.beeftype.nameTH}</td>
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
                    <td>{prod.lump.imslaughter.numcow}</td>
                    <td>{prod.lump.beeftype.code}</td>
                    <td>{prod.lump.barcode}</td>
                    <td>
                      <Modalqrcode key={prod.id} notifylump={prod} />
                    </td>
                    <td>{prod.lump.weight}</td>
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

export default lumpday;
