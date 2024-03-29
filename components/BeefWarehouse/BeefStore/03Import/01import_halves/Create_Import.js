import React, { useState } from "react";

import { DivFromInsideLeft, Searchinput, Savebutton1 } from "../ImportFrom";

import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Router from "next/router";

import { IMPORTHALVESEARCH } from "./index"

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

const Create_Import = () => {
  const MySwal = withReactContent(Swal);

  const { data: dataroom } = useQuery(QUERYROOM);
  const [ImporthalvesInfo, setImporthalvesInfo] = useState({
    barcode: "",
    beefstore: "6284d7035415c34e54b2fc2c",
    beefroom: "",
  });

  const [success, setSuccess] = useState(false);
  const [createImHalve, { loading, error }] = useMutation(CREATEIMPORTHALVE, {
    variables: {
      barcode: ImporthalvesInfo.barcode,
      beefstore: ImporthalvesInfo.beefstore,
      beefroom: ImporthalvesInfo.beefroom,
    },
    onCompleted: (data) => {
      if (data) {
        setSuccess(true);
        setImporthalvesInfo({
          barcode: "",
          beefroom: "",
          beefstore: "6284d7035415c34e54b2fc2c",
        });
        MySwal.fire({
          icon: "success",
          title: "สำเร็จ",
          text: "ทำการนำเข้าคลังชิ้นเนื้อเสร็จสิ้น",
          showConfirmButton: false,
          timer: 1000
          /*  confirmButtonText: "ตกลง", */
          /* confirmButtonColor: "#3085d6", */
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            // Router.reload("beefwarehouse/beefstore/import/import_halves")
          }
          /* if (result.isConfirmed) {
            Router.reload("beefwarehouse/beefstore/import/import_halves")
          } */
        });
      }
    },
    refetchQueries: [
      {
        query: IMPORTHALVESEARCH,
        variables: {
          beeftype: "",
          startdate: "",
          enddate: "",
          namefarmer: "",
          userName: "",
          beefroom: "",
        }
      }
    ]
  });
  /*  console.log(ImporthalvesInfo.barcode); */

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
                name="barcode"
                value={ImporthalvesInfo.barcode}
                onChange={handleChange}
                style={{
                  borderColor: `${!ImporthalvesInfo.barcode ? "red" : ""}`,
                  height: "35px"
                }}
              />

              {!ImporthalvesInfo.barcode && (
                <label style={{ color: "red" }}>กรุณากรอกบาร์โค้ด</label>
              )}
            </div>
          </DivFromInsideLeft>
          <DivFromInsideLeft style={{ marginTop: "5px", marginBottom: "0px" }}>
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
                  disabled={!ImporthalvesInfo.barcode}
                  style={{
                    height: "35px",
                    width: "160px",
                    border: "1px solid #AFAFAF",
                    borderRadius: "4px",
                    textAlign: "center",
                    fontSize: "16px",
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
        </form>
        {error && (
          <label style={{ color: "red", paddingRight: "10px", marginTop: "5px", marginBottom: "0px" }}>*** {error.graphQLErrors[0].message ? error.graphQLErrors[0].message : "-"}</label>
        )}
        <div
          style={{
            paddingRight: "10px",
            paddingBottom: "10px",
            float: "right"
          }}
        >
          <Savebutton1
            disabled={!ImporthalvesInfo.barcode || !ImporthalvesInfo.beefroom}
            style={{
              backgroundColor: `${!ImporthalvesInfo.barcode || !ImporthalvesInfo.beefroom
                ? "gray"
                : ""
                }`,
            }}
            onClick={handleSubmit}
          >
            บันทึก
          </Savebutton1>
        </div>
        {/*  <button onClick={test}>กดสิ</button> */}
      </div>
    </>
  );
};

export default Create_Import;
