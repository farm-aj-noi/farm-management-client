import React, { useState } from "react";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import Link from "next/link";
import {
  ButtonQrcodeColor,
  ButtonHeaderColor,
  ButtonSearchColor,
  ButtonRecordColor,
  ButtonSubmit,
  ButtonImagecolor,
} from "../Styleclass/Button";

const ListHistory = ({ ListHistory }) => {
const router = useRouter();
const [prod, setProd] = useState(ListHistory);
const [ListHistoryData, SetListHistoryData] = useState(ListHistory);
console.log(ListHistoryData.chill.chilldateStart);
  return (
    <tr style={{ textAlign: "center" }}>
      <td>{ListHistoryData.beeftype.code}</td>
      <td>{ListHistoryData.barcode}</td>
      <td>{ListHistoryData.weightwarm}</td>
      <td>{ListHistoryData.weightcool ? ListHistoryData.weightcool : "-"}</td>
      <td>{dayjs(ListHistoryData.chill.chilldateStart).format("DD-MM-YYYY")}</td>
      <td>{dayjs(ListHistoryData.chill.chilldateEnd).format("DD-MM-YYYY")}</td>
      {ListHistoryData && ListHistoryData.chill.map((prod) => (
      <td>
      {ListHistoryData.chill[0].chillroom.roomnum
        ? ListHistoryData.chill[0].chillroom.roomnum
        : "-"}
      </td>
      ))} 
    
      <td>{ListHistoryData.imslaughter.pun}</td>
      <td>
        <Link href="grade/[gradeId]" as={`grade/${ListHistoryData.id}`}>
          <ButtonSubmit>ออกรายงาน</ButtonSubmit>
        </Link>
      </td>
      <td>
        <Link href="grade/[gradeId]" as={`grade/${ListHistoryData.id}`}>
          <ButtonSubmit>รายระเอียด</ButtonSubmit>
        </Link>
      </td>
    </tr>
  );
};

<<<<<<< HEAD
export default ListHistory;
=======
const tdstyle = {
  border: "1px solid #dddddd",
  textAlign: "center",
  padding: "5px",
  fontSize: "14px",
};
function History() {
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
                          <Link href="/">
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


export default History;
>>>>>>> 457e34e463b5e388cc0c5831f3d5b67938acae3c
