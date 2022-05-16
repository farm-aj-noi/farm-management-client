import React, { useState } from "react";

import { Table } from "react-bootstrap";
import {
  DivFrom,
  DivFromTop,
  DivFromDown,
  HeaderColor,
} from "../ReportFrom.js";
import { DivBase } from "../../../../../utils/divBase";

import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";
import { iosSearchStrong } from "react-icons-kit/ionicons/iosSearchStrong";

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
          ออกรายงานคงคลัง
        </HeaderColor>
      </div>
      <DivFrom
        style={{
          marginTop: "30px",
          marginBottom: "30px",
          height: "130px",
          width: "900px",
        }}
      >
        <DivFromTop>
          <div style={{ margin: "-3px 5px 0px 0px" }}>
            <Icon size={20} icon={iosSearchStrong} />
          </div>
          ค้นหารายการ
        </DivFromTop>
        <DivFromDown>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "10px",
            }}
          >
            <from style={{ fontSize: "20px" }}>
              <label
                for="beef"
                style={{
                  textAlign: "center",
                  fontSize: "18px",
                  marginRight: "10px",
                }}
              >
                ประเภทซาก
              </label>
              <select
                name="beef"
                id="beef"
                style={{
                  height: "35px",
                  width: "120px",
                  border: "1px solid #AFAFAF",
                  borderRadius: "4px",
                  textAlign: "center",
                  fontSize: "14px",
                  marginRight: "10px",
                }}
               
              >
                <option value="">ทั้งหมด</option>
                <option value="5f1000e28d55662dcc23d95e">ซากซ้าย</option>
                <option value="5f1000ee8d55662dcc23d960">ซากขวา</option>
              </select>
              <label
                for="beef"
                style={{
                  textAlign: "center",
                  fontSize: "18px",
                  marginRight: "10px",
                }}
              >
                ทะเบียนขุน
              </label>
              <input
                style={{
                  height: "35px",
                  width: "110px",
                  borderRadius: "4px",
                  border: "1px solid #AFAFAF",
                  fontSize: "14px",
                  textAlign: "center",
                  marginRight: "10px",
                }}
              />
              <label
                for="date"
                style={{
                  textAlign: "center",
                  fontSize: "18px",
                  marginRight: "10px",
                }}
              >
                วันที่นำเข้า
              </label>
              <input
                type="date"
                id="ex_chill"
                name="date"
                style={{
                  height: "35px",
                  border: "1px solid #AFAFAF",
                  borderRadius: "4px",
                  color: "#AFAFAF",
                  textAlign: "center",
                }}
               
              ></input>
              <label
                for="date"
                style={{
                  textAlign: "center",
                  fontSize: "18px",
                  margin: "10px 10px",
                }}
              >
                ถึงวันที่
              </label>
              <input
                type="date"
                id="ex_chill"
                name="date"
                style={{
                  height: "35px",
                  border: "1px solid #AFAFAF",
                  borderRadius: "4px",
                  color: "#AFAFAF",
                  textAlign: "center",
                }}
                
              ></input>
            </from>
          </div>
        </DivFromDown>
      </DivFrom>
      <DivFrom style={{ width: "1400px" }}>
        <DivFromTop>
          <div style={{ margin: "-3px 5px 0px 0px" }}>
            <Icon size={20} icon={list} />
          </div>
          รายการที่ค้นหา
        </DivFromTop>
        <DivFromDown>
          <div style={{ height: "250px", overflowY: "auto" }}>
            <Table striped bordered responsive hover style={{ margin: "auto" }}>
              {/* <LoadingSmall/> */}
              <thead>
                <tr style={{ textAlign: "center" }}>
                  <th>ประเภทซาก</th>
                  <th>ทะเบียนขุน</th>
                  <th>รหัสซาก</th>
                  <th>รหัสบาร์โค้ด</th>
                  <th>คิวอาร์โค้ด</th>
                  <th>น้ำหนักอุ่น</th>
                  <th>น้ำหนักเย็น</th>
                  <th>อายุ</th>
                  <th>เกรด</th>
                  <th>ห้อง</th>
                  <th>ชั้น</th>
                  <th>ตะกร้า</th>
                  <th>สถานะ</th>
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
  );
};

export default index;
