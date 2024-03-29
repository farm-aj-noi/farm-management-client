import React, { useState } from "react";

import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { Searchinput } from "../SettingFrom";
import { Savebuttoncolor } from "../../../../../utils/buttonColor";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Router from "next/router";


const CREATEROOM = gql`
  mutation CREATEROOM($roomname: String) {
    createProductroom(roomname: $roomname) {
      id
      roomname
    }
  }
`;

const create = () => {
  const MySwal = withReactContent(Swal);
  const [inforoom, setinforoom] = useState({
    roomname: "",
  });
  const [createProductroom, { error }] = useMutation(CREATEROOM, {
    variables: {
      roomname: inforoom.roomname,
    },

    onCompleted: (data) => {
      if (data) {
        setinforoom({
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
            Router.reload("beefwarehouse/beefproduct/setting/room")
          }
          /* if (result.isConfirmed) {
            Router.reload("beefwarehouse/beefstore/import/import_halves")
          } */
        });
      }
    },

  });

  const handleChange = (e) => {
    setinforoom({
      ...inforoom,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await createProductroom();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        ตู้แช่จัดเก็บ : { }
        <Searchinput
          value={inforoom.roomname}
          onChange={handleChange}
          name="roomname"
          style={{ width: "150px", textAlign: "center" }}
        />
        <Savebuttoncolor
          style={{
            height: "38px",
            width: " 50px",
            marginLeft: "10px",
            backgroundColor: `${!inforoom.roomname ? "gray" : ""}`,
          }}
          disabled={!inforoom.roomname}
          onClick={handleSubmit}
        >
          บันทึก
        </Savebuttoncolor>
      </div>
    </>
  );
};

export default create;
