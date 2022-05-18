import React, { useState } from "react";

import { DivFromInsideLeft, Searchinput, Savebutton1 } from "../ExportFrom";

import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Router from "next/router";

export const CREATEEXPORTENTRAIL = gql`
  mutation CREATEEXPORTENTRAIL($barcode: String, $storestatus: String) {
    createExporte(barcode: $barcode, storestatus: $storestatus) {
      id
      name
      exportdate
    }
  }
`;

const Submit_Export = () => {
  const MySwal = withReactContent(Swal);
  const [ExportentrailInfo, setExportentrailInfo] = useState({
    barcode: "",
    storestatus: "",
    beeftypechange: "",
  });
  const [successs, setSuccess] = useState(false);
  const [createExporte, { loading, error }] = useMutation(CREATEEXPORTENTRAIL, {
    variables: { ...ExportentrailInfo },
    onCompleted: (data) => {
      if (data) {
        setSuccess(true);
        setExportentrailInfo({
          barcode: "",
        });
        MySwal.fire({
          icon: "success",
          title: "สำเร็จ",
          text: "ทำการนำเข้าคลังชิ้นเนื้อเสร็จสิ้น",
          confirmButtonText: (
            <span
              onClick={() =>
                Router.reload("beefwarehouse/beefstore/export/export_entrails")
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
        setExportentrailInfo({
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
    setExportentrailInfo({
      ...ExportentrailInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await createExporte();
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
                type="text"
                id="barcode"
                name="barcode"
                value={ExportentrailInfo.barcode}
                onChange={handleChange}
              />
            </div>
          </DivFromInsideLeft>
          <DivFromInsideLeft>
            ผู้ขอเบิก :
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
            สถานะเบิก :
            <div
              style={{
                display: "grid",
                gridTemplateRows: "1fr 15px",
              }}
            >
              <div style={{ display: "inline", width: "170px" }}>
                <select
                  name="storestatus"
                  onChange={handleChange}
                  style={{
                    height: "35px",
                    width: "100px",
                    border: "1px solid #AFAFAF",
                    borderRadius: "4px",
                    textAlign: "center",
                    fontSize: "14px",
                  }}
                >
                  <option value="">เลือกสถานะ</option>
                  <option value="6280fac6d3dbf7345093676f">นำจำหน่าย</option>
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
            <Savebutton1>บันทึก</Savebutton1>
          </div>
        </form>
      </div>
    </>
  );
};

export default Submit_Export;
