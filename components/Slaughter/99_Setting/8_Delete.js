import React, { useState } from "react";
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
import { DivFrom, DivFromTop, DivFromDown } from "./ListcuttwoFrom";
import Sidemenu from "./menu";
// import Footer from "../../Footer/index";

import {
  Savebuttoncolor,
  Editbuttoncolor,
  Removebuttoncolor,
} from "../../../utils/buttonColor";
import { Savebutton, Editbutton } from "../../../utils/button";
import { now } from "moment";
import List from "./8L_Delete";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

export const QUERY = gql`
  query QUERY {
    SettingBeeftypeCheck {
      id
      code
      nameTH
      nameEN
    }
  }
`;

const Index = () => {
  const { data, loading, error, refetch } = useQuery(QUERY, {});

  // console.log(data);
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
          <Sidemenu Sidenumber={8} />

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
                      <th style={{ width: "115px" }}>รหัสชิ้นเนื้อ</th>
                      <th style={{ width: "245.46px" }}>ชื่อไทย</th>
                      <th>ชื่ออังกฤษ</th>
                      <th style={{ width: "75px" }}>จัดการ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data &&
                      data.SettingBeeftypeCheck.map((prod) => (
                        <List key={prod.id} List={prod} />
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
