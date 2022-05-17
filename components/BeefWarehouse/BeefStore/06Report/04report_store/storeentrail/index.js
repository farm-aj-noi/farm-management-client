import React, { useState } from "react";

import { Table } from "react-bootstrap";
import {
  DivFrom,
  DivFromTop,
  DivFromDown,
  HeaderColor,
} from "../../ReportFrom.js";
import { DivBase } from "../../../../../../utils/divBase";

import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";
import { iosSearchStrong } from "react-icons-kit/ionicons/iosSearchStrong";

import Nav_store from "../Nav_store";

import Paper_store from "./Paper_store.js";
import Excel_store from "./Excel_store.js";

const index = () => {
  return (
    <DivBase>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "10px",
        }}
      >
        <HeaderColor
          style={{
            width: "fit-content",
            height: "fit-content",
            padding: "5px 30px",
          }}
        >
          ออกรายงานคงคลังชิ้นส่วนอื่น ๆ
        </HeaderColor>
      </div>
      <DivBase
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 250px 1300px 1fr",
          gridRowGap: "15px",
          gridColumnGap: "20px",
          textAlign: "start",
        }}
      >
        <DivFrom
          style={{
            width: "100%",
            marginTop: "0",
            gridRowStart: "2",
            gridRowEnd: "5",
            gridColumnStart: "2",
          }}
        >
          <Nav_store Sidenumber={1} />
        </DivFrom>
        <DivFrom
          style={{
            width: "100%",
            gridRowStart: "2",
            gridRowEnd: "3",
            gridColumnStart: "3",
            height: "500px",
          }}
        >
          <DivFromTop>
            <div style={{ margin: "-3px 5px 0px 0px" }}>
              <Icon size={20} icon={list} />
            </div>
            รายการยอดคงคลังชิ้นส่วนอื่น ๆ
          </DivFromTop>
          <DivFromDown>
            <div style={{ height: "350px", overflowY: "auto" }}>
              <Table
                striped
                bordered
                responsive
                hover
                style={{ margin: "auto" }}
              >
                {/* <LoadingSmall/> */}
                <thead>
                  <tr style={{ textAlign: "center" }}>
                    <th>เจ้าของซาก</th>
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
                    <th>ชั้น</th>
                    <th>ตะกร้า</th>
                    <th>หมายเหตุ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ textAlign: "center" }}>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Paper_store />
              <Excel_store />
            </div>
          </DivFromDown>
        </DivFrom>
      </DivBase>
    </DivBase>
  );
};

export default index;
