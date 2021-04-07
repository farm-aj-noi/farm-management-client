import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";

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

const QUERY = gql`
  query QUERY {
    allDisease {
      id
      name
      detail
    }
  }
`;

const CREATE = gql`
  mutation CREATE(
    $name: String!
    $detail: String!
  ) {
    createDisease(
      name: $name
      detail:$detail
    ) {
     id
     name
     detail
    }
  }
`;

const Index = () => {
  const [prod, setProd] = useState({
    name : "",
    detail: "",
 
  });
  // console.log(+prod.BBE);
  const [errorAlert, setErrorAlert] = useState(false);

  const { data } = useQuery(QUERY, {});
  const [createDisease, { loading, error }] = useMutation(CREATE, {
    onCompleted: (data) => {
      // console.log(data)
    },
    refetchQueries: [
      {
        query: QUERY,
      },
    ],
  });

  const handleChange = (e) =>
    setProd({ ...prod, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      await createDisease({
        variables: {
          name: prod.name,
          detail: prod.detail,
          
        },
      });
    } catch (error) {
      setErrorAlert(true);
      // console.log(error);
    }
  };

  // console.log(data);
  useEffect(() => {
    setErrorAlert(false);
  }, [prod.code]);
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
          <Sidemenu Sidenumber={3} />

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
              เพิ่มข้อโรค
            </DivFromTop>
            <DivFromDown>
              <div
                style={{
                  margin: "auto",
                  minWidth: "100%",
                  display: "grid",
                  gridTemplateColumns: "100px",
                  gridRowGap: "5px",
                }}
              >
                   <div>ชื่อโรค : </div>
                
                <Input
                  name="code"
                  onChange={handleChange}
                  style={{
                    width: "323px", height: "35px" ,
                  }}
                />
                <div>อาการของโรค : </div>
                <Input
                  name="nameTH"
                  onChange={handleChange}
                  style={{ width: "668px" ,height: "95px"}}
                />
                <div />
              
             
                <div />
                {/* <div > อาการ : </div>
              <Input
                  name="symptom"
                  value={prod.symptom}
                  onChange={handleChange}
                  style={{ width: "523px", height: "35px" }}
                />
                <div /> */}
          
              </div>

              <div style={{ float: "right", padding: "13px 8px" }}>
                <Gobutton
            
                 
                  onClick={handleSubmit}
                >
                  {" "}
                  ยืนยัน{" "}
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
                      <th>ชื่อโรค</th>
                      <th>อาการของโรค</th>
                    </tr>
                  </thead>
                  <tbody>
                  {data &&
                      data.allDisease.map((prod) => (
                        <tr key={prod.id} style={{ textAlign: "center" }}>
                  <td>{prod.name}</td>
                  <td>{prod.detail}</td>
                  </tr> ))}
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
