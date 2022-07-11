import React, { useState } from "react";

import { DivFromInsideLeft, Searchinput, Savebutton1 } from "./ExportFrom";

import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Router from "next/router";

const CREATEEXPORTPRODUCT = gql`
mutation CREATEEXPORTPRODUCT($barcode: String, $storestatus: String, $exporter: String) {
  createExproduct(barcode: $barcode, storestatus: $storestatus, exporter: $exporter) {
    id
  }
}
`

const QUERYNAMERE = gql`
query QUERYNAMERE {
  listRequestExP {
    id
    name
  }
}
`

const create = () => {
  const MySwal = withReactContent(Swal);
  const { data } = useQuery(QUERYNAMERE)
  const [createexproduct, setcreateexproduct] = useState({
    barcode: "",
    storestatus: "629cb4035d8e2a65ce3e3800",
    exporter: "",
  })
  const [createExproduct] = useMutation(CREATEEXPORTPRODUCT, {
    variables: {
      ...createexproduct
    },
    onCompleted: (data) => {
      if (data) {
        setcreateexproduct({
          barcode: "",
          exporter: "",
        })
        MySwal.fire({
          icon: "success",
          title: "สำเร็จ",
          text: "ทำการเบิกออกคลังผลิตภัณฑ์เสร็จสิ้น",
          confirmButtonText: (
            <span
              onClick={() =>
                Router.reload("beefwarehouse/beefproduct/exports")
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
        setcreateexproduct({
          barcode: "",
          exporter: "",
        })
        MySwal.fire({
          icon: "error",
          title: <p>{error.graphQLErrors[0].message}</p>,
          text: "กรุณากรอกข้อมูลใหม่อีกครั้ง",
          confirmButtonText: (
            <span
              onClick={() =>
                Router.reload("beefwarehouse/beefproduct/exports")
              }
            >
              ตกลง
            </span>
          ),
          confirmButtonColor: "#3085d6",
        })
      }
    }
  })

  const handleChange = (e) => {
    setcreateexproduct({
      ...createexproduct,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await createExproduct();
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <from>
        <DivFromInsideLeft>
          บาร์โค้ด :
          <div
            style={{
              display: "grid",
              gridTemplateRows: "1fr 15px",
            }}
          >
            <Searchinput name="barcode" value={createexproduct.barcode}
              onChange={handleChange} />
          </div>
        </DivFromInsideLeft>
        <DivFromInsideLeft style={{ marginTop: "5px" }}>
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
                value={createexproduct.exporter}
                onChange={handleChange}
                style={{
                  height: "35px",
                  width: "160px",
                  border: "1px solid #AFAFAF",
                  borderRadius: "4px",
                  textAlign: "center",
                  fontSize: "14px",
                }}
                disabled={!createexproduct.barcode}
              >
                <option value="">รายชื่อผู้ขอเบิก</option>
                {data && data.listRequestExP.map((prod) => (
                  <option key={prod.id} value={prod.id}>{prod.name}</option>
                ))}
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
          <Savebutton1 onClick={handleSubmit}
            style={{
              backgroundColor: `${!createexproduct.barcode || !createexproduct.exporter
                ? "gray"
                : ""
                }`
            }}
            disabled={!createexproduct.barcode || !createexproduct.exporter}
          >บันทึก</Savebutton1>
        </div>
      </from>
    </div>
  );
};

export default create;
