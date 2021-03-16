import React, { useState } from "react";
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

const Regis = () => {

  return (
    <div >
    <Card style={{padding:"10",width:"80%",margin:"auto",marginTop:"3%"}}>
    <Card.Header style={{background:"#3399CC",color:"#ffffff"}}>System : ระบบลงทะเบียนรับโคเข้าขุน และ โคเข้าเชือด</Card.Header>
    <div className ="card-body">
        <div className="Card">
        <Form >
  <Form.Row>
  <Card style={{padding:"10",width:"30%",marginTop:"1%"}}>
    <Card.Header style={{background:"#3399CC",color:"#ffffff"}}>รูปถ่าย</Card.Header>
  </Card>
  <Card style={{padding:"10",width:"70%",marginTop:"1%" }}>
    <Card.Header style={{background:"#3399CC",color:"#ffffff"}}>ข้อมูลโคขุน</Card.Header>
    <div style={{padding:"10px"}}>
    <Form.Row>
    <Form.Group as={Col} md="2" controlId="formGridEmail">
      <Form.Label><span style={{color:"red"}}>*</span> หมายเลขการขุน</Form.Label>
      <Form.Control size="sm" type="text" placeholder="..." />
    </Form.Group>
    <Form.Group as={Col} md="2" controlId="formGridEmail">
      <Form.Label><span style={{color:"red"}}>*</span> หมายเลขโค</Form.Label>
      <Form.Control size="sm" type="text" placeholder="..." />
    </Form.Group>
    <Form.Group as={Col} md="2" controlId="formGridEmail">
      <Form.Label><span style={{color:"red"}}>*</span> ชื่อโค</Form.Label>
      <Form.Control size="sm" type="text" placeholder="..." />
    </Form.Group>
    <Form.Group as={Col} md="2" controlId="formGridState">
      <Form.Label><span style={{color:"red"}}>*</span> สายพันธุ์</Form.Label>
      <Form.Control size="sm" as="select" defaultValue="...">
        <option>...</option>
        <option>...</option>
      </Form.Control>
    </Form.Group>
    <Form.Group as={Col} md ="2"controlId="formGridEmail">
      <Form.Label> จำนวนฟันคู่แท้</Form.Label>
      <Form.Control size="sm" type="text" placeholder="..." />
    </Form.Group>
    <Form.Group  as={Col} md="1" controlId="formGridEmail">
      <Form.Label> อายุ</Form.Label>
      <Form.Control size="sm" type="text" placeholder="..." />
    </Form.Group>
    <Form.Group as={Col} md="1" controlId="formGridState">
      <Form.Label> เพศ</Form.Label>
      <Form.Control size="sm"  as="select" defaultValue="Choose...">
        <option>...</option>
        <option>...</option>
      </Form.Control>
    </Form.Group>
    </Form.Row>
 
    <Form.Row>
  <Form.Group as={Col}md="2" controlId="formGridEmail">
      <Form.Label><span style={{color:"red"}}>*</span> น้ำหนักโค</Form.Label>
      <Form.Control size="sm" type="text" placeholder="..." />
    </Form.Group>
    <Form.Group as={Col} md="3"controlId="formGridEmail">
      <Form.Label><span style={{color:"red"}}>*</span> วัน/เดือน/ปีเกิด</Form.Label>
      <Form.Control size="sm" type="date" placeholder="..." />
    </Form.Group>
    <Form.Group as={Col} md="2" controlId="formGridEmail">
      <Form.Label><span style={{color:"red"}}>*</span> รหัสพ่อพันธุ์</Form.Label>
      <Form.Control size="sm" type="text" placeholder="..." />
    </Form.Group>
    <Form.Group as={Col} md="2"controlId="formGridEmail">
      <Form.Label><span style={{color:"red"}}>*</span> รหัสแม่พันธุ์</Form.Label>
      <Form.Control size="sm" type="text" placeholder="..." />
    </Form.Group>
    <Form.Group as={Col} md="3"controlId="formGridEmail">
      <Form.Label><span style={{color:"red"}}>*</span> วันที่ลงทะเบียน</Form.Label>
      <Form.Control size="sm" type="date" placeholder="..." />
    </Form.Group>
  
  </Form.Row>
  <Form.Row>
  <Form.Group as={Col} controlId="formGridState">
      <Form.Label><span style={{color:"red"}}>*</span> ชื่อสมาชิกสหกรณ์</Form.Label>
      <Form.Control size="sm" as="select" defaultValue="Choose...">
        <option>นายทองดี ยิ้มงาม</option>
        <option>นายธงชัย ใจดี</option>
      </Form.Control>
    </Form.Group>
    <Form.Group as={Col} controlId="formGridEmail">
      <Form.Label><span style={{color:"red"}}>*</span> แหล่งที่มา</Form.Label>
      <Form.Control size="sm" type="text" placeholder="..." />
    </Form.Group>
    <Form.Group as={Col} controlId="formGridState">
      <Form.Label><span style={{color:"red"}}>*</span> BodyScore</Form.Label>
      <Form.Control size="sm" as="select" defaultValue="Choose...">
        <option>1</option>
        <option>1.5</option>
        <option>2</option>
        <option>2.5</option>
        <option>3</option>
        <option>3.5</option>
        <option>4</option>
        <option>4.5</option>
        <option>5</option>
      </Form.Control>
    </Form.Group>
    <Form.Group as={Col} controlId="formGridEmail">
      <Form.Label><span style={{color:"red"}}>*</span> RFID</Form.Label>
      <Form.Control size="sm" type="text" placeholder="..." />
    </Form.Group>
  </Form.Row>



  <Form.Group controlId="formGridAddress1">
    <Form.Label> รายละเอียด</Form.Label>
    <Form.Control type="text-aria" 
      
      placeholder="1234 Main St" />
  </Form.Group>
  </div>
  </Card>
  
  </Form.Row>


 

{/* //////////////////////////////////////////////////////////////////> */}

<div style={{margin:"0" ,textAlign:"center" ,marginTop:"1%"}}>

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

export default Regis;
