import React, { useState } from "react";
import {

  Searchinput,
} from "../SettingFrom";
import {
  Savebuttoncolor,
  Editbuttoncolor,
} from "../../../../../utils/buttonColor";

import { Editbutton, Savebutton } from "../../../../../utils/button";

import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Router from "next/router";

const UPDATEEXPDATE = gql`
  mutation UPDATEEXPDATE($id: ID, $day: Int) {
    updateExpdatesetting2(id: $id, day: $day) {
      id
      day
    }
  }
`;

const list = ({ listexpdate }) => {
  const MySwal = withReactContent(Swal);
  const [infoexpdate, setexpdate] = useState(listexpdate);
  const [edit, setedit] = useState(false);
  const [updateExpdatesetting2] = useMutation(UPDATEEXPDATE, {
    onCompleted: (data) => {
      /* setexpdate(data.updateExpdatesetting2) */
      if (data) {
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
            /* Router.push("beefwarehouse/beefstore/setting/room").then(() => Router.reload()) */
          }
          /* if (result.isConfirmed) {
            Router.reload("beefwarehouse/beefstore/import/import_halves")
          } */
        });
      }
    },
  });

  const handleChange = (e) => {
    setexpdate({
      ...infoexpdate,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (infoexpdate === listexpdate) {
      setexpdate(listexpdate);
      setedit(false);
      return;
    }
    try {
      infoexpdate.day = parseInt(infoexpdate.day);
      await updateExpdatesetting2({
        variables: {
          ...infoexpdate,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        ตั้งค่าแจ้งเตือน : { }
        {edit ? (
          <Searchinput
            value={infoexpdate.day}
            onChange={handleChange}
            name="day"
            style={{ width: "150px", textAlign: "center" }}
          />
        ) : (
          <Searchinput
            value={infoexpdate.day}
            name="day"
            style={{ width: "150px", textAlign: "center" }}
            disabled
          />
        )}{" "}
        วัน
        {edit ? (
          <Savebuttoncolor
            style={{
              marginLeft: "10px",
            }}
            onClick={handleSubmit}
          >
            <Savebutton />
          </Savebuttoncolor>
        ) : (
          <Editbuttoncolor
            style={{
              marginLeft: "10px",
            }}
            onClick={() => setedit(true)}
          >
            <Editbutton />
          </Editbuttoncolor>
        )}
      </div>
    </>
  );
};

export default list;
