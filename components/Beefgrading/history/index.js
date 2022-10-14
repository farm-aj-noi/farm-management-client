import React from "react";
import { Table } from "react-bootstrap";
import { Icon } from "react-icons-kit";
import { paste } from "react-icons-kit/icomoon/paste";
import { print } from 'react-icons-kit/fa/print'
import { iosSearchStrong } from "react-icons-kit/ionicons/iosSearchStrong";
import { DivCenter, TableForm, TableHead } from "../Styleclass/Table";
import {image} from 'react-icons-kit/fa/image'
import { Icon4 } from "../../../utils/Logograde";
import Link from "next/link";
import gql from "graphql-tag";
import ListHistory from "./History";
import { useQuery } from "@apollo/react-hooks";
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

export const LISTHISTORY = gql`
  query LISTHISTORY {
    finalGrade {
      id
      weightwarm
      weightcool
      barcode
      imslaughter {
      pun
    }
      beeftype {
        code
      }
      chill {
        chillroom {
          roomnum
        }
        chilldateStart
        chilldateEnd
      }
      grade {
      SystemGrade
      ExpertGrade
    }
    }
  }
`;

function History() {
    const { data, loading, error } = useQuery(LISTHISTORY);
    return (
        <div>
          <DivCenter style={{ fontSize: "36px", paddingTop: "30px" }}>
          <Icon4 height="70px" weight="70px" />
            ประวัติการตัดเกรด
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
                        
                        <th rowspan="2">รหัสซากโค</th>
                        <th rowspan="2">บาร์โค้ด</th>
                        <th colspan="2">น้ำหนักซาก Kg.</th>
                        <th rowspan="2">วันที่เข้าบ่ม</th>
                        <th rowspan="2">วันที่ตัดเกรด</th>
                        <th rowspan="2">ห้องบ่ม</th>
                        <th rowspan="2">สายพันธุ์</th>
                        <th colspan="2">เกรด</th>
                        <th rowspan="2">สถานะ</th>
                        <th rowspan="2">รายละเอียด</th>
    
                      </tr>
                      <tr style={{ textAlign: "center", fontSize: "18px" }}>
                    
                        <th>ซากอุ่น</th>
                        <th>ซากเย็น</th>
                        <th>จากระบบ</th>
                        <th>จากผู้เชี่ยวชาญ</th>
   
                      </tr>
                      
                    </thead>
                <tbody>
                  {data &&
                    data.finalGrade.map((prod) => (
                      <ListHistory key={prod.id} ListHistory={prod} />
                    ))}
                </tbody>
                  </Table>
                </div>
              </DivCenter>
            </div>
          </DivCenter>
        </div>
      );
    }


export default History;
