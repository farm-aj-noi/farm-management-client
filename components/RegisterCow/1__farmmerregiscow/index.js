import React, { useContext, useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { AuthContext } from "../../../appState/AuthProvider";

import { Icon } from "react-icons-kit";
import { Table } from "react-bootstrap";
import Card from 'react-bootstrap/Card'
import logo from './defultcow.jpg'
import { list } from "react-icons-kit/fa/list";
import { DivBase } from "../../../utils/divBase";
import {
  DivFrom,
  DivFromTop,
  DivFromDown,
  Btns,
  IMG,
  Uploads,
  Searchinput,
  Searchbutton,
  Gobutton,
} from "./GetinFrom";
import { Spinner } from "react-bootstrap";
// import Footer from "../../Footer/index";
import dayjs from "dayjs";
import DatePicker, { registerLocale } from "react-datepicker";
import th from "date-fns/locale/th";
registerLocale("th", th);
import Datestyle from "../helps/datepicker.module.css";

import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { red } from "../../../utils/colors";



const CREATE = gql`
  mutation CREATE(
  
    $pun: String
    $numfarmer: String
    $passport: String
    $teeth: String
    $bodyscore: String
    $namefarmer: String
    $date: String
    $datebirhtday: String
    $namecow: String
    $sex: String
    $weightstart: Float
    $weightbirht: Float
    $imagecow: String

  ) {
    importcowfarm(
  
      pun: $pun
      numfarmer: $numfarmer
      passport: $passport
      teeth: $teeth
      bodyscore: $bodyscore
      namefarmer: $namefarmer
      date: $date
      datebirhtday: $datebirhtday
      namecow: $namecow
      sex: $sex
      weightstart: $weightstart
      weightbirht: $weightbirht
      imagecow: $imagecow
     
    ) {
    
      pun
      numfarmer
      namefarmer
      date
      datebirhtday
      namecow
      sex
      
      weightstart
      weightbirht
      imagecow
    }
  }
`;


const QUERY_TYPE = gql`
  query QUERY_TYPE {
    puntypeQuery {
      id
      name
      numpun
    }
  }
`;
const Index = () => {

  console.log(dayjs('2021-02-04'))
  // upload phot
  const [file, setFile] = useState(null);
  const [image, setImage] = useState({ preview: "", raw: "" });

  const uploadFile = async () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "next-test");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/djnasfo5s/image/upload",
      {
        method: "post",
        body: data
      }

    );        


    const result = await res.json();
    //   console.log(result)

    return result.secure_url;
  };

  const selectFile = e => {

    
    const files = e.target.files;
    //   console.log(files)

    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0]
      });
    }
    setFile(files[0]);
  };
  console.log(file)
  //calendar
  const dateRef = useRef();
  const [date, setDate] = useState(new Date());
  const [selectedDate, handleDateChange] = useState(
    dayjs(date).format("YYYY-MM-DD")
  );

  const dateRef2 = useRef();
  const [date2, setDate2] = useState(new Date());
  const [selectedDate2, handleDateChange2] = useState(
    dayjs(date2).format("YYYY-MM-DD")
  );
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

    // dateRef.current.input.value = `${newDate.getDate()} ${
    //   months[newDate.getMonth()]
    // } ${newDate.getFullYear()}`;
    // console.log(dateRef.current.input.value);
  };

  const changeDateToBuddhist2 = (changeDate = new Date()) => {
    const prevDate = new Date(changeDate);
    // console.log("current date", prevDate === date);
    const newDate = new Date(
      prevDate.setFullYear(prevDate.getFullYear() + 543)
    );
    // console.log("year", newDate.getFullYear());
    // dateRef2.current.input.value = `${newDate.getDate()} ${
    //   months[newDate.getMonth()]
    // } ${newDate.getFullYear()}`;
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

  const CustomInput = ({ onClick }) => (
    <Searchbutton style={{ width: "210px" }} onClick={onClick}>
      {dayjs(selectedDate).add(543, "y").locale("th").format("DD MMMM YYYY")}
    </Searchbutton>
  );
  const CustomInput2 = ({ onClick }) => (
    <Searchbutton
      style={{ width: "210px", backgroundColor: "#ececec" }}
      disabled
      onClick={onClick}
    >
      {dayjs(selectedDate2).add(543, "y").locale("th").format("DD MMMM YYYY")}
    </Searchbutton>
  );
  //calendar
  const [inputnumkun, setInputnumkun] = useState("");
  const [selectedStatus, SetStatusChange] = useState("");
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [success, setSuccess] = useState(false);
  const { user } = useContext(AuthContext);

  const [prod, setProd] = useState({
   
    pun: "",
    numfarmer: "0",
    passport: user.passsport,
    teeth: "",
    bodyscore: "",
    namefarmer: "0",
    namecow: "",
    sex: "",
    weightstart: "",
    weightbirht: "",
    imagecow: "",
 

  });

  const [alert, setAlert] = useState({
 
    pun: false,
    numfarmer: false,
    passport: false,
    teeth: false,
    bodyscore: false,
    namefarmer: false,
    namecow: false,
    sex: false,
    weightstart: false,
    weightbirht: false,
    statuscow: false,
    imagecow: false
  });

  const [walert, setwAlert] = useState({
    weightstart: false,
    weightbirht: false,
  });

  const [passportCheck, setPassportCheck] = useState(false);

  useEffect(() => {
    // console.log("111-111");
    let total = 0;
    let iPID;
    let p_iPID = prod.passport;
    let chk;
    let Validchk;
    iPID = p_iPID.replace(/-/g, "");
    Validchk = iPID.substr(12, 1);
    let j = 0;
    let pidcut;
    for (let n = 0; n < 12; n++) {
      pidcut = parseInt(iPID.substr(j, 1));
      total = total + pidcut * (13 - n);
      j++;
    }

    chk = 11 - (total % 11);

    if (chk == 10) {
      chk = 0;
    } else if (chk == 11) {
      chk = 1;
    }
    if (chk == Validchk) {
      // alert("ระบุหมายเลขประจำตัวประชาชนถูกต้อง");
      setPassportCheck(false);
      // console.log("f");
    } else {
      // alert("ระบุหมายเลขประจำตัวประชาชนไม่ถูกต้อง");
      setPassportCheck(true);
      // console.log("t");
    }
  }, [prod.passport]);

  // console.log(prod);

  const { data: datatype } = useQuery(QUERY_TYPE, {});

  // useEffect(() => {
  //   datatype &&
  //   datatype.allDisease.filter((value) => {
  //       if (value.name === prod.dise) {
  //         setProd({ ...prod, symptom: value.detail });
  //       }
  //     });

  //   if (prod.dise === "ใช้วัคซีน") setProd({ ...prod, symptom: "ใช้วัคซีน" });
  // }, [prod.dise]);
  const handleChange = (name, value) => setProd({ ...prod, [name]: value });
  const handleAlert = (name, value) => setAlert({ ...alert, [name]: value });
  const handlewAlert = (name, value) => setwAlert({ ...walert, [name]: value });

  const [importcowfarm, error] = useMutation(CREATE, {
    onCompleted: (data) => {
      setSuccess(true),
      // setProd({
      //   numcow: "",
      //   numkun: "",
      //   pun: "",
      //   numfarmer: "",
      //   passport: "",
      //   teeth: "",
      //   rfid: "",
      //   bodyscore: "เลือก",
      //   namefarmer: "",
      //   namecow: "",
      //   sex: "เลือกเพศ",
      //   weightstart: "",
      //   weightbirht: "",
      //   statuscow: "ลงทะเบียนแล้ว"
      // })
        setTimeout(function () {
          setSuccess(false);
        }, 3000);
        window.location.reload(false);

    },
  });
  // console.log(data);

  const handleSubmit = async () => {
    setLoadingCreate(true);
  
    try {
      const url = await uploadFile();
      if (url) {
      await importcowfarm({
        variables: {
          ...prod,
          date: selectedDate2,
          datebirhtday: selectedDate,
          weightstart: +prod.weightstart,
          weightbirht: +prod.weightbirht,
          imagecow: url,   

        },
      });
    }
      setLoadingCreate(false);
    } catch (error) {
      setErrorAlert(true);
      setLoadingCreate(false);
      // console.log(error);
    }
  };
  // useEffect(() => {
  //   setErrorAlert(false);
  // }, [prod.numkun]);
console.log(prod.imagecow)
  return (
    <>
      <DivBase style={{margin:"auto",
                display: "grid",
                gridTemplateColumns: " 0.4fr 1fr " ,
                gridRowGap: "5px",
                width:" max-content",
                left: "50%",
                transform: "translateX(-50%)"
              }}>
        <></>
        <DivFrom style={{ width: "270px" ,height:"350px",margin:"20px",marginTop:"0" , marginRight:"2px"}}>
          
          <DivFromTop>
          <div style={{ margin: "-3px 5px 0px 0px" , fontSize:"20px" }}>

{/* <Icon size={25} icon={list} /> */}
</div>
<div style={{ margin: "-1px 5px 0px 0px" , fontSize:"20px" }}>
  รูปถ่ายโค

</div>
          </DivFromTop>
          <DivFromDown
            style={{
              display: "grid",
              gridTemplateColumns: "0.3fr",
              // gridRowGap: "5px",
              // paddingBottom: "20px",
            }}
          >
       
            <div
              className="mb-3"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr ",
              }}
            >
           
             
             
             
              
              {/* <Btns  name="CKICK"  for="filess">
              CKICK
        <input
          style={{height: '0px',width:' 0px', overflow:'hidden'}}
          type="file"
          name="file"
          id="filess"
          //   value={productData.imageUrl}
          onChange={selectFile}
        />
        
        </Btns> */}
              {/* /////////////////////////////////////////////////////////////////////////////////////// */}
              <div >
         
                <div >
                  <div >
                    <br />
                    <div >
                      <Uploads >
                        <a >
                          <div >
                            <img style={{objectFit:'cover',width: '90%', position:'inherit',}} alt="Image" src={image.preview||logo} />
                          </div>
                        </a>
                        <br />
                      </Uploads>
                    </div>
                  </div>
                </div>

                  <p></p>
                  <div >
                    <input 
          type="file"
          name="file"
          id="file"
           
          onChange={selectFile} />
                  </div>
                  <div ></div>
                 
          
              </div>
           {/* ---------------------------------------------------------------------------------------------*/}
            </div>
            <div
              className="mb-3"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 0.75fr 1fr 0.75fr",
                gridRowGap: "5px",
                marginTop: "5px",
              }}
            ></div>

          
          </DivFromDown>
        </DivFrom>
        <DivFrom style={{ width: "750px" ,float:"Rigth"}}>
          
          <DivFromTop>
          <div style={{ margin: "-3px 5px 0px 0px" , fontSize:"20px" }}>

{/* <Icon size={25} icon={list} /> */}
</div>
<div style={{ margin: "-1px 5px 0px 0px" , fontSize:"20px" }}>
  บันทึกข้อมูลขอขึ้นทะเบียนโคขุน

</div>
          </DivFromTop>
          <DivFromDown
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              margin: "-3px 5px 0px 0px",
            
            }}
          >
       
            <div
              className="mb-3"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gridRowGap: "5px",
              }}
            >
           
              <div>
               <span style={{color:"red"}}>*</span> ชื่อโค : {}
                <div style={{ display: "grid", gridTemplateRows: "1fr 15px" }}>
                  <Searchinput
                    name="namecow"
                    value={prod.namecow}
                    onChange={(event) => {
                      let input = event.target.value;
                      let value = input.replace(/[^ก-๙A-Za-z ]/gi, "");

                      if (input !== value) {
                        handleAlert(event.target.name, true);
                      } else {
                        handleAlert(event.target.name, false);
                        handleChange(event.target.name, value);
                      }
                    }}
                    maxLength="100"
                    style={{
                      width: "210px",
                    }}
                  />
                  {/* {!prod.namecow && !alert.namecow ? (
                    <label style={{ color: "red" }}>กรุณากรอกชื่อโค</label>
                  ) : (
                    alert.namecow && (
                      <label style={{ color: "red" }}>
                        กรุณากรอก ก-ฮ, สระ, A-Z และ a-z
                      </label>
                    )
                  )} */}
                </div>
              </div>
              <div>
              <span style={{color:"red"}}>*</span>สายพันธุ์ : {}

                <div style={{ display: "grid", gridTemplateRows: "1fr 15px" }}>
                  <select
                    type="text"
                    name="pun"
                    onChange={(event) => {
                      handleChange(event.target.name, event.target.value);
                    }}
                    style={{
                      display: "inline",
                      width: "210px",
                      padding: "0.375rem 0.75rem",
                      fontSize: "1rem",
                      fontWeight: "400",
                      lineHeight: "1.5",
                      height:"38px",
                      color: "#495057",
                      backgroundColor: "#fff",
                      backgroundClip: "padding-box",
                      border: "1px solid #ced4da",
                      /* border-radius: 0.25rem 0rem 0rem 0.25rem; */
                      // borderColor: `${!prod.pun ? "red" : ""}`,
                      borderRadius: "0.25rem",
                      transition:
                        "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
                    }}
                  >
                       <option value="">เลือก</option>
                  {datatype &&
                    datatype.puntypeQuery.map((prod) => (
                      <option key={prod.id} value={prod.name}>
                        {prod.name}--{prod.numpun}
                      </option>
                    ))}
                  </select>
                  {/* {!prod.pun && (
                    <label style={{ color: "red" }}>กรุณาเลือกสายพันธุ์</label>
                  )} */}
                </div>


           
              </div>
             
              <div>
              <span style={{color:"red"}}>*</span> เพศโค : {}
                <div style={{ display: "grid", gridTemplateRows: "1fr 15px" }}>
                  <select
                    type="text"
                    name="sex"
                    onChange={(event) => {
                      handleChange(event.target.name, event.target.value);
                    }}
                    style={{
                      display: "inline",
                      width: "210px",
                      padding: "0.375rem 0.75rem",
                      fontSize: "1rem",
                      fontWeight: "400",
                      lineHeight: "1.5",
                      color: "#495057",
                      backgroundColor: "#fff",
                      backgroundClip: "padding-box",
                      border: "1px solid #ced4da",
                      /* border-radius: 0.25rem 0rem 0rem 0.25rem; */
                      // borderColor: `${!prod.sex ? "red" : ""}`,
                      borderRadius: "0.25rem",
                      transition:
                        "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
                    }}
                  >
                    <option value="">เลือกเพศ</option>
                    <option value="ผู้">ผู้</option>
                    <option value="เมีย">เมีย</option>
                  </select>
                  {/* {!prod.sex && (
                    <label style={{ color: "red" }}>กรุณาเลือกเพศโค</label>
                  )} */}
                </div>
              </div>
             
             
              <div>
                วัน/เดือน/ปี บันทึก : {}
                <DatePicker
                  style={{ width: "210px" }}
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
                  readOnly
                  disabled
                  customInput={<CustomInput2 />}
                />{" "}
              </div>
              <div>
              <span style={{color:"red"}}>*</span> จำนวนฟันหน้าคู่แท้ : {}
                <div style={{ display: "grid", gridTemplateRows: "1fr 15px" }}>
                  <Searchinput
                    name="teeth"
                    value={prod.teeth}
                    onChange={(event) => {
                      let input = event.target.value;
                      let value = input.replace(/[^0-9]/gi, "");

                      if (input !== value) {
                        handleAlert(event.target.name, true);
                      } else {
                        handleAlert(event.target.name, false);
                        handleChange(event.target.name, value);
                      }
                    }}
                    maxLength="2"
                    style={{
                      width: "210px",
                      // borderColor: `${!prod.teeth ? "red" : ""}`,
                    }}
                  />
                  {/* {!prod.teeth && !alert.teeth ? (
                    <label style={{ color: "red" }}>
                      กรุณากรอกจำนวนฟันหน้าคู่แท้
                    </label>
                  ) : (
                    alert.teeth && (
                      <label style={{ color: "red" }}>
                        กรุณากรอกตัวเลข เท่านั้น
                      </label>
                    )
                  )} */}
                </div>
              </div>
              <div>
              <span style={{color:"red"}}>*</span>  น้ำหนักปัจจุบัน : {}
                <div style={{ display: "grid", gridTemplateRows: "1fr 15px" }}>
                  <Searchinput
                    name="weightstart"
                    value={prod.weightstart}
                    onChange={(event) => {
                      let input = event.target.value;
                      let value = input.replace(/[^0-9.]/gi, "");

                      if (input !== value) {
                        handleAlert(event.target.name, true);
                      } else if (+value > 1000) {
                        handlewAlert(event.target.name, true);
                        handleChange(event.target.name, "1000");
                      } else {
                        handlewAlert(event.target.name, false);
                        handleAlert(event.target.name, false);
                        handleChange(event.target.name, value);
                      }
                    }}
                    maxLength="20"
                    style={{
                      width: "210px",
                      // borderColor: `${!prod.weightstart ? "red" : ""}`,
                    }}
                  />
                  {/* {!prod.weightstart && !alert.weightstart ? (
                    <label style={{ color: "red" }}>กรุณากรอกน้ำหนัก</label>
                  ) : alert.weightstart ? (
                    <label style={{ color: "red" }}>
                      กรุณากรอกตัวเลข เท่านั้น
                    </label>
                  ) : (
                    walert.weightstart && (
                      <label style={{ color: "red" }}>
                        กรุณากรอกน้ำหนักไม่เกิน1000 กก.
                      </label>
                    )
                  )} */}
                </div>
              </div>
              
              <div>
                วัน/เดือน/ปี เกิดโค : {}
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
                  customInput={<CustomInput />}
                  maxDate={new Date()}
                />{" "}
              </div>
              <div>
                น้ำหนักแรกเกิด : {}
                <div style={{ display: "grid", gridTemplateRows: "1fr 15px" }}>
                  <Searchinput
                    name="weightbirht"
                    value={prod.weightbirht}
                    onChange={(event) => {
                      let input = event.target.value;
                      let value = input.replace(/[^0-9.]/gi, "");

                      if (input !== value) {
                        handleAlert(event.target.name, true);
                      } else if (+value > 60) {
                        handlewAlert(event.target.name, true);
                        handleChange(event.target.name, "60");
                      } else {
                        handlewAlert(event.target.name, false);
                        handleAlert(event.target.name, false);
                        handleChange(event.target.name, value);
                      }
                    }}
                    maxLength="20"
                    style={{
                      width: "210px",
                      // borderColor: `${!prod.weightbirht ? "red" : ""}`,
                    }}
                  />
                  {/* {!prod.weightbirht && !alert.weightbirht ? (
                    <label style={{ color: "red" }}>กรุณากรอกน้ำหนัก</label>
                  ) : alert.weightbirht ? (
                    <label style={{ color: "red" }}>
                      กรุณากรอกตัวเลข เท่านั้น
                    </label>
                  ) : (
                    walert.weightbirht && (
                      <label style={{ color: "red" }}>
                        กรุณากรอกน้ำหนักไม่เกิน60 กก.
                      </label>
                    )
                  )} */}
                </div>
              </div>
              <div>
              <span style={{color:"red"}}>*</span>   Body Score : {}
                <div style={{ display: "grid", gridTemplateRows: "1fr 15px" }}>
                  <select
                    type="text"
                    name="bodyscore"
                    onChange={(event) => {
                      handleChange(event.target.name, event.target.value);
                    }}
                    style={{
                      display: "inline",
                      width: "210px",
                      padding: "0.375rem 0.75rem",
                      fontSize: "1rem",
                      fontWeight: "400",
                      lineHeight: "1.5",
                      color: "#495057",
                      backgroundColor: "#fff",
                      backgroundClip: "padding-box",
                      border: "1px solid #ced4da",
                      /* border-radius: 0.25rem 0rem 0rem 0.25rem; */
                      // borderColor: `${!prod.bodyscore ? "red" : ""}`,
                      borderRadius: "0.25rem",
                      transition:
                        "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
                    }}
                  >
                    <option value="">เลือก</option>
                    <option value="1">1</option>
                    <option value="1.5">1.5</option>
                    <option value="2">2</option>
                    <option value="2.5">2.5</option>
                    <option value="3">3</option>
                    <option value="3.5">3.5</option>
                    <option value="4">4</option>
                    <option value="4.5">4.5</option>
                    <option value="5">5</option>
                    <option value="5.5">5.5</option>
                  </select>{" "}
                  {/* {!prod.bodyscore && (
                    <label style={{ color: "red" }}>
                      กรุณาเลือก body score
                    </label>
                  )} */}
                </div>
              </div>
              {/* <Btns  name="CKICK"  for="filess">
              CKICK
        <input
          style={{height: '0px',width:' 0px', overflow:'hidden'}}
          type="file"
          name="file"
          id="filess"
          //   value={productData.imageUrl}
          onChange={selectFile}
        />
        
        </Btns> */}
              {/* /////////////////////////////////////////////////////////////////////////////////////// */}
              {/* <div >
              <div>
           รูปภ่ายโค :
          </div>
                <div >
                  <div >
                    <br />
                    <div >
                      <Uploads >
                        <a >
                          <div >
                            <img style={{objectFit:'cover',width: '90%', position:'inherit',}} alt="Image" src={image.preview||logo} />
                          </div>
                        </a>
                        <br />
                      </Uploads>
                    </div>
                  </div>
                </div>

                  <p></p>
                  <div >
                    <input 
          type="file"
          name="file"
          id="file"
           
          onChange={selectFile} />
                  </div>
                  <div ></div>
                 
          
              </div> */}
           {/* ---------------------------------------------------------------------------------------------*/}
            </div>
            <div
              // className="mb-3"
              // style={{
              //   display: "grid",
              //   gridTemplateColumns: "1fr 0.75fr 1fr 0.75fr",
              //   gridRowGap: "5px",
              //   marginTop: "5px",
              // }}
            ></div>

            {loadingCreate ? (
              <Spinner
                style={{ margin: "0px 12px 0px auto", float: "right" }}
                 variant="primary"
              />
            ) : (
              <Gobutton
             
                style={{
                 
                  margin: "0px 12px 0px auto",
                  float: "right",
                }}
                onClick={handleSubmit}
              >
                บันทึก
              </Gobutton>
            )}
            {success && (
              <p
                style={{
                  color: "green",
                  position: "absolute",
                  display: "flex",
                  margin: "410px 0px 0px 78%",
                }}
              >
                บันทึกสำเร็จ
              </p>
            )}
          </DivFromDown>
        </DivFrom>
        {/* <Footer/> */}
      </DivBase>
    </>
  );
};

export default Index;
