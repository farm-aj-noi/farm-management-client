import React, { useState } from "react";

import { DivFromInsideLeft, Searchinput, Savebutton1 } from "../ExportFrom";

import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Router from "next/router";
import { QUERYEXPORTTLUMP } from "./index"

export const CREATEEXPORTLUMP = gql`
  mutation CREATEEXPORTLUMP(
    $barcode: String
    $storestatus: String
    $exporter: String
  ) {
    createExportl(
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
  const [ExportlumpInfo, setExportlumpInfo] = useState({
    barcode: "",
    storestatus: "",
    exporter: "",
  });
  const [successs, setSuccess] = useState(false);
  const [createExportl, { loading, error }] = useMutation(CREATEEXPORTLUMP, {
    variables: { ...ExportlumpInfo },
    onCompleted: (data) => {
      if (data) {
        setSuccess(true);
        setExportlumpInfo({
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
            /* Router.reload("beefwarehouse/beefstore/export/export_lumps") */
          }
          /* if (result.isConfirmed) {
            Router.reload("beefwarehouse/beefstore/import/import_halves")
          } */
        });
      }
    },
    refetchQueries: [
      {
        query: QUERYEXPORTTLUMP,
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
                value={ExportlumpInfo.barcode}
                onChange={handleChange}
                style={{
                  borderColor: `${!ExportlumpInfo.barcode ? "red" : ""}`,
                  height: "35px"
                }}
              />
              {!ExportlumpInfo.barcode ? (
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
                  disabled={!ExportlumpInfo.barcode}
                  name="storestatus"
                  value={ExportlumpInfo.storestatus}
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
                  <option value="628256c517a02a452889011e">
                    นำตัดเเต่ง(ชิ้นเนื้อ)
                  </option>
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
                  name="exporter"
                  disabled={!ExportlumpInfo.storestatus}
                  value={ExportlumpInfo.exporter}
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
                  {ExportlumpInfo.storestatus === "6280fac6d3dbf7345093676f" ? (
                    <>
                      {/* <option value="admin">Admin</option> */}
                      <option value="seller">Seller</option>
                    </>
                  ) : (
                    ExportlumpInfo.storestatus === "628256c517a02a452889011e" ? (
                      <>
                        {/* <option value="admin">Admin</option> */}
                        <option value="Slaughter">Slaughter</option>
                      </>
                    ) : (
                      ExportlumpInfo.storestatus === "62821d931768cd521052118b" ? (
                        <>
                          {/*  <option value="admin">Admin</option> */}
                          <option value="productstoreman">Productstoreman</option>
                        </>
                      ) : ("")
                    )

                  )}
                </select>
              </div>
            </div>
          </DivFromInsideLeft>
          {/*   productstoreman */}


        </form>
        {error && (
          <label style={{ color: "red", paddingRight: "10px", marginTop: "5px", marginBottom: "0px" }}>*** {error.graphQLErrors[0].message}</label>
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
              !ExportlumpInfo.barcode ||
              !ExportlumpInfo.exporter ||
              !ExportlumpInfo.storestatus
            }
            style={{
              backgroundColor: `${!ExportlumpInfo.barcode ||
                !ExportlumpInfo.exporter ||
                !ExportlumpInfo.storestatus
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
