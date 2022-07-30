import React, { useState } from "react";
import {
  Searchinput,
} from "../SettingFrom";

import {
  Savebuttoncolor,
} from "../../../../../utils/buttonColor";

import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Router from "next/router";

const CREATEPRODUCT = gql`
  mutation CREATEPRODUCT(
    $code: String!
    $nameTH: String!
    $nameEN: String!
    $BBE: Int
    $unit: String
  ) {
    createProducttype(
      code: $code
      nameTH: $nameTH
      nameEN: $nameEN
      BBE: $BBE
      unit: $unit
    ) {
      id
    }
  }
`;

const QUERYUNIT = gql`
  query QUERYUNIT {
    listunit {
      id
      name
    }
  }
`;

const type = () => {
  const MySwal = withReactContent(Swal);
  const [infoproduct, setinfoproduct] = useState({
    code: "",
    nameTH: "",
    nameEN: "",
    BBE: "",
    unit: "",
  });

  const { data: unit } = useQuery(QUERYUNIT);
  const [createProducttype, { error }] = useMutation(CREATEPRODUCT, {
    variables: {
      code: infoproduct.code,
      nameTH: infoproduct.nameTH,
      nameEN: infoproduct.nameEN,
      BBE: (infoproduct.BBE = parseInt(infoproduct.BBE)),
      unit: infoproduct.unit,
    },
    onCompleted: (data) => {
      if (data) {
        setinfoproduct({
          code: "",
          nameTH: "",
          nameEN: "",
          BBE: "",
          unit: "",
        });
        MySwal.fire({
          icon: "success",
          title: "สำเร็จ",
          text: "ทำการบึนทึกข้อมูลสิ้น",
          confirmButtonText: (
            <span
              onClick={() =>
                Router.reload("beefwarehouse/beefproduct/setting/type")
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
        setinfoproduct({
          code: "",
          nameTH: "",
          nameEN: "",
          BBE: "",
          unit: "",
        });
        MySwal.fire({
          icon: "error",
          title: <p>{error.graphQLErrors[0].message}</p>,
          text: "กรุณากรอกข้อมูลใหม่อีกครั้ง",
          confirmButtonText: (
            <span
              onClick={() => Router.reload("beefwarehouse/beefproduct/setting")}
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
    setinfoproduct({
      ...infoproduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await createProducttype();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        รหัสสินค้า : {}
        <Searchinput
          value={infoproduct.code}
          name="code"
          style={{ width: "60px", textAlign: "center" }}
          onChange={handleChange}
        />
        ชื่อประเภทสินค้า (ไทย) : {}
        <Searchinput
          value={infoproduct.nameTH}
          name="nameTH"
          style={{ width: "135px", textAlign: "center" }}
          onChange={handleChange}
        />
        ชื่อประเภทสินค้า (อังกฤษ) : {}
        <Searchinput
          value={infoproduct.nameEN}
          name="nameEN"
          style={{ width: "135px", textAlign: "center" }}
          onChange={handleChange}
        />
      </div>
      <div style={{ marginTop: "10px" }}>
        วันหมดอายุ : {}
        <Searchinput
          value={infoproduct.BBE}
          name="BBE"
          type="number"
          style={{ width: "120px", textAlign: "center" }}
          onChange={handleChange}
        />
        หน่วย : {}
        <select
          value={infoproduct.unit}
          name="unit"
          style={{
            height: "35px",
            width: "120px",
            border: "1px solid #AFAFAF",
            borderRadius: "4px",
            textAlign: "center",
            fontSize: "14px",
          }}
          onChange={handleChange}
        >
          <option value="">เลือก</option>
          {unit &&
            unit.listunit.map((prod) => (
              <option key={prod.id} value={prod.id}>
                {prod.name}
              </option>
            ))}
        </select>
        <Savebuttoncolor
          style={{
            height: "38px",
            width: " 50px",
            marginLeft: "10px",
            backgroundColor: `${
              !infoproduct.code ||
              !infoproduct.nameTH ||
              !infoproduct.nameEN ||
              !infoproduct.BBE ||
              !infoproduct.unit
                ? "gray"
                : ""
            }`,
          }}
          disabled={
            !infoproduct.code ||
            !infoproduct.nameTH ||
            !infoproduct.nameEN ||
            !infoproduct.BBE ||
            !infoproduct.unit
          }
          onClick={handleSubmit}
        >
          บันทึก
        </Savebuttoncolor>
      </div>
    </>
  );
};

export default type;
