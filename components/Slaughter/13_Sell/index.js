import React, { useState } from "react";
import styled from "styled-components";

import { Icon } from "react-icons-kit";
import { Table } from "react-bootstrap";
// import DatePicker from "react-datepicker";

import Pickadate from "pickadate/builds/react-dom";
import TH from "pickadate/builds/translations/th_TH";

import { list } from "react-icons-kit/fa/list";
import { DivBase } from "../../../utils/divBase";
import {
  DivFrom,
  DivFromTop,
  DivFromDown,
  Searchinput,
  Gobutton,
  Wightinput,
} from "./ListcuttwoFrom";
// import Footer from "../../Footer/index";

import { Savebutton, Editbutton } from "../../../utils/button";
import { now } from "moment";

const Index = () => {
  const [edit, setEdit] = useState(false);
  const [datatest, setDatatest] = useState(false);

  // calendar
  const [selectedDate, handleDateChange] = useState(new Date());
  // console.log(selectedDate)

  return (
    <>
      <DivBase>
        <DivFrom>
          <DivFromTop>
            <div style={{ margin: "-3px 5px 0px 0px" }}>
              <Icon size={20} icon={list} />
            </div>
            รายการจัดการราคาชื้อ
          </DivFromTop>
          <DivFromDown
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gridRowGap: "5px",
            }}
          >
            {/* ใส่ card */}
            {/* <div className="mb-3" style={{ margin: "auto" }}>
              ค้นหาตามใบแจ้งขุน : {}
              <Searchinput />
            </div> */}
            <div className="mb-3" style={{ margin: "auto" }}>
              ค้นหาตามใบแจ้งขุน : {}
              <Searchinput />
              {/* <Searchbutton>ค้นหา</Searchbutton> */}
            </div>
            <div className="mb-3" style={{ margin: "auto" }}>
              วันที่ : {}
              <Pickadate.InputPicker
                onChangeValue={({ value, date }) => {
                  handleDateChange(date);
                  // console.log(value, date);
                }}
                initialTranslation={TH}
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
                  marginRight: 10,
                }}
              />
              ชื่อเนื้อ : {}
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
                  marginRight: 10,
                }}
              >
                <option value="0">ทั้งหมด</option>
                <option value="0">ซากซ้าย</option>
                <option value="1">ซากขวา</option>
              </select>
              เกรด : {}
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
                  marginRight: 10,
                }}
              >
                <option value="0">ทั้งหมด</option>
                <option value="0">2.5</option>
                <option value="1">3</option>
                <option value="1">3.5</option>
                <option value="1">4</option>
                <option value="1">4.5</option>
                <option value="1">5</option>
              </select>
            </div>

            <div>
              <Table responsive hover style={{ margin: "auto" }}>
                <thead>
                  <tr style={{ textAlign: "center" }}>
                    <th>ลำดับ</th>
                    <th>ใบแจ้งขุน</th>
                    <th>รหัสชิ้นเนื้อ</th>
                    <th>ชื่อเนื้อ</th>
                    <th>เกรด</th>
                    <th>น้ำหนัก (กก.)</th>
                    <th>วันที่ตัดแต่ง</th>
                    <th>ราคา</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ textAlign: "center" }}>
                    <td>1</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                  </tr>
                  <tr style={{ textAlign: "center" }}>
                    <td>2</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                  </tr>
                  <tr style={{ textAlign: "center" }}>
                    <td>3</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                  </tr>
                  <tr style={{ textAlign: "center" }}>
                    <td>4</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                  </tr>
                  <tr style={{ textAlign: "center" }}>
                    <td>5</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                  </tr>
                  <tr style={{ textAlign: "center" }}>
                    <td>6</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                  </tr>
                  <tr style={{ textAlign: "center" }}>
                    <td>7</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                  </tr>
                  <tr style={{ textAlign: "center" }}>
                    <td>8</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                  </tr>
                  <tr style={{ textAlign: "center" }}>
                    <td>9</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                  </tr>
                  <tr style={{ textAlign: "center" }}>
                    <td>10</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <div className="mb-3" style={{ margin: "12px auto" }}>
              <Gobutton>ไปยังหน้าตัดแต่งซากโคผ่าซีก</Gobutton>
            </div>
          </DivFromDown>
        </DivFrom>
        {/* <Footer/> */}
      </DivBase>
    </>
  );
};

export default Index;
