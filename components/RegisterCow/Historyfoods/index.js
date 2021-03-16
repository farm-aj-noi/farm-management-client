import React, { useState } from "react";
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

const Historyfoods = () => {

  return (
    <div >
    <Card style={{padding:"10",width:"60%",margin:"auto",marginTop:"3%"}}>
    <Card.Header style={{background:"#3399CC",color:"#ffffff"}}>System : ระบบลงทะเบียนรับโคเข้าขุน และ โคเข้าเชือด</Card.Header>
    <div className ="card-body">
        <div className="Card">
        <Form >
  <Form.Row>
    <Form.Group as={Col} md="2" controlId="formGridEmail">
      <Form.Label><span style={{color:"red"}}>*</span> หมายเลขการขุน</Form.Label>
      <Form.Control size="sm" type="text" disabled  defaultValue="C12202"/>
    </Form.Group>
    <Form.Group as={Col} md="2" controlId="formGridEmail">
      <Form.Label><span style={{color:"red"}}>*</span> หมายเลขโค</Form.Label>
      <Form.Control size="sm" type="text" disabled  defaultValue="000001" />
    </Form.Group>
    <Form.Group as={Col} md="2" controlId="formGridEmail">
      <Form.Label><span style={{color:"red"}}>*</span> ชื่อโค</Form.Label>
      <Form.Control size="sm" type="text" disabled  defaultValue="ขวานฟ้า" />
    </Form.Group>
    <Form.Group as={Col} md="3" controlId="formGridState">
      <Form.Label><span style={{color:"red"}}>*</span> สายพันธุ์</Form.Label>
      <Form.Control size="sm" as="select" disabled  defaultValue="001">
        <option>001</option>
        <option>...</option>
      </Form.Control>
    </Form.Group>
    <Form.Group as={Col} md ="3"controlId="formGridEmail">
      <Form.Label> ชื่อสมาชิกสหกรณ์</Form.Label>
      <Form.Control size="sm" type="text" disabled  defaultValue="นาย จรุณ แสงดี"/>
    </Form.Group>
    </Form.Row>
 
    <Form.Row>
    <Form.Group as={Col} md="3"controlId="formGridEmail">
      <Form.Label><span style={{color:"red"}}>*</span> วันที่บันทึก</Form.Label>
      <Form.Control size="sm" type="date" placeholder="..." />
    </Form.Group>
  <Form.Group as={Col}md="2" controlId="formGridEmail">
      <Form.Label><span style={{color:"red"}}>*</span> น้ำหนักโค</Form.Label>
      <Form.Control size="sm" type="text" placeholder="..." />
    </Form.Group>
    <Form.Group as={Col} md="3"controlId="formGridEmail">
      <Form.Label><span style={{color:"red"}}>*</span> ประเภทอาหาร</Form.Label>
      <Form.Control size="sm" as="select" defaultValue="Choose...">
      <option>เลือก</option>
        <option>อาหารข้น</option>
        <option>อาหารหยาบ</option>
      </Form.Control>
    </Form.Group>
    <Form.Group as={Col} md="4" controlId="formGridEmail">
      <Form.Label><span style={{color:"red"}}>*</span> รายการอาหาร</Form.Label>
      <Form.Control size="sm" as="select" defaultValue="Choose...">
      <option>เลือก</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
        <option>7</option>
        <option>8</option>
      </Form.Control>
    </Form.Group>


  
  </Form.Row>
  <Form.Row>
  <Form.Group as={Col} controlId="formGridState">
      <Form.Label><span style={{color:"red"}}>*</span> ปริมาณที่ใช้ต่อวัน</Form.Label>
      <Form.Control size="sm" type="text" placeholder="หน่วยกิโลกรัม"  />
    </Form.Group>
    <Form.Group as={Col} controlId="formGridEmail">
      <Form.Label><span style={{color:"red"}}>*</span> บริษัทผู้ผลิต</Form.Label>
      <Form.Control size="sm" type="text" placeholder="..." />
    </Form.Group>
    <Form.Group as={Col} controlId="formGridState">
      <Form.Label><span style={{color:"red"}}>*</span> ล๊อต</Form.Label>
      <Form.Control size="sm" type="text" placeholder="..." />

    </Form.Group>
    <Form.Group as={Col} controlId="formGridEmail">
      <Form.Label><span style={{color:"red"}}>*</span> หมายเหตุ</Form.Label>
      <Form.Control size="sm" type="text" placeholder="..." />
    </Form.Group>
  </Form.Row> 

{/* //////////////////////////////////////////////////////////////////> */}
<div style={{margin:"0" ,textAlign:"center"}}>
      <Button variant="primary" type="submit">
    บันทึก
  </Button>
  &ensp;
  <Button variant="primary" type="submit">
    รายการโคขุน
  </Button>
</div>

</Form>
 
        </div>
    </div>
    
  </Card>
  </div>
  );
};

export default Historyfoods;
