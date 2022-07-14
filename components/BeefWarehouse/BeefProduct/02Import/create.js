import React, { useState } from "react";

import { DivFromInsideLeft, Searchinput, Savebutton1 } from "./ImportFrom";

import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Router from "next/router";


const CREATEIMPORTPRODUCT = gql`
mutation CREATEIMPORTPRODUCT($barcode: String, $productstore: String, $productroom: String, $freezer: String, $pbasket: String) {
  createImproduct(barcode: $barcode, productstore: $productstore, productroom: $productroom, freezer: $freezer, pbasket: $pbasket) {
    id
    barcode
  }
}
`

const QUERYROOM = gql`
  query QUERYROOM {
    allproductroom {
      id
      roomname
    }
  }
`;

const QUERYFREEZER = gql`
query Query($id: ID) {
  listFreezer(id: $id) {
    id
    freezername
  }
}
`
const QUERYPBASKET = gql`
query Allpbasket($id: ID) {
  allpbasket(id: $id) {
    id
    basketname
  }
}
`


const create = () => {

  const MySwal = withReactContent(Swal);
  const { data: room } = useQuery(QUERYROOM);
  const [createimproduct, setcreateimproduct] = useState({
    barcode: "",
    productstore: "629cb4035d8e2a65ce3e3800",
    productroom: "",
    freezer: "",
    pbasket: "",
  })

  const { data: freezer } = useQuery(QUERYFREEZER, {
    variables: {
      id: createimproduct.productroom
    }
  })

  const { data: pbasket } = useQuery(QUERYPBASKET, {
    variables: {
      id: createimproduct.freezer
    }
  })

  const [createImproduct] = useMutation(CREATEIMPORTPRODUCT, {
    variables: {
      ...createimproduct
    },
    onCompleted: (data) => {
      if (data) {
        setcreateimproduct({
          barcode: "",
          productroom: "",
          freezer: "",
          pbasket: "",
        })
        MySwal.fire({
          icon: "success",
          title: "สำเร็จ",
          text: "ทำการนำเข้าคลังผลิตภัณฑ์เสร็จสิ้น",
          confirmButtonText: (
            <span
              onClick={() =>
                Router.reload("beefwarehouse/beefproduct/imports")
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
        setcreateimproduct({
          barcode: "",
          productroom: "",
          freezer: "",
          pbasket: "",
        })
        MySwal.fire({
          icon: "error",
          title: <p>{error.graphQLErrors[0].message}</p>,
          text: "กรุณากรอกข้อมูลใหม่อีกครั้ง",
          confirmButtonText: (
            <span
              onClick={() =>
                Router.reload("beefwarehouse/beefproduct/imports")
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
    setcreateimproduct({
      ...createimproduct,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await createImproduct();
    } catch (error) {
      console.log(error);
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
            <Searchinput name="barcode" value={createimproduct.barcode} onChange={handleChange} />
          </div>
        </DivFromInsideLeft>
        <DivFromInsideLeft style={{ marginTop: "5px" }}>
          ตำแหน่ง :
          <div
            style={{
              display: "grid",
              gridTemplateRows: "1fr 15px",
            }}
          >
            <div style={{ display: "inline", width: "170px" }}>
              <select
                name="productroom"
                disabled={!createimproduct.barcode}
                value={createimproduct.productroom}
                onChange={handleChange}
                style={{
                  height: "35px",
                  width: "50px",
                  border: "1px solid #AFAFAF",
                  borderRadius: "4px 0px 0px 4px",
                  textAlign: "center",
                  fontSize: "14px",
                }}
              >
                <option value="">ห้อง</option>
                {room && room.allproductroom.map((prod) => (
                  <option key={prod.id} value={prod.id}>{prod.roomname}</option>
                ))}
              </select>
              <select
                name="freezer"
                value={createimproduct.freezer}
                onChange={handleChange}
                disabled={!createimproduct.barcode || !createimproduct.productroom}
                style={{
                  height: "35px",
                  width: "50px",
                  border: "1px solid #AFAFAF",
                  borderRadius: "0px 0px 0px 0px",
                  borderLeft: "none",
                  textAlign: "center",
                  fontSize: "14px",
                }}
              >
                <option value="">ตู้แช่</option>
                {freezer && freezer.listFreezer.map((prod) => (
                  <option key={prod.id} value={prod.id}>{prod.freezername}</option>
                ))}
              </select>
              <select
                name="pbasket"
                value={createimproduct.pbasket}
                onChange={handleChange}
                disabled={!createimproduct.barcode || !createimproduct.productroom || !createimproduct.freezer}
                style={{
                  height: "35px",
                  width: "60px",
                  border: "1px solid #AFAFAF",
                  borderRadius: "0px 4px 4px 0px",
                  borderLeft: "none",
                  textAlign: "center",
                  fontSize: "14px",
                }}
              >
                <option value="">ชั้นวาง</option>
                {pbasket && pbasket.allpbasket.map((prod) => (
                  <option key={prod.id} value={prod.id}>{prod.basketname}</option>
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
            disabled={!createimproduct.barcode || !createimproduct.productroom || !createimproduct.freezer || !createimproduct.pbasket}
            style={{
              backgroundColor: `${!createimproduct.barcode || !createimproduct.productroom || !createimproduct.freezer || !createimproduct.pbasket
                ? "gray"
                : ""
                }`,
            }}>บันทึก</Savebutton1>
        </div>
      </from>
    </div>
  );
};

export default create;
