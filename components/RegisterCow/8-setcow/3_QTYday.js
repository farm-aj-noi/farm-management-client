import React, { useContext, useState, useRef, useEffect } from "react";
import styled from "styled-components";

import { Icon } from "react-icons-kit";
import { Table } from "react-bootstrap";
import Sidemenu from "./menu";
import {pen_3} from 'react-icons-kit/ikons/pen_3'

import { list } from "react-icons-kit/fa/list";
import ListHalve from "./3_QTYlist";
import { DivBase } from "../../../utils/divBase";
import {
  DivFrom,
  DivFromTop,
  DivFromDown,
  Searchinput,
  Wightinput,
} from "./SlaughterFrom";
// import Footer from "../../Footer/index";
import dayjs from "dayjs";
import DatePicker, { registerLocale } from "react-datepicker";
import th from "date-fns/locale/th";
registerLocale("th", th);
import Datestyle from "../helps/datepicker.module.css";

import { Savebutton, Editbutton } from "../../../utils/button";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

export const QUERYLIST = gql`
  query QUERYLIST {
    allDrug{
      id
      name
      dateStop
      
    }
  }
`;

const Index = () => {


  const [selectedDate, handleDateChange] = useState();

  const [barcode, setInputbarcode] = useState("");
  const [selectedStatus, SetStatusChange] = useState("");
  // calendar
  // const event1 = new Date("July 1, 1999");

  const { data, loading, error } = useQuery(QUERYLIST, {});
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
        <Sidemenu Sidenumber={4} />
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
            ตั้งค่าระยะหยุดยา
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
                    <th>ชื่อยา</th>
                    <th>ระยะหยุดยา</th>
                    <th>ตั้งค่า</th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    // data.SearchHalveForSent.imslaughter.grade &&
                    data.allDrug.map((halveData) => (
                      <ListHalve key={halveData.id} drug={halveData} />
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
