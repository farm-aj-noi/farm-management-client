import React, { useState } from "react";

import { Table } from "react-bootstrap";
import { DivFrom, DivFromTop, DivFromDown, HeaderColor } from "../ExportFrom";
import { DivBase } from "../../../../../utils/divBase";

import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";
import { iosSearchStrong } from "react-icons-kit/ionicons/iosSearchStrong";
import { exit } from 'react-icons-kit/icomoon/exit'


import Submit_Export from "./Submit_Export";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import List_export from "./ListExport";

export const EXPORTCHOPSEARCH = gql`
  query EXPORTCHOPSEARCH(
    $startdate: String
    $enddate: String
    $beeftype: String
    $userName: String
    $exporter: String
    $exportstatus: String
  ) {
    exportchop(
      startdate: $startdate
      enddate: $enddate
      beeftype: $beeftype
      userName: $userName
      exporter: $exporter
      exportstatus:$exportstatus
    ) {
      exporter
      id
      exportdate
      user {
        name
      }
      chop {
        weight
        barcode
        status {
          nameTH
        }
        beeftype {
          code
          nameTH
        }
        imslaughter {
          numcow
          namefarmer
        }
      }
      storestatus {
        nameTH
      }
    }
  }
`;

const index = () => {
  const [selectedbeeftypechop, SetBeeftypeChopChange] = useState("");
  const [selectedstartdate, SetStartDateChange] = useState("");
  const [selectedenddate, SetEndDateChange] = useState("");
  const [inputusername, SetInputusername] = useState("");
  const [inputexporter, SetinputExporter] = useState("");
  const [exportstatus, Setexportstatus] = useState("");
  const { data, loading, error } = useQuery(EXPORTCHOPSEARCH, {
    variables: {
      beeftype: selectedbeeftypechop,
      startdate: selectedstartdate,
      enddate: selectedenddate,
      userName: inputusername,
      exporter: inputexporter,
      exportstatus: exportstatus
    },
  });
  return (
    <div style={{ marginTop: "100px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "30px",
        }}
      >
        <HeaderColor
          style={{
            width: "fit-content",
            height: "fit-content",
            padding: "5px 30px",
          }}
        >
          นำออกซากเนื้อโคชิ้นเนื้อ
        </HeaderColor>
      </div>
      <DivBase
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 270px 1300px 1fr",
          gridRowGap: "15px",
          gridColumnGap: "10px",
          textAlign: "start",
          // width:"950px",
          // margin:"auto"
        }}
      >
        <>
          <DivFrom
            style={{
              width: "100%",
              marginTop: "0",
              gridRowStart: "2",
              gridRowEnd: "5",
              gridColumnStart: "2",
            }}
          >
            <DivFromTop>
              <div style={{ margin: "-1px 5px 0px -5px" }}>
                <Icon size={20} icon={exit} />
              </div>
              ดำเนินการนำออกซากเนื้อโคชิ้นเนื้อ
            </DivFromTop>
            <DivFromDown>
              <Submit_Export />
            </DivFromDown>
          </DivFrom>
          <DivFrom
            style={{
              width: "100%",
              gridRowStart: "2",
              gridRowEnd: "3",
              gridColumnStart: "3",
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
                <div style={{ fontSize: "20px" }}>
                  <label
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
                      fontSize: "16px",
                    }}
                    onChange={(event) =>
                      SetBeeftypeChopChange(event.target.value)
                    }
                  >
                    <option value="">ทั้งหมด</option>
                    <option value="5f446195ecd6732ad8108684">เนื้อสันคอ</option>
                    <option value="5f4461a8ecd6732ad8108685">ที-โบน</option>
                    <option value="5f4461bfecd6732ad8108686">
                      เนื้อสันนอก
                    </option>
                    <option value="5f4461d6ecd6732ad8108687">
                      ที-โบน สเต็ก
                    </option>
                    <option value="5f44620cecd6732ad8108688">ริบอาย</option>
                    <option value="5f446224ecd6732ad8108689">ใบบัวสเต็ก</option>
                    <option value="5f44623aecd6732ad810868a">เนื้อสันใน</option>
                    <option value="5f44624fecd6732ad810868b">สันสะโพก</option>
                    <option value="5f446262ecd6732ad810868c">
                      เสือร้องไห้
                    </option>
                    <option value="5f44628decd6732ad810868d">
                      เนื้อซี่โครง
                    </option>
                    <option value="5f4462a4ecd6732ad810868e">พับใน</option>
                    <option value="5f4462b6ecd6732ad810868f">ตะพาบ</option>
                    <option value="5f4462c8ecd6732ad8108690">ลูกมะพร้าว</option>
                    <option value="5f4462ddecd6732ad8108691">ปลาบู่ทอง</option>
                    <option value="5f4462eeecd6732ad8108692">ใบพาย</option>
                    <option value="5f4462feecd6732ad8108693">หางตะเข้</option>
                    <option value="5f44630fecd6732ad8108694">น่อง</option>
                    <option value="5f446320ecd6732ad8108695">พับนอก</option>
                  </select>
                  <label
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
                      fontSize: "16px",
                      textAlign: "center",
                    }}
                    onChange={(event) => SetinputExporter(event.target.value)}
                  />
                  <label
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
                      fontSize: "16px",
                      textAlign: "center",
                    }}
                    onChange={(event) => SetInputusername(event.target.value)}
                  />
                  <label
                    style={{
                      textAlign: "center",
                      fontSize: "18px",
                      margin: "10px 10px",
                    }}>
                    สถานะ
                    <select
                      style={{
                        height: "35px",
                        width: "110px",
                        border: "1px solid #AFAFAF",
                        borderRadius: "4px",
                        textAlign: "center",
                        fontSize: "16px",
                        marginLeft: "10px"
                      }}
                      onChange={(event) => Setexportstatus(event.target.value)}
                    >
                      <option value="">เลือก</option>
                      <option value="6281fb683dd2ff4e1495d6bd">
                        นำตัดเเต่ง(ก้อนเนื้อ)
                      </option>
                      <option value="6280fac6d3dbf7345093676f">นำจำหน่าย</option>
                      <option value="62821d931768cd521052118b">นำแปรรูป</option>
                    </select>
                  </label>
                  <label
                    style={{
                      textAlign: "center",
                      fontSize: "18px",
                      margin: "10px 10px",
                    }}
                  >
                    วันที่เบิกออก
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
                    onChange={(event) => SetStartDateChange(event.target.value)}
                  ></input>
                  <label
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
                    onChange={(event) => SetEndDateChange(event.target.value)}
                  ></input>
                </div>
              </div>
            </DivFromDown>
          </DivFrom>
          <DivFrom
            style={{
              width: "100%",
              gridRowStart: "3",
              gridRowEnd: "3",
              gridColumnStart: "3",
              gridColumnEnd: "3",
              marginTop: "20px",
            }}
          >
            <DivFromTop>
              <div style={{ margin: "-3px 5px 0px 0px" }}>
                <Icon size={20} icon={list} />
              </div>
              รายการนำออกซากเนื้อโคชิ้นเนื้อ
            </DivFromTop>
            <DivFromDown>
              <div style={{ height: `${data && data.exportchop.length > 6 ? "400px" : ""}`, overflow: `${data && data.exportchop.length > 6 ? "auto" : ""}` }}>
                <Table
                  striped
                  bordered
                  responsive
                  hover
                  style={{ margin: "auto" }}
                >
                  <thead>
                    <tr style={{ textAlign: "center", fontSize: "18px" }}>
                      <th>ประเภทซาก</th>
                      <th>วันที่เบิกออก</th>
                      <th>เวลา</th>
                      <th>ทะเบียนขุน</th>
                      <th>รหัสซาก</th>
                      <th>รหัสบาร์โค้ด</th>
                      <th>คิวอาร์โค้ด</th>
                      <th>น้ำหนัก (กก.)</th>
                      <th>สถานะ</th>
                      <th>ผู้ขอเบิก</th>
                      <th>ผู้เบิกออก</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data && data.exportchop.length > 0 ? (data.exportchop.map((prod) => (
                      <List_export key={prod.id} exchop={prod} />
                    ))) : (<tr style={{ textAlign: "center" }}>
                      <td colSpan="12">ไม่พบข้อมูล</td>
                    </tr>)
                    }
                  </tbody>
                </Table>
              </div>
              <div style={{ float: "right", textAlign: "right" }}>
                จำนวนรายการ {data ? data.exportchop.length : "0"} รายการ
                <br />
                น้ำหนักอุ่น{" "}
                {data &&
                  data.exportchop.reduce(
                    (sum, nex) => sum + nex.chop.weight,
                    0
                  ).toFixed(2)}{" "}
                กิโลกรัม
              </div>
            </DivFromDown>
          </DivFrom>
        </>
      </DivBase>
    </div>
  );
};

export default index;
