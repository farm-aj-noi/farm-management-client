import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import dayjs from 'dayjs'
import Link from 'next/link'

import {
  DivFrom,
  DivFromTop,
  DivFromDown,
  Searchinput,
  Gobutton,
  Input,
} from "./SlaughterFrom";

import { Spinner, Modal ,Button} from "react-bootstrap";
import {
  Savebuttoncolor,
  Editbuttoncolor,
  Removebuttoncolor,
} from "../../../utils/buttonColor";
import { Savebutton, Editbutton, Removebutton } from "../../../utils/button";
import { now } from "moment";

import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { QUERY } from "./index";

const UPDATE = gql`
  mutation UPDATE($id: ID!, $statuscow: String!) {
    updateTstatus(id: $id, statuscow: $statuscow) {
      id
      numcow
      numkun
      pun
      numfarmer
      namecow
      date
      statuscow
    }
  }
`;

const days_between = (date1) =>{
 
  dayjs(date1).format("YYYY-MM-DD");

 // The number of milliseconds in one day
 const ONE_DAY = 1000 * 60 * 60 * 24;
  var  date2 = new Date().toISOString()
 var date3 =  dayjs(date2).format("YYYY-MM-DD");
  var dt1 = new Date(date1);
  var  dt2 = new Date(date2);
   return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
 }
 function timeDifference(date) {
  console.log(date);
    var date1 = new Date(date);
    console.log(date1)
    var date2 = new Date();
    var diff = new Date(date2.getTime() - date1.getTime());
  
    let year = diff.getUTCFullYear() - 1970;
    let month = diff.getUTCMonth();
    let day = diff.getUTCDate() - 1;
    let week = (day / 7);
  
    // console.log(week);
    let hour = diff.getUTCHours();
    let minute = diff.getUTCMinutes();
    let second = diff.getUTCSeconds();
    // console.clear() 
    // console.log(`${year} Year\n${month} Month \n${week} Week \n${day} Day \n${hour}:${minute}:${second} s`);
    
    if (year !== 0) {
       return `${year} ปี ${month} เดือน`;
    } else if (month !== 0) {
       return `${month} เดือน ${day} วัน`;
    } else if (week >= 1) {
       return `${week.toFixed(0)} สัปดาห์`;
    } else if (day > 1) {
        return `${day} วัน`;
    } else if (day !== 0) {
       return `เมื่อวานนี้`;
    } else if (hour > 1 && hour <= 24) {
      return `${hour} ชั่วโมง`;
    } else if (hour !== 0) {
       return `${hour} ชั่วโมง`;
    } else if (minute > 1) {
       return `${minute}นาที`;
    } else if (minute === 1) {
      return `${minute} นาที`;
    } else if (second !== 0) {
       return 'เมื่อครู่นี้';
    }
    return 'เมื่อครู่นี้';
  }
const Index = ({ List }) => {
  const router = useRouter();
  // console.log(router.query.trackingId);
  const [prod, setProd] = useState(List);

  const [updateTstatus, { loading, error }] = useMutation(UPDATE, {
    onCompleted: (data) => {
 
        window.location.reload(false);
    },
    refetchQueries: [
      {
        query: QUERY,
      },
    ],
    
  }
  );

  const handleSubmit = async () => {
    try {
      await handleClose;
      await updateTstatus({
        variables: {
          ...prod,
        },
      });
    } catch (error) {
      // console.log(error);
    }
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <tr key={prod.id} style={{ textAlign: "center" }}>
                <td> {prod.numkun} </td>
                <td> {prod.numcow}</td>
                <td>{prod.namecow}</td>
                <td> {prod.pun} </td>
                <td>{
                timeDifference(prod.date.substring(0,10))
                  }</td>
                <td> {prod.numfarmer} </td>
                <td> {prod.statuscow} </td>


    
      </tr>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>ยืนยันการรักษา</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          คุณต้องบันทึกข้อมูลหรือไม่?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            ปิด
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            ยืนยัน
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Index;
