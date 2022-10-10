import React, { useState } from "react";
import {
  Searchinput,
} from "../SettingFrom";


import {
  Savebuttoncolor,
} from "../../../../../utils/buttonColor";

import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Router from "next/router";

const CREATEUNIT = gql`
  mutation CREATEUNIT($name: String) {
    createUnit(name: $name) {
      id
    }
  }
`;
const unit = () => {
  const MySwal = withReactContent(Swal);
  const [unitname, setunitname] = useState({
    name: "",
  });
  const [createUnit] = useMutation(CREATEUNIT, {
    variables: {
      name: unitname.name,
    },
    onCompleted: (data) => {
      if (data) {
        setunitname({
          name: "",
        });
        MySwal.fire({
          icon: "success",
          title: "สำเร็จ",
          text: "ทำการบึนทึกข้อมูลสิ้น",
          showConfirmButton: false,
          timer: 1000
          /*  confirmButtonText: "ตกลง", */
          /* confirmButtonColor: "#3085d6", */
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            Router.reload("beefwarehouse/beefproduct/setting/type")
          }
          /* if (result.isConfirmed) {
            Router.reload("beefwarehouse/beefstore/import/import_halves")
          } */
        });
      }
    },
    onError: (error) => {
      if (error) {
        setunitname({
          name: "",
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
    setunitname({
      ...unitname,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await createUnit();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div>
        หน่วยสินค้า : { }
        <Searchinput
          value={unitname.name}
          name="name"
          style={{ width: "150px", textAlign: "center" }}
          onChange={handleChange}
        />
        <Savebuttoncolor
          style={{
            height: "38px",
            width: " 50px",
            marginLeft: "10px",
            backgroundColor: `${!unitname.name ? "gray" : ""}`,
          }}
          disabled={!unitname.name}
          onClick={handleSubmit}
        >
          บันทึก
        </Savebuttoncolor>
      </div>
    </>
  );
};

export default unit;
