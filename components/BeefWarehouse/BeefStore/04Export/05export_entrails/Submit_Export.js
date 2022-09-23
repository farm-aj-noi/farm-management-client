import React, { useState } from "react";

import { DivFromInsideLeft, Searchinput, Savebutton1 } from "../ExportFrom";

import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Router from "next/router";

export const CREATEEXPORTENTRAIL = gql`
  mutation CREATEEXPORTENTRAIL(
    $barcode: String
    $storestatus: String
    $exporter: String
  ) {
    createExporte(
      barcode: $barcode
      storestatus: $storestatus
      exporter: $exporter
    ) {
      id
      name
      exportdate
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
  const [ExportentrailInfo, setExportentrailInfo] = useState({
    barcode: "",
    storestatus: "6280fac6d3dbf7345093676f",
    exporter: "",
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
          title: <p>{error.graphQLErrors[0].message}</p>,
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
                style={{
                  borderColor: `${!ExportentrailInfo.barcode ? "red" : ""}`,
                }}
              />
              {!ExportentrailInfo.barcode ? (
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
                <Searchinput type="text" disabled value="นำจำหน่าย" style={{ textAlign: "center" }} />
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
                  disabled={!ExportentrailInfo.barcode}
                  value={ExportentrailInfo.exporter}
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
                  {/* <option value="admin">Admin</option>  */}
                  <option value="seller">Seller</option>
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
                !ExportentrailInfo.barcode ||
                !ExportentrailInfo.exporter ||
                !ExportentrailInfo.storestatus
              }
              style={{
                backgroundColor: `${!ExportentrailInfo.barcode ||
                  !ExportentrailInfo.exporter ||
                  !ExportentrailInfo.storestatus
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
