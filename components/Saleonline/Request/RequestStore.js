import React from 'react'
import { Card, Table, Form, Button } from "react-bootstrap"
import { Icon2 } from "../../../utils/naviconbeefstore"
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Router from "next/router";
import Request from "./CreateRequest"
import Listrequest from './Listrequest';


export const QUERYLISTREQUEST = gql`
query QUERYLISTREQUEST {
  listRequestEx {
    id
    name
    beeftype {
      nameTH
    }
    requestdate
    quantity
  }
}
`

function RequestStore() {
  const MySwal = withReactContent(Swal);
  const { data } = useQuery(QUERYLISTREQUEST);
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
              <div style={{ height: `${data && data.listRequestEx.length > 4 ? "267px" : ""}`, overflow: "auto" }}>
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
                      <th>ประเภทซาก</th>
                      <th>เกรด</th>
                      <th>จำนวน</th>
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
                      <tr>
                        <td></td>
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
              <Form.Group>
                <Form.Label>ประเภทสินค้า :</Form.Label>
                <Form.Control as="select" name="beeftype"
                /* onChange={handleChange} */ >
                  <option>เลือก</option>
                  <option>เนื้อสันใน</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>จำนวน :</Form.Label>
                <Form.Control
                  type="text"
                  name="count"
                  placeholder="จำนวน"
               /*  value={productData.product_name}
                onChange={handleChange} */ />
              </Form.Group>
              <Button variant="success" style={{
                justifySelf: "right",
                float: "right",
              }}>
                บันทึก
              </Button>
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
              รายการร้องขอเบิกคลังชิ้นเนื้อ
            </Card.Header>
            <Card.Body >
              <div>
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
                      <th>จำนวน</th>
                      <th>ยกเลิกรายการ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {data && data.liststore.length > 0 ? (
                    data.liststore.map((prod) => (
                      <List_Store key={prod.id} Liststore={prod} />
                    ))
                  ) : ( */}
                    <tr style={{ textAlign: "center" }}>
                      <td colSpan="8">ไม่พบข้อมูล</td>
                    </tr>
                    <tr style={{ textAlign: "center" }}>
                      <td colSpan="8">ไม่พบข้อมูล</td>
                    </tr>
                    <tr style={{ textAlign: "center" }}>
                      <td colSpan="8">ไม่พบข้อมูล</td>
                    </tr>
                    <tr style={{ textAlign: "center" }}>
                      <td colSpan="8">ไม่พบข้อมูล</td>
                    </tr>
                    {/*  )} */}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>

  )
}

export default RequestStore