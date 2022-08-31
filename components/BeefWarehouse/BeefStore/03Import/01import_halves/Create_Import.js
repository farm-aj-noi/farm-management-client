import React, { useState } from "react";

import {
  DivFromInsideLeft,
  Searchinput,
  Savebutton1,
  InputSubmit,
  SelectSubmit,
  FormSubmit
} from "../ImportFrom";

import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Router from "next/router";

export const CREATEIMPORTHALVE = gql`
  mutation CREATEIMPORTHALVE(
    $barcode: String!
    $beefstore: String!
    $beefroom: String!
  ) {
    createImHalve(
      barcode: $barcode
      beefstore: $beefstore
      beefroom: $beefroom
    ) {
      id
      importdate
      barcode
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

const Create_Import = () => {
  const MySwal = withReactContent(Swal);

  const { data: dataroom } = useQuery(QUERYROOM);
  const [ImporthalvesInfo, setImporthalvesInfo] = useState({
    barcode: "",
    beefstore: "6284d7035415c34e54b2fc2c",
    beefroom: "",
  });

  const [success, setSuccess] = useState(false);
  const [createImHalve, { loading, error }] = useMutation(CREATEIMPORTHALVE, {
    variables: {
      barcode: ImporthalvesInfo.barcode,
      beefstore: ImporthalvesInfo.beefstore,
      beefroom: ImporthalvesInfo.beefroom,
    },
    onCompleted: (data) => {
      if (data) {
        setSuccess(true);
        setImporthalvesInfo({
          barcode: "",
          beefroom: "",
        });
        MySwal.fire({
          icon: "success",
          title: "สำเร็จ",
          text: "ทำการนำเข้าคลังชิ้นเนื้อเสร็จสิ้น",
          confirmButtonText: (
            <span
              onClick={() =>
                Router.reload("beefwarehouse/beefstore/import/import_halves")
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
        setImporthalvesInfo({
          barcode: "",
          beefroom: "",
        });
        MySwal.fire({
          icon: "error",
          title: <p>{error.graphQLErrors[0].message}</p>,
          text: "กรุณากรอกข้อมูลใหม่อีกครั้ง",
          confirmButtonText: (
            <span
              onClick={() =>
                Router.reload("beefwarehouse/beefstore/import/import_halves")
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
  console.log(ImporthalvesInfo.barcode);

  const handleChange = (e) => {
    setImporthalvesInfo({
      ...ImporthalvesInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await createImHalve();
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
            <FormSubmit>
              <InputSubmit
                type="text"
                id="barcode"
                name="barcode"
                value={ImporthalvesInfo.barcode}
                onChange={handleChange}
                style={{
                  borderColor: `${!ImporthalvesInfo.barcode ? "red" : ""}`,
                  height: "35px"
                }}
              />

              {!ImporthalvesInfo.barcode && (
                <label style={{ color: "red" }}>กรุณากรอกบาร์โค้ด</label>
              )}
            </FormSubmit>
          </DivFromInsideLeft>
          <DivFromInsideLeft style={{ marginTop: "5px" }}>
            ตำแหน่ง :
            <FormSubmit>
              <SelectSubmit
                name="beefroom"
                id="beefroom"
                onChange={handleChange}
                disabled={!ImporthalvesInfo.barcode}
              >
                <option value="">ห้อง</option>
                {dataroom &&
                  dataroom.allRoom.map((prod) => (
                    <option key={prod.id} value={prod.id}>
                      {prod.roomname}
                    </option>
                  ))}
                {/*  <option value="62875e0171c2560f802d9f89">A1</option> */}
              </SelectSubmit>                         
            </FormSubmit>
          </DivFromInsideLeft>
          <div
            style={{
              display: "inline-block",
              justifySelf: "right",
              float: "right",    
              paddingBottom: "10px",
            }}
          >
            <Savebutton1
              disabled={!ImporthalvesInfo.barcode || !ImporthalvesInfo.beefroom}
              style={{
                backgroundColor: `${!ImporthalvesInfo.barcode || !ImporthalvesInfo.beefroom
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
