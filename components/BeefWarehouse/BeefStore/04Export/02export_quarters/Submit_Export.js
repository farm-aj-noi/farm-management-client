import React, { useState } from "react";

import { DivFromInsideLeft, Searchinput, Savebutton1 } from "../ExportFrom";

import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Router from "next/router";
import { EXPORTQUARTERSEARCH } from "./index"

export const CREATEEXPORTQUARTER = gql`
  mutation Mutation($barcode: String, $storestatus: String, $exporter: String) {
    createExportq(
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

const Submit_Export = () => {
  const MySwal = withReactContent(Swal);
  const [ExportquarterInfo, setExportquarterInfo] = useState({
    barcode: "",
    storestatus: "",
    exporter: "",
  });
  const [successs, setSuccess] = useState(false);
  const [createExporth, { loading, error }] = useMutation(CREATEEXPORTQUARTER, {
    variables: { ...ExportquarterInfo },
    onCompleted: (data) => {
      if (data) {
        setSuccess(true);
        setExportquarterInfo({
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
            /* Router.reload("beefwarehouse/beefstore/export/export_querters") */
          }
          /* if (result.isConfirmed) {
            Router.reload("beefwarehouse/beefstore/import/import_halves")
          } */
        });
      }
    },
    refetchQueries: [
      {
        query: EXPORTQUARTERSEARCH,
        beeftype: "",
        startdate: "",
        enddate: "",
        userName: "",
        exporter: "",
        exportstatus: ""
      }
    ]
  });

  const handleChange = (e) => {
    setExportquarterInfo({
      ...ExportquarterInfo,
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
                value={ExportquarterInfo.barcode}
                onChange={handleChange}
                style={{
                  borderColor: `${!ExportquarterInfo.barcode ? "red" : ""}`,
                  height: "35px"
                }}
              />
              {!ExportquarterInfo.barcode ? (
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
                  disabled={!ExportquarterInfo.barcode}
                  name="storestatus"
                  value={ExportquarterInfo.storestatus}
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
                  <option value="6281fb683dd2ff4e1495d6bd">
                    นำตัดเเต่ง(ก้อนเนื้อ)
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
                  value={ExportquarterInfo.exporter}
                  onChange={handleChange}
                  disabled={!ExportquarterInfo.storestatus}
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
                  {ExportquarterInfo.storestatus === "6280fac6d3dbf7345093676f" ? (
                    <>
                      {/* <option value="admin">Admin</option> */}
                      <option value="seller">Seller</option>
                    </>
                  ) : (
                    ExportquarterInfo.storestatus === "6281fb683dd2ff4e1495d6bd" ? (
                      <>
                        {/* <option value="admin">Admin</option> */}
                        <option value="Slaughter">Slaughter</option>
                      </>
                    ) : ("")
                  )}
                </select>
              </div>
            </div>
          </DivFromInsideLeft>
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
              !ExportquarterInfo.barcode ||
              !ExportquarterInfo.exporter ||
              !ExportquarterInfo.storestatus
            }
            style={{
              backgroundColor: `${!ExportquarterInfo.barcode ||
                !ExportquarterInfo.exporter ||
                !ExportquarterInfo.storestatus
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
