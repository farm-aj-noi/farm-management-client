import React, { useState } from "react";

import { DivFromInsideLeft, Searchinput, Savebutton1 } from "../ExportFrom";

import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Router from "next/router";

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
        });
        MySwal.fire({
          icon: "success",
          title: "สำเร็จ",
          text: "ทำการเบิกออกคลังชิ้นเนื้อเสร็จสิ้น",
          confirmButtonText: (
            <span
              onClick={() =>
                Router.reload("beefwarehouse/beefstore/export/export_querters")
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
        setExportquarterInfo({
          barcode: "",
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
        </form>
      </div>
    </>
  );
};

export default Submit_Export;
