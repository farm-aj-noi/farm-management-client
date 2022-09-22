import React from 'react'
import { Card, Table, Form, Button } from "react-bootstrap"
import { Icon2 } from "../../../utils/naviconbeefstore"
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Router from "next/router";
import Request from "./CreateRequest";
import Listrequest from './Listrequest';
import RequsetP from "./CreateRequestP";
import ListrequestP from './ListrequestP';



export const QUERYLISTREQUEST = gql`
query QUERYLISTREQUEST {
  listRequestEx {
    typemeat
    id
    name
    beeftype {
      code
      nameTH
    }
    grade
    requestdate
    status {
      id
      nameTH
    }
  }
}
`

export const QUERYLISTREQUESTP = gql`
query QUERYLISTREQUESTP {
  listRequestExP {
    id
    producttype {
    code
    nameTH
    } 
    name
    requestdate
    status {
      id
      nameTH
    }
  }
}
`

function RequestStore() {
  const MySwal = withReactContent(Swal);
  const { data } = useQuery(QUERYLISTREQUEST);
  const { data: dataP } = useQuery(QUERYLISTREQUESTP);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", padding: "20px", fontSize: "48px", fontWeight: "600" }}>
        <Icon2 height="80px" weight="80px" /> รายการร้องขอเบิก
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 300px 800px 1fr",
          gridRowGap: "40px",
          gridColumnGap: "40px",
          textAlign: "start",
        }}>
        <div
          style={{
            width: "100%",
            gridRowStart: "1",
            gridColumnStart: "2",
          }}>
          <Card style={{ boxShadow: "0px 0px 1px grey" }}>
            <Card.Header style={{
              padding: '10px',
              fontSize: '16px',
              fontFamily: 'Arial',
              background: 'rgb(0 49 113)',
              color: 'white',
              border: 'none',
              fontWeight: '600'
            }}>
              ดำเนินการร้องขอเบิกคลังชิ้นเนื้อ
            </Card.Header>
            <Card.Body>
              <Request />
            </Card.Body>
          </Card>
        </div>
        <div
          style={{
            width: "100%",
            gridRowStart: "1",
            gridColumnStart: "3",
          }}
        >
          <Card style={{ boxShadow: "0px 0px 1px grey" }}>
            <Card.Header style={{
              padding: '10px',
              fontSize: '16px',
              fontFamily: 'Arial',
              background: 'rgb(0 49 113)',
              color: 'white',
              border: 'none',
              fontWeight: '600'
            }}>
              รายการร้องขอเบิกคลังชิ้นเนื้อ
            </Card.Header>
            <Card.Body >
              <div style={{ height: `${data && data.listRequestEx.length > 4 ? "250px" : ""}`, overflow: "auto" }}>
                <Table
                  striped
                  bordered
                  responsive
                  hover
                  style={{ margin: "auto" }}
                >
                  <thead>
                    <tr style={{ textAlign: "center", fontSize: "18px" }}>
                      <th>วันที่ร้องขอเบิก</th>
                      <th>ซากโค</th>
                      <th>ประเภทซาก</th>
                      <th>รหัสซาก</th>
                      <th>เกรด</th>
                      <th>สถานะดำเนินการ</th>
                      <th>ยกเลิกรายการ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data && data.listRequestEx.length > 0 ? (
                      data.listRequestEx.map((prod) => (
                        <Listrequest key={prod.id} listrequest={prod} />
                      ))
                    ) : (
                      <tr style={{ textAlign: "center" }}>
                        <td colSpan="7">ไม่พบข้อมูล</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card >
        </div>
        <div
          style={{
            width: "100%",
            gridRowStart: "2",
            gridColumnStart: "2",
          }}>
          <Card style={{ boxShadow: "0px 0px 1px grey" }}>
            <Card.Header style={{
              padding: '10px',
              fontSize: '16px',
              fontFamily: 'Arial',
              background: 'rgb(0 49 113)',
              color: 'white',
              border: 'none',
              fontWeight: '600'
            }}>
              ดำเนินการร้องขอเบิกคลังผลิตภัณฑ์
            </Card.Header>
            <Card.Body>
              <RequsetP />
            </Card.Body>
          </Card>
        </div>
        <div
          style={{
            width: "100%",
            gridRowStart: "2",
            gridColumnStart: "3",
          }}
        >
          <Card style={{ boxShadow: "0px 0px 1px grey" }}>
            <Card.Header style={{
              padding: '10px',
              fontSize: '16px',
              fontFamily: 'Arial',
              background: 'rgb(0 49 113)',
              color: 'white',
              border: 'none',
              fontWeight: '600'
            }}>
              รายการร้องขอเบิกคลังผลิตภัณฑ์
            </Card.Header>
            <Card.Body >
              <div style={{ height: `${dataP && dataP.listRequestExP.length > 4 ? "250px" : ""}`, overflow: "auto" }}>
                <Table
                  striped
                  bordered
                  responsive
                  hover
                  style={{ margin: "auto" }}
                >
                  <thead>
                    <tr style={{ textAlign: "center", fontSize: "18px" }}>
                      <th>วันที่ร้องขอเบิก</th>
                      <th>ประเภทสินค้า</th>
                      <th>รหัสสินค้า</th>
                      <th>สถานะดำเนินการ</th>
                      <th>ยกเลิกรายการ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataP && dataP.listRequestExP.length > 0 ? (
                      dataP.listRequestExP.map((prod) => (
                        <ListrequestP key={prod.id} listrequestp={prod} />
                      ))
                    ) : (
                      <tr style={{ textAlign: "center" }}>
                        <td colSpan="8">ไม่พบข้อมูล</td>
                      </tr>
                    )}
                    {/*  )} */}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div >

  )
}

export default RequestStore