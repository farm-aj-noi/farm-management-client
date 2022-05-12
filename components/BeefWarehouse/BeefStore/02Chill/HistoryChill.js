import React from "react";

import { Table } from "react-bootstrap";
import { DivFrom, DivFromTop, DivFromDown, HeaderColor } from "./ChillFrom";
import { DivBase } from "../../../../utils/divBase";

import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";

const HistoryChill = () => {
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
          ประวัติบ่มซากเนื้อโค
        </HeaderColor>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "30px",
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
            ชนิดซาก
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
            }}
          >
            <option value="halve">ทั้งหมด</option>
            <option value="halve">ซากซ้าย</option>
            <option value="quarter">ซากขวา</option>
          </select>
          <label
            for="beef"
            style={{
              textAlign: "center",
              fontSize: "18px",
              marginLeft: "10px",
              marginRight: "10px",
            }}
          >
            ผู้บ่มซาก
          </label>
          <input
            style={{
              height: "35px",
              width: "110px",
              borderRadius: "4px",
              border: "1px solid #AFAFAF",
              fontSize: "14px",
              textAlign: "center",
            }}
          />
        </from>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "10px",
        }}
      >
        <from style={{ fontSize: "20px" }}>
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
      <DivFrom style={{ width: "1300px" }}>
        <DivFromTop>
          <div style={{ margin: "-3px 5px 0px 0px" }}>
            <Icon size={20} icon={list} />
          </div>
          รายการบ่มซากเนื้อโค
        </DivFromTop>
        <DivFromDown>
          <div style={{ height: "280px", overflowY: "auto" }}>
            <Table striped bordered responsive hover style={{ margin: "auto" }}>
              {/* <LoadingSmall/> */}
              <thead>
                <tr style={{ textAlign: "center" }}>
                  <th>ผู้บ่มซาก</th>
                  <th>วันที่บ่มเสร็จ</th>
                  <th>เวลา</th>
                  <th>ชนิดซาก</th>
                  <th>จำนวนวันที่บ่ม</th>
                  <th>ทะเบียนขุน</th>
                  <th>รหัสซาก</th>
                  <th>รหัสบาร์โค้ด</th>
                  <th>คิวอาร์โค้ด</th>
                  <th>น้ำหนักอุ่น</th>
                  <th>ห้อง</th>
                  <th>สถานะ</th>
                </tr>
              </thead>
              <tbody>
                <tr>
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
        </DivFromDown>
      </DivFrom>
    </DivBase>
  );
};

export default HistoryChill;
