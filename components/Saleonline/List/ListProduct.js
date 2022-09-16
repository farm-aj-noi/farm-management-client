import React from 'react'
import { Card, Table } from "react-bootstrap"
import { DivFromDown } from "./StoreFrom"
function ListProduct() {
  return (
    <div>
      <Card style={{
        width: 'auto',
        margin: 'auto',
        background: 'white',
        border: 'none',
        maxWidth: '1000px',
        paddingTop: "50px",
      }}>
        <Card.Header style={{
          padding: '10px',
          fontSize: '24px',
          fontFamily: 'Arial',
          background: 'rgb(0 49 113)',
          color: 'white',
          border: 'none',
          fontSize: '16px',
          fontWeight: '600'
        }}>รายการสินค้าคงคลัง (ผลิตภัณฑ์)
        </Card.Header>
        <Card.Body style={{ border: "1px solid gray", borderTop: "none", borderRadius: "0px 0px 4px 4px" }}>
          <form>
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
                    <th>ประเภทสินค้า</th>
                    <th>รหัสสินค้า</th>
                    <th>รหัสบาร์โค้ด</th>
                    <th>น้ำหนัก (กก.)</th>
                    <th>วันที่ผลิต</th>
                    <th>วันหมดอายุ</th>
                    <th>หมายเหตุ</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {data && data.liststore.length > 0 ? (
                    data.liststore.map((prod) => (
                      <List_Store key={prod.id} Liststore={prod} />
                    ))
                  ) : ( */}
                  <tr style={{ textAlign: "center" }}>
                    <td colSpan="7">ไม่พบข้อมูล</td>
                  </tr>
                  {/*  )} */}
                </tbody>
              </Table>
            </div>
          </form>
        </Card.Body>
      </Card>
    </div>
  )
}

export default ListProduct