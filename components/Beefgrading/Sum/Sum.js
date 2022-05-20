import React from "react";
import { Table } from "react-bootstrap";
import { Icon } from "react-icons-kit";
import { paste } from "react-icons-kit/icomoon/paste";
import { print } from 'react-icons-kit/fa/print'
import { iosSearchStrong } from "react-icons-kit/ionicons/iosSearchStrong";
import { DivCenter, TableForm, TableHead } from "../Styleclass/Table";
import {image} from 'react-icons-kit/fa/image'
import { Icon2 } from "../../../utils/Logograde";
import Link from "next/link";
import {
  ButtonQrcodeColor,
  ButtonHeaderColor,
  ButtonSearchColor,
  ButtonRecordColor,
  ButtonSubmit,
  ButtonImagecolor
} from "../Styleclass/Button";

const thstyle = {
  border: "1px solid #dddddd",
  textAlign: "center",
  padding: "10px",
  fontSize: "18px",
};

const tdstyle = {
  border: "1px solid #dddddd",
  textAlign: "center",
  padding: "5px",
  fontSize: "14px",
};
function Sum() {
    return (
        <div>
          <DivCenter style={{ fontSize: "36px", paddingTop: "30px" }}>
          <Icon2 height="70px" weight="70px" />
            สรุปเกรดเนื้อโค
          </DivCenter>
          
          <DivCenter>
            <from
              style={{
                marginTop: "10px",
                fontSize: "20px",
              }}
            >
              <label
                for="date"
                style={{
                  textAlign: "center",
                  fontSize: "18px",
                  marginRight: "10px",
                }}
              >
                วันที่ตัดเกรด
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
              <ButtonSearchColor>
                <Icon
                  style={{ verticalAlign: "text-bottom", marginRight: "5px" }}
                  icon={iosSearchStrong}
                  size={20}
                />
                ค้นหา
              </ButtonSearchColor>
            </from>
          </DivCenter>
    
          <DivCenter style={{ marginTop: "20px" }}>
            <div
              style={{
                width: "auto",
                height: "auto",
                padding: "10px",
                backgroundColor: "white",
                borderRadius: "5px",
                borderTop: "none",
                borderRadius: "5px",
                boxShadow:
                  " 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 0px 10px 0 rgba(0, 0, 0, 0.1)",
              }}
            >
              <h1
                style={{
                  height: "47px",
                  color: "white",
                  fontSize: "24px",
                  backgroundColor: "#3BAFDA",
                  borderRadius: "5px 5px 0px 0px",
                  padding: "7px 5px 5px 15px",
                  margin: "0px",
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "-moz-initial",
                }}
              >
                <Icon
                  style={{ verticalAlign: "text-bottom", marginRight: "10px" }}
                  icon={paste}
                  size={25}
                />
               สรุปเกรดเนื้อโค
              </h1>
              <DivCenter
                style={{
                  marginTop: "20px",
                }}
              >
                <div style={{ height: "450px", overflowY: "auto" }}>
                  <Table responsive striped bordered hover>
                    <thead>
                      <tr style={{ textAlign: "center", fontSize: "22px" }}>
                        <th rowspan="2">ลำดับ</th>
                        <th rowspan="2">รหัสซากโค</th>
                        <th colspan="2">บาร์โค้ด</th>
                        <th colspan="2">น้ำหนักซาก Kg.</th>
                        <th rowspan="2">วันที่เข้าบ่ม</th>
                        <th rowspan="2">วันที่ตัดเกรด</th>
                        <th rowspan="2">ห้องบ่ม</th>
                        <th colspan="2">เกรด</th>
                        <th rowspan="2">สายพันธุ์</th>
                        <th colspan="2">การสรุปเกรด</th>
    
                      </tr>
                      <tr style={{ textAlign: "center", fontSize: "18px" }}>
                        <th>ซากซ้าย</th>
                        <th>ซากขวา</th>
                        <th>ซากอุ่น</th>
                        <th>ซากเย็น</th>
                        <th>จากระบบ</th>
                        <th>จากผู้เชี่ยวชาญ</th>
                        <th>สถานะ</th>
                        <th>สรุปเกรด</th>
                      </tr>
                      
                    </thead>
                    <tbody style={{ borderTop: "none" }}>
                      <tr style={{ textAlign: "center", fontSize: "18px" }}>
                        <td>1</td>
                        <td>0001</td>
                        <td>0001-1</td>
                        <td>0001-2</td>
                        <td>406</td>
                        <td>322</td>
                        <td>12/07/2022</td>
                        <td>21/07/2022</td>
                        <td>01</td> 
                        <td>3.5</td>  
                        <td >3.5</td>
                        <td>เเองกัส</td>
                        <td>สรุปเเล้ว</td>
                        <td>
                          <Link href="/beefgrading/sum/summarize">
                          <ButtonSubmit style={{ fontSize: "16px"}}>
                            สรุปเกรด
                          </ButtonSubmit>
                          </Link>
                        </td> 
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </DivCenter>
            </div>
          </DivCenter>
        </div>
      );
    }


export default Sum;
