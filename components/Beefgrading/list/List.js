import React from "react";
import { Table } from "react-bootstrap";
import { Icon } from "react-icons-kit";
import { paste } from "react-icons-kit/icomoon/paste";
import {print} from 'react-icons-kit/fa/print'
import { iosSearchStrong } from "react-icons-kit/ionicons/iosSearchStrong";
import { DivCenter, TableForm, TableHead } from "../Styleclass/Table";
import {image} from 'react-icons-kit/fa/image'
import { Icon3 } from "../../../utils/Logograde";
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
function List() {
  return (
    <div>
      <DivCenter style={{ fontSize: "36px", 
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: "30px", 
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "5px",
              }}
            >
            </div>
        <Icon3 height="70px" weight="70px" />
        รายการซากโค
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
            รายการซากโค
          </h1>
          <DivCenter
            style={{
              marginTop: "20px",
            }}
          >
            <div style={{ height: "450px", overflowY: "auto" }}>
              <Table responsive striped bordered hover>
                <thead>
                 
                  <tr style={{ textAlign: "center", fontSize: "18px" }}>
                    <th rowspan="2">ลำดับ</th>
                    <th rowspan="2">รหัสซากโค</th>
                    <th colspan="2">บาร์โค้ด</th>
                    <th colspan="2">น้ำหนักซาก Kg.</th>
                    <th rowspan="2">วันที่เข้าบ่ม</th>
                    <th rowspan="2">วันที่ตัดเกรด</th>
                    <th rowspan="2">ห้องบ่ม</th>
                    <th rowspan="2">สายพันธุ์</th>
                    <th rowspan="2">สถานะการตัดเกรด</th>
                  </tr>
                  <tr style={{ textAlign: "center", fontSize: "18px" }}>
                    <th>ซากซ้าย</th>
                    <th>ซากขวา</th>
                    <th>ซากอุ่น</th>
                    <th>ซากเย็น</th>
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
                    <td>เเองกัส</td>
                    <td>
                    <Link href="/beefgrading/grading">
                    <ButtonSubmit >
                      รอการตัดเกรด
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

export default List;
