import React, { useContext, useState, useRef, useEffect } from "react";
import styled from "styled-components";

import json_provinces from '../../../json/provinces.json'
import json_amphures from '../../../json/amphures.json'
import json_districts from '../../../json/districts.json'
import json_zipcodes from '../../../json/zipcodes.json'
import {picture} from 'react-icons-kit/ikons/picture'

import { Icon } from "react-icons-kit";
import { Table } from "react-bootstrap";
import Card from 'react-bootstrap/Card'
import logo from './defultcow.jpg'
import { list } from "react-icons-kit/fa/list";
import { DivBase } from "../../../utils/divBase";
import {notepad_add} from 'react-icons-kit/ikons/notepad_add'

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
    $numcow: String!
    $numkun: String!
    $pun: String!
    $numfarmer: String!
    $passport: String
    $teeth: String
    $rfid: String
    $bodyscore: String
    $namefarmer: String!
    $date: String!
    $datebirhtday: String!
    $namecow: String!
    $sex: String!
    $weightstart: Float!
    $weightbirht: Float!
    $imagecow: String
    $group: String!
    $district: String!
    $province: String!

  ) {
    createCow(
      numcow: $numcow
      numkun: $numkun
      pun: $pun
      numfarmer: $numfarmer
      passport: $passport
      teeth: $teeth
      rfid: $rfid
      bodyscore: $bodyscore
      namefarmer: $namefarmer
      date: $date
      datebirhtday: $datebirhtday
      namecow: $namecow
      sex: $sex
      weightstart: $weightstart
      weightbirht: $weightbirht
      statuscow: "กำลังขุน"
      imagecow: $imagecow
      group: $group
      district: $district
      province: $province
    ) {
      numcow
      numkun
      pun
      numfarmer
      namefarmer
      date
      datebirhtday
      namecow
      sex
      group
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

  const [param, setParam] = useState({
    province_id: "",
    amphur_id: "",
    district_code: ""
  });


  // var data_provinces = json_provinces;
  // var data_amphures = json_amphures;
  // var data_districts = json_districts
  // var data_zipcodes = json_zipcodes

  var data_provinces = json_provinces.filter(i=> i.geo_id == '3');
  var data_amphures = json_amphures.filter(i=> i.geo_id == '3');
  var data_districts = json_districts.filter(i=> i.geo_id == '3')
  var data_zipcodes = json_zipcodes

  


  var show_provinces = data_provinces;
  var show_amphures = data_amphures.filter(i=> i.province_id == show_provinces[0].province_id);
  // console.log(show_amphures)
  var show_districts = data_districts.filter(i=>  i.amphur_id == show_amphures[0].amphur_id)
  var show_zipcodes = data_zipcodes
  // console.log(show_provinces[0].province_id)

//   var show_provinces = data_provinces.filter(i=> i.geo_id == '3');
// var show_amphures = data_amphures.filter(i=> i.geo_id == '3');
//   var show_districts = data_districts.filter(i=> i.geo_id == '3')
//   var show_zipcodes = data_zipcodes
  

  useEffect(() => {
    // console.log(param)
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
   

    // console.log(show_amphures)
    

   

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


 
    

  const [file, setFile] = useState(null);
  const [image, setImage] = useState({ preview: "", raw: "" });

  var resizeImage = function (settings) {
    var file = settings.file;
    var maxSize = settings.maxSize;
    var reader = new FileReader();
    var image = new Image();
    var canvas = document.createElement('canvas');
    var dataURItoBlob = function (dataURI) {
        var bytes = dataURI.split(',')[0].indexOf('base64') >= 0 ?
            atob(dataURI.split(',')[1]) :
            unescape(dataURI.split(',')[1]);
        var mime = dataURI.split(',')[0].split(':')[1].split(';')[0];
        var max = bytes.length;
        var ia = new Uint8Array(max);
        for (var i = 0; i < max; i++)
            ia[i] = bytes.charCodeAt(i);
        return new Blob([ia], { type: mime });
    };
    var resize = function () {
        var width = image.width;
        var height = image.height;
        if (width > height) {
            if (width > maxSize) {
                height *= maxSize / width;
                width = maxSize;
            }
        } else {
            if (height > maxSize) {
                width *= maxSize / height;
                height = maxSize;
            }
        }
        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d').drawImage(image, 0, 0, width, height);
        var dataUrl = canvas.toDataURL('image/jpeg');
        return dataURItoBlob(dataUrl);
    };
    return new Promise(function (ok, no) {
        if (!file.type.match(/image.*/)) {
            no(new Error("Not an image"));
            return;
        }
        reader.onload = function (readerEvent) {
            image.onload = function () { return ok(resize()); };
            image.src = readerEvent.target.result;
        };
        reader.readAsDataURL(file);
    });
};

function blobToFile(theBlob, fileName){
  //A Blob() is almost a File() - it's just missing the two properties below which we will add
  theBlob.lastModifiedDate = new Date();
  theBlob.name = fileName;
  return theBlob;
}

  const uploadFile = async () => {
    const data = new FormData();
    var file_upload
    await resizeImage({
      file: file,
      maxSize: 500
    }).then(function (resizedImage) {
      console.log(resizedImage)
        console.log("upload resized image")
        file_upload  = new File([resizedImage], "name")
    }).catch(function (err) {
        console.error(err);
    });

    data.append("file", file_upload);
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
  // console.log(file)
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

  const [prod, setProd] = useState({
    numcow: "",
    numkun: "",
    pun: "",
    numfarmer: "",
    passport: "",
    teeth: "",
    rfid: "",
    bodyscore: "",
    namefarmer: "",
    namecow: "",
    sex: "",
    weightstart: "",
    weightbirht: "",
    statuscow: "กำลังขุน",
    imagecow: "",
    group: "",
    district: ""
    , province: "", amphur: "", zipcode: ""

  });

  const [alert, setAlert] = useState({
    numcow: false,
    numkun: false,
    pun: false,
    numfarmer: false,
    passport: false,
    teeth: false,
    rfid: false,
    bodyscore: false,
    namefarmer: false,
    namecow: false,
    sex: false,
    group: false,
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
  const handleChange = (name, value) => {

    setProd({ ...prod, [name]: value })
  };

  const handleAlert = (name, value) => setAlert({ ...alert, [name]: value });
  const handlewAlert = (name, value) => setwAlert({ ...walert, [name]: value });

  const [createCow, error] = useMutation(CREATE, {
    onCompleted: (data) => {
      console.log(11111111111111)
      setSuccess(true),
      //  setProd({
      //   numcow: "",
      //   numkun: "",
      //   pun: "",
      //   numfarmer: "",
      //   passport: "",
      //   teeth: "",
      //   rfid: "",
      //   bodyscore: "",
      //   namefarmer: "",
      //   namecow: "",
      //   sex: "",
      //   weightstart: "",
      //   weightbirht: "",
      //   statuscow: "กำลังขุน",
      //   imagecow: "",
      //   group: "",
      //   district: ""
      //   , province: "", amphur: "", zipcode: ""
      // });
    
      //   setTimeout(function () {
      //     setSuccess(false);
      //   }, 3000);
        window.location.reload();

    },
  });
  // console.log(data);

  const handleSubmit = async () => {
    setLoadingCreate(true);

    try {
      const url = await uploadFile();
      if (url) {
        console.log(123)
        await createCow({
          variables: {
            ...prod,
            date: selectedDate2,
            datebirhtday: selectedDate,
            weightstart: +prod.weightstart,
            weightbirht: +prod.weightbirht,
            imagecow: url,

          },
        });
        console.log(11111)
        window.location.reload();
        
      }
      setLoadingCreate(false);
    } catch (error) {
      setErrorAlert(true);
      setLoadingCreate(false);
      // console.log(error);
    }
  };
  useEffect(() => {
    setErrorAlert(false);
  }, [prod.numkun]);
  // console.log(prod.imagecow)
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
      
<Icon size={25} icon={picture} />
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
<div style={{ margin: "-3px 5px 0px 0px" }}>
              <Icon size={20} icon={notepad_add} />
            </div>
</div>
<div style={{ margin: "-1px 5px 0px 0px" , fontSize:"20px" }}>
บันทึกโคเข้าขุน
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
               <span style={{color:"red"}}>*</span> รหัสสมาชิกเจ้าของโค : { }
                <div style={{ display: "grid", gridTemplateRows: "1fr 15px" }}>
                  <Searchinput
                    name="numfarmer"
                    autoComplete="off"
                    value={prod.numfarmer}
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
                    maxLength="6"
                    style={{
                      width: "210px",
                      // borderColor: `${!prod.numfarmer ? "red" : ""}`,
                    }}
                  />
                  {/* {!prod.numfarmer && !alert.numfarmer ? (
                    <label style={{ color: "red" }}>
                      กรุณากรอกรหัสสมาชิกเจ้าของโค
                    </label>
                  ) : (
                    alert.numfarmer && (
                      <label style={{ color: "red" }}>
                        กรุณากรอกตัวเลข เท่านั้น
                      </label>
                    )
                  )} */}
                </div>
              </div>
              <div>
              <span style={{color:"red"}}>*</span>  หมายเลขบัตรประชาชน : { }
                <div style={{ display: "grid", gridTemplateRows: "1fr 15px" }}>
                  <Searchinput
                    name="passport"
                    value={prod.passport}
                    autoComplete="off"
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
                    maxLength="13"
                    style={{
                      width: "210px",
                    }}
                  />
                  {!prod.passport && !alert.passport ? 
                  // (
                  //     <label style={{ color: "red" }}>
                  //       กรุณากรอกหมายเลขบัตรประชาชน 13 หลัก
                  //     </label>
                  //   ) : alert.passport ? 
                  (
                    <label style={{ color: "red" }}>
                      กรุณากรอกตัวเลข เท่านั้น
                    </label>
                  ) :
                   (
                    passportCheck && (
                      <label style={{ color: "red" }}>
                        บัตรประชาชนไม่ถูกต้อง
                      </label>
                    )
                  )}
                </div>
              </div>
              <div>
              <span style={{color:"red"}}>*</span> ชื่อเจ้าของโค : { }
                <div style={{ display: "grid", gridTemplateRows: "1fr 15px" }}>
                  <Searchinput
                    name="namefarmer"
                    value={prod.namefarmer}
                    onChange={(event) => {
                      let input = event.target.value;
                      let value = input.replace(/[^ก-๙A-Za-z0-9 ]/gi, "");

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
                      // borderColor: `${!prod.namefarmer ? "red" : ""}`,
                    }}
                  />
                  {/* {!prod.namefarmer && !alert.namefarmer ? (
                    <label style={{ color: "red" }}>
                      กรุณากรอกรหัสสมาชิกเจ้าของโค
                    </label>
                  ) : (
                    alert.namefarmer && (
                      <label style={{ color: "red" }}>
                        กรุณากรอก ก-ฮ, สระ, A-Z และ a-z
                      </label>
                    )
                  )} */}
                </div>
              </div>
              <div>
              <span style={{color:"red"}}>*</span> กลุ่มที่/เขต : { }
                <div style={{ display: "grid", gridTemplateRows: "1fr 15px" }}>
                  <select
                    type="text"
                    name="group"
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
                      // borderColor: `${!prod.group ? "red" : ""}`,
                      borderRadius: "0.25rem",
                      transition:
                        "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
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
                  {!prod.group && (
                    <label style={{ color: "red" }}>กรุณาเลือกกลุ่ม</label>
                  )}
                </div>
              </div>
              <div>
              <span style={{color:"red"}}>*</span>  จังหวัด : { }

                <div style={{ display: "grid", gridTemplateRows: "1fr 15px" }}>
                  <select
                    type="text"
                    name="province"
                    onChange={(event) => {
                      // console.log('-------------------------------------------------------')
                      // console.log(event.target[event.target.selectedIndex].getAttribute('data-province-id')
                      // )
                      setParam({ ...param, 
                        province_id: event.target[event.target.selectedIndex].getAttribute('data-province-id'),
                        amphur_id: "",
                        district_code: ""})
                      console.log(param)
                      handleChange(event.target.name, event.target.value);
                    }}
                    style={{
                      display: "inline",
                      width: "210px",
                      padding: "0.375rem 0.75rem",
                      fontSize: "1rem",
                      fontWeight: "400",
                      lineHeight: "1.5",
                      height: "38px",
                      color: "#495057",
                      backgroundColor: "#fff",
                      backgroundClip: "padding-box",
                      border: "1px solid #ced4da",
                      /* border-radius: 0.25rem 0rem 0rem 0.25rem; */
                      // borderColor: `${!param.province_id ? "red" : ""}`,
                      borderRadius: "0.25rem",
                      transition:
                        "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
                    }}
                  >
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
                อำเภอ : { }
                <div style={{ display: "grid", gridTemplateRows: "1fr 15px" }}>
                  <select
                  id="amphur"
                    type="text"
                    name="amphur"
                    onChange={(event) => {
                      setParam({ ...param, 
                        province_id: event.target[event.target.selectedIndex].getAttribute('data-province-id'),
                        amphur_id: event.target[event.target.selectedIndex].getAttribute('data-amphur-id')
                        })
                      handleChange(event.target.name, event.target.value);
                    }}
                    style={{
                      display: "inline",
                      width: "210px",
                      padding: "0.375rem 0.75rem",
                      fontSize: "1rem",
                      fontWeight: "400",
                      lineHeight: "1.5",
                      height: "38px",
                      color: "#495057",
                      backgroundColor: param.province_id ?"#fff":"#ccc",
                      backgroundClip: "padding-box",
                      border: "1px solid #ced4da",
                      /* border-radius: 0.25rem 0rem 0rem 0.25rem; */
                      // borderColor: `${!prod.pun ? "red" : ""}`,
                      borderRadius: "0.25rem",
                      transition:
                        "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
                    }}
                  >
                    {/* <option value="">เลือก</option> */}
                    {/* {show_amphures &&
                     show_amphures.map((prod) => (
                        <option data-province-id={prod.province_id} data-amphur-id={prod.amphur_id} key={prod.amphur_id} value={prod.amphur_name}>
                          {prod.amphur_name}
                        </option>
                      ))} */}
                  </select>
                </div>
              </div>
              <div>
                ตำบล : { }

                <div style={{ display: "grid", gridTemplateRows: "1fr 15px" }}>
                  <select
                    type="text"
                    id="district"
                    name="district"
                    onChange={(event) => {
                      console.log(event.target[event.target.selectedIndex].getAttribute('data-district-code'))
                      setParam({ ...param, district_code: event.target[event.target.selectedIndex].getAttribute('data-district-code')})

                      handleChange(event.target.name, event.target.value);
                    }}
                    style={{
                      display: "inline",
                      width: "210px",
                      padding: "0.375rem 0.75rem",
                      fontSize: "1rem",
                      fontWeight: "400",
                      lineHeight: "1.5",
                      height: "38px",
                      color: "#495057",
                      backgroundColor:  param.amphur_id ?"#fff":"#ccc",
                      backgroundClip: "padding-box",
                      border: "1px solid #ced4da",
                      /* border-radius: 0.25rem 0rem 0rem 0.25rem; */
                      // borderColor: `${!prod.pun ? "red" : ""}`,
                      borderRadius: "0.25rem",
                      transition:
                        "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
                    }}
                  >
                    {/* <option value="">เลือก</option>
                    {show_districts &&
                      show_districts.map((prod) => (
                        <option data-district-code={prod.district_code} key={prod.district_id} value={prod.district_name}>
                          {prod.district_name}
                        </option>
                      ))} */}
                  </select>
                </div>
              </div>
              <div>
                รหัสไปรษณีย์ : { }
                <div style={{ display: "grid", gridTemplateRows: "1fr 15px" }}>
                  <Searchinput
                    name="zipcode"
                    disabled
                    value={prod.zipcode}
                    onChange={(event) => {
                      let input = event.target.value;
                      let value = input.replace(/[^ก-๙A-Za-z0-9 ]/gi, "");

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
                      backgroundColor:"#ccc",
                    }}
                  />
                </div>
              </div>
            </div>
            <div
              className="mb-3"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gridRowGap: "5px",
              }}
            >
              <div>
              <span style={{color:"red"}}>*</span>  เลขใบแจ้งขุน : { }
                <div style={{ display: "grid", gridTemplateRows: "1fr 15px" }}>
                  <Searchinput
                    name="numkun"
                    value={prod.numkun}
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
                    maxLength="8"
                    style={{
                      width: "210px",
                      // borderColor: `${!prod.numkun || errorAlert ? "red" : ""}`,
                    }}
                  />
                  {!prod.numkun && !alert.numkun ? (
                    <label style={{ color: "red" }}>
                      กรุณากรอกเลขใบแจ้งขุน
                    </label>
                  ) : alert.numkun ? (
                    <label style={{ color: "red" }}>
                      กรุณากรอกตัวเลข เท่านั้น
                    </label>
                  ) : (
                    errorAlert && (
                      <label style={{ color: "red" }}>เลขใบแจ้งขุนซ้ำ</label>
                    )
                  )}
                </div>
              </div>
              <div>
              <span style={{color:"red"}}>*</span> เลขโค : { }
                <div style={{ display: "grid", gridTemplateRows: "1fr 15px" }}>
                  <Searchinput
                    name="numcow"
                    value={prod.numcow}
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
                    maxLength="5"
                    style={{
                      width: "210px",
                      // borderColor: `${!prod.numcow ? "red" : ""}`,
                    }}
                  />
                  {!prod.numcow && !alert.numcow ? (
                    <label style={{ color: "red" }}>กรุณากรอกเลขโค</label>
                  ) : (
                    alert.numcow && (
                      <label style={{ color: "red" }}>
                        กรุณากรอกตัวเลข เท่านั้น
                      </label>
                    )
                  )}
                </div>
              </div>
              <div>
              <span style={{color:"red"}}>*</span> ชื่อโค : { }
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
                      // borderColor: `${!prod.namecow ? "red" : ""}`,
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
              <span style={{color:"red"}}>*</span>สายพันธุ์ : { }

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
                      height: "38px",
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
                  {!prod.pun && (
                    <label style={{ color: "red" }}>กรุณาเลือกสายพันธุ์</label>
                  )}
                </div>
              </div>
              <div>
                จำนวนฟันหน้าคู่แท้ : { }
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
                </div>
              </div>
              <div>
                RFID : { }
                <div style={{ display: "grid", gridTemplateRows: "1fr 15px" }}>
                  <Searchinput
                    name="rfid"
                    value={prod.rfid}
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
                    maxLength="20"
                    style={{
                      width: "210px",
                      // borderColor: `${!prod.rfid ? "red" : ""}`,
                    }}
                  />
                  {/* {!prod.rfid && !alert.rfid ? (
                    <label style={{ color: "red" }}>กรุณากรอก RFID</label>
                  ) : (
                    alert.rfid && (
                      <label style={{ color: "red" }}>
                        กรุณากรอกตัวเลข เท่านั้น
                      </label>
                    )
                  )} */}
                </div>
              </div>
              <div>
                วัน/เดือน/ปี รับเข้าโค : { }
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
              <span style={{color:"red"}}>*</span> น้ำหนักปัจจุบัน : { }
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
                  {!prod.weightstart && !alert.weightstart ? (
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
                  )}
                </div>
              </div>
              <div>
              <span style={{color:"red"}}>*</span> เพศโค : { }
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
                  {!prod.sex && (
                    <label style={{ color: "red" }}>กรุณาเลือกเพศโค</label>
                  )}
                </div>
              </div>
              <div>
                วัน/เดือน/ปี เกิดโค : { }
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
                น้ำหนักแรกเกิด : { }
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
              <span style={{color:"red"}}>*</span> Body Score : { }
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
                  {!prod.bodyscore && (
                    <label style={{ color: "red" }}>
                      กรุณาเลือก body score
                    </label>
                  )}
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
                            <img style={{ objectFit: 'cover', width: '90%', position: 'inherit', }} alt="Image" src={image.preview || logo} />
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
              className="mb-3"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 0.75fr 1fr 0.75fr",
                gridRowGap: "5px",
                marginTop: "5px",
              }}
            ></div>

            {loadingCreate ? (
              <Spinner
                style={{ margin: "0px 12px 0px auto", float: "right" }}
                animation="border"
                variant="primary"
              />
            ) : (
              <Gobutton
                disabled={
                  !prod.numcow ||
                  !prod.numkun ||
                  !prod.pun ||
                  !prod.numfarmer ||
                  !prod.passport ||
                  !prod.rfid ||
                  !prod.teeth ||
                  !prod.bodyscore ||
                  !prod.namefarmer ||
                  !prod.namecow ||
                  !prod.sex ||
                  !prod.group ||
                  !prod.weightstart ||
                  !prod.weightbirht ||
                  passportCheck
                }
                style={{
                  backgroundColor: `${!prod.numcow ||
                    !prod.numkun ||
                    !prod.pun ||
                    !prod.numfarmer ||
                    !prod.passport ||
                    !prod.rfid ||
                    !prod.teeth ||
                    !prod.group ||
                    !prod.bodyscore ||
                    !prod.namefarmer ||
                    !prod.namecow ||
                    !prod.sex ||
                    !prod.weightstart ||
                    !prod.weightbirht ||
                    passportCheck
                    ? "gray"
                    : ""
                    }`,
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
