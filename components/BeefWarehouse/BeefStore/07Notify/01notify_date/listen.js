import React from "react";

import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";

import { DivBase } from "../../../../../utils/divBase";
import { DivFrom, DivFromTop, DivFromDown, HeaderColor } from "../NavFrom";

import { Table } from "react-bootstrap";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import dayjs from "dayjs";

const EXPEN = gql`
  query EXPEN {
    Card8e {
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
      Expdate
    }
  }
`;

const listen = () => {
  const { data } = useQuery(EXPEN);
  return (
    <div>
      <Table striped bordered responsive hover style={{ margin: "auto" }}>
        <thead>
          <tr style={{ textAlign: "center" }}>
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
                <td>คิวอาร์โค้ด</td>
                <td>{prod.beefroom.roomname}</td>
                <td>-</td>
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
              <td>-</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default listen;
