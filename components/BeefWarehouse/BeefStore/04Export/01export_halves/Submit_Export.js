import React, { useState } from "react";

import { DivFromInsideLeft, Searchinput, Savebutton1 } from "../ExportFrom";

import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Router from "next/router";

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
          confirmButtonText: (
            <span
              onClick={() =>
                Router.reload("beefwarehouse/beefstore/export/export_halves")
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
        setExporthalvesInfo({
          barcode: "",
          storestatus: "",
          exporter: "",
        });
        MySwal.fire({
          icon: "error",
          title: <p>{error.graphQLErrors[0].message}</p>,
          text: "กรุณากรอกข้อมูลใหม่อีกครั้ง",
          confirmButtonText: <span onClick={() =>
            Router.reload("beefwarehouse/beefstore/export/export_chops")
          }>ตกลง</span>,
          confirmButtonColor: "#3085d6",
        });
      }
    },
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
          {ExporthalvesInfo.storestatus === "6280fac6d3dbf7345093676f" ? (
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
                    disabled={!ExporthalvesInfo.barcode}
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
                    <option value="admin">Admin</option>
                    <option value="seller">Seller</option>
                  </select>
                </div>
              </div>
            </DivFromInsideLeft>
          ) : (
            ExporthalvesInfo.storestatus === "6280fa87d3dbf7345093676e" ? (
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
                      disabled={!ExporthalvesInfo.barcode}
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
                      <option value="admin">Admin</option>
                      <option value="Slaughter">Slaughter</option>
                    </select>
                  </div>
                </div>
              </DivFromInsideLeft>
            ) : (
              ""
            )
          )}
          <div
            style={{
              display: "inline-block",
              justifySelf: "right",
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
        </form>
      </div>
    </>
  );
};

export default Submit_Export;
