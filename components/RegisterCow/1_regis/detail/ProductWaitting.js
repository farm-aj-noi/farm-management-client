import React, { useState } from "react"
import styled from "styled-components";
import { useRouter } from "next/router"
import logo from '../defultcow.jpg'

import {
  Savebuttoncolor,
  Editbuttoncolor,
  Removebuttoncolor,
} from "../../../../utils/buttonColor";
import { Savebutton, Editbutton, Removebutton } from "../../../../utils/button";

import { Icon } from "react-icons-kit";
import { Table } from "react-bootstrap";

import { list } from "react-icons-kit/fa/list";
import { DivBase } from "../../../../utils/divBase";
import {
  DivFrom,
  DivFromTop,
  DivFromDown,
  Searchinput,
  Searchbutton,
  Divimg,
  DivFrom1,
} from "../GetinFrom";
import { Spinner } from "react-bootstrap";
// import Footer from "../../Footer/index";
import dayjs from "dayjs";
import DatePicker, { registerLocale } from "react-datepicker";
import th from "date-fns/locale/th";
registerLocale("th", th);

import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";


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
const UPDATE_GRADE = gql`
  mutation UPDATE_GRADE($id: String!
    ) {
      updatecowfarm(id: $id,) {
      namecow
     
    }
  }
`;


const QUERY_PRODUCT = gql`
  query QUERY_PRODUCT($id: ID!) {
    CowWaitting(id: $id) {
    namecow
    date
  numfarmer
  namefarmer
  passport
  pun
  teeth
  bodyscore
  datebirhtday
  imagecow
  weightbirht
  weightstart
  sex
  numfarmer
  district
   province
    amphur
     zipcode
  
    }
  }`
const ProductId = () => {
  const [edit, setEdit] = useState(false);

  const [cowdetailData, setCowdetailData] = useState({
    numkun: '',
    numcow: ''
    , namecow: ''
    , pun: '',
    date: '',
    datebirhtday: ''
    , weightstart: ''
    , numfarmer: '',
    district: "",
     province: "",
      amphur: "",
       zipcode: ""
  });
  // const [loading, setLoading] = useState(false);

  const [onEdite, setOnEdit] = useState(false);

  const route = useRouter();
  // console.log(route);
  // const handleChange = (e) => setCowdetailData({ ...cowdetailData, [e.target.name]: e.target.value });
  const handleChange = (name, value) => {

    setProd({ ...prod, [name]: value })
  };


  const [prod, setProd] = useState({
    numcow: "",
    numkun: "",
    pun: cowdetailData.pun,
    numfarmer: cowdetailData.numfarmer,
    passport: cowdetailData.passport,
    teeth: cowdetailData.teeth,
    rfid: "",
    date: Date(),
    datebirhtday: cowdetailData.datebirhtday,
    bodyscore: cowdetailData.bodyscore,
    namefarmer: cowdetailData.namefarmer,
    namecow: cowdetailData.namecow,
    sex: cowdetailData.sex,
    weightstart: cowdetailData.weightstart,
    weightbirht: cowdetailData.weightbirht,
    statuscow: "กำลังขุน",
    imagecow: cowdetailData.imagecow,
    group: "",
    district: cowdetailData.district
    , province: cowdetailData.province, amphur: cowdetailData.amphur, zipcode: cowdetailData.zipcode

  });
  const [updatecowfarm] = useMutation(UPDATE_GRADE, {
    onCompleted: (data) => {

      setCowdetailData(data.updatecowfarm);
    },

    awaitRefetchQueries: true,
  });
  // const [cowdetailData, setCowdetailData] = useState();
  const { data, loading, error, } = useQuery(QUERY_PRODUCT, {
    variables: {
      id: route.query.productId

    }, onCompleted(res) {
      setCowdetailData(res.CowWaitting)
    }
  });

  console.log(cowdetailData)

  const [createCow] = useMutation(CREATE, {
    onCompleted: (data) => {
      setSuccess(true),
        window.location.reload();

    },
  });
  const handleSubmitUpdate = async () => {
    console.log(route.query.productId)
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
  
 
    await updatecowfarm({

      variables: {
       // ...cowdetailData,
        id: route.query.productId,
        numkun: cowdetailData.numkun,
        numcow: cowdetailData.numcow,
        namecow: cowdetailData.namecow,
        pun: cowdetailData.pun,
       weightstart:+cowdetailData.weightstart,
        numfarmer: cowdetailData.numfarmer
      },
    });
    window.location.reload(false);

    setEdit(false);
  };
  if (error) return <p>Something went wrong, please try again.</p>

  if (loading) return <p>Loading ...</p>

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
        <DivFrom style={{ width: "270px" ,height:"min-content",margin:"20px",marginTop:"0" , marginRight:"2px"}}>
          
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
                    <div >
                        <a >
                        <Divimg style={{width:"240px"}}>
                          <img style={{

                            margin: "auto", objectFit: "cover", width: "100%", height: "100%", display: "relarive", padding: "4px", borderRadius: "30px"
                          }} alt="Image" src={data.CowWaitting.imagecow || logo} />
                        </Divimg >
                        </a>
                    </div>
                  </div>
                </div>

                 
          
              </div>
           {/* ---------------------------------------------------------------------------------------------*/}
            </div>


          
          </DivFromDown>
        </DivFrom>
        <DivFrom style={{ width: "750px" ,float:"Rigth"}}>
          
          <DivFromTop>
          <div style={{ margin: "-3px 5px 0px 0px" , fontSize:"20px" }}>

{/* <Icon size={25} icon={list} /> */}
</div>
<div style={{ margin: "-1px 5px 0px 0px" , fontSize:"20px" }}>
  เพิ่มโคเข้าระบบสหกรณ์เพื่อรออนุมัติ

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
                gridTemplateColumns: "1fr",
                gridRowGap: "5px",
              }}
            >
              
    
          <DivFromDown
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gridRowGap: "5px",
              paddingBottom: "20px",
            }}
          >
            {/* ใส่ card */}

            <div
              className="mb-3"
              style={{
                display: "grid",
                gridTemplateColumns: "1.2fr 1.2fr 1fr",
                gridRowGap: "5px",
                margin: "auto"

              }}
            >
              <div>
                เลขใบแจ้งขุน : { }
                <div style={{ display: "grid", gridTemplateRows: "1fr 15px" }}>
                  <Searchinput
                    name="numkun"
                    value={cowdetailData.numkun}
                    maxLength="8"
                    // disabled={!onEdite}
                    // style={{ backgroundColor: `${!onEdite ? "#ececec" : 'white'}` }}
 
  onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                เลขโค : { }
                <div style={{ display: "grid", gridTemplateRows: "1fr 15px" }}>
                  <Searchinput
                    name="numcow"
                    value={cowdetailData.numcow}
                    maxLength="5"
                    // disabled={!onEdite}
                    // style={{ backgroundColor: `${!onEdite ? "#ececec" : 'white'}` }}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                ชื่อโค : { }
                <div style={{ display: "grid", gridTemplateRows: "1fr 15px" }}>
                  <Searchinput
                    name="namecow"
                    value={cowdetailData.namecow}
                    maxLength="100"
                    disabled={!onEdite}
                    style={{ backgroundColor: `${!onEdite ? "#ececec" : 'white'}` }}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                สายพันธุ์ : { }
                <div style={{ display: "grid", gridTemplateRows: "1fr 15px" }}>
                  <Searchinput
                    name="pun"
                    value={cowdetailData.pun}
                    maxLength="5"
                    disabled={!onEdite}
                    style={{ backgroundColor: `${!onEdite ? "#ececec" : 'white'}` }}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                จำนวนฟันหน้าคู่แท้ : { }
                <div style={{ display: "grid", gridTemplateRows: "1fr 15px" }}>
                  <Searchinput
                    name="teeth"
                    value={cowdetailData.teeth}
                    maxLength="2"
                    disabled
                    style={{ backgroundColor: "#ececec" }}
                  />
                </div>
              </div>
              <div>
                RFID : { }
                <div style={{ display: "grid", gridTemplateRows: "1fr 15px" }}>
                  <Searchinput
                    name="rfid"
                    value={cowdetailData.rfid}
                    maxLength="20"
                    // disabled
                    // style={{ backgroundColor: "#ececec" }}
                    // disabled={!onEdite}
                    // style={{ backgroundColor: `${!onEdite ? "#ececec" : 'white'}` }}
                    // onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                วัน/เดือน/ปี เกิดโค : { }
                <div style={{ display: "grid", gridTemplateRows: "1fr 15px" }}>
                  <Searchinput
                    name="pun"
                    value={dayjs(Date()).format("DD-MM-YYYY") }
                    maxLength="5"
                    disabled
                    style={{ backgroundColor: "#ececec" }}

                  />
                </div>
              </div>
              <div>
                น้ำหนักปัจจุบัน : { }
                <div style={{ display: "grid", gridTemplateRows: "1fr 15px" }}>
                  <Searchinput
                    name="weightstart"
                    value={cowdetailData.weightstart}
                    maxLength="20"
                    disabled={!onEdite}
                    style={{ backgroundColor: `${!onEdite ? "#ececec" : 'white'}` }}
                    onChange={handleChange}

                  />
                </div>
              </div>
              <div>
                เพศโค : { }
                <div style={{ display: "grid", gridTemplateRows: "1fr 15px" }}>
                  <Searchinput
                    name="weightbirht"
                    value={cowdetailData.sex}
                    maxLength="20"
                    disabled
                    style={{ backgroundColor: "#ececec" }}
                    // disabled={!onEdite}
                    // style={{ backgroundColor: `${!onEdite ? "#ececec" : 'white'}` }}
                    // onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                วัน/เดือน/ปี เกิดโค : { }
                <div style={{ display: "grid", gridTemplateRows: "1fr 15px" }}>
                  <Searchinput
                    name="pun"
                    value={dayjs(cowdetailData.date).format("DD-MM-YYYY") }
                    maxLength="5"
                    disabled
                    style={{ backgroundColor: "#ececec" }}

                  />
                </div>
              </div>
              <div>
                น้ำหนักแรกเกิด : { }
                <div style={{ display: "grid", gridTemplateRows: "1fr 15px" }}>
                  <Searchinput
                    name="weightbirht"
                    value={cowdetailData.weightbirht}
                    maxLength="20"
                    style={{ backgroundColor: "#ececec" }}

                  />
                </div>
              </div>
              <div>
                Body Score : { }
                <div style={{ display: "grid", gridTemplateRows: "1fr 15px" }}>
                  <Searchinput
                    name="weightbirht"
                    value={cowdetailData.bodyscore}
                    maxLength="20"
                    style={{ backgroundColor: "#ececec" }}

                  />
                </div>
              </div>
            </div>
            <div
              className="mb-3"
              style={{
                display: "grid",
                gridTemplateColumns: "1.2fr 1.2fr 1fr",
                gridRowGap: "5px",
                paddingBottom: "10px",
                borderBottom: "1px gray solid",
                margin: "auto"
              }}
            >
              <div>
                รหัสสมาชิกเจ้าของโค : { }
                <div style={{ display: "grid", gridTemplateRows: "1fr 15px" }}>
                  <Searchinput
                    name="numfarmer"
                    value={cowdetailData.numfarmer}
                    maxLength="6"
                    disabled={!onEdite}
                    style={{ backgroundColor: `${!onEdite ? "#ececec" : 'white'}` }}
                    onChange={handleChange}

                  />
                </div>
              </div>
              <div>
                หมายเลขบัตรประชาชน : { }
                <div style={{ display: "grid", gridTemplateRows: "1fr 15px" }}>
                  <Searchinput
                    name="passport"
                    value={cowdetailData.passport}
                    maxLength="13"
                    disabled
                    style={{ backgroundColor: "#ececec" }}
                  />
                </div>
              </div>
              <div>
                ชื่อเจ้าของโค : { }
                <div style={{ display: "grid", gridTemplateRows: "1fr 15px" }}>
                  <Searchinput
                    name="namefarmer"
                    value={cowdetailData.namefarmer}
                    style={{ backgroundColor: "#ececec" }}
                    maxLength="100"
                  />
                </div>
              </div>
              <div>
                จังหวัด : { }
                <div style={{ display: "grid", gridTemplateRows: "1fr 15px" }}>
                  <Searchinput
                    name="namefarmer"
                    value={cowdetailData.province}
                    style={{ backgroundColor: "#ececec" }}
                    maxLength="100"
                  />
                </div>
              </div>
              <div>
                อำเภอ : { }
                <div style={{ display: "grid", gridTemplateRows: "1fr 15px" }}>
                  <Searchinput
                    name="namefarmer"
                    value={cowdetailData.amphur}
                    style={{ backgroundColor: "#ececec" }}
                    maxLength="100"
                  />
                </div>
              </div>
              <div>
                ตำบล : { }
                <div style={{ display: "grid", gridTemplateRows: "1fr 15px" }}>
                  <Searchinput
                    name="namefarmer"
                    value={cowdetailData.district}
                    style={{ backgroundColor: "#ececec" }}
                    maxLength="100"
                  />
                </div>
              </div>
              <div>
                กลุ่มที่ : { }
                <div style={{ display: "grid", gridTemplateRows: "1fr 15px" }}>
                <select
                    type="text"
                    name="group"
                    onChange={(event) => {
                      handleChange(event.target.name, event.target.value);
                    }}
                    style={{
                      display: "inline",
                      width: "170px",
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
                </div>
              </div>
      
              <div>
{/*                 
                <Editbuttoncolor style={{
                  margin: "5px 0px 0px auto",

                }}
                  onClick={() => setOnEdit(!onEdite)}
                >
                  <Editbutton />
                </Editbuttoncolor> */}

            
                {/* {loading ? (
          <Spinner animation="border" variant="primary" />
        ) :  !onEdite ? (
          <Editbuttoncolor style={{
            margin: "5px 0px 0px auto",

          }}
            onClick={() => setOnEdit(!onEdite)}
          >
            <Editbutton />แก้ไขข้อมูล
          </Editbuttoncolor>
        ) :  !onEdite ? (
          <Editbuttoncolor onClick={() => setOnEdit(onEdite)}>
            <Editbutton />
          </Editbuttoncolor>
        ) :  onEdite ? (
          <Savebuttoncolor
          onClick={handleSubmitUpdate}
          style={{
            backgroundColor: `${
              !cowdetailData ? "gray" : ""
            }`,
          }} disabled={!cowdetailData}>
            <Savebutton /> บันทึก
          </Savebuttoncolor>
        ) : (
          <div>

          </div>
        )} */}
              </div>

            </div>
            <Savebuttoncolor 
            style={{
              margin: "3px 0px 0px auto",
              marginRight:"48px"
            }}
            onClick={handleSubmitUpdate}  > 
              {/* <Savebutton /> */}
              บันทึกข้อมูล
            </Savebuttoncolor> 
          </DivFromDown>
   
           </div>
              
          </DivFromDown>
          
        </DivFrom>
        {/* <Footer/> */}
  
        
        {/* <Footer/> */}
        <>
          <p></p>
        </>
       
      </DivBase>
  
    </>
  );
};

export default ProductId;
