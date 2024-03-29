import React, { useState } from "react";

import { Table } from "react-bootstrap";
import {
  DivFrom,
  DivFromTop,
  DivFromDown,
  HeaderColor,
  Searchinput,
} from "../SettingFrom";
import {
  Savebuttoncolor,
  Editbuttoncolor,
  Removebuttoncolor,
} from "../../../../../utils/buttonColor";

import { DivBase } from "../../../../../utils/divBase";

import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";
import { cog } from 'react-icons-kit/entypo/cog'

import { iosSearchStrong } from "react-icons-kit/ionicons/iosSearchStrong";

import Nav_setting from "../Nav_setting";

import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Router from "next/router";

import ListChill from "./listChill";
import ListChillroom from "./listChillroom";

export const CREATECHILLDAY = gql`
  mutation CREATECHILLDAY($day: String) {
    createChillday(day: $day) {
      id
      day
    }
  }
`;

export const LISTCHILLDAY = gql`
  query LISTCHILLDAY {
    listChillday {
      day
      id
    }
  }
`;

export const CREATECHILLROOM = gql`
  mutation CREATECHILLROOM($roomnum: String) {
    creatChillroom(roomnum: $roomnum) {
      id
      roomnum
    }
  }
`;

export const QUERYCHILLROOM = gql`
  query QUERYCHILLROOM {
    listChillroom {
      id
      roomnum
    }
  }
`;

const index = () => {
  const MySwal = withReactContent(Swal);
  const { data } = useQuery(LISTCHILLDAY);
  const { data: datachillroom } = useQuery(QUERYCHILLROOM);
  const [chillday, setChillday] = useState({
    day: "",
  });
  const [chillroom, setChillroom] = useState({
    roomnum: "",
  });
  const [createChillroom, { loading, error }] = useMutation(CREATECHILLROOM, {
    variables: {
      roomnum: chillroom.roomnum,
    },
    onCompleted: (data) => {
      if (data) {
        setChillroom({
          roomnum: "",
        });
        MySwal.fire({
          icon: "success",
          title: "สำเร็จ",
          text: "ตั้งค่าห้องบ่มเสร็จสิ้น",
          showConfirmButton: false,
          timer: 1000
          /*  confirmButtonText: "ตกลง", */
          /* confirmButtonColor: "#3085d6", */
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            Router.push("beefwarehouse/beefstore/setting/chillroom").then(() => Router.reload())
          }
          /* if (result.isConfirmed) {
            Router.reload("beefwarehouse/beefstore/import/import_halves")
          } */
        });
      }
    },
  });

  const handleChange1 = (e) => {
    setChillroom({
      ...chillroom,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit1 = async (e) => {
    try {
      e.preventDefault();
      await createChillroom();
    } catch (error) {
      console.log(error);
    }
  };

  const [createChillday] = useMutation(CREATECHILLDAY, {
    variables: {
      day: chillday.day,
    },
    onCompleted: (data) => {
      if (data) {
        setChillday({
          day: "",
        });
        MySwal.fire({
          icon: "success",
          title: "สำเร็จ",
          text: "ตั้งค่าระยะเวลาบ่มเสร็จสิ้น",
          showConfirmButton: false,
          timer: 1000
          /*  confirmButtonText: "ตกลง", */
          /* confirmButtonColor: "#3085d6", */
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            Router.push("beefwarehouse/beefstore/setting/chillroom").then(() => Router.reload())
          }
          /* if (result.isConfirmed) {
            Router.reload("beefwarehouse/beefstore/import/import_halves")
          } */
        });
      }
    },
    onError: (error) => {
      if (error) {
        setChillday({
          barcode: "",
        });
        MySwal.fire({
          icon: "error",
          title: <p>{error.graphQLErrors[0].message}</p>,
          text: "กรุณากรอกข้อมูลใหม่อีกครั้ง",
          confirmButtonText: <span>ตกลง</span>,
          confirmButtonColor: "#3085d6",
        });
      }
    },
  });

  const handleChange = (e) => {
    setChillday({
      ...chillday,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await createChillday();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <HeaderColor
          style={{
            width: "fit-content",
            height: "fit-content",
            padding: "5px 30px",
          }}
        >
          การตั้งค่า
        </HeaderColor>
      </div>
      <DivBase
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 200px 350px 350px 1fr",
          gridRowGap: "15px",
          gridColumnGap: "20px",
          textAlign: "start",
        }}
      >
        <DivFrom
          style={{
            width: "100%",
            marginTop: "0",
            gridRowStart: "2",
            gridRowEnd: "5",
            gridColumnStart: "2",
          }}
        >
          <Nav_setting />
        </DivFrom>
        <DivFrom
          style={{
            width: "100%",
            gridRowStart: "2",
            gridRowEnd: "2",
            gridColumnStart: "3",
            marginTop: "0px",
          }}
        >
          <DivFromTop>
            <div style={{ margin: "-3px 5px 0px -5px" }}>
              <Icon size={20} icon={cog} />
            </div>
            บันทึกตั้งค่าระยะเวลาบ่ม
          </DivFromTop>
          <DivFromDown>
            <div>
              ระยะเวลาบ่ม : { }
              <Searchinput
                type="text"
                id="day"
                name="day"
                value={chillday.day}
                onChange={handleChange}
                style={{ width: "150px", textAlign: "center" }}
              />
              วัน
              <Savebuttoncolor
                style={{
                  height: "38px",
                  width: " 50px",
                  marginLeft: "10px",
                  backgroundColor: `${!chillday.day ? "gray" : ""}`,
                }}
                disabled={!chillday.day}
                onClick={handleSubmit}
              >
                บันทึก
              </Savebuttoncolor>
            </div>
          </DivFromDown>
        </DivFrom>
        <DivFrom
          style={{
            width: "100%",
            marginTop: "0",
            gridRowStart: "2",
            gridRowEnd: "2",
            gridColumnStart: "4",
          }}
        >
          <DivFromTop>
            <div style={{ margin: "-3px 5px 0px -5px" }}>
              <Icon size={20} icon={cog} />
            </div>
            บันทึกตั้งค่าห้องบ่ม
          </DivFromTop>
          <DivFromDown>
            <>
              <div>
                ชื่อห้องบ่ม : { }
                <Searchinput
                  type="text"
                  id="roomnum"
                  name="roomnum"
                  value={chillroom.roomnum}
                  onChange={handleChange1}
                  style={{ width: "150px", textAlign: "center" }}
                />
                <Savebuttoncolor
                  style={{
                    height: "38px",
                    width: " 50px",
                    marginLeft: "10px",
                    backgroundColor: `${!chillroom.roomnum ? "gray" : ""}`,
                  }}
                  disabled={!chillroom.roomnum}
                  onClick={handleSubmit1}
                >
                  บันทึก
                </Savebuttoncolor>
              </div>
            </>
          </DivFromDown>
        </DivFrom>
        <DivFrom
          style={{
            width: "100%",
            gridRowStart: "3",
            gridRowEnd: "3",
            gridColumnStart: "3",
            marginTop: "0px",
          }}
        >
          <DivFromTop>
            <div style={{ margin: "-3px 5px 0px 0px" }}>
              <Icon size={20} icon={list} />
            </div>
            รายการระยะเวลาบ่ม
          </DivFromTop>
          <DivFromDown>
            <Table striped bordered responsive hover style={{ margin: "auto" }}>
              <thead>
                <tr style={{ textAlign: "center", fontSize: "18px" }}>
                  <th>ระยะเวลาบ่ม</th>
                  <th>ลบ</th>
                </tr>
              </thead>
              <tbody>
                {data && data.listChillday.length > 0 ? (data.listChillday.map((prod) => (
                  <ListChill key={prod.id} listchill={prod} />
                ))) : (
                  <tr style={{ textAlign: "center" }}>
                    <td colSpan="2">ไม่พบข้อมูล</td>
                  </tr>
                )
                }
              </tbody>
            </Table>
          </DivFromDown>
        </DivFrom>
        <DivFrom
          style={{
            width: "100%",
            gridRowStart: "3",
            gridRowEnd: "3",
            gridColumnStart: "4",
            marginTop: "0px",
          }}
        >
          <DivFromTop>
            <div style={{ margin: "-3px 5px 0px 0px" }}>
              <Icon size={20} icon={list} />
            </div>
            รายการห้องบ่ม
          </DivFromTop>
          <DivFromDown>
            <Table striped bordered responsive hover style={{ margin: "auto" }}>
              <thead>
                <tr style={{ textAlign: "center", fontSize: "18px" }}>
                  <th>ห้องบ่ม</th>
                  <th>ลบ</th>
                </tr>
              </thead>
              <tbody>
                {datachillroom && datachillroom.listChillroom.length > 0 ? (
                  datachillroom.listChillroom.map((prod) => (
                    <ListChillroom key={prod.id} listchillroom={prod} />
                  ))
                ) : (
                  <tr style={{ textAlign: "center" }}>
                    <td colSpan="2">ไม่พบข้อมูล</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </DivFromDown>
        </DivFrom>
      </DivBase>
    </div >
  );
};

export default index;
