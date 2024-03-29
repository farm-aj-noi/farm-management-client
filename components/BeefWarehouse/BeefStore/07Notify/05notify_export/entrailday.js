import React from "react";

import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";

import { DivBase } from "../../../../../utils/divBase";
import { DivFrom, DivFromTop, DivFromDown, HeaderColor } from "../NavFrom";

import { Table } from "react-bootstrap";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import dayjs from "dayjs";
import Modalqrcode from "../../12Qrcode/Notify/Export/exeqr";

export const QUERY_EXENTRAILDAY = gql`
  query QUERY_EXENTRAILDAY {
    CardExe {
      id
      exportdate
      exporter
      user {
        name
      }
      entrail {
        offal
        toe
        head
        skin
        liver
        fat
        onkale
        tail
        gallbladder
        scrap
        barcode
        imslaughter {
          numcow
          namefarmer
        }
      }
      storestatus {
        nameTH
      }
    }
  }
`;

const entrailday = () => {
  const { data } = useQuery(QUERY_EXENTRAILDAY);
  return (
    <div>
      <DivFromTop>
        <div style={{ margin: "-3px 5px 0px 0px" }}>
          <Icon size={20} icon={list} />
        </div>
        รายการนำออกซากโคส่วนอื่น ๆ (วัน)
      </DivFromTop>{" "}
      <DivFromDown>
        <div
          style={{ height: `${data && data.CardExe.length > 9 ? "550px" : ""}`, overflow: "auto" }}
        >
          <Table striped bordered responsive hover style={{ margin: "auto" }}>
            <thead>
              <tr style={{ textAlign: "center", fontSize: "18px" }}>
                <th>วันที่เบิกออก</th>
                <th>เวลา</th>
                <th>ทะเบียนขุน</th>
                <th>เครื่องใน</th>
                <th>ปลายเท้า</th>
                <th>หัว</th>
                <th>หนังสด</th>
                <th>ตับ</th>
                <th>ไขมันอุ่น</th>
                <th>องแคล</th>
                <th>หาง</th>
                <th>ถุงน้ำดี</th>
                <th>เศษซาก</th>
                <th>รหัสบาร์โค้ด</th>
                <th>รหัสคิวอาร์โค้ด</th>
                <th>ผู้ขอเบิก</th>
                <th>ผู้เบิกออก</th>
              </tr>
            </thead>
            <tbody>
              {data && data.CardExe.length > 0 ? (
                data.CardExe.map((prod) => (
                  <tr key={prod.id} style={{ textAlign: "center" }}>
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
                    <td>{prod.entrail.imslaughter.numcow}</td>
                    <td>{prod.entrail.offal}</td>
                    <td>{prod.entrail.toe}</td>
                    <td>{prod.entrail.head}</td>
                    <td>{prod.entrail.skin}</td>
                    <td>{prod.entrail.liver}</td>
                    <td>{prod.entrail.fat}</td>
                    <td>{prod.entrail.onkale}</td>
                    <td>{prod.entrail.tail}</td>
                    <td>{prod.entrail.gallbladder}</td>
                    <td>{prod.entrail.scrap}</td>
                    <td>{prod.entrail.barcode}</td>
                    <td>
                      <Modalqrcode key={prod.id} notifyentrail={prod} />
                    </td>
                    <td>{prod.exporter}</td>
                    <td>{prod.user.name}</td>
                  </tr>
                ))
              ) : (
                <tr style={{ textAlign: "center" }}>
                  <td colSpan="17">ไม่พบข้อมูล</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </DivFromDown>
    </div>
  );
};

export default entrailday;
