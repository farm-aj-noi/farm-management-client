import React from "react";

import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";

import { DivBase } from "../../../../../utils/divBase";
import { DivFrom, DivFromTop, DivFromDown, HeaderColor } from "../NavFrom";

import { Table } from "react-bootstrap";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import dayjs from "dayjs";
import Modalqrcode from "../../12Qrcode/Notify/Import/imeqr";

export const QUERY_IMHALVEDAY = gql`
  query QUERY_IMHALVEDAY {
    CardIme {
      id
      importdate
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
      beefroom {
        roomname
      }
    }
  }
`;

const entrailday = () => {
  const { data } = useQuery(QUERY_IMHALVEDAY);
  return (
    <div>
      <DivFromTop>
        <div style={{ margin: "-3px 5px 0px 0px" }}>
          <Icon size={20} icon={list} />
        </div>
        รายการนำเข้าซากโคส่วนอื่น ๆ (วัน)
      </DivFromTop>{" "}
      <DivFromDown>
        <div
          style={{ height: `${data && data.CardIme.length > 9 ? "550px" : ""}`, overflow: "auto" }}
        >
          <Table striped bordered responsive hover style={{ margin: "auto" }}>
            <thead>
              <tr style={{ textAlign: "center", fontSize: "18px" }}>
                <th>เจ้าของซาก</th>
                <th>วันที่นำเข้า</th>
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
                <th>คิวอาร์โค้ด</th>
                <th>ห้อง</th>
                <th>ผู้นำเข้า</th>
              </tr>
            </thead>
            <tbody>
              {data && data.CardIme.length > 0 ? (
                data.CardIme.map((prod) => (
                  <tr key={prod.id} style={{ textAlign: "center" }}>
                    <td>{prod.entrail.imslaughter.namefarmer}</td>
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
                       <Modalqrcode key={prod.id} notifyime={prod} /> 
                    </td>
                    <td>{prod.beefroom.roomname}</td>
                    <td>{prod.user.name}</td>
                  </tr>
                ))
              ) : (
                <tr style={{ textAlign: "center" }}>
                  <td colSpan="18">ไม่พบข้อมูล</td>
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
