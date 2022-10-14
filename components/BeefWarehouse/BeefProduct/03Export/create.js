import React, { useState } from "react";

import { DivFromInsideLeft, Searchinput, Savebutton1 } from "./ExportFrom";

import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Router from "next/router";
import { EXPRODUCTSEARCH } from "./index"

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
    storestatus: "6280fac6d3dbf7345093676f",
    exporter: "",
  })
  const [createExproduct, { error }] = useMutation(CREATEEXPORTPRODUCT, {
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
          showConfirmButton: false,
          timer: 1000
          /*  confirmButtonText: "ตกลง", */
          /* confirmButtonColor: "#3085d6", */
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            // Router.reload("beefwarehouse/beefstore/import/import_halves")
          }
          /* if (result.isConfirmed) {
            Router.reload("beefwarehouse/beefstore/import/import_halves")
          } */
        });
      }
    },
    refetchQueries: [
      {
        query: EXPRODUCTSEARCH,
        variables: {
          startdate: "",
          enddate: "",
          userName: "",
          producttype: "",
          exporter: "",
        }
      }
    ]
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
      <div>
        <DivFromInsideLeft>
          บาร์โค้ด :
          <div
            style={{
              display: "grid",
              gridTemplateRows: "1fr 15px",
            }}
          >
            <Searchinput name="barcode" value={createexproduct.barcode}
              onChange={handleChange}
              style={{
                borderColor: `${!createexproduct.barcode ? "red" : ""}`,
                height: "35px"
              }} />
            {!createexproduct.barcode && (
              <label style={{ color: "red" }}>กรุณากรอกบาร์โค้ด</label>
            )}
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
                <option value="seller">Seller</option>
                {/*  {data && data.listRequestExP.map((prod) => (
                  <option key={prod.id} value={prod.id}>{prod.name}</option>
                ))} */}
              </select>
            </div>
          </div>
        </DivFromInsideLeft>
        {error && (
          <label style={{ color: "red", paddingRight: "10px", marginTop: "5px", marginBottom: "0px" }}>*** {error.graphQLErrors[0].message ? error.graphQLErrors[0].message : "-"}</label>
        )}
        <div
          style={{
            paddingRight: "10px",
            paddingBottom: "10px",
            float: "right"
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
      </div>
    </div>
  );
};

export default create;
