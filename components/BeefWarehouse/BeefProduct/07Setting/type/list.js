import React, { useState } from "react";
import {
  Removebuttoncolor,
  Editbuttoncolor,
  Savebuttoncolor,
} from "../../../../../utils/buttonColor";
import {
  Removebutton,
  Editbutton,
  Savebutton,
} from "../../../../../utils/button";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Router from "next/router";

import {
  Searchinput,
} from "../SettingFrom";

const DELETETYPE = gql`
  mutation DELETETYPE($id: ID) {
    deleteProducttype(id: $id) {
      id
    }
  }
`;

const UPDATETYPE = gql`
  mutation UPDATETYPE(
    $id: ID!
    $code: String
    $nameTH: String
    $nameEN: String
    $BBE: Int
  ) {
    updateProducttype(
      id: $id
      code: $code
      nameTH: $nameTH
      nameEN: $nameEN
      BBE: $BBE
    ) {
      id
    }
  }
`;

const list = ({ listtype }) => {
  const MySwal = withReactContent(Swal);
  const [infotype, setinfotype] = useState(listtype);
  /*   console.log(infotype); */
  const DeleteAlert = () => {
    Swal.fire({
      title: 'ต้องการลบข้อมูล?',
      text: "ยืนยันการลบข้อมูลประเภทสินค้าผลิตภัณฑ์!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ตกลง',
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {
        handdleSubmitDelete();
        MySwal.fire({
          icon: "success",
          title: "สำเร็จ",
          text: "ทำการลบข้อมูลสิ้น",
          showConfirmButton: false,
          timer: 1000
          /*  confirmButtonText: "ตกลง", */
          /* confirmButtonColor: "#3085d6", */
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            Router.push("beefwarehouse/beefproduct/setting").then(() => Router.reload())
          }
          /* if (result.isConfirmed) {
            Router.reload("beefwarehouse/beefstore/import/import_halves")
          } */
        });
      }
    })
  }
  const [deleteProducttype] = useMutation(DELETETYPE, {
    onCompleted: (data) => {
      /* MySwal.fire({
        icon: "success",
        title: "สำเร็จ",
        text: "ทำการลบข้อมูลสิ้น",
        confirmButtonText: (
          <span
            onClick={() => Router.reload("beefwarehouse/beefproduct/setting")}
          >
            ตกลง
          </span>
        ),
        confirmButtonColor: "#3085d6",
      }); */
    },
  });
  const handdleSubmitDelete = async () => {
    try {
      await deleteProducttype({
        variables: {
          id: infotype.id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const [edit, setedit] = useState(false);
  const [updateProducttype] = useMutation(UPDATETYPE, {
    onCompleted: (data) => {
      setedit(false);
      MySwal.fire({
        icon: "success",
        title: "สำเร็จ",
        text: "ทำการแก้ไขข้อมูลสิ้น",
        showConfirmButton: false,
        timer: 1000
        /*  confirmButtonText: "ตกลง", */
        /* confirmButtonColor: "#3085d6", */
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          Router.reload("beefwarehouse/beefproduct/setting")
        }
        /* if (result.isConfirmed) {
          Router.reload("beefwarehouse/beefstore/import/import_halves")
        } */
      });
    },
  });

  const handleChange = (e) => {
    setinfotype({
      ...infotype,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (infotype === listtype) {
      setinfotype(listtype);
      setedit(false);
      return;
    }
    try {
      infotype.BBE = parseInt(infotype.BBE);
      await updateProducttype({
        variables: {
          ...infotype,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <tr style={{ textAlign: "center" }}>
        <td>
          {edit ? (
            <Searchinput
              name="code"
              value={infotype.code}
              style={{ wedth: "120px", textAlign: "center" }}
              onChange={handleChange}
            />
          ) : (
            infotype.code
          )}
        </td>
        <td>
          {edit ? (
            <Searchinput
              name="nameTH"
              value={infotype.nameTH}
              style={{ wedth: "120px", textAlign: "center" }}
              onChange={handleChange}
            />
          ) : (
            infotype.nameTH
          )}
        </td>
        <td>
          {edit ? (
            <Searchinput
              name="nameEN"
              value={infotype.nameEN}
              style={{ wedth: "120px", textAlign: "center" }}
              onChange={handleChange}
            />
          ) : (
            infotype.nameEN
          )}
        </td>
        <td>
          {edit ? (
            <Searchinput
              name="BBE"
              value={infotype.BBE}
              style={{ wedth: "120px", textAlign: "center" }}
              onChange={handleChange}
            />
          ) : (
            infotype.BBE
          )}
        </td>
        <td>{infotype.unit.name}</td>
        <td>
          {edit ? (
            <Savebuttoncolor onClick={handleSubmit}>
              <Savebutton />
            </Savebuttoncolor>
          ) : (
            <Editbuttoncolor onClick={() => setedit(true)}>
              <Editbutton />
            </Editbuttoncolor>
          )}
        </td>
        <td>
          <Removebuttoncolor onClick={DeleteAlert}>
            <Removebutton />
          </Removebuttoncolor>
        </td>
      </tr>
    </>
  );
};

export default list;
