import React, { useState } from "react";

import { DivFromInsideLeft, Searchinput, Savebutton1 } from "../ImportFrom";

import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Router from "next/router";
import { IMPORTCHOPSEARCH } from "./index"

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

  const [createImchop, { loading, error }] = useMutation(CREATEIMPORTCHOP, {
    variables: { ...ImportchopsInfo },
    onCompleted: (data) => {
      if (data) {
        setImportchopsInfo({
          barcode: "",
        });
        MySwal.fire({
          icon: "success",
          title: "สำเร็จ",
          text: "ทำการนำเข้าคลังชิ้นเนื้อเสร็จสิ้น",
          confirmButtonText: (
            <span
              onClick={() =>
                Router.reload("beefwarehouse/beefstore/import/import_chops")
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
        setImportchopsInfo({
          barcode: "",
        });
        MySwal.fire({
          icon: "error",
          title: <p>{error.graphQLErrors[0].message}</p>,
          text: "กรุณากรอกข้อมูลใหม่อีกครั้ง",
          confirmButtonText: (
            <span
              onClick={() =>
                Router.reload("beefwarehouse/beefstore/import/import_chops")
              }
            >
              ตกลง
            </span>
          ),
          confirmButtonColor: "#3085d6",
        });
      }
    },
    refetchQueries: [
      {
        query: IMPORTCHOPSEARCH
      }
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
                  borderColor: `${!ImportchopsInfo.barcode ? "red" : ""}`,
                }}
              />
              {!ImportchopsInfo.barcode ? (
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
        </form>
      </div>
    </>
  );
};

export default Create_Import;
