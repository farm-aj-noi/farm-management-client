import React from "react";
import { DivFrom, DivFromTop, DivFromDown, HeaderColor } from "./StoreFrom";
import { DivBase } from "../../../../utils/divBase";
import { Table } from "react-bootstrap";

import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";

import { iosSearchStrong } from "react-icons-kit/ionicons/iosSearchStrong";

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
          คงคลังผลิตภัณฑ์
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
                  รหัสสินค้า
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
                  ตำแหน่ง
                </label>
                <div style={{ display: "inline", width: "170px" }}>
                  <select
                    name="beefroom"
                    id="beefroom"
                    style={{
                      height: "35px",
                      width: "60px",
                      border: "1px solid #AFAFAF",
                      borderRadius: "4px 0px 0px 4px",
                      textAlign: "center",
                      fontSize: "14px",
                    }}
                  >
                    <option value="">ตู้แช่</option>
                  </select>
                  <select
                    name="beefroom"
                    id="beefroom"
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
                    <option value="">ชั้นวาง</option>
                  </select>
                </div>
                <label
                  for="date"
                  style={{
                    textAlign: "center",
                    fontSize: "18px",
                    marginRight: "10px",
                  }}
                >
                  วันที่ผลิต
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
                  วันหมดอายุ
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
            <div style={{ height: "450px", overflow: "auto" }}>
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
                    <th>รหัสสินค้า</th>
                    <th>รหัสบาร์โค้ด</th>
                    <th>คิวอาร์โค้ด</th>
                    <th>น้ำหนัก</th>
                    <th>วันที่ผลิต</th>
                    <th>วันหมดอายุ</th>
                    <th>ตู้แช่</th>
                    <th>ชั้นวาง</th>
                    <th>หมายเหตุ</th>
                    <th>แก้ไข</th>
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
                  </tr>
                </tbody>
              </Table>
            </div>
            <div style={{ float: "right", textAlign: "right" }}>
              จำนวนรายการ รายการ
            </div>
          </DivFromDown>
        </DivFrom>
      </DivBase>
    </div>
  );
};

export default index;
