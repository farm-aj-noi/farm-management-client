import { useMutation, useQuery } from "@apollo/react-hooks";
import React, { useState } from "react";
import gql from "graphql-tag";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Router from "next/router";

import {
  DivFrom,
  DivFromTop,
  DivFromDown,
  HeaderColor,
  Searchinput,
  Addbutton,
  DivBase1,
} from "../../SettingFrom";
import {
  Savebuttoncolor,
  Editbuttoncolor,
  Removebuttoncolor,
} from "../../../../../../utils/buttonColor";

import {
  Savebutton,
  Editbutton,
  Removebutton,
} from "../../../../../../utils/button";

import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";

export const UPDATEROOMNAME = gql`
  mutation UPDATEROOMNAME($id: ID, $roomname: String) {
    updateBeefroom(id: $id, roomname: $roomname) {
      id
      roomname
    }
  }
`;

const editname = ({ idroom }) => {
  const [Editname, setEditname] = useState(false);
  const [Roominfo, setRoominfo] = useState(idroom);
 /*  console.log(Roominfo); */

  const [updateBeefroom] = useMutation(UPDATEROOMNAME, {
    onCompleted: (data) => {
      setRoominfo(data.updateBeefroom);
      setEditname(false);
    },
  });
  const handleChangename = (e) => {
    setRoominfo({
      ...Roominfo,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmitname = async () => {
    if (Roominfo === idroom) {
      setRoominfo(idroom);
      setEditname(false);
      return;
    }
    try {
      await updateBeefroom({
        variables: {
          ...Roominfo,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {Editname ? (
        <div
          style={{
            width: "100%",
            gridRowStart: "1",
            gridRowEnd: "1",
            gridColumnStart: "1",
          }}
        >
          ชื่อห้องจัดเก็บ : {}
          <Savebuttoncolor onClick={handleSubmitname}>
            <Savebutton />
          </Savebuttoncolor>
          <Searchinput
            name="roomname"
            value={Roominfo.roomname}
            onChange={handleChangename}
            style={{
              marginTop: "10px",
              textAlign: "center",
            }}
          ></Searchinput>
        </div>
      ) : (
        <>
          <div
            style={{
              width: "100%",
              gridRowStart: "1",
              gridRowEnd: "1",
              gridColumnStart: "1",
            }}
          >
            ชื่อห้องจัดเก็บ : {}
            <Editbuttoncolor onClick={() => setEditname(true)}>
              <Editbutton />
            </Editbuttoncolor>
            <Searchinput
              value={Roominfo.roomname}
              style={{
                marginTop: "10px",
                textAlign: "center",
              }}
              disabled
            ></Searchinput>
          </div>{" "}
        </>
      )}
    </>
  );
};

export default editname;
