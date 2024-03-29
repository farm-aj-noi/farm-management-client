import React, { useState } from "react";

import { DivFromInsideLeft, Searchinput, Savebutton1 } from "../ExportFrom";

import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Router from "next/router";
import { EXPORTHALVESSEARCH } from "./index"

export const CREATEEXPORTHALVE = gql`
  mutation Mutation($barcode: String, $storestatus: String, $exporter: String) {
    createExporth(
      barcode: $barcode
      storestatus: $storestatus
      exporter: $exporter
    ) {
      id
    }
  }
`;



const Submit_Export = () => {
  const MySwal = withReactContent(Swal);
  const [ExporthalvesInfo, setExporthalvesInfo] = useState({
    barcode: "",
    storestatus: "",
    exporter: "",
  });
  const [successs, setSuccess] = useState(false);
  const [createExporth, { loading, error }] = useMutation(CREATEEXPORTHALVE, {
    variables: { ...ExporthalvesInfo },
    onCompleted: (data) => {
      if (data) {
        setSuccess(true);
        setExporthalvesInfo({
          barcode: "",
          storestatus: "",
          exporter: "",
        });
        MySwal.fire({
          icon: "success",
          title: "สำเร็จ",
          text: "ทำการเบิกออกคลังชิ้นเนื้อเสร็จสิ้น",
          showConfirmButton: false,
          timer: 1000
          /*  confirmButtonText: "ตกลง", */
          /* confirmButtonColor: "#3085d6", */
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            /* Router.reload("beefwarehouse/beefstore/export/export_halves") */
          }
          /* if (result.isConfirmed) {
            Router.reload("beefwarehouse/beefstore/import/import_halves")
          } */
        });
      }
    },
    refetchQueries: [
      {
        query: EXPORTHALVESSEARCH,
        variables: {
          beeftype: "",
          startdate: "",
          enddate: "",
          userName: "",
          exporter: "",
          exportstatus: "",
        }
      }
    ]

  });

  const handleChange = (e) => {
    setExporthalvesInfo({
      ...ExporthalvesInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await createExporth();
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
                value={ExporthalvesInfo.barcode}
                onChange={handleChange}
                style={{
                  borderColor: `${!ExporthalvesInfo.barcode ? "red" : ""}`,
                  height: "35px",
                }}
              />
              {!ExporthalvesInfo.barcode ? (
                <label style={{ color: "red" }}>กรุณากรอกบาร์โค้ด</label>
              ) : (
                ""
              )}
            </div>
          </DivFromInsideLeft>

          <DivFromInsideLeft style={{ marginTop: "5px" }}>
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
                  value={ExporthalvesInfo.storestatus}
                  disabled={!ExporthalvesInfo.barcode}
                  onChange={handleChange}
                  style={{
                    height: "35px",
                    width: "160px",
                    border: "1px solid #AFAFAF",
                    borderRadius: "4px",
                    textAlign: "center",
                    fontSize: "16px",
                  }}
                >
                  <option value="">เลือกสถานะ</option>
                  <option value="6280fa87d3dbf7345093676e">
                    นำตัดเเต่ง(ซาก4)
                  </option>
                  <option value="6280fac6d3dbf7345093676f">นำจำหน่าย</option>
                </select>
              </div>
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
              <div style={{ display: "inline", width: "170px" }}>
                <select
                  name="exporter"
                  value={ExporthalvesInfo.exporter}
                  onChange={handleChange}
                  disabled={!ExporthalvesInfo.storestatus}
                  style={{
                    height: "35px",
                    width: "160px",
                    border: "1px solid #AFAFAF",
                    borderRadius: "4px",
                    textAlign: "center",
                    fontSize: "16px",
                  }}
                >
                  <option value="">รายชื่อ</option>
                  {ExporthalvesInfo.storestatus === "6280fac6d3dbf7345093676f" ? (
                    <>
                      {/* <option value="admin">Admin</option> */}
                      <option value="seller">Seller</option>
                    </>
                  ) : (
                    ExporthalvesInfo.storestatus === "6280fa87d3dbf7345093676e" ? (
                      <>
                        {/* <option value="admin">Admin</option> */}
                        <option value="Slaughter">Slaughter</option>
                      </>
                    ) : (
                      ""
                    )
                  )}
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
              !ExporthalvesInfo.barcode ||
              !ExporthalvesInfo.exporter ||
              !ExporthalvesInfo.storestatus
            }
            style={{
              backgroundColor: `${!ExporthalvesInfo.barcode ||
                !ExporthalvesInfo.exporter ||
                !ExporthalvesInfo.storestatus
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

export default Submit_Export;
