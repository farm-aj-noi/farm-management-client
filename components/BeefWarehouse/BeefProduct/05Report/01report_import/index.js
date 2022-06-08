import React from "react";
import {
  DivFrom,
  DivFromTop,
  DivFromDown,
  HeaderColor,
  ButtonExcel,
  ButtonPDF,
} from "../ReportFrom";
import { DivBase } from "../../../../../utils/divBase";
import { Table } from "react-bootstrap";

import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";

import { iosSearchStrong } from "react-icons-kit/ionicons/iosSearchStrong";

import Paper from "./paper";
import Excel from "./excel";

const index = () => {
  return (
    <div>
      {" "}
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
      >
        <HeaderColor
          style={{
            width: "fit-content",
            height: "fit-content",
            padding: "5px 30px",
          }}
        >
          ออกรายงานนำเข้า
        </HeaderColor>
      </div>
      <DivBase
        style={{
          display: "grid",
          gridTemplateColumns: "1fr  1100px 1fr",
          gridRowGap: "15px",
          gridColumnGap: "10px",
          textAlign: "start",
        }}
      >
        {" "}
        <DivFrom
          style={{
            width: "100%",
            gridRowStart: "2",
            gridRowEnd: "3",
            gridColumnStart: "2",
            marginTop: "0px",
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
                  ประเภทสินค้า
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
                  ผู้ขอเบิก
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
                  for="beef"
                  style={{
                    textAlign: "center",
                    fontSize: "18px",
                    marginLeft: "10px",
                    marginRight: "10px",
                  }}
                >
                  ผู้เบิกออก
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

                    textAlign: "center",
                    fontSize: "16px",
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
                    fontSize: "16px",
                    textAlign: "center",
                  }}
                ></input>
              </from>
            </div>
          </DivFromDown>
        </DivFrom>
        <DivFrom
          style={{
            width: "100%",
            gridRowStart: "3",
            gridRowEnd: "3",
            gridColumnStart: "2",
            gridColumnEnd: "2",
            marginTop: "10px",
          }}
        >
          <DivFromTop>
            <div style={{ margin: "-3px 5px 0px 0px" }}>
              <Icon size={20} icon={list} />
            </div>
            รายการนำเข้าซากเนื้อโคผ่าซีก
          </DivFromTop>
          <DivFromDown>
            <div style={{ height: "380px", overflow: "auto" }}>
              <Table
                striped
                bordered
                responsive
                hover
                style={{ margin: "auto" }}
              >
                <thead>
                  <tr style={{ textAlign: "center" }}>
                    <th>ประเภทสินค้า</th>
                    <th>วันที่นำเข้า</th>
                    <th>เวลา</th>
                    <th>รหัสสินค้า</th>
                    <th>รหัสบาร์โค้ด</th>
                    <th>คิวอาร์โค้ด</th>
                    <th>น้ำหนัก</th>
                    <th>วันที่ผลิต</th>
                    <th>วันหมดอายุ</th>
                    <th>ตู้แช่</th>
                    <th>ชั้นวาง</th>
                    <th>ผู้นำเข้า</th>
                  </tr>
                </thead>
                <tbody>
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
                  </tr>
                </tbody>
              </Table>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Paper />
              <Excel />
            </div>
          </DivFromDown>
        </DivFrom>
      </DivBase>
    </div>
  );
};

export default index;
