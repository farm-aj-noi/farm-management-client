import React, { useState } from "react";

import { DivFromInsideLeft, Searchinput, Savebutton1 } from "./ChillFrom";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Router from "next/router";

import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

export const CREATECHILLS = gql`
  mutation CREATECHILLS(
    $barcode: String
    $chillroom: String
    $chillday: String
  ) {
    createChill(barcode: $barcode, chillroom: $chillroom, chillday: $chillday) {
      id
      chilldate
    }
  }
`;

const Submit_Chill = () => {
  const MySwal = withReactContent(Swal);

  const [ImportChillInfo, setChillInfo] = useState({
    barcode: "",
    chillroom: "",
    chillday: "",
  });
  const [success, setSuccess] = useState(false);
  const [createChill, { loading, error }] = useMutation(CREATECHILLS, {
    variables: { ...ImportChillInfo },
    onCompleted: (data) => {
      if (data) {
        setSuccess(true);
        setChillInfo({
          barcode: "",
        });
        MySwal.fire({
          icon: "success",
          title: "สำเร็จ",
          text: "ทำการบ่มซากเสร็จสิ้น",
          confirmButtonText: (
            <span
              onClick={() => Router.reload("beefwarehouse/beefstore/chill")}
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
        setChillInfo({
          barcode: "",
        });
        MySwal.fire({
          icon: "error",
          title: <p>เกิดข้อผิดพลาด</p>,
          text: "กรุณากรอกข้อมูลใหม่อีกครั้ง",
          confirmButtonText: <span>ตกลง</span>,
          confirmButtonColor: "#3085d6",
        });
      }
    },
  });

  const handleChange = (e) => {
    setChillInfo({
      ...ImportChillInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await createChill();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <DivFromInsideLeft>
            บาร์โค้ด :
            <div
              style={{
                display: "grid",
                gridTemplateRows: "1fr 15px",
              }}
            >
              <Searchinput
                type="text"
                id="barcode"
                name="barcode"
                value={ImportChillInfo.barcode}
                onChange={handleChange}
              />
            </div>
          </DivFromInsideLeft>
          <DivFromInsideLeft>
            ชื่อผู้บ่ม :
            <div
              style={{
                display: "grid",
                gridTemplateRows: "1fr 15px",
              }}
            >
              <Searchinput />
            </div>
          </DivFromInsideLeft>
          <DivFromInsideLeft>
            วันที่บ่ม :
            <div
              style={{
                display: "grid",
                gridTemplateRows: "1fr 15px",
              }}
            >
              <Searchinput type="text" id="datechill" name="datechill" />
            </div>
          </DivFromInsideLeft>
          <DivFromInsideLeft>
            ระยะเวลาบ่ม :
            <div
              style={{
                display: "grid",
                gridTemplateRows: "1fr 15px",
              }}
            >
              <Searchinput
                type="text"
                id="chillday"
                name="chillday"
                value={ImportChillInfo.chillday}
                onChange={handleChange}
              />
            </div>
          </DivFromInsideLeft>
          <DivFromInsideLeft>
            ห้องบ่ม :
            <div
              style={{
                display: "grid",
                gridTemplateRows: "1fr 15px",
              }}
            >
              <div style={{ display: "inline", width: "170px" }}>
                <select
                  style={{
                    height: "35px",
                    width: "160px",
                    border: "1px solid #AFAFAF",
                    borderRadius: "4px",
                    textAlign: "center",
                    fontSize: "14px",
                  }}
                  id="chillroom"
                  name="chillroom"
                  onChange={handleChange}
                >
                  <option value="">เลือกห้องบ่ม</option>
                  <option value="627e24744627c3040cc91681">1</option>
                  <option value="627e24e59e816d47d491f6db">2</option>
                </select>
              </div>
            </div>
          </DivFromInsideLeft>
          <div
            style={{
              display: "inline-block",
              justifySelf: "right",
              float: "right",
              paddingRight: "10px",
              paddingBottom: "10px",
            }}
          >
            <Savebutton1 disabled={loading}>บันทึก</Savebutton1>
          </div>
        </form>
      </div>
    </>
  );
};

export default Submit_Chill;
