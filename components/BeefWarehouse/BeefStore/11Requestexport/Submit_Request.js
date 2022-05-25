import React, { useState } from "react";

import { DivFromInsideLeft, Searchinput, Savebutton1 } from "./RequestFrom";

import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Router from "next/router";

export const REQUESTEX = gql`
  mutation REQUESTEX($name: String, $beeftype: String, $quantity: String) {
    createRequestExport(name: $name, beeftype: $beeftype, quantity: $quantity) {
      name
      beeftype {
        nameTH
        code
      }
      quantity
      requestdate
    }
  }
`;

const Submit_Request = () => {
  const MySwal = withReactContent(Swal);
  const [RequestInfo, setRequestInfo] = useState({
    name: "",
    beeftype: "",
    quantity: "",
  });
  const [createRequestExport] = useMutation(REQUESTEX, {
    variables: { ...RequestInfo },
    onCompleted: (data) => {
      if (data) {
        setRequestInfo({
          name: "",
          beeftype: "",
          quantity: "",
        });
        MySwal.fire({
          icon: "success",
          title: "สำเร็จ",
          text: "ทำการร้องขอเบิกเสร็จสิ้น",
          confirmButtonText: (
            <span onClick={() => Router.reload("beefwarehouse/requestexport")}>
              ตกลง
            </span>
          ),
          confirmButtonColor: "#3085d6",
        });
      }
    },
  });
  const handleChange = (e) => {
    setRequestInfo({
      ...RequestInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handdleSummit = async (e) => {
    try {
      e.preventDefault();
      await createRequestExport();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form>
        <DivFromInsideLeft>
          ชื่อผู้ขอเบิก :
          <div
            style={{
              display: "grid",
              gridTemplateRows: "1fr 15px",
            }}
          >
            <Searchinput
              type="text"
              id="name"
              name="name"
              value={RequestInfo.name}
              onChange={handleChange}
            />
          </div>
        </DivFromInsideLeft>
        <DivFromInsideLeft>
          ประเภทซาก :
          <div
            style={{
              display: "grid",
              gridTemplateRows: "1fr 15px",
            }}
          >
            <div style={{ display: "inline", width: "170px" }}>
              <select
                name="beeftype"
                id="beeftype"
                style={{
                  height: "35px",
                  width: "160px",
                  border: "1px solid #AFAFAF",
                  borderRadius: "4px ",
                  textAlign: "center",
                  fontSize: "14px",
                }}
                value={RequestInfo.beeftype}
                onChange={handleChange}
              >
                <option value="">เลือก</option>
                <option value="5f1000e28d55662dcc23d95e">ซากซ้าย</option>
                <option value="5f1000ee8d55662dcc23d960">ซากขวา</option>
                <option value="5f338f035f7703096453abb8">ซากขวา-ขาหน้า</option>
                <option value="5f338f0d5f7703096453abb9">ซากขวา-ขาหลัง</option>
                <option value="5f338eeb5f7703096453abb6">ซากซ้าย-ขาหน้า</option>
                <option value="5f338ef65f7703096453abb7">ซากซ้าย-ขาหลัง</option>
                <option value="5f446195ecd6732ad8108684">เนื้อสันคอ</option>
                <option value="5f4461a8ecd6732ad8108685">ที-โบน</option>
                <option value="5f4461bfecd6732ad8108686">เนื้อสันนอก</option>
                <option value="5f4461d6ecd6732ad8108687">ที-โบน สเต็ก</option>
                <option value="5f44620cecd6732ad8108688">ริบอาย</option>
                <option value="5f446224ecd6732ad8108689">ใบบัวสเต็ก</option>
                <option value="5f44623aecd6732ad810868a">เนื้อสันใน</option>
                <option value="5f44624fecd6732ad810868b">สันสะโพก</option>
                <option value="5f446262ecd6732ad810868c">เสือร้องไห้</option>
                <option value="5f44628decd6732ad810868d">เนื้อซี่โครง</option>
                <option value="5f4462a4ecd6732ad810868e">พับใน</option>
                <option value="5f4462b6ecd6732ad810868f">ตะพาบ</option>
                <option value="5f4462c8ecd6732ad8108690">ลูกมะพร้าว</option>
                <option value="5f4462ddecd6732ad8108691">ปลาบู่ทอง</option>
                <option value="5f4462eeecd6732ad8108692">ใบพาย</option>
                <option value="5f4462feecd6732ad8108693">หางตะเข้</option>
                <option value="5f44630fecd6732ad8108694">น่อง</option>
                <option value="5f446320ecd6732ad8108695">พับนอก</option>
              </select>
            </div>
          </div>
        </DivFromInsideLeft>
        <DivFromInsideLeft>
          จำนวน :
          <div
            style={{
              display: "grid",
              gridTemplateRows: "1fr 15px",
            }}
          >
            <Searchinput
              type="text"
              id="quantity"
              name="quantity"
              value={RequestInfo.quantity}
              onChange={handleChange}
            />
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
          <Savebutton1 onClick={handdleSummit}>บันทึก</Savebutton1>
        </div>
      </form>
    </div>
  );
};

export default Submit_Request;
