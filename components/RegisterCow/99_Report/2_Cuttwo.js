import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
import {magnifying_glass} from 'react-icons-kit/ikons/magnifying_glass'
import json_provinces from '../../../json/provinces.json'
import json_amphures from '../../../json/amphures.json'
import json_districts from '../../../json/districts.json'
import json_zipcodes from '../../../json/zipcodes.json'
import { Icon } from "react-icons-kit";
import { Table } from "react-bootstrap";

import { Form, Row, Col, Tab, Nav } from "react-bootstrap";
import { ic_notifications_active } from "react-icons-kit/md/ic_notifications_active";
import { ic_info_outline } from "react-icons-kit/md/ic_info_outline";
import { ic_create } from "react-icons-kit/md/ic_create";
import { Button } from "react-bootstrap";

// import DatePicker from "react-datepicker";
import dayjs from "dayjs";
import DatePicker, { registerLocale } from "react-datepicker";
import th from "date-fns/locale/th";
registerLocale("th", th);
import Datestyle from "../helps/datepicker.module.css";

import { list } from "react-icons-kit/fa/list";
import { DivBase } from "../../../utils/divBase";
import { DivFrom, DivFromTop, DivFromDown, Searchinput } from "./ListcuttwoFrom";
import Sidemenu from "./menu";
import Pdf from "./report_paper/2_cuttwo";
import Excel from "./report_excel/2_cuttwo";
// import Footer from "../../Footer/index";

import {
  Savebuttoncolor,
  Editbuttoncolor,
  Removebuttoncolor,
} from "../../../utils/buttonColor";
import { Savebutton, Editbutton } from "../../../utils/button";
import { now } from "moment";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

export const QUERY = gql`
  query QUERY($startdate: String, $enddate: String ,
     $district:String ,
      $province:String
      $group:String) {
    ReportgetGroup(startdate: $startdate, enddate: $enddate,
     district:$district,
      province:$province ,group:$group ) {
      numcow
      numkun
      pun
      numfarmer
      namefarmer
      weight
      weightstart
      price
      date
      district
      province
      group
    }
  }
`;

const Index = () => {
  //calendar
  const [param, setParam] = useState({
    province_id: "",
    amphur_id: "",
    district_code: ""
  });
  const [success, setSuccess] = useState(false);
  var data_provinces = json_provinces.filter(i=> i.geo_id == '3');
  var data_amphures = json_amphures.filter(i=> i.geo_id == '3');
  var data_districts = json_districts.filter(i=> i.geo_id == '3')
  var data_zipcodes = json_zipcodes

  var show_provinces = data_provinces;
  var show_amphures = data_amphures.filter(i=> i.province_id == show_provinces[0].province_id);
  // console.log(show_amphures)
  var show_districts = data_districts.filter(i=>  i.amphur_id == show_amphures[0].amphur_id)
  var show_zipcodes = data_zipcodes

  const dateRef = useRef();
  const [date, setDate] = useState(new Date());
  const [selectedDate, handleDateChange] = useState(
    dayjs(date).format("YYYY-MM-DD")
  );

  const dateRef2 = useRef();
  const [date2, setDate2] = useState(new Date());
  const [prod, setProd] = useState({
    group: "",
    district: "",
    province: ""
  }
  )
  const [selectedDate2, handleDateChange2] = useState(
    dayjs(date2).format("YYYY-MM-DD")
  );
  
  useEffect(() => {
    if(param.province_id ==''){
      // setParam({...param,province_id:data_provinces[0].province_id})
      // show_amphures= show_amphures
      // setParam({ ...param, 
      //   province_id:  show_amphures[0].province_id,
      //   amphur_id: show_amphures[0].amphur_id,
      //   district_code: ""})
    }else {
      // console.log(data_amphures)
      show_amphures = data_amphures.filter( i => i.province_id == param.province_id)
      // console.log(show_amphures)
      setParam({ ...param, 
        amphur_id: show_amphures[0].amphur_id,
        district_code: ""})

        let str_amphur = ''
        // document.getElementById('amphur').innerHTML = ''
        show_amphures.forEach(i => {
          // let option = document.createElement('option')
          // option.setAttribute("data-amphur-id",i.amphur_id)
          // option.setAttribute("key",i.amphur_id)
          // option.setAttribute("value",i.amphur_name)
          // option.innerHTML = i.amphur_name
          str_amphur +=`
          <option data-province-id=${i.province_id} data-amphur-id=${i.amphur_id} key=${i.amphur_id} value=${i.amphur_name}>
            ${i.amphur_name}
          </option>
          `
          // document.getElementById('amphur').appendChild(option)
        });

        document.getElementById('amphur').innerHTML=str_amphur
    }
    console.log(param)
    // show_zipcodes = data_zipcodes.find(i => i.district_code == param.district_code)
  
  }, [param.province_id])
  useEffect(() => {
    if(param.amphur_id ==''){
      // console.log(1)
      // show_districts= show_districts
      // setParam({ ...param, 
      //   district_code: show_districts[0].district_code})
    }else {
      show_districts = data_districts.filter( i => i.province_id == param.province_id && i.amphur_id == param.amphur_id)
      setParam({ ...param, 
        district_code: show_districts[0].district_code})

        let str_districts = ''
        show_districts.forEach(i => {
          str_districts +=`
          <option data-district-code=${i.district_code} key=${i.district_id} value=${i.district_name}>
            ${i.district_name}
          </option>
          `
        });
    
        document.getElementById('district').innerHTML=str_districts
    }
 
    // console.log(param)

  }, [param.amphur_id])
      
  useEffect( () => {
    // console.log(param.d/istrict_code)
    // console.log(param)/
// 
    show_zipcodes = data_zipcodes.find(i => i.district_code == param.district_code)

    // console.log(show_zipcodes)

    if(show_zipcodes){
      setProd({ ...prod, zipcode: show_zipcodes.zipcode_name })

    }
    


  }, [param.district_code])
  // console.log("start : " + selectedDate + " , end : " + selectedDate2);
  const months = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];

  const dateValueRef = useRef(date);
  dateValueRef.current = date;

  const dateValueRef2 = useRef(date2);
  dateValueRef2.current = date2;

  const changeDateToBuddhist = (changeDate = new Date()) => {
    const prevDate = new Date(changeDate);
    // console.log("current date", prevDate === date);
    const newDate = new Date(
      prevDate.setFullYear(prevDate.getFullYear() + 543)
    );
    // console.log("year", newDate.getFullYear());
    dateRef.current.input.value = `${newDate.getDate()} ${months[newDate.getMonth()]
      } ${newDate.getFullYear()}`;
    // console.log(dateRef.current.input.value);
  };

  const changeDateToBuddhist2 = (changeDate = new Date()) => {
    const prevDate = new Date(changeDate);
    // console.log("current date", prevDate === date);
    const newDate = new Date(
      prevDate.setFullYear(prevDate.getFullYear() + 543)
    );
    // console.log("year", newDate.getFullYear());
    dateRef2.current.input.value = `${newDate.getDate()} ${months[newDate.getMonth()]
      } ${newDate.getFullYear()}`;
    // console.log(dateRef2.current.input.value);
  };

  // component did mount
  useEffect(() => {
    // console.log("dateRef", dateRef);
    // change date value in input dom on mounted
    changeDateToBuddhist(date);
    const datePicker = dateRef.current;
    const renderDateInput = datePicker.renderDateInput;
    // console.log(renderDateInput);
    datePicker.renderDateInput = function () {
      const inputDom = renderDateInput();
      return React.cloneElement(inputDom, {
        value: changeDateToBuddhist(dateValueRef.current),
      });
    };
  }, []);

  // component did mount
  useEffect(() => {
    // console.log("dateRef", dateRef);
    // change date value in input dom on mounted
    changeDateToBuddhist2(date2);
    const datePicker2 = dateRef2.current;
    const renderDateInput = datePicker2.renderDateInput;
    // console.log(renderDateInput2);
    datePicker2.renderDateInput = function () {
      const inputDom = renderDateInput();
      return React.cloneElement(inputDom, {
        value: changeDateToBuddhist2(dateValueRef2.current),
      });
    };
  }, [date2]);
  // const handleChange = e => setProd({ ...prod, [e.target.name]: e.target.value });
  const handleChange = (name, value) => {

    setProd({ ...prod, [name]: value })
  };
  const onChangeDatePicker = (e) => {
    // console.log("onChange");
    setDate(e);
    handleDateChange(dayjs(e).format("YYYY-MM-DD"));
  };

  const onChangeDatePicker2 = (e) => {
    // console.log("onChange");
    setDate2(e);
    handleDateChange2(dayjs(e).format("YYYY-MM-DD"));
  };
  //calendar

  const { data, loading, error, refetch } = useQuery(QUERY, {
    variables: {
      startdate: selectedDate,
      enddate: selectedDate2,
      group: prod.group,
      district: prod.district,
      province: prod.province

    },

  });
  console.log(selectedDate, selectedDate2)
  // console.log(data);
  return (
    <>
      <DivBase
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 237.5px 900px 1fr",
          gridRowGap: "15px",
          gridColumnGap: "10px",
          textAlign: "start",
          // width:"950px",
          // margin:"auto"
        }}
      >
        <>
          <Sidemenu Sidenumber={2} />

          <DivFrom
            style={{
              width: "100%",
              gridRowStart: "2",
              gridRowEnd: "3",
              gridColumnStart: "3",
              marginTop: "0px",
              
            }}
          >
            <DivFromTop>
              <div style={{ margin: "-3px 5px 0px 0px" 
            }}>
                <Icon size={20} icon={magnifying_glass} />
              </div>
              รายงาน
            </DivFromTop>
            <DivFromDown>
              <div
                style={{
                  marginBottom: "10px",
                  minWidth: "100%",
                  textAlign: "center",
                  fontSize: "24px",
                  
                }}
              >
                รายงานสรุปการรับโคเข้าขุน ตามพื้นที่
              </div>
              <div
                style={{
                  margin: "auto",
                  minWidth: "100%",
                  display: "grid",
                  padding:"10px",

                  gridTemplateColumns: "0.5fr 0.5fr ",
                }}
              >
                <div
                  style={{
                    textAlign: "right",
                    marginRight: "15px",
                  }}
                >
                  ตั้งแต่วันที่ : { }
                  <DatePicker
                    className={Datestyle.datepicker}
                    selected={date}
                    onChange={onChangeDatePicker}
                    dateFormat="dd/mm/yyyy"
                    ref={dateRef}
                    locale="th"
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                  />{" "}
                </div>
                <div>
                  {"  "}ถึงวันที่ : { }
                  <DatePicker
                    className={Datestyle.datepicker}
                    selected={date2}
                    onChange={onChangeDatePicker2}
                    dateFormat="dd/mm/yyyy"
                    ref={dateRef2}
                    locale="th"
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                  />{" "}
                </div>

              </div>


    
              <div
                style={{
                  margin: "auto 0",
                  transform:"translate(160px,0px)",
                  display: "grid",
                  padding:"10px",
                  gridTemplateColumns: "0.1fr 0.2fr 0.2fr 0.2fr",
                }}
              >
                {/* <div
                  style={{
                    textAlign: "right",
         
                  }}
                > */}
                  <div >
                  {"  "}กลุ่มที่ : { }
                  <div>
                    <select
                      type="text"
                      name="group"
                      onChange={handleChange}
                      style={{
                        display: "inline",
                        width: "80px",
                        padding: "0.375rem 0.1rem",
                        fontSize: "1rem",
                        fontWeight: "400",
                        lineheight: "1.2",
                        color: "#495057",
                        backgroundcolor: "#fff",
                        backgroundclip: "padding-box",
                        border: " 1px solid #ced4da",
                        borderradius: "0.25rem",
                        // transition: "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
                      }}
                    >
                      <option value="">เลือกกลุ่ม</option>
                      <option value="01">01</option>
                      <option value="02">02</option>
                      <option value="03">03</option>
                      <option value="04">04</option>
                      <option value="05">05</option>
                      <option value="06">06</option>
                      <option value="07">07</option>
                      <option value="08">08</option>
                      <option value="09">09</option>
                      <option value="10">10</option>
                    </select>
                  </div>
                  </div>

                <div>
                  {"  "}จังหวัด : { }
                  <div >
                  <select
                    type="text"
                    name="province"
                    onChange={(event) => {
            
                      setParam({ ...param, 
                        province_id: event.target[event.target.selectedIndex].getAttribute('data-province-id'),
                        amphur_id: "",
                        district_code: ""})
                      console.log(param)
                      // onSubmit={handleSubmit}
                      handleChange(event.target.name, event.target.value);


                    }}
                    autoComplete="off"

                    style={{
                      display: "inline",
                      width: "150px",
                      padding: "0.375rem 0.1rem",
                      fontSize: "1rem",
                      fontWeight: "400",
                      lineheight: "1.2",
                      color: "#495057",
                      backgroundcolor: "#fff",
                      backgroundclip: "padding-box",
                      border: " 1px solid #ced4da",
                      borderradius: "0.25rem",
                      // transition: "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
                    }}                  >
                    <option value=""  disabled selected hidden>เลือก</option>
                    {show_provinces &&
                      show_provinces.map((prod) => (
                        <option data-province-id={prod.province_id} key={prod.province_id} value={prod.province_name}>
                          {prod.province_name}
                        </option>
                      ))}
                  </select>
                  </div>
                </div>
                <div>
                  {"  "}อำเภอ : { }
                  <div >
                  <select
                  id="amphur"
                    type="text"
                    name="amphur"
                    placeholder="รหัสสมาชิก"

                    onChange={(event) => {
                      setParam({ ...param, 
                        province_id: event.target[event.target.selectedIndex].getAttribute('data-province-id'),
                        amphur_id: event.target[event.target.selectedIndex].getAttribute('data-amphur-id')
                        })
                        // onSubmit={handleSubmit}
                        // onChange={handleChange}

                      // handleChange(event.target.name, event.target.value);
                    }}
                    style={{
                      display: "inline",
                      width: "110px",
                      padding: "0.375rem 0.1rem",
                      fontSize: "1rem",
                      fontWeight: "400",
                      lineheight: "1.2",
                      color: "#495057",
                      backgroundcolor: "#fff",
                      backgroundclip: "padding-box",
                      border: " 1px solid #ced4da",
                      borderradius: "0.25rem",
                      // transition: "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
                    }}       
                  >
                 
                  </select>
                  </div>
                </div>
                <div>
                  {"  "}ตำบล : { }
                  <div >
                  <select
                    type="text"
                    id="district"
                    placeholder="รหัสสมาชิก"

                    name="district"
                    onChange={(event) => {
                      console.log(event.target[event.target.selectedIndex].getAttribute('data-district-code'))
                      setParam({ ...param, district_code: event.target[event.target.selectedIndex].getAttribute('data-district-code')})
                      // onSubmit={handleSubmit}

                      handleChange(event.target.name, event.target.value);
                    }}
                    style={{
                      display: "inline",
                      width: "90px",
                      padding: "0.375rem 0.1rem",
                      fontSize: "1rem",
                      fontWeight: "400",
                      lineheight: "1.2",
                      color: "#495057",
                      backgroundcolor: "#fff",
                      backgroundclip: "padding-box",
                      border: " 1px solid #ced4da",
                      borderradius: "0.25rem",
                      // transition: "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
                    }}
                  >
                  </select>
                  </div>
                </div>
                {/* </div> */}

                 
                  {/* <input
          //  onSubmit={handleSubmit}

                    name="zipcode"
                    disabled
                    value={prod.zipcode}
                    style={{ margin: "5px", height: "30px" }}

                    maxLength="100"
                  
                  /> */}
              </div>
            </DivFromDown>
           
          </DivFrom>

          <DivFrom
            style={{
              width: "100%",
              gridRowStart: "3",
              gridRowEnd: "3",
              gridColumnStart: "3",
              marginTop: "0px",
            }}
          >
            <DivFromTop>
              <div style={{ margin: "-3px 5px 0px 0px" }}>
                <Icon size={20} icon={list} />
              </div>
              ผลการค้นหา
            </DivFromTop>
            <DivFromDown>
              <div
                style={{
                  margin: "auto",
                  minWidth: "100%",
                  float: "right",
                  marginBottom: "15px",
                }}
              >
                {data && data.ReportgetGroup.length > 0 ? (
                  <div>
                    <Pdf prod={data.ReportgetGroup} /> <Excel prod={data.ReportgetGroup} />{" "}
                  </div>
                ) : (
                    ""
                  )}

                <Table
                  striped
                  bordered
                  responsive
                  hover
                  style={{ margin: "auto" }}
                >
                  {/* <LoadingSmall/> */}
                  <thead>
                    <tr style={{ textAlign: "center" }}>
                    <th>วันที่รับเข้า</th>

                      <th>ใบแจ้งขุน</th>
                      <th>เบอร์โค</th>
                      <th>พันธุ์</th>
                      <th>ตำบล</th>
                      <th>กลุ่มที่</th>
                      <th>รหัสสมาชิก</th>
                      <th>ชื่อสมาชิก</th>
                    </tr>
                  </thead>

                  <tbody>
                    {data && data.ReportgetGroup.length > 0 ? (
                      data.ReportgetGroup.map((prod) => (
                        <tr key={prod.id} style={{ textAlign: "center" }}>
                              <td>
                            {dayjs(prod.date)
                              .add(543, "y")
                              .locale("th")
                              .format("DD-MMMM-YYYY")}
                            { }
                          </td>
                          <td>{prod.numkun}</td>
                          <td>{prod.numcow}</td>
                          <td>{prod.pun}</td>
                        
                          <td>{prod.district}</td>
                          <td>{prod.group}</td>
                          <td>{prod.numfarmer}</td>
                          <td>{prod.namefarmer}</td>
                      
                        </tr>
                      ))
                    ) : (
                        <tr style={{ textAlign: "center" }}>
                          <td colspan="8">ไม่พบข้อมูล</td>
                        </tr>
                      )}
                  </tbody>
                </Table>
              </div>
            </DivFromDown>
          </DivFrom>
        </>

        {/* <Footer/> */}
      </DivBase>
    </>
  );
};

export default Index;
