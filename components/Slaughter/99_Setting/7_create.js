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
import List from "./6L_Bbe";

import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

export const QUERY = gql`
  query QUERY {
    SettingBeeftypeCheck {
      id
      code
      nameTH
      nameEN
      BBE
    }
  }
`;

const CREATE_BEEFTYPE = gql`
  mutation CreateBeeftypeMutation(
    $nameEN: String!
    $nameTH: String!
    $BBE: Int
    $code: String!
    $priceG2h: Float
    $priceG3: Float
    $priceG3h: Float
    $priceG4: Float
    $priceG4h: Float
    $priceG5: Float
  ) {
    createBeeftype(
      nameEN: $nameEN
      nameTH: $nameTH
      BBE: $BBE
      code: $code
      priceG2h: $priceG2h
      priceG3: $priceG3
      priceG3h: $priceG3h
      priceG4: $priceG4
      priceG4h: $priceG4h
      priceG5: $priceG5
    ) {
      code
      BBE
      nameEN
      nameTH
    }
  }
`;

const Index = () => {
  const [prod, setProd] = useState({
    code: "",
    nameTH: "",
    nameEN: "",
    BBE: "",
    priceG2h: "",
    priceG3: "",
    priceG3h: "",
    priceG4: "",
    priceG4h: "",
    priceG5: "",
  });
  // console.log(+prod.BBE);
  const [errorAlert, setErrorAlert] = useState(false);

  const { data } = useQuery(QUERY, {});
  const [createBeeftype, { loading, error }] = useMutation(CREATE_BEEFTYPE, {
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
      await createBeeftype({
        variables: {
          code: prod.code,
          nameTH: prod.nameTH,
          nameEN: prod.nameEN,
          BBE: +prod.BBE,
          priceG2h: +prod.priceG2h,
          priceG3: +prod.priceG3,
          priceG3h: +prod.priceG3h,
          priceG4: +prod.priceG4,
          priceG4h: +prod.priceG4h,
          priceG5: +prod.priceG5,
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
          <Sidemenu Sidenumber={7} />

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
              เพิ่มชิ้นเนื้อ
            </DivFromTop>
            <DivFromDown>
              <div
                style={{
                  margin: "auto",
                  minWidth: "100%",
                  display: "grid",
                  gridTemplateColumns: "0.30fr 1fr 0.15fr 0.60fr 1fr",
                  gridRowGap: "15px",
                }}
              >
                <div>ชื่อ(ไทย) : </div>
                <Input
                  name="nameTH"
                  value={prod.nameTH}
                  onChange={handleChange}
                  style={{ width: "218px" }}
                />
                <div />
                <div>ชื่อ(อังกฤษ) : </div>
                <Input
                  name="nameEN"
                  value={prod.nameEN}
                  onChange={handleChange}
                  style={{ width: "218px" }}
                />
                <div>รหัสชิ้นเนื้อ : </div>
                <Input
                  name="code"
                  value={prod.code}
                  onChange={handleChange}
                  style={{
                    width: "218px",
                    border: `${errorAlert ? "red solid 1px" : ""}`,
                  }}
                />
                <div />
                <div>อายุสินค้า (จำนวนวัน) : </div>
                <Input
                  name="BBE"
                  value={prod.BBE}
                  onChange={handleChange}
                  type="Number"
                  style={{ width: "218px" }}
                />
                <div />
                {errorAlert && (
                  <p
                    style={{
                      color: "red",
                      position: "absolute",
                      display: "flex",
                      margin: "75px 0px 0 68px",
                    }}
                  >
                    รหัสซ้ำ
                  </p>
                )}
              </div>

              <div
                style={{
                  margin: "auto",
                  marginTop: "20px",
                  borderTop: "0.25px solid gray",
                  padding: "18px 0",
                }}
              >
                ราคาบาทต่อกิโลกรัม{" "}
              </div>
              <div
                style={{
                  margin: "auto",
                  minWidth: "100%",
                  display: "grid",
                  gridTemplateColumns: "0.4fr 1fr 0.4fr 1fr 0.4fr 1fr",
                  gridRowGap: "15px",
                }}
              >
                <div>เกรด 2.5 : </div>
                <Input
                  name="priceG2h"
                  value={prod.priceG2h}
                  onChange={handleChange}
                  type="Number"
                  style={{ width: "154px" }}
                />
                <div>เกรด 3 : </div>
                <Input
                  name="priceG3"
                  value={prod.priceG3}
                  onChange={handleChange}
                  type="Number"
                  style={{ width: "154px" }}
                />
                <div>เกรด 3.5 : </div>
                <Input
                  name="priceG3h"
                  value={prod.priceG3h}
                  onChange={handleChange}
                  type="Number"
                  style={{ width: "154px" }}
                />
                <div>เกรด 4 : </div>
                <Input
                  name="priceG4"
                  value={prod.priceG4}
                  onChange={handleChange}
                  type="Number"
                  style={{ width: "154px" }}
                />
                <div>เกรด 4.5 : </div>
                <Input
                  name="priceG4h"
                  value={prod.priceG4h}
                  onChange={handleChange}
                  type="Number"
                  style={{ width: "154px" }}
                />
                <div>เกรด 5 : </div>
                <Input
                  name="priceG5"
                  value={prod.priceG5}
                  onChange={handleChange}
                  type="Number"
                  style={{ width: "154px" }}
                />
              </div>

              <div style={{ float: "right", padding: "13px 8px" }}>
                <Gobutton
                  disabled={
                    !prod.code ||
                    !prod.nameTH ||
                    !prod.nameEN ||
                    !prod.BBE ||
                    !prod.priceG2h ||
                    !prod.priceG3 ||
                    !prod.priceG3h ||
                    !prod.priceG4 ||
                    !prod.priceG4h ||
                    !prod.priceG5
                  }
                  style={{
                    backgroundColor: `${
                      !prod.code ||
                      !prod.nameTH ||
                      !prod.nameEN ||
                      !prod.BBE ||
                      !prod.priceG2h ||
                      !prod.priceG3 ||
                      !prod.priceG3h ||
                      !prod.priceG4 ||
                      !prod.priceG4h ||
                      !prod.priceG5
                        ? "gray"
                        : ""
                    }`,
                  }}
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
                      <th>รหัสชิ้นเนื้อ</th>
                      <th>ชื่อไทย</th>
                      <th>ชื่ออังกฤษ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data &&
                      data.SettingBeeftypeCheck.map((prod) => (
                        <tr key={prod.id} style={{ textAlign: "center" }}>
                          <td>{prod.code}</td>
                          <td>{prod.nameTH}</td>
                          <td>{prod.nameEN}</td>
                        </tr>
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
