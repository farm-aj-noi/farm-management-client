import React, { useState } from "react";

import { DivFromInsideLeft, Searchinput, Savebutton1 } from "../ImportFrom";

import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Router from "next/router";
import { IMPORTCHOPSEARCH } from "./index"
import { QUERY_IMCHOPDAY } from "../../07Notify/04notify_import/chopday";
import { STORELIST } from "../../05Store/01Store/index"

export const CREATEIMPORTCHOP = gql`
  mutation CREATEIMPORTCHOP(
    $barcode: String!
    $beefstore: String!
    $beefroom: String!
    $shelf: String
    $basket: String
  ) {
    createImchop(
      barcode: $barcode
      beefstore: $beefstore
      beefroom: $beefroom
      shelf: $shelf
      basket: $basket
    ) {
      id
      importdate
    }
  }
`;

export const QUERYROOM = gql`
  query Query {
    allRoom {
      id
      roomname
    }
  }
`;

export const QUERYSHELF = gql`
  query QUERYSHELF($id: ID) {
    listShelf(id: $id) {
      shelfname
      id
    }
  }
`;

export const QUERYBASKET = gql`
  query QUERYBASKET($id: ID) {
    allBasket(id: $id) {
      id
      basketname
    }
  }
`;

const Create_Import = () => {
  const MySwal = withReactContent(Swal);

  const { data } = useQuery(QUERYROOM);

  const [ImportchopsInfo, setImportchopsInfo] = useState({
    barcode: "",
    beefstore: "6284d7035415c34e54b2fc2c",
    beefroom: "",
    shelf: "",
    basket: "",
  });

  const { data: datashelf } = useQuery(QUERYSHELF, {
    variables: {
      id: ImportchopsInfo.beefroom,
    },
  });

  const { data: basketdata } = useQuery(QUERYBASKET, {
    variables: {
      id: ImportchopsInfo.shelf,
    },
  });
  const { data: list } = useQuery(IMPORTCHOPSEARCH)
  const barcodeallchop = list && list.imchopSearch.map((prod) => (prod.chop.barcode))


  // console.log(barcodeallchop)
  const [createImchop, { loading, error }] = useMutation(CREATEIMPORTCHOP, {
    variables: { ...ImportchopsInfo },
    onCompleted: (data) => {
      if (data) {
        setImportchopsInfo({
          beefstore: "6284d7035415c34e54b2fc2c",
          barcode: "",
          beefroom: "",
          shelf: "",
          basket: "",
        });
        MySwal.fire({
          icon: "success",
          title: "สำเร็จ",
          text: "ทำการนำเข้าคลังชิ้นเนื้อเสร็จสิ้น",
          showConfirmButton: false,
          timer: 1000
          /*  confirmButtonText: "ตกลง", */
          /* confirmButtonColor: "#3085d6", */
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            /*  Router.reload("beefwarehouse/beefstore/import/import_chops") */
          }
          /* if (result.isConfirmed) {
            Router.reload("beefwarehouse/beefstore/import/import_halves")
          } */
        });
      }
    },
    refetchQueries: [
      {
        query: IMPORTCHOPSEARCH,
        variables: {
          beeftype: "",
          startdate: "",
          enddate: "",
          namefarmer: "",
          userName: "",
          beefroom: "",
          shelf: "",
          basket: ""
        },
        /* query: STORELIST,
        variables: {
          beeftype: "",
          type: "",
          beefroom: "",
          shelf: "",
          expdate: "",
          basket: "",
          cownum: "",
          grade: "",
          type: ""
        },
        query: QUERY_IMCHOPDAY,
        query: CARDCHOP,
        variables: {
          type: "ชื้นเนื้อ"
        } */
      },

      /*   query: CARDSTORE,
        variables: {
          type: "ชิ้นเนื้อ"
        },
        query: QUERY_IMCHOPDAY */
    ]
  });

  const handleChange = (e) => {
    setImportchopsInfo({
      ...ImportchopsInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await createImchop();
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
                value={ImportchopsInfo.barcode}
                onChange={handleChange}

                style={{
                  borderColor: `${!ImportchopsInfo.barcode
                    ?
                    "red" : ""
                    }`,
                  height: "35px",
                }}
              />
              {!ImportchopsInfo.barcode ? (
                <label style={{ color: "red" }}>กรุณากรอกบาร์โค้ด</label>
              ) : (
                /*  list && list.imchopSearch.map((prod) => (
                   prod.chop.barcode === ImportchopsInfo.barcode ? (
                     <label style={{ color: "red" }}>บาร์โค้ดซ้ำ</label> */
                "") /* : ("") */
               /*  )) */
             /*  ) */}

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
                  name="beefroom"
                  id="beefroom"
                  disabled={!ImportchopsInfo.barcode}
                  value={ImportchopsInfo.beefroom}
                  onChange={handleChange}
                  style={{
                    height: "35px",
                    width: "50px",
                    border: "1px solid #AFAFAF",
                    borderRadius: "4px 0px 0px 4px",
                    textAlign: "center",
                    fontSize: "16px",
                  }}
                >
                  <option value="">ห้อง</option>
                  {data &&
                    data.allRoom.map((prod) => (
                      <option key={prod.id} value={prod.id}>
                        {prod.roomname}
                      </option>
                    ))}
                </select>
                <select
                  name="shelf"
                  id="shelf"
                  disabled={!ImportchopsInfo.barcode || !ImportchopsInfo.beefroom}
                  value={ImportchopsInfo.shelf}
                  onChange={handleChange}
                  style={{
                    height: "35px",
                    width: "50px",
                    border: "1px solid #AFAFAF",
                    borderLeft: "none",
                    textAlign: "center",
                    fontSize: "16px",
                  }}
                >
                  <option value="">ชั้น</option>
                  {datashelf &&
                    datashelf.listShelf.map((prod) => (
                      <option key={prod.id} value={prod.id}>
                        {prod.shelfname}
                      </option>
                    ))}
                </select>
                <select
                  name="basket"
                  id="basket"
                  disabled={!ImportchopsInfo.barcode || !ImportchopsInfo.beefroom || !ImportchopsInfo.shelf}
                  value={ImportchopsInfo.basket}
                  onChange={handleChange}
                  style={{
                    height: "35px",
                    width: "60px",
                    border: "1px solid #AFAFAF",
                    borderRadius: "0px 4px 4px 0px",
                    borderLeft: "none",
                    textAlign: "center",
                    fontSize: "16px",
                    marginRight: "10px",
                  }}
                >
                  <option value="">ตะกร้า</option>
                  {basketdata &&
                    basketdata.allBasket.map((prod) => (
                      <option key={prod.id} value={prod.id}>
                        {prod.basketname}
                      </option>
                    ))}
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
            disabled={
              !ImportchopsInfo.barcode ||
              !ImportchopsInfo.beefroom ||
              !ImportchopsInfo.shelf
            }
            style={{
              backgroundColor: `${!ImportchopsInfo.beefroom ||
                !ImportchopsInfo.barcode ||
                !ImportchopsInfo.shelf
                ? "gray"
                : ""
                }`,
            }}
            onClick={handleSubmit}
          >
            บันทึก
          </Savebutton1>
        </div>
      </div>
    </>
  );
};

export default Create_Import;
