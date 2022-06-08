import React, { useState } from "react";

import { DivFromInsideLeft, Searchinput, Savebutton1 } from "../ImportFrom";

import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Router from "next/router";

export const CREATEIMPORTENTRAIL = gql`
  mutation CREATEIMPORTENTRAIL(
    $barcode: String!
    $entrailstore: String!
    $beefroom: String!
  ) {
    createImentrail(
      barcode: $barcode
      entrailstore: $entrailstore
      beefroom: $beefroom
    ) {
      id
      importdate
    }
  }
`;

export const QUERYROOM = gql`
  query QUERYROOM {
    allRoom {
      id
      roomname
    }
  }
`;

const Create_Import = () => {
  const MySwal = withReactContent(Swal);
  const { data: dataroom } = useQuery(QUERYROOM);
  const [ImportentrailInfo, setImportentrailInfo] = useState({
    barcode: "",
    entrailstore: "62837e7631ace600dc6caa23",
    beefroom: "",
  });
  const [success, setSuccess] = useState(false);
  const [createImentrail, { loading, error }] = useMutation(
    CREATEIMPORTENTRAIL,
    {
      variables: { ...ImportentrailInfo },
      onCompleted: (data) => {
        if (data) {
          setSuccess(true);
          setImportentrailInfo({
            barcode: "",
          });
          MySwal.fire({
            icon: "success",
            title: "สำเร็จ",
            text: "ทำการนำเข้าคลังชิ้นเนื้อเสร็จสิ้น",
            confirmButtonText: (
              <span
                onClick={() =>
                  Router.reload(
                    "beefwarehouse/beefstore/import/import_entrails"
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
          setImportentrailInfo({
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
    }
  );

  const handleChange = (e) => {
    setImportentrailInfo({
      ...ImportentrailInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await createImentrail();
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
                value={ImportentrailInfo.barcode}
                onChange={handleChange}
                style={{
                  borderColor: `${!ImportentrailInfo.barcode ? "red" : ""}`,
                }}
              />
              {!ImportentrailInfo.barcode ? (
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
                  value={ImportentrailInfo.beefroom}
                  style={{
                    height: "35px",
                    width: "160px",
                    border: "1px solid #AFAFAF",
                    borderRadius: "4px",
                    textAlign: "center",
                    fontSize: "14px",
                  }}
                  onChange={handleChange}
                >
                  <option value="">ห้อง</option>
                  {dataroom &&
                    dataroom.allRoom.map((prod) => (
                      <option key={prod.id} value={prod.id}>
                        {prod.roomname}
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
                !ImportentrailInfo.barcode || !ImportentrailInfo.beefroom
              }
              style={{
                backgroundColor: `${
                  !ImportentrailInfo.barcode || !ImportentrailInfo.beefroom
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
