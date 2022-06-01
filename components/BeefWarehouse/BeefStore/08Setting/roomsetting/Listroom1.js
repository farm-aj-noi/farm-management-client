import { useMutation, useQuery } from "@apollo/react-hooks";
import React, { useState } from "react";
import gql from "graphql-tag";

import QUERYROOMS from "./room/room";

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
} from "../SettingFrom";
import {
  Savebuttoncolor,
  Editbuttoncolor,
  Removebuttoncolor,
} from "../../../../../utils/buttonColor";

import {
  Savebutton,
  Editbutton,
  Removebutton,
} from "../../../../../utils/button";

import { DivBase } from "../../../../../utils/divBase";

import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";

export const QUERYTYPEKEEP = gql`
  query QUERYTYPEKEEP($beefroom: String) {
    TypeRoom(beefroom: $beefroom) {
      id
      totalbeef
    }
  }
`;

export const UPDATEROOMNAME = gql`
  mutation UPDATEROOMNAME($id: ID, $roomname: String) {
    updateBeefroom(id: $id, roomname: $roomname) {
      id
      roomname
    }
  }
`;

const Listroom1 = ({ Listroom }) => {
  const [Editname, setEditname] = useState(false);
  const [Roominfo, setRoominfo] = useState(Listroom);

  const { data: datatypekeep } = useQuery(QUERYTYPEKEEP, {
    variables: {
      id: Roominfo.id,
    },
  });
  console.log(datatypekeep);

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
    if (Roominfo === Listroom) {
      setRoominfo(Listroom);
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
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `200px 200px 200px 
               200px`,
          marginTop: "10px",
          marginLeft: "30px",
          paddingBottom: "20px",
          borderBottom: "1px solid #AFAFAF",
        }}
      >
        {" "}
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
            <Searchinput
              name="roomname"
              value={Roominfo.roomname}
              onChange={handleChangename}
              style={{
                marginTop: "10px",
                textAlign: "center",
                width: "140px",
              }}
            ></Searchinput>
            <Savebuttoncolor onClick={handleSubmitname}>
              <Savebutton />
            </Savebuttoncolor>
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
              <Searchinput
                value={Roominfo.roomname}
                style={{
                  marginTop: "10px",
                  textAlign: "center",
                  width: "140px",
                }}
                disabled
              ></Searchinput>
              <Editbuttoncolor onClick={() => setEditname(true)}>
                <Editbutton />
              </Editbuttoncolor>
            </div>{" "}
          </>
        )}
      </div>
    </div>
  );
};

export default Listroom1;
