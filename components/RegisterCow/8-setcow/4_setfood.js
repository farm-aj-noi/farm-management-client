import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
import {  Removebutton } from "../../../utils/button";
import {pen_3} from 'react-icons-kit/ikons/pen_3'

import { Icon } from "react-icons-kit";
import { Table } from "react-bootstrap";
import ListHalve from "./4_foodlist";

import { Form, Row, Col, Tab, Nav } from "react-bootstrap";
import { ic_notifications_active } from "react-icons-kit/md/ic_notifications_active";
import { ic_info_outline } from "react-icons-kit/md/ic_info_outline";
import { ic_create } from "react-icons-kit/md/ic_create";
import { Button } from "react-bootstrap";

// import DatePicker from "react-datepicker";

import dayjs from "dayjs";
import Pickadate from "pickadate/builds/react-dom";
import TH from "pickadate/builds/translations/th_TH";

import { list } from "react-icons-kit/fa/list";
import { DivBase } from "../../../utils/divBase";
import {
  DivFrom,
  DivFromTop,
  DivFromDown,
  Input,
  Gobutton,
} from "./ListcuttwoFrom";
import Sidemenu from "./menu";
// import Footer from "../../Footer/index";

import {
  Savebuttoncolor,
  Editbuttoncolor,
  Removebuttoncolor,
} from "../../../utils/buttonColor";
import { Savebutton, Editbutton } from "../../../utils/button";
import { now } from "moment";

import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";


const QUERY_DRUG = gql`
  query QUERY_DRUG {
    allFood{
      name
      CP
      TDN
      id
      type
    }  
      allFoodF2{
      name
      CP
      TDN
      id
      type
    }
  }

  
`;


const CREATE = gql`
  mutation CREATE(
    $name: String
    $CP: Float
    $TDN: Float
    $type: String

  ) {
    createFoodset(
      name: $name ,
       CP:$CP ,
      TDN :$TDN,
      type:$type
    ) {
      name
      CP
      TDN
      type
      id
    }
  }
`;



const Index = () => {
  const route = useRouter();

  const [loadingCreate, setLoadingCreate] = useState(false);
  const [prod, setProd] = useState({
    name:"",
    CP:0 ,
    TDN:0,
    type:""
  });

  // const [alert, setAlert] = useState({
  //   name: false,
  //   nofity: false,
    
  // });
  // const handleChange = (name, value) => setProd({ ...prod, [name]: value });
  const handleChange = e => setProd({ ...prod, [e.target.name]: e.target.value });
  // console.log(prod)

  const { data } = useQuery(QUERY_DRUG, {});

  const [createFoodset, error] = useMutation(CREATE, {
    onCompleted: (data) => {
      console.log(data)
      route.push("/registercow/setting/setfood")
      window.location.reload(false);

      setSuccess(true),
        setTimeout(function () {
          setSuccess(false);
        }, 3000);
        console.log(data) ;

    },
  });

  

  const handleSubmit = async () => {
    setLoadingCreate(true);

    try {
      await createFoodset({
        variables: {
          ...prod,
          // name: prod.name,
          CP: +prod.CP,
          TDN: +prod.TDN

        },
        
      });
      }
catch (error) {
  setLoadingCreate(false);

      // console.log(error);
    }
  };
 
  return (
    <>
      <DivBase
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 237.5px 712.5px 1fr",
          gridRowGap: "15px",
          gridColumnGap: "10px",
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
            }}
          >
            <DivFromTop>
              <div style={{ margin: "-3px 5px 0px 0px" }}>
                <Icon size={20} icon={pen_3} />
              </div>
              
              <div style={{ margin: "-1px 5px 0px 0px" , fontSize:"16px"}}>
              เพิ่มข้อมูลอาหาร
                            </div>
            </DivFromTop>
            <DivFromDown>
              <div
                style={{
                  margin: "auto",
                  minWidth: "100%",
                  display: "grid",
                  gridTemplateColumns: "1fr 0fr 0.5fr  0.5fr 0.5fr",
                  gridRowGap: "15px",
                }}
              >
                <div>ชื่อสูตรอาหาร : {}
                <Input
                  name="name"
                  autoComplete="off"

                  onChange={handleChange}
                  style={{ width: "260px" ,fontWeight: "400"
                }}
                />
              </div>
       <> &emsp; </>
                <div>โปรตีน (CP) : {}
                <Input
                  name="CP"
                  autoComplete="off"

                  onChange={handleChange}
                  style={{
                    width: "120px",
                  }}
                />
              </div>
              <div>
พลังงาน (TDN) : {}
                <Input
                                    autoComplete="off"

                  name="TDN"
                  onChange={handleChange}
                  style={{
                    width: "120px",
                  }}
                />
          
              </div>
              {/* <div>โปรตีน (CP): {}
                <Input
                  name="numpun"
                  onChange={handleChange}
                  style={{
                    width: "80px",
                  }}
                />
              </div> */}
                 <div>
                ประเภท : {}
                <select
                  name="type"
                  onChange={handleChange}
                  style={{
                    display: "inline",
                    width: "120px",
                   height:"30px",
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
                  <option value="F1">อาหารข้น</option>
                  <option value="F2">อาหารหยาบ</option>
           
                </select>
                      
            <Gobutton
              
              style={{
                height:"30px",
                padding:"1px",
                width:"80px",
                float: "left",
                marginLeft:"30%",
                transform:"translate(-1px,5px)"
 
              }}
              onClick={handleSubmit}
              >
                {" "}
                บันทึก{" "}
              </Gobutton>
              </div>
                
         
              </div>
              
            </DivFromDown>
          </DivFrom>

          <DivFrom
            style={{
              width: "100%",
              gridRowStart: "3",
              gridRowEnd: "3",
              gridColumnStart: "3",
            }}
          >
            <DivFromTop>
              <div style={{ margin: "-3px 5px 0px 0px" }}>
                <Icon size={20} icon={list} />
              </div>
              ข้อมูลรายการอาหาร
            </DivFromTop>
            <DivFromDown>
              <div style={{ margin: "auto", minWidth: "100%" }}>
                <Table
                  striped
                  bordered
                  responsive
                  hover
                  style={{ margin: "auto" }}
                >
               
                  <thead>
                    <tr style={{ textAlign: "center" }}>
                      <th>ชื่อสูตรอาหาร (อาหารข้น)</th>
                      <th>โปรตีน (CP)</th>
                      <th>พลังงาน (TDN)</th>
                      <th>แก้ไข</th>

                    </tr>
                  </thead>
                  <tbody>
                  {data &&
                    // data.SearchHalveForSent.imslaughter.grade &&
                    data.allFood.map((halveData) => (
                      <ListHalve key={halveData.id} foodset={halveData} />
                    ))}
                 </tbody>
                 <thead>
                    <tr style={{ textAlign: "center" }}>
                      <th>ชื่อสูตรอาหาร (อาหารหยาบ)</th>
                      <th>โปรตีน (CP)</th>
                      <th>พลังงาน (TDN)</th>
                      <th>แก้ไข</th>

                    </tr>
                  </thead>
                  <tbody>
                  {data &&
                    // data.SearchHalveForSent.imslaughter.grade &&
                    data.allFoodF2.map((halveData) => (
                      <ListHalve key={halveData.id} foodset={halveData} />
                    ))}
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
