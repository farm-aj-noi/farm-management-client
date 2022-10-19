import React from "react";
import { Table } from "react-bootstrap";
import { Icon } from "react-icons-kit";
import { paste } from "react-icons-kit/icomoon/paste";
import { DivCenter } from "../Styleclass/Table";
import { Icon10 } from "../../../utils/Logograde";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { ButtonSearchColor } from "../Styleclass/Button";
import { iosSearchStrong } from "react-icons-kit/ionicons/iosSearchStrong";
import { LISTHISTORY } from "../history/index";
import dayjs from "dayjs";
import PDF from "./ReportPDF";
import Excel from "./ReportExcel";

function index() {
  const { data, loading, error } = useQuery(LISTHISTORY);
  // console.log(data);
  return (
    <div>
      <DivCenter
        style={{
          fontSize: "36px",
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
        ></div>
        <Icon10 height="70px" weight="70px" />
        ออกรายงาน
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
      <DivCenter>
        <div
          style={{
            width: "auto",
            height: "auto",
            padding: "10px",
            marginTop: "30px",
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
            รายการประวัติการตัดเกรด
          </h1>
          <DivCenter>
            <div>
              <Table responsive striped bordered hover>
                <thead>
                  <tr style={{ textAlign: "center", fontSize: "22px" }}>
                    <th rowspan="2">รหัสซากโค</th>
                    <th rowspan="2">บาร์โค้ด</th>
                    <th rowspan="2">น้ำหนักอุ่น Kg.</th>
                    <th rowspan="2">วันที่เข้าบ่ม</th>
                    <th rowspan="2">วันที่ตัดเกรด</th>
                    <th rowspan="2">ห้องบ่ม</th>
                    <th rowspan="2">สายพันธุ์</th>
                    <th colspan="2">เกรด</th>
                  </tr>
                  <tr style={{ textAlign: "center", fontSize: "18px" }}>
                    <th>จากระบบ</th>
                    <th>จากผู้เชี่ยวชาญ</th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.finalGrade.map((prod) => (
                      <tr style={{ textAlign: "center" }}>
                        <td>{prod.beeftype.code}</td>
                        <td>{prod.barcode}</td>
                        <td>{prod.weightwarm}</td>
                        <td>
                          {dayjs(prod.chill[0].chilldateStart).format(
                            "DD-MM-YYYY"
                          )}
                        </td>
                        <td>
                          {dayjs(prod.chill[0].chilldateEnd).format("DD-MM-YYYY")}
                        </td>
                        <td>{prod.chill[0].chillroom.roomnum}</td>
                        <td>{prod.imslaughter.pun}</td>
                        <td>{prod.grade[0].SystemGrade}</td>
                        <td>{prod.grade[0].ExpertGrade}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
          </DivCenter>
         {/*  {data && data.finalGrade.length > 0 ? (
                    data.finalGrade.map((prod) => (
                      <ListHistory key={prod.id} ListHistory={prod} />
                    ))
                  ) : (
                    <tr style={{ textAlign: "center" }}>
                      <td colSpan="10">ไม่พบข้อมูลซากโค</td>
                    </tr>
                  )} */}
          {data && data.finalGrade.length > 0 ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                columnGap: "10px",
              }}
            >
              
              <PDF prod={data.finalGrade} />
              <Excel prod={data.finalGrade} />

            </div>
          ) : (
            <tr style={{ textAlign: "center" }}>
            <td colSpan="10">ไม่พบข้อมูลซากโค</td>
            </tr>
          )}
        </div>
      </DivCenter>
    </div>
  );
}

export default index;
