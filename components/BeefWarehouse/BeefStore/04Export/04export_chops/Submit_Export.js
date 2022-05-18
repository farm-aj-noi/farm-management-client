import React, { useState } from "react";

import { DivFromInsideLeft, Searchinput, Savebutton1 } from "../ExportFrom";

import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Router from "next/router";

export const CREATEEXPORTCHOP = gql`
  mutation CREATEEXPORTCHOP($barcode: String, $storestatus: String) {
    createExportc(barcode: $barcode, storestatus: $storestatus) {
      id
      exportdate
      name
    }
  }
`;

const Submit_Export = () => {
  const MySwal = withReactContent(Swal);
  const [ExportchopInfo, setExportchopInfo] = useState({
    barcode: "",
    storestatus: "",
    beeftypechange: "5f338f035f7703096453abb8",
  });
  const [successs, setSuccess] = useState(false);
  const [createExportc, { loading, error }] = useMutation(CREATEEXPORTCHOP, {
    variables: { ...ExportchopInfo },
    onCompleted: (data) => {
      if (data) {
        setSuccess(true);
        setExportchopInfo({
          barcode: "",
        });
        MySwal.fire({
          icon: "success",
          title: "สำเร็จ",
          text: "ทำการนำเข้าคลังชิ้นเนื้อเสร็จสิ้น",
          confirmButtonText: (
            <span
              onClick={() =>
                Router.reload("beefwarehouse/beefstore/export/export_chops")
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
        setExportchopInfo({
          barcode: "",
        });
        MySwal.fire({
          icon: "error",
          title: <p>eeee</p>,
          text: "กรุณากรอกบาร์โค้ดใหม่อีกครั้ง",
          confirmButtonText: <span>ตกลง</span>,
          confirmButtonColor: "#3085d6",
        });
      }
    },
  });

  const handleChange = (e) => {
    setExportchopInfo({
      ...ExportchopInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await createExportc();
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
                value={ExportchopInfo.barcode}
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
                  <option value="6281fb683dd2ff4e1495d6bd">
                    นำตัดเเต่ง(ก้อนเนื้อ)
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
