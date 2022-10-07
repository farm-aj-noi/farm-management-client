import React from 'react'
import { Card, Table } from "react-bootstrap"
import { Icon9 } from "../../../utils/naviconbeefstore"

<<<<<<< HEAD
function ListProduct() {
=======
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import dayjs from 'dayjs';

const QUERYLISTFORSALE = gql`
query QUERYLISTFORSALE {
  productSale {
    id
    producttype
    code
    barcode
    weight
    Expdate
    info
  }
}
`
function ListProduct() {
  const { data } = useQuery(QUERYLISTFORSALE);
>>>>>>> dev65
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", padding: "20px", fontSize: "48px", fontWeight: "600" }}>
        <Icon9 height="80px" weight="80px" /> รายการสินค้าคงคลังผลิตภัณฑ์
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
        }}>รายการสินค้าคงคลังผลิตภัณฑ์
        </Card.Header>
        <Card.Body style={{ boxShadow: "0px 0px 2px grey" }}>
          <form>
<<<<<<< HEAD
            <div>
=======
            <div style={{ height: `${data && data.productSale.length > 13 ? "650px" : ""}`, overflow: "auto" }}>
>>>>>>> dev65
              <Table
                striped
                bordered
                responsive
                hover
                style={{ margin: "auto" }}
              >
                <thead>
                  <tr style={{ textAlign: "center", fontSize: "18px" }}>
                    <th>ประเภทสินค้า</th>
                    <th>รหัสสินค้า</th>
                    <th>รหัสบาร์โค้ด</th>
                    <th>น้ำหนัก (กก.)</th>
                    <th>วันที่ผลิต</th>
                    <th>วันหมดอายุ</th>
                    <th>หมายเหตุ</th>
<<<<<<< HEAD
                    <th>ดำเนินการขาย</th>
                  </tr>
                </thead>
                <tbody>
=======
                  </tr>
                </thead>
                <tbody>
                  {data && data.productSale.length > 0 ?
                    (
                      data.productSale.map((prod) => (
                        <tr style={{ textAlign: "center" }}>
                          <td>{prod.producttype}</td>
                          <td>{prod.code}</td>
                          <td>{prod.barcode}</td>
                          <td>{prod.weight ? prod.weight : "-"}</td>
                          <td>วันที่ผลิต</td>
                          <td>{prod.Expdate ? dayjs(prod.Expdate).add(543, "year").format("DD/MM/YYYY") : "-"}</td>
                          <td>{prod.info ? prod.info : "-"}</td>
                        </tr>
                      ))

                    ) : (
                      <tr style={{ textAlign: "center" }}>
                        <td colSpan="8">ไม่พบข้อมูล</td>
                      </tr>
                    )}
>>>>>>> dev65
                  {/* {data && data.liststore.length > 0 ? (
                    data.liststore.map((prod) => (
                      <List_Store key={prod.id} Liststore={prod} />
                    ))
                  ) : ( */}
<<<<<<< HEAD
                  <tr style={{ textAlign: "center" }}>
                    <td colSpan="8">ไม่พบข้อมูล</td>
                  </tr>
=======

>>>>>>> dev65
                  {/*  )} */}
                </tbody>
              </Table>
            </div>
          </form>
        </Card.Body>
      </Card>
<<<<<<< HEAD
    </div>
=======
    </div >
>>>>>>> dev65
  )
}

export default ListProduct