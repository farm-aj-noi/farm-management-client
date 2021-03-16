import React, { useState } from "react";
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";

const Historytreat = () => {

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
      <Form.Label><span style={{color:"red"}}>*</span> วันที่ลงทะเบียนการรักษา</Form.Label>
      <Form.Control size="sm" type="date" placeholder="..." />
    </Form.Group>
  <Form.Group as={Col}md="2" controlId="formGridEmail">
      <Form.Label><span style={{color:"red"}}>*</span> น้ำหนักโค</Form.Label>
      <Form.Control size="sm" type="text" placeholder="..." />
    </Form.Group>
    <Form.Group as={Col} md="2"controlId="formGridEmail">
      <Form.Label><span style={{color:"red"}}>*</span> สถานะ</Form.Label>
      <Form.Control size="sm" as="select" defaultValue="Choose...">
      <option>เลือก</option>
        <option>อาหารข้น</option>
        <option>อาหารหยาบ</option>
      </Form.Control>
    </Form.Group>
    <Form.Group as={Col} md="5" controlId="formGridEmail">
      <Form.Label><span style={{color:"red"}}>*</span> รายละเอียด</Form.Label>
      <Form.Control size="sm" type="text" placeholder="..." />
    </Form.Group>


  
  </Form.Row>
  <Form.Row>
  <Form.Group as={Col} controlId="formGridState">
      <Form.Label><span style={{color:"red"}}>*</span> ผู้รักษา</Form.Label>
      <Form.Control size="sm" as="select" defaultValue="Choose...">
      <option>เลือก</option>
        <option>นายแพทย์ 1</option>
        <option>นายแพทย์ 2</option>
      </Form.Control>    </Form.Group>
   
    <Form.Group as={Col} controlId="formGridState">
    <Form.Label><span style={{color:"red"}}>*</span> โรคที่พบ</Form.Label>
    {/* <DropdownMultiselect
        size="sm"
        style={{color:"red",background:"white"}}
        options={["โรค 0", "โรค 1", "โรค 2", "โรค 3", "โรค 4"]}
        name="เลือก"
        placeholder="เลือกรายการโรค"
      /> */}
    
    </Form.Group>
    <Form.Group as={Col} controlId="formGridEmail">
      <Form.Label><span style={{color:"red"}}>*</span> อาการโคเบื้องต้น</Form.Label>
      <Form.Control size="sm" type="text" placeholder="..." />
    </Form.Group>
    
  </Form.Row> 
  <Form.Row>
    <Form.Group as={Col} controlId="formGridState">
    <Form.Label><span style={{color:"red"}}>*</span> ยาที่ใช้รักษา</Form.Label>
    {/* <DropdownMultiselect
        style={{color:"red",background:"white"}}
        options={["ยา 0", "ยา 1", "ยา 2", "ยา 3", "ยา 4"]}
        name="เลือก"
        size="sm"
        placeholder="เลือกรายการยา"

      /> */}
    </Form.Group>
    <Form.Group as={Col} md="2"controlId="formGridEmail">
      <Form.Label><span style={{color:"red"}}>*</span> จำนวน</Form.Label>
      <Form.Control size="sm" type="text" placeholder="..." />
      
    </Form.Group>
    <Form.Group as={Col} md="2"controlId="formGridEmail">
      <Form.Label><span style={{color:"red"}}>*</span> ปริมาณ</Form.Label>
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

export default Historytreat;
