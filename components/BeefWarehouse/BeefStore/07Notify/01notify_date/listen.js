import React from "react";

import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";

import { DivBase } from "../../../../../utils/divBase";
import { DivFrom, DivFromTop, DivFromDown, HeaderColor } from "../NavFrom";

import { Table } from "react-bootstrap";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import dayjs from "dayjs";
import Paperdate from "./papere";

import Modalqrcode from "../../12Qrcode/Notify/date/expeqr";

const EXPEN = gql`
  query EXPEN {
    Card8e {
      id
      entrail {
        id
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
        }
      }
      beefroom{
        roomname
      }
      Expdate
    }
  }
`;

const listen = () => {
  const { data } = useQuery(EXPEN);
  return (
    <>
      <div style={{ height: `${data && data.Card8e.length > 10 ? "550px" : ""}`, overflow: "auto" }}>
        <Table striped bordered responsive hover style={{ margin: "auto" }}>
          <thead>
            <tr style={{ textAlign: "center", fontSize: "18px" }}>
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
              <th>วันหมดอายุ</th>
            </tr>
          </thead>
          <tbody>
            {data && data.Card8e.length > 0 ? (
              data.Card8e.map((prod) => (
                <tr style={{ textAlign: "center" }}>
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
                  <td><Modalqrcode key={prod.id} datee={prod} /></td>
                  <td>{prod.beefroom.roomname}</td>
                  <td>
                    {" "}
                    {dayjs(prod.Expdate).add(543, "year").format("DD/MM/YYYY")}
                  </td>
                </tr>
              ))
            ) : (
              <tr style={{ textAlign: "center" }}>
                <td colSpan="15">ไม่พบข้อมูล</td>
              </tr>
            )}
          </tbody>
        </Table>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {data && data.Card8e.length > 0 ? (
            <div>
              <Paperdate prod={data.Card8e} />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default listen;
