import React, { useState } from "react";

import { DivFromInsideLeft, Searchinput, Savebutton1 } from "../ExportFrom";

import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Router from "next/router";
import { EXPORTCHOPSEARCH } from "./index"


export const CREATEEXPORTCHOP = gql`
  mutation CREATEEXPORTCHOP(
    $barcode: String
    $storestatus: String
    $exporter: String
  ) {
    createExportc(
      barcode: $barcode
      storestatus: $storestatus
      exporter: $exporter
    ) {
      id
      exportdate
      name
    }
  }
`;
export const LISTREQUEST = gql`
  query LISTREQUEST {
    listRequestEx {
      id
      name
    }
  }
`;
const Submit_Export = () => {
  const MySwal = withReactContent(Swal);
  const { data: requestdata } = useQuery(LISTREQUEST);
  const [ExportchopInfo, setExportchopInfo] = useState({
    barcode: "",
    storestatus: "",
    exporter: "",
  });
  const [successs, setSuccess] = useState(false);
  const [createExportc, { loading, error }] = useMutation(CREATEEXPORTCHOP, {
    variables: { ...ExportchopInfo },
    onCompleted: (data) => {
      if (data) {
        setSuccess(true);
        setExportchopInfo({
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
            /* Router.reload("beefwarehouse/beefstore/export/export_chops") */
          }
          /* if (result.isConfirmed) {
            Router.reload("beefwarehouse/beefstore/import/import_halves")
          } */
        });
      }
    },
    refetchQueries: [
      {
        query: EXPORTCHOPSEARCH,
        variables: {
          beeftype: "",
          startdate: "",
          enddate: "",
          userName: "",
          exporter: "",
          exportstatus: ""
        }
      }
    ]
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
                value={ExportchopInfo.barcode}
                onChange={handleChange}
                style={{
                  borderColor: `${!ExportchopInfo.barcode ? "red" : ""}`,
                  height: "35px"
                }}
              />
              {!ExportchopInfo.barcode ? (
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
                  disabled={!ExportchopInfo.barcode}
                  name="storestatus"
                  value={ExportchopInfo.storestatus}
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
                  <option value="6280fac6d3dbf7345093676f">นำจำหน่าย</option>
                  <option value="62821d931768cd521052118b">นำแปรรูป</option>
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
                  disabled={!ExportchopInfo.storestatus}
                  name="exporter"
                  value={ExportchopInfo.exporter}
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
                  <option value="">รายชื่อ</option>
                  {ExportchopInfo.storestatus === "6280fac6d3dbf7345093676f" ? (
                    <>
                      {/*  <option value="admin">Admin</option> */}
                      <option value="seller">Seller</option>
                    </>
                  ) : (
                    ExportchopInfo.storestatus === "62821d931768cd521052118b" ? (
                      <>
                        {/* <option value="admin">Admin</option> */}
                        <option value="productstoreman">Productstoreman</option>
                      </>
                    ) : ("")
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
              !ExportchopInfo.barcode ||
              !ExportchopInfo.exporter ||
              !ExportchopInfo.storestatus
            }
            style={{
              backgroundColor: `${!ExportchopInfo.barcode ||
                !ExportchopInfo.exporter ||
                !ExportchopInfo.storestatus
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
