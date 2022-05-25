import React, { useState } from "react";

import { DivFromInsideLeft, Searchinput, Savebutton1 } from "../ImportFrom";

import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Router from "next/router";
import { NavItem } from "react-bootstrap";

export const ALLHALVELIST = gql`
  query ALLHALVELIST($barcode: String) {
    allhalve(barcode: $barcode) {
      id
      barcode
    }
  }
`;

export const CREATEIMPORTHALVE = gql`
  mutation CREATEIMPORTHALVE(
    $barcode: String!
    $beefstore: String!
    $beefroom: String!
  ) {
    createImHalve(
      barcode: $barcode
      beefstore: $beefstore
      beefroom: $beefroom
    ) {
      id
      importdate
      barcode
    }
  }
`;

export const QUERYROOM = gql`
  query Query {
    allRoom {
      id
      roomname
    }
  }
`;

export const TEST = gql`
  query TEST {
    imhalveSearch {
      id
      barcode
    }
  }
`;

const Create_Import = () => {
  const MySwal = withReactContent(Swal);
  const [barcode, setInputbarcode] = useState("");
  const [test1, test11] = useState("");
  /* console.log(test1); */
  const { data } = useQuery(TEST);
  /*  console.log(data); */

  const { data: halveData } = useQuery(ALLHALVELIST, {
    variables: {
      barcode: barcode,
    },
  });
  const [barcodeAlert, setBarcodeAlert] = useState(false);
  const { data: dataroom } = useQuery(QUERYROOM);
  const [ImporthalvesInfo, setImporthalvesInfo] = useState({
    beefstore: "6284d7035415c34e54b2fc2c",
    beefroom: "",
  });
  const [success, setSuccess] = useState(false);
  const [createImHalve, { loading, error }] = useMutation(CREATEIMPORTHALVE, {
    variables: {
      barcode: barcode,
      beefstore: ImporthalvesInfo.beefstore,
      beefroom: ImporthalvesInfo.beefroom,
    },
    onCompleted: (data) => {
      if (data) {
        setSuccess(true);
        setInputbarcode({
          barcode: "",
        });
        MySwal.fire({
          icon: "success",
          title: "สำเร็จ",
          text: "ทำการนำเข้าคลังชิ้นเนื้อเสร็จสิ้น",
          confirmButtonText: (
            <span
              onClick={() =>
                Router.reload("beefwarehouse/beefstore/import/import_halves")
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
        setInputbarcode({
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
    setImporthalvesInfo({
      ...ImporthalvesInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await createImHalve();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <form>
          <DivFromInsideLeft>
            บาร์โค้ด :
            <div
              style={{
                display: "grid",
                gridTemplateRows: "1fr 15px",
              }}
            >
              <Searchinput
                value={barcode}
                onChange={(event) => {
                  let input = event.target.value;
                  let value = input.replace(/[^A-Za-z0-9]/gi, "");

                  if (input !== value) {
                    setBarcodeAlert(true);
                  } else {
                    setBarcodeAlert(false);
                    setInputbarcode(value);
                  }
                }}
                /*  autoFocus
                onFocus={(e) => e.currentTarget.select()} */
                style={{ borderColor: `${!barcode ? "red" : ""}` }}
              />

              {!barcode && !barcodeAlert ? (
                <label style={{ color: "red" }}>กรุณากรอกบาร์โค้ด</label>
              ) : barcodeAlert ? (
                <label style={{ color: "red" }}>
                  กรุณากรอกตัวเลข,ภาษาอังกฤษ เท่านั้น
                </label>
              ) : (
                halveData &&
                halveData.allhalve === null && (
                  <label style={{ color: "red" }}>ไม่พบข้อมูล</label>
                )
              )}
            </div>
          </DivFromInsideLeft>
          <DivFromInsideLeft style={{ marginTop: "5px" }}>
            ตำแหน่ง :
            <div
              style={{
                display: "grid",
                gridTemplateRows: "1fr 15px",
              }}
            >
              <div style={{ display: "inline", width: "170px" }}>
                <select
                  name="beefroom"
                  id="beefroom"
                  onChange={handleChange}
                  style={{
                    height: "35px",
                    width: "160px",
                    border: "1px solid #AFAFAF",
                    borderRadius: "4px",
                    textAlign: "center",
                    fontSize: "14px",
                  }}
                >
                  <option value="">ห้อง</option>
                  {dataroom &&
                    dataroom.allRoom.map((prod) => (
                      <option key={prod.id} value={prod.id}>
                        {prod.roomname}
                      </option>
                    ))}
                  {/*  <option value="62875e0171c2560f802d9f89">A1</option> */}
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
              margin: "0",
            }}
          >
            <Savebutton1
              disabled={
                !barcode ||
                !ImporthalvesInfo.beefroom ||
                halveData.allhalve === null
              }
              style={{
                backgroundColor: `${
                  !barcode ||
                  !ImporthalvesInfo.beefroom ||
                  halveData.allhalve === null
                    ? "gray"
                    : ""
                }`,
              }}
              onClick={handleSubmit}
            >
              บันทึก
            </Savebutton1>
          </div>
        </form>
      </div>
    </>
  );
};

export default Create_Import;
