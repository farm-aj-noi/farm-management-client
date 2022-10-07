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
          confirmButtonText: (
            <span
              onClick={() =>
                Router.reload("beefwarehouse/beefproduct/setting/room")
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
        setinforoom({
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
