import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
import {  Removebutton } from "../../../utils/button";

import { Icon } from "react-icons-kit";
import { Table } from "react-bootstrap";

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
    puntypeQuery {
      id
      name
      numpun
    }
  }
`;
const DELETE_Drug = gql`
  mutation DELETE_Drug($id: ID!) {
    deletePun(id: $id) {
     id
     name
    }
  }
`;


const CREATE = gql`
  mutation CREATE(
    $name: String!
    $numpun: String
  ) {
    createPun(
      name: $name
      numpun: $numpun
    ) {
      name
      numpun
    }
  }
`;



const Index = () => {

  const [loadingCreate, setLoadingCreate] = useState(false);
  const [prod, setProd] = useState({
    name: "",
    numpun: "",
  });

  // const [alert, setAlert] = useState({
  //   name: false,
  //   nofity: false,
    
  // });
  // const handleChange = (name, value) => setProd({ ...prod, [name]: value });
  const handleChange = e => setProd({ ...prod, [e.target.name]: e.target.value });
  // console.log(prod)

  const { data: datadrug } = useQuery(QUERY_DRUG, {});

  const [createDrug, error] = useMutation(CREATE, {
    onCompleted: (data) => {
      console.log(data)
      window.location.reload(false);

      setSuccess(true),
        setTimeout(function () {
          setSuccess(false);
        }, 3000);
        console.log(data) ;

    },
  });
  const [deletePun] = useMutation(DELETE_Drug, {
    onCompleted: (data) => {  
    },
    refetchQueries: [
      {
        query: QUERY_DRUG,
      },
    ],
  });
  
  const handleSubmitDelete = async (id) => {
    // console.log(id)
      try { 
        await deletePun({
          variables: {
id:id
          },
        }
        );
      } catch (error) {
        // console.log(error);
      }
  };
  const handleSubmit = async () => {
    setLoadingCreate(true);

    try {
      await createDrug({
        variables: {
          ...prod,
          // name: prod.name,
          numpun: prod.numpun,
        },
        
      });
     window.location.reload(false);

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
          <Sidemenu Sidenumber={1} />

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
                <Icon size={20} icon={list} />
              </div>
              
              <div style={{ margin: "-1px 5px 0px 0px" , fontSize:"20px"}}>
              เพิ่มข้อมูลยา
                            </div>
            </DivFromTop>
            <DivFromDown>
              <div
                style={{
                  margin: "auto",
                  minWidth: "100%",
                  display: "grid",
                  gridTemplateColumns: "0.30fr 0fr 1fr  1fr",
                  gridRowGap: "15px",
                }}
              >
                <div>ชื่อ(ไทย) : {}
                <Input
                  name="name"
                  onChange={handleChange}
                  style={{ width: "218px" }}
                />
              </div>
       <> &emsp; </>
                <div>รหัสสายพันธุ์ : {}
                <Input
                  name="numpun"
                  onChange={handleChange}
                  style={{
                    width: "218px",
                  }}
                />
              </div>
              <Gobutton
              
              style={{
        
                margin: "23px 3px 0px auto",
                height:"30px",
                width:"200px",
                float: "right",

              }}
              onClick={handleSubmit}
              >
                {" "}
                บันทึกข้อมูลสายพันธุ์{" "}
              </Gobutton>
                
             
        
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
              ข้อมูลทั่วไปของชิ้นเนื้อ
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
                      <th>ชื่อสายพันธุ์</th>
                      <th>รหัสสายพันธุ์</th>
                      <th>ลบ</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                  datadrug &&
                  datadrug.puntypeQuery &&
                  datadrug.puntypeQuery.length > 0 ? (
                    datadrug.puntypeQuery.map((prod) => (
                  
                 
                        <tr key={prod.id} style={{ textAlign: "center" }}>
                  <td>{prod.name}</td>
                  <td>{prod.numpun}</td>
                  <td>
                  <Removebuttoncolor onClick={ e => handleSubmitDelete(prod.id)}>
              <Removebutton />
            </Removebuttoncolor>
                  </td>
                  </tr> ))
                  ) : (
                    <tr style={{ textAlign: "center" }}>
                      <td colSpan="7">ไม่พบข้อมูล</td>
                    </tr>
                  )}</tbody>
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
