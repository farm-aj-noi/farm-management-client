import React from "react";

import { Table } from "react-bootstrap";
import { DivFrom, DivFromTop, DivFromDown, HeaderColor } from "../ImportFrom";
import { DivBase } from "../../../../../utils/divBase";

import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";

import Create_Import from "./Create_Import";

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
          นำเข้าซากเนื้อโคสี่เสี้ยว
        </HeaderColor>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
      >
        <Create_Import />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
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
            }}
          >
            <option value="">ทั้งหมด</option>
            <option value="">ซากซ้าย</option>
            <option value="">ซากขวา</option>
            <option value="">ซากซ้าย</option>
            <option value="">ซากขวา</option>
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
            ผู้นำเข้า
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
          <label
            for="beef"
            style={{
              textAlign: "center",
              fontSize: "18px",
              margin: "10px 10px",
            }}
          >
            ตำแหน่ง
          </label>
          <select
            name="room"
            id="room"
            style={{
              height: "35px",
              width: "50px",
              border: "1px solid #AFAFAF",
              borderRadius: "4px 0px 0px 4px",
              textAlign: "center",
              fontSize: "14px",
            }}
          >
            <option value="">ห้อง</option>
            <option value="">1</option>
            <option value="">2</option>
            <option value="">3</option>
          </select>
          <select
            name="shelf"
            id="shelf"
            style={{
              height: "35px",
              width: "50px",
              border: "1px solid #AFAFAF",
              borderLeft: "none",
              textAlign: "center",
              fontSize: "14px",
            }}
          >
            <option value="">ชั้น</option>
            <option value="">1</option>
            <option value="">2</option>
            <option value="">3</option>
          </select>
          <select
            name="bucket"
            id="bucket"
            style={{
              height: "35px",
              width: "60px",
              border: "1px solid #AFAFAF",
              borderRadius: "0px 4px 4px 0px",
              borderLeft: "none",
              textAlign: "center",
              fontSize: "14px",
              marginRight: "10px",
            }}
          >
            <option value="">ตะกร้า</option>
            <option value="">1</option>
            <option value="">2</option>
            <option value="">3</option>
          </select>
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
      <DivFrom style={{ width: "1400px" }}>
        <DivFromTop>
          <div style={{ margin: "-3px 5px 0px 0px" }}>
            <Icon size={20} icon={list} />
          </div>
          รายการนำเข้าซากเนื้อโคสี่เสี้ยว
        </DivFromTop>
        <DivFromDown>
          <div style={{ height: "280px", overflowY: "auto" }}>
            <Table striped bordered responsive hover style={{ margin: "auto" }}>
              {/* <LoadingSmall/> */}
              <thead>
                <tr style={{ textAlign: "center" }}>
                  <th>เจ้าของซาก</th>
                  <th>ประเภทซาก</th>
                  <th>วันที่นำเข้า</th>
                  <th>เวลา</th>
                  <th>ทะเบียนขุน</th>
                  <th>รหัสซาก</th>
                  <th>รหัสบาร์โค้ด</th>
                  <th>คิวอาร์โค้ด</th>
                  <th>น้ำหนัก</th>
                  <th>ห้อง</th>
                  <th>ชั้น</th>
                  <th>ตะกร้า</th>
                  <th>สถานะ</th>
                  <th>ผู้นำเข้า</th>
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

export default index;
