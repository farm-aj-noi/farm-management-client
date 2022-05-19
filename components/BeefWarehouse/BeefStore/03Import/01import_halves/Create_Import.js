import React, { useState } from "react";

import { DivFromInsideLeft, Searchinput, Savebutton1 } from "../ImportFrom";

import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Router from "next/router";

export const CREATEIMPORTHALVE = gql`
  mutation CREATEIMPORTHALVE($barcode: String!, $beefstore: String!) {
    createImHalve(barcode: $barcode, beefstore: $beefstore) {
      id
      importdate
    }
  }
`;
const Create_Import = () => {
  const MySwal = withReactContent(Swal);

  const [ImporthalvesInfo, setImporthalvesInfo] = useState({
    barcode: "",
    beefstore: "6284d7035415c34e54b2fc2c",
  });
  const [success, setSuccess] = useState(false);
  const [createImHalve, { loading, error }] = useMutation(CREATEIMPORTHALVE, {
    variables: { ...ImporthalvesInfo },
    onCompleted: (data) => {
      if (data) {
        setSuccess(true);
        setImporthalvesInfo({
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
        setImporthalvesInfo({
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
                value={ImporthalvesInfo.barcode}
                onChange={handleChange}
              />
            </div>
          </DivFromInsideLeft>
          <DivFromInsideLeft>
            ตำแหน่ง :
            <div
              style={{
                display: "grid",
                gridTemplateRows: "1fr 15px",
              }}
            >
              <div style={{ display: "inline", width: "170px" }}>
                <select
                  name="room"
                  id="room"
                  style={{
                    height: "35px",
                    width: "50px",
                    border: "1px solid #AFAFAF",
                    borderRadius: "4px 0px 0px 4px",
                    textAlign: "center",
                    fontSize: "14px",
                  }}
                >
                  <option value="">ห้อง</option>
                  <option value="">1</option>
                  <option value="">2</option>
                  <option value="">3</option>
                </select>
                <select
                  name="shelf"
                  id="shelf"
                  style={{
                    height: "35px",
                    width: "50px",
                    border: "1px solid #AFAFAF",
                    borderLeft: "none",
                    textAlign: "center",
                    fontSize: "14px",
                  }}
                >
                  <option value="">ชั้น</option>
                  <option value="">1</option>
                  <option value="">2</option>
                  <option value="">3</option>
                </select>
                <select
                  name="bucket"
                  id="bucket"
                  style={{
                    height: "35px",
                    width: "60px",
                    border: "1px solid #AFAFAF",
                    borderRadius: "0px 4px 4px 0px",
                    borderLeft: "none",
                    textAlign: "center",
                    fontSize: "14px",
                    marginRight: "10px",
                  }}
                >
                  <option value="">ตะกร้า</option>
                  <option value="">1</option>
                  <option value="">2</option>
                  <option value="">3</option>
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

export default Create_Import;
