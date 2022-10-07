import React, { useState } from "react";

import { DivFromInsideLeft, Searchinput, Savebutton1 } from "../ImportFrom";

import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Router from "next/router";
import { IMPORTQUARTERSEARCH } from "./index"

export const CREATEIMPORTQUARTER = gql`
  mutation CREATEIMPORTQUARTER(
    $barcode: String!
    $beefstore: String!
    $beefroom: String!
  ) {
    createImQuarter(
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
  const { data } = useQuery(QUERYROOM);
  const [ImportQuarterInfo, setImportquarterInfo] = useState({
    barcode: "",
    beefstore: "6284d7035415c34e54b2fc2c",
    beefroom: "",
  });
  const [success, setSuccess] = useState(false);

  const [createImQuarter, { loading, error }] = useMutation(
    CREATEIMPORTQUARTER,
    {
      variables: { ...ImportQuarterInfo },
      onCompleted: (data) => {
        if (data) {
          setSuccess(true);
          setImportquarterInfo({
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
                  Router.reload(
                    "/beefwarehouse/beefstore/import/import_quarters"
                  )
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
          setImportquarterInfo({
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
                  Router.reload(
                    "/beefwarehouse/beefstore/import/import_quarters"
                  )
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
          query: IMPORTQUARTERSEARCH
        }
      ]
    }
  );

  const handleChange = (e) => {
    setImportquarterInfo({
      ...ImportQuarterInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await createImQuarter();
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
                value={ImportQuarterInfo.barcode}
                onChange={handleChange}
                style={{
                  borderColor: `${!ImportQuarterInfo.barcode ? "red" : ""}`,
                }}
              />
              {!ImportQuarterInfo.barcode ? (
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
                  value={ImportQuarterInfo.beefroom}
                  onChange={handleChange}
                  disabled={!ImportQuarterInfo.barcode}
                  style={{
                    height: "35px",
                    width: "160px",
                    border: "1px solid #AFAFAF",
                    borderRadius: "4px",
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
                  {/*  <option value="62875e0171c2560f802d9f89">A1</option> */}
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
                !ImportQuarterInfo.barcode || !ImportQuarterInfo.beefroom
              }
              style={{
                backgroundColor: `${!ImportQuarterInfo.barcode || !ImportQuarterInfo.beefroom
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
