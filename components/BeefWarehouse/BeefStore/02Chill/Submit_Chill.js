import React, { useState } from "react";

import { DivFromInsideLeft, Searchinput, Savebutton1 } from "./ChillFrom";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Router from "next/router";

import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";

import { CHILLSEARCHLIST } from "./index"



export const CREATECHILLS = gql`
  mutation CREATECHILLS(
    $barcode: String
    $chillroom: String
    $chillday: String
  ) {
    createChill(barcode: $barcode, chillroom: $chillroom, chillday: $chillday) {
      id
      chilldateStart
      chilldateEnd
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

export const LISTCHILLROOM = gql`
  query QUERYCHILLROOM {
    listChillroom {
      id
      roomnum
    }
  }
`;

const Submit_Chill = () => {
  const MySwal = withReactContent(Swal);
  const { data: chillroom } = useQuery(LISTCHILLROOM);
  const { data } = useQuery(LISTCHILLDAY);
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
          chillroom: "",
          chillday: "",
        });
        MySwal.fire({
          icon: "success",
          title: "สำเร็จ",
          text: "ทำการบ่มซากเสร็จสิ้น",
          showConfirmButton: false,
          timer: 1000
          /*  confirmButtonText: "ตกลง", */
          /* confirmButtonColor: "#3085d6", */
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            /* Router.reload("beefwarehouse/beefstore/chill") */
          }
          /* if (result.isConfirmed) {
            Router.reload("beefwarehouse/beefstore/import/import_halves")
          } */
        });
      }
    },
    refetchQueries: [
      {
        query: CHILLSEARCHLIST,
        variables: {
          beeftype: "",
          startdate: "",
          enddate: "",
          startdate2: "",
          enddate2: "",
          name: "",
          chillstatus: "",
        }
      }
    ]
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
                style={{
                  borderColor: `${!ImportChillInfo.barcode ? "red" : ""}`,
                  height: "35px"
                }}
              />
              {!ImportChillInfo.barcode ? (
                <label style={{ color: "red" }}>กรุณากรอกบาร์โค้ด</label>
              ) : (
                ""
              )}
            </div>
          </DivFromInsideLeft>
          <DivFromInsideLeft style={{ marginTop: "5px" }}>
            ระยะเวลาบ่ม :
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
                    fontSize: "16px",
                  }}
                  disabled={!ImportChillInfo.barcode}
                  name="chillday"
                  value={ImportChillInfo.chillday}
                  onChange={handleChange}
                >
                  <option value="">ระยะเวลาบ่ม</option>
                  {data &&
                    data.listChillday.map((prod) => (
                      <option key={prod.id} value={prod.id}>
                        {prod.day}
                      </option>
                    ))}
                </select>
              </div>
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
                    fontSize: "16px",
                  }}
                  disabled={!ImportChillInfo.chillday || !ImportChillInfo.barcode}
                  name="chillroom"
                  value={ImportChillInfo.chillroom}
                  onChange={handleChange}
                >
                  <option value="">ห้องบ่ม</option>
                  {chillroom &&
                    chillroom.listChillroom.map((prod) => (
                      <option key={prod.id} value={prod.id}>
                        {prod.roomnum}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </DivFromInsideLeft>
        </form>
        {error && (
          <label style={{ color: "red", paddingRight: "10px", marginTop: "5px", marginBottom: "0px" }}>*** {error.graphQLErrors[0].message ? error.graphQLErrors[0].message : "-"}</label>
        )}
        <div
          style={{
            float: "right",
            paddingRight: "10px",
            paddingBottom: "10px",
          }}
        >
          <Savebutton1
            onClick={handleSubmit}
            disabled={
              !ImportChillInfo.barcode ||
              !ImportChillInfo.chillday ||
              !ImportChillInfo.chillroom
            }
            style={{
              backgroundColor: `${!ImportChillInfo.barcode ||
                !ImportChillInfo.chillday ||
                !ImportChillInfo.chillroom
                ? "gray"
                : ""
                }`,
            }}
          >
            บันทึก
          </Savebutton1>
        </div>
      </div>
    </>
  );
};

export default Submit_Chill;
