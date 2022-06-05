import React, { useState } from "react";

import { Table } from "react-bootstrap";

import {
  DivFrom,
  DivFromTop,
  DivFromDown,
  HeaderColor,
  Searchinput,
} from "../SettingFrom";
import { DivBase } from "../../../../../utils/divBase";
import {
  Savebuttoncolor,
  Editbuttoncolor,
  Removebuttoncolor,
} from "../../../../../utils/buttonColor";

import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";
import { iosSearchStrong } from "react-icons-kit/ionicons/iosSearchStrong";

import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Nav_setting from "../Nav_setting";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Router from "next/router";

export const CREATEEXDATE = gql`
  mutation CREATEEXDATE($totalday: String) {
    createExpdatesetting(totalday: $totalday) {
      id
      totalday
    }
  }
`;

export const QUERYCARDIM = gql`
  query Query($exp: String) {
    Card8h(exp: $exp) {
      id
      user {
        name
      }
      halve {
        id
        weightwarm
        weightcool
        barcode
        status {
          nameTH
        }
        imslaughter {
          numcow
          namefarmer
        }
        beeftype {
          nameTH
          code
        }
      }
    }
  }
`;

export const QUERYLISTEXDATE = gql`
  query QUERYLISTEXDATE {
    listExpSetting {
      id
      totalday
    }
  }
`;

const index = () => {
  const MySwal = withReactContent(Swal);
  const { data } = useQuery(QUERYLISTEXDATE);
  const [idinfo, setidinfo] = useState("");
  const { data: exim } = useQuery(QUERYCARDIM, {
    variables: { id: idinfo },
  });
  console.log(idinfo);
  const [infoexdate, setinfoexdate] = useState({
    totalday: "",
  });
  const [createExpdatesetting, { loading, error }] = useMutation(CREATEEXDATE, {
    variables: {
      totalday: infoexdate.totalday,
    },
    onCompleted: (data) => {
      if (data) {
        setinfoexdate({
          totalday: "",
        });
        setidinfo(data.createExpdatesetting.id);
        MySwal.fire({
          icon: "success",
          title: "สำเร็จ",
          text: "ตั้งค่าระยะแจ้งเตือนเสร็จสิ้น",
          confirmButtonText: (
            <span
              onClick={() =>
                Router.reload("beefwarehouse/beefstore/setting/chillroom")
              }
            >
              ตกลง
            </span>
          ),
          confirmButtonColor: "#3085d6",
        });
      }
    },
    onError: (error) => {
      if (error) {
        setinfoexdate({
          totalday: "",
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
    setinfoexdate({
      ...infoexdate,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await createExpdatesetting();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DivBase>
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
          gridTemplateColumns: "1fr 200px 1000px 1fr",
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
            gridRowEnd: "3",
            gridColumnStart: "3",
            marginTop: "0px",
          }}
        >
          <DivFromTop>
            <div style={{ margin: "-3px 5px 0px 0px" }}>
              <Icon size={20} icon={list} />
            </div>
            ตั้งค่าวันใกล้หมดอายุ
          </DivFromTop>
          <DivFromDown>
            <div>
              ระยะเวลาแจ้งเตือน : {}
              <Searchinput
                type="text"
                id="totalday"
                name="totalday"
                value={infoexdate.totalday}
                onChange={handleChange}
                style={{ width: "150px", textAlign: "center" }}
              />
              วัน
              <Savebuttoncolor
                style={{
                  height: "38px",
                  width: " 50px",
                  marginLeft: "10px",
                  backgroundColor: `${!infoexdate.totalday ? "gray" : ""}`,
                }}
                disabled={!infoexdate.totalday}
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
            gridRowStart: "2",
            gridColumnStart: "3",
            marginTop: "0px",
          }}
        >
          <DivFromTop>
            <div style={{ margin: "-3px 5px 0px 0px" }}>
              <Icon size={20} icon={list} />
            </div>
            บันทึกตั้งค่าวันใกล้หมดอายุซากโคผ่าซีก
          </DivFromTop>
          <DivFromDown>
            <div>
              ระยะเวลาแจ้งเตือน : {}
              <Searchinput
                type="text"
                id="totalday"
                name="totalday"
                value={infoexdate.totalday}
                onChange={handleChange}
                style={{ width: "150px", textAlign: "center" }}
              />
              วัน
              <Savebuttoncolor
                style={{
                  height: "38px",
                  width: " 50px",
                  marginLeft: "10px",
                  backgroundColor: `${!infoexdate.totalday ? "gray" : ""}`,
                }}
                disabled={!infoexdate.totalday}
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
            gridRowStart: "3",

            gridColumnStart: "3",
            marginTop: "0px",
          }}
        >
          <DivFromTop>
            <div style={{ margin: "-3px 5px 0px 0px" }}>
              <Icon size={20} icon={list} />
            </div>
            ตั้งค่าวันใกล้หมดอายุ
          </DivFromTop>
          <DivFromDown>
            <div>
              ระยะเวลาแจ้งเตือน : {}
              <select
                name="id"
                id="id"
                onChange={(event) => setidinfo(event.target.value)}
                style={{
                  height: "38px",
                  width: "100px",
                  border: "1px solid #AFAFAF",
                  borderRadius: "4px",
                  textAlign: "center",
                  fontSize: "14px",
                  marginRight: "6px",
                }}
              >
                {data &&
                  data.listExpSetting.map((prod) => (
                    <option key={prod.id} value={prod.id}>
                      {prod.totalday}
                    </option>
                  ))}
              </select>
              วัน
              <Savebuttoncolor
                style={{
                  height: "38px",
                  width: " 50px",
                  marginLeft: "10px",
                  backgroundColor: `${!infoexdate.totalday ? "gray" : ""}`,
                }}
                disabled={!infoexdate.totalday}
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
            gridRowStart: "4",

            gridColumnStart: "3",
            marginTop: "0px",
          }}
        >
          <DivFromTop>
            <div style={{ margin: "-3px 5px 0px 0px" }}>
              <Icon size={20} icon={list} />
            </div>
            ตั้งค่าวันใกล้หมดอายุ
          </DivFromTop>
          <DivFromDown>
            <div>
              ระยะเวลาแจ้งเตือน : {}
              <Searchinput
                type="text"
                id="totalday"
                name="totalday"
                value={infoexdate.totalday}
                onChange={handleChange}
                style={{ width: "150px", textAlign: "center" }}
              />
              วัน
              <Savebuttoncolor
                style={{
                  height: "38px",
                  width: " 50px",
                  marginLeft: "10px",
                  backgroundColor: `${!infoexdate.totalday ? "gray" : ""}`,
                }}
                disabled={!infoexdate.totalday}
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
            gridRowStart: "5",

            gridColumnStart: "3",
            marginTop: "0px",
          }}
        >
          <DivFromTop>
            <div style={{ margin: "-3px 5px 0px 0px" }}>
              <Icon size={20} icon={list} />
            </div>
            ตั้งค่าวันใกล้หมดอายุ
          </DivFromTop>
          <DivFromDown>
            <div>
              ระยะเวลาแจ้งเตือน : {}
              <Searchinput
                type="text"
                id="totalday"
                name="totalday"
                value={infoexdate.totalday}
                onChange={handleChange}
                style={{ width: "150px", textAlign: "center" }}
              />
              วัน
              <Savebuttoncolor
                style={{
                  height: "38px",
                  width: " 50px",
                  marginLeft: "10px",
                  backgroundColor: `${!infoexdate.totalday ? "gray" : ""}`,
                }}
                disabled={!infoexdate.totalday}
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
            gridRowStart: "6",

            gridColumnStart: "3",
            marginTop: "0px",
          }}
        >
          <DivFromTop>
            <div style={{ margin: "-3px 5px 0px 0px" }}>
              <Icon size={20} icon={list} />
            </div>
            ตั้งค่าวันใกล้หมดอายุ
          </DivFromTop>
          <DivFromDown>
            <div>
              ระยะเวลาแจ้งเตือน : {}
              <Searchinput
                type="text"
                id="totalday"
                name="totalday"
                value={infoexdate.totalday}
                onChange={handleChange}
                style={{ width: "150px", textAlign: "center" }}
              />
              วัน
              <Savebuttoncolor
                style={{
                  height: "38px",
                  width: " 50px",
                  marginLeft: "10px",
                  backgroundColor: `${!infoexdate.totalday ? "gray" : ""}`,
                }}
                disabled={!infoexdate.totalday}
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
            gridRowStart: "7",
            gridColumnStart: "3",
            marginTop: "0px",
          }}
        >
          <DivFromTop>
            <div style={{ margin: "-3px 5px 0px 0px" }}>
              <Icon size={20} icon={list} />
            </div>
            ตั้งค่าวันใกล้หมดอายุ
          </DivFromTop>
          <DivFromDown>
            <div>
              ระยะเวลาแจ้งเตือน : {}
              <Searchinput
                type="text"
                id="totalday"
                name="totalday"
                value={infoexdate.totalday}
                onChange={handleChange}
                style={{ width: "150px", textAlign: "center" }}
              />
              วัน
              <Savebuttoncolor
                style={{
                  height: "38px",
                  width: " 50px",
                  marginLeft: "10px",
                  backgroundColor: `${!infoexdate.totalday ? "gray" : ""}`,
                }}
                disabled={!infoexdate.totalday}
                onClick={handleSubmit}
              >
                บันทึก
              </Savebuttoncolor>
            </div>
          </DivFromDown>
        </DivFrom>
      </DivBase>
    </DivBase>
  );
};

export default index;
