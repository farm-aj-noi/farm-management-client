import React from 'react'
import { Card, Table } from "react-bootstrap"
import { Icon9 } from "../../../utils/naviconbeefstore"

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import dayjs from 'dayjs';

const QUERYLISTFORSALE = gql`
query StoreSale {
  storeSale {
    id
    beeftype
    code
    barcode
    weightwarm
    weight
    Expdate
    info
  }
}
`
function ListProduct() {
  const { data } = useQuery(QUERYLISTFORSALE);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", padding: "20px", fontSize: "48px", fontWeight: "600" }}>
        <Icon9 height="80px" weight="80px" /> รายการสินค้าคงคลังชิ้นเนื้อ
      </div>
      <Card style={{
        width: 'auto',
        margin: 'auto',
        background: 'white',
        border: 'none',
        maxWidth: '1000px',
      }}>
        <Card.Header style={{
          padding: '10px',
          fontFamily: 'Arial',
          background: 'rgb(0 49 113)',
          color: 'white',
          border: 'none',
          fontSize: '16px',
          fontWeight: '600'
        }}>รายการสินค้าคงคลังชิ้นเนื้อ
        </Card.Header>
        <Card.Body style={{ boxShadow: "0px 0px 2px grey" }}>
          <form>
            <div style={{ height: `${data && data.storeSale.length > 13 ? "650px" : ""}`, overflow: "auto" }}>
              <Table
                striped
                bordered
                responsive
                hover
                style={{ margin: "auto" }}
              >
                <thead>
                  <tr style={{ textAlign: "center", fontSize: "18px" }}>
                    <th>ประเภทซาก	</th>
                    <th>รหัสสินค้า</th>
                    <th>รหัสบาร์โค้ด</th>
                    <th>น้ำหนักอุ่น (กก.)</th>
                    <th>น้ำหนักเย็น (กก.)</th>
                    <th>วันหมดอายุ</th>
                    <th>หมายเหตุ</th>
                  </tr>
                </thead>
                <tbody>
                  {data && data.storeSale.length > 0 ?
                    (
                      data.storeSale.map((prod) => (
                        <tr style={{ textAlign: "center" }}>
                          <td>{prod.beeftype}</td>
                          <td>{prod.code}</td>
                          <td>{prod.barcode}</td>
                          <td>{prod.weightwarm ? prod.weightwarm : "-"}</td>
                          <td>{prod.weight ? prod.weight : "-"}</td>
                          <td>{prod.Expdate ? dayjs(prod.Expdate).add(543, "year").format("DD/MM/YYYY") : "-"}</td>
                          <td>{prod.info ? prod.info : "-"}</td>
                        </tr>
                      ))

                    ) : (
                      <tr style={{ textAlign: "center" }}>
                        <td colSpan="8">ไม่พบข้อมูล</td>
                      </tr>
                    )}
                  {/* {data && data.liststore.length > 0 ? (
                    data.liststore.map((prod) => (
                      <List_Store key={prod.id} Liststore={prod} />
                    ))
                  ) : ( */}

                  {/*  )} */}
                </tbody>
              </Table>
            </div>
          </form>
        </Card.Body>
      </Card>
    </div >
  )
}

export default ListProduct