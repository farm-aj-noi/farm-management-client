import React from 'react'
import { Form, Card, Button } from 'react-bootstrap'
import { AiOutlineCloudUpload } from "react-icons/ai";

function ManageProductOnline() {
  return (
    <div style={{ margin: "100px" }}>
      <Card style={{
        display: "flex",
        flexDirection: "column",
        margin: "auto",
        width: "800px",
      }}>
        <Card.Header style={{
          padding: '10px',
          background: 'rgb(0 49 113)',
          color: 'white',
          border: 'none',
          fontSize: '30px',
          fontWeight: '600',
          textAlign: "center"
        }}>เพิ่มสินค้า
        </Card.Header>
        <Card.Body>
          <form style={{
            display: "flex",
            flexDirection: "column",
            margin: "auto",
            fontSize: "20px"
          }}>
            <Form.Group>
              <Form.Label>ชื่อผลิตภัฑณ์ :</Form.Label>
              <Form.Control
                type="text"
                name="product_name"
                placeholder="ชื่อผลิตภัฑณ์"
               /*  value={productData.product_name}
                onChange={handleChange} */ />
            </Form.Group>
            <Form.Group>
              <Form.Label>หมวดหมู่ :</Form.Label>
              <Form.Control as="select" name="catagory" /* onChange={handleChange} */ >
                <option>เลือก</option>
                <option>เนื้อสันใน</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>ราคาผลิตภัฑณ์ :</Form.Label>
              <Form.Control
                type="number"
                name="product_price"
                placeholder="ราคาผลิตภัฑณ์"
                /* value={productData.product_price}
                onChange={handleChange} */ />
            </Form.Group>
            <Form.Group>
              <Form.Label>ยี่ห้อ :</Form.Label>
              <Form.Control
                type="text"
                name="brand"
                placeholder="ยี่ห้อ"
               /*  value={productData.brand}
                onChange={handleChange} */ />
            </Form.Group>
            <Form.Group>
              <Form.Label>อายุการเก็บรักษา :</Form.Label>
              <Form.Control
                as="select"
                name="shelf_life"
                /* onChange={handleChange}  */
                style={{ overflow: 'scroll', maxHeight: '40px' }}>
                <option>เลือก</option>
                <option>น้อยกว่า 1 เดือน</option>
                <option>1 เดือน</option>
                <option>2 เดือน</option>
                <option>3 เดือน</option>
                <option>4 เดือน</option>
                <option>5 เดือน</option>
                <option>6 เดือน</option>
                <option>7 เดือน</option>
                <option>8 เดือน</option>
                <option>9 เดือน</option>
                <option>10 เดือน</option>
                <option>11 เดือน</option>
                <option>12 เดือน</option>
                <option>มากว่า 12 เดือน</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>ส่งสินค้าจาก :</Form.Label>
              <Form.Control
                name="delivery_from"
                placeholder="ส่งสินค้าจาก"
               /*  value={productData.delivery_from}
                onChange={handleChange} */ />
            </Form.Group>
            <Form.Group>
              <Form.Label>รายละเอียดผลิตภัฑณ์ :</Form.Label>
              <Form.Control
                as="textarea"
                name="product_description"
                placeholder="รายละเอียดผลิตภัฑณ์"
                /* value={productData.product_description}
                onChange={handleChange} */
                style={{ height: '200px' }} />
            </Form.Group>
            <Form.Group>
              <Form.Label>หมายเลขอย. :</Form.Label>
              <Form.Control type="text"
                name="FDA_number"
                placeholder="หมายเลขอย."
                /* value={productData.FDA_number}
                onChange={handleChange} */ />
            </Form.Group>
            <Form.Group>
              <Form.Label>คลัง :</Form.Label>
              <Form.Control type="number"
                name="amount_of_product"
                placeholder="คลัง"
               /*  value={productData.amount_of_product}
                onChange={handleChange} */ />
            </Form.Group>
            <Form.Group>
              <Form.Label>น้ำหนัก :</Form.Label>
              <Form.Control type="number"
                name="weight"
                placeholder="น้ำหนัก"
                // value={productData.product_weight}
                // onChange={handleChange} 
                /* onChange={(event) => setNumkun(event.target.value)} */ />
            </Form.Group>
            <div>
              <Form.Group>
                <Form.Label>ค่าขนส่ง :</Form.Label>
                <Card>
                  <Card.Body>
                    {/* {
                      data && data.listTransportationFeeByWeight
                        ? */} <>
                      <div className="row">
                        <div className="col">{/* {data.listTransportationFeeByWeight.transport.name} */}</div>
                        <div className="col" style={{ textAlign: 'right' }}>฿ {/* {data.listTransportationFeeByWeight.price} */}</div>
                      </div>
                    </>
                    {/*  : ""
                    } */}
                  </Card.Body>
                </Card>
              </Form.Group>
              <div >
                <label htmlFor='input-file' style={{
                  fontSize: "1rem",
                  fontWeight: "300",
                  cursor: "pointer",
                  outline: 0,
                  userSelect: "none",
                  borderColor: "rgb(216, 216, 216) rgb(209, 209, 209) rgb(186, 186, 186)",
                  borderStyle: "solid",
                  borderRadius: "4px",
                  borderWidth: "1px",
                  backgroundColor: "#20ABF0 ",
                  color: "white",
                  paddingLeft: "16px",
                  paddingRight: "16px",
                  paddingTop: "16px",
                  paddingBottom: "16px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "20px"
                }}><AiOutlineCloudUpload />&nbsp;อัพโหลดรูป</label>

                <input type="file"
                  id='input-file'
                  name="file"
                  // placeholder="Product Image"
                  style={{ display: "none" }}
                  /* onChange={selectFile} */ /></div>
            </div>
            <Button
              style={{
                // margin: "5px",
                padding: "10px",
                background: "teal",
                color: "white",
                border: "none",
                /* cursor:
                  !file ||
                    !productData.product_name ||
                    !productData.product_price ||
                    !productData.brand ||
                    !productData.shelf_life ||
                    !productData.delivery_from ||
                    !productData.product_description ||
                    !productData.FDA_number || loading
                    ? "not-allowed"
                    : "pointer", */
                fontSize: "18px"
              }}
              type="submit"
              /* disabled={
                !file ||
                !productData.product_name ||
                !productData.product_price ||
                !productData.brand ||
                !productData.shelf_life ||
                !productData.delivery_from ||
                !productData.product_description ||
                !productData.FDA_number || loading
              } */>
              บันทึก
            </Button>
          </form>
          {/* <div style={{ margin: "auto" }}>
            {erroralert && (
              <p style={{ color: "red" }}>บันทึกไม่สำเร็จ</p>
            )}
            {(
              !file ||
              !productData.product_name ||
              !productData.product_price ||
              !productData.brand ||
              !productData.shelf_life ||
              !productData.delivery_from ||
              !productData.product_description ||
              !productData.FDA_number
            ) && (
                <p style={{ color: "red" }}>กรุณากรอกข้อมูลให้ครบทุกช่อง</p>
              )}
          </div> */}
        </Card.Body>
      </Card>

    </div>
  )
}

export default ManageProductOnline