import React, { useState } from "react";

import { DivFromInsideLeft, Searchinput, Savebutton1 } from "../ImportFrom";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Router from "next/router";

export const CREATEIMPORTLUMP = gql`
  mutation CREATEIMPORTLUMP(
    $barcode: String!
    $beefstore: String!
    $beefroom: String!
    $shelf: String
    $basket: String
  ) {
    createImlump(
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

  const [ImportLumpsInfo, setImportLumpsInfo] = useState({
    barcode: "",
    beefstore: "6284d7035415c34e54b2fc2c",
    beefroom: "",
    shelf: "",
    basket: "",
  });
  /* console.log(ImportLumpsInfo.shelf); */

  const { data: datashelf } = useQuery(QUERYSHELF, {
    variables: {
      id: ImportLumpsInfo.beefroom,
    },
  });

  const { data: basketdata } = useQuery(QUERYBASKET, {
    variables: {
      id: ImportLumpsInfo.shelf,
    },
  });

  /*  console.log(datashelf);
  console.log(ImportLumpsInfo.beefroom); */

  const [createImlump, { loading, error }] = useMutation(CREATEIMPORTLUMP, {
    variables: { ...ImportLumpsInfo },
    onCompleted: (data) => {
      if (data) {
        setImportLumpsInfo({
          barcode: "",
          beefroom: "",
          shelf: "",
          basket: "",
        });
        MySwal.fire({
          icon: "success",
          title: "สำเร็จ",
          text: "ทำการนำเข้าคลังชิ้นเนื้อเสร็จสิ้น",
          confirmButtonText: (
            <span
              onClick={() =>
                Router.reload("beefwarehouse/beefstore/import/import_lumps")
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
        setImportLumpsInfo({
          barcode: "",
          beefroom: "",
          shelf: "",
          basket: "",
        });
        MySwal.fire({
          icon: "error",
          title: <p>{error.graphQLErrors[0].message}</p>,
          text: "กรุณากรอกข้อมูลใหม่อีกครั้ง",
          confirmButtonText: (
            <span
              onClick={() =>
                Router.reload("beefwarehouse/beefstore/import/import_lumps")
              }
            >
              ตกลง
            </span>
          ),
          confirmButtonColor: "#3085d6",
        });
      }
    },
  });

  const handleChange = (e) => {
    setImportLumpsInfo({
      ...ImportLumpsInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await createImlump();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
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
                value={ImportLumpsInfo.barcode}
                onChange={handleChange}
                style={{
                  borderColor: `${!ImportLumpsInfo.barcode ? "red" : ""}`,
                }}
              />
              {!ImportLumpsInfo.barcode ? (
                <label style={{ color: "red" }}>กรุณากรอกบาร์โค้ด</label>
              ) : (
                ""
              )}
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
                  disabled={!ImportLumpsInfo.barcode}
                  value={ImportLumpsInfo.beefroom}
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
                  disabled={!ImportLumpsInfo.barcode || !ImportLumpsInfo.beefroom}
                  value={ImportLumpsInfo.shelf}
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
                  disabled={!ImportLumpsInfo.barcode || !ImportLumpsInfo.beefroom || !ImportLumpsInfo.shelf}
                  value={ImportLumpsInfo.basket}
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
              disabled={
                !ImportLumpsInfo.barcode ||
                !ImportLumpsInfo.beefroom ||
                !ImportLumpsInfo.shelf
              }
              onClick={handleSubmit}
              style={{
                backgroundColor: `${!ImportLumpsInfo.beefroom ||
                  !ImportLumpsInfo.barcode ||
                  !ImportLumpsInfo.shelf
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

export default Create_Import;
