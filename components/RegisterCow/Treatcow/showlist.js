import React, { useState } from "react";
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'

import DatePicker, { registerLocale } from "react-datepicker";
import th from "date-fns/locale/th";
registerLocale("th", th);
import {
  DivFrom,
  DivFromTop,
  DivFromDown,
  Searchinput,
  Wightinput,
} from "../search/GetinFrom";
import Datestyle from "../helps/datepicker.module.css";
const Listtreat = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div >
    <Card style={{padding:"10",width:"80%",margin:"auto",marginTop:"3%"}}>
    <Card.Header style={{background:"#3399CC",color:"#ffffff"}}>System : ระบบลงทะเบียนรับโคเข้าขุน และ โคเข้าเชือด</Card.Header>
    <div className="mb-3" style={{ margin: "auto" }}></div>
            <div className="mb-3" style={{ margin: "auto" }}>
              ค้นหาตามใบแจ้งขุน : {}
              <Searchinput
              />
              วันที่ : {}
              <DatePicker
                className={Datestyle.datepicker}
                selected={date}
                dateFormat="dd/mm/yyyy"
                locale="th"
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
              />{" "}
              กลุ่มที่ : {}
              <select
                
                style={{
                  display: "inline",
                  width: "130px",
                  padding: "0.375rem 0.75rem",
                  fontSize: "1rem",
                  fontWeight: "400",
                  lineHeight: "1.5",
                  color: "#495057",
                  backgroundColor: "#fff",
                  backgroundClip: "padding-box",
                  border: "1px solid #ced4da",
                  /* border-radius: 0.25rem 0rem 0rem 0.25rem; */
                  borderRadius: "0.25rem",
                  transition:
                    "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
                }}
              >
                <option value="">ทั้งหมด</option>
                <option value="5f0fdb4b02b40c2ab8506563">1</option>
                <option value="5f0fdb6502b40c2ab8506565">
                  2
                </option>
                <option value="5f0fdb4b02b40c2ab8506563">3</option>
                <option value="5f0fdb4b02b40c2ab8506563">4</option>
                <option value="5f0fdb4b02b40c2ab8506563">5</option>
                <option value="5f0fdb4b02b40c2ab8506563">6</option>

              </select>
              {/* <Searchbutton>ค้นหา</Searchbutton> */}
            </div>
    <Table striped bordered hover size="sm" style={{padding:"10",width:"80%",margin:"auto",marginTop:"2%"}}>
  <thead>
    <tr style={{textAlign:"center"}}>
      <th>เลขที่ใบขุน</th>
      <th>รหัสโค</th>
      <th>ชื่อโค</th>
      <th>สายพันธุ์</th>
      <th>ชื่อสมาชิก</th>
      <th>กลุ่ม</th>
      <th>สถานะ</th>
      <th>จัดการ</th>
    </tr>
  </thead>
  <tbody>
    <tr style={{textAlign:"center"}}>
      <td >C01001</td>
      <td>000001</td>
      <td>ขวานฟ้า</td>
      <td>001</td>
      <td>นาย จรุณ แสงดี</td>
      <td>กลุ่ม 1</td>
      <td>กำลังรักษา</td>


     <td>
      <a href="/registercow/historytreat"><button >รักษาสำเร็จ
    </button></a>
          <button>ตาย</button>
      </td>
    </tr>
    <tr style={{textAlign:"center"}}>
      <td>C01002</td>
      <td>000002</td>
      <td>นาเนีย</td>
      <td>001</td>
      <td>นาย จรุณ แสงดี</td>
      <td>กลุ่ม 1</td>
      <td>กำลังรักษา</td>

      <td>
         <button>รักษาสำเร็จ
          </button>
          
          <button>ตาย</button>

          </td>
    </tr>
    
  </tbody>
</Table>
<div style={{margin:"0" ,textAlign:"center" ,marginTop:"1%"}}>
      <Button variant="primary" type="submit">
    บันทึก
  </Button>
  &ensp;
  <Button variant="primary" type="submit">
    รายการโคขุน
  </Button>
</div>

  </Card>
  </div>
  );
};

export default Listtreat;
