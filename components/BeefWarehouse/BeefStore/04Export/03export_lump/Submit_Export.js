import React, { useState } from "react";

import { DivFromInsideLeft, Searchinput, Savebutton1 } from "../ExportFrom";

import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Router from "next/router";

export const CREATEEXPORTLUMP = gql`
  mutation CREATEEXPORTLUMP(
    $barcode: String
    $storestatus: String
    $beeftypechange: String
  ) {
    createExportl(
      barcode: $barcode
      storestatus: $storestatus
      beeftypechange: $beeftypechange
    ) {
      id
      exportdate
      name
    }
  }
`;

const Submit_Export = () => {
  const MySwal = withReactContent(Swal);
  const [ExportlumpInfo, setExportlumpInfo] = useState({
    barcode: "",
    storestatus: "",
    beeftypechange: "5f338f035f7703096453abb8",
  });
  const [successs, setSuccess] = useState(false);
  const [createExportl, { loading, error }] = useMutation(CREATEEXPORTLUMP, {
    variables: { ...ExportlumpInfo },
    onCompleted: (data) => {
      if (data) {
        setSuccess(true);
        setExportlumpInfo({
          barcode: "",
        });
        MySwal.fire({
          icon: "success",
          title: "สำเร็จ",
          text: "ทำการนำเข้าคลังชิ้นเนื้อเสร็จสิ้น",
          confirmButtonText: (
            <span
              onClick={() =>
                Router.reload("beefwarehouse/beefstore/export/export_lumps")
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
        setExportlumpInfo({
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
    setExportlumpInfo({
      ...ExportlumpInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await createExportl();
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
                value={ExportlumpInfo.barcode}
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
                  <option value="628256c517a02a452889011e">
                    นำตัดเเต่ง(ชิ้นเนื้อ)
                  </option>
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
            <Savebutton1 disabled={loading}>บันทึก</Savebutton1>
          </div>
        </form>
      </div>
    </>
  );
};

export default Submit_Export;
