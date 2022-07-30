import React, { useState, useeffect } from "react";

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

import { DivBase } from "../../../../../../utils/divBase";

import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";

import Nav_setting from "../../Nav_setting";

import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Router from "next/router";

import List from "./Listroom";
import Editname from "./editname";

import { ic_info_outline } from "react-icons-kit/md/ic_info_outline";

export const CREATEROOMS = gql`
  mutation CREATEROOMS($roomname: String) {
    createBeefroom(roomname: $roomname) {
      id
      roomname
    }
  }
`;

export const CREATETYPEKEEP = gql`
  mutation CREATETYPEKEEP(
    $totalbeef: String
    $beeftype: String
    $beefroom: String
    $shelf: String
  ) {
    createtypekeep(
      totalbeef: $totalbeef
      beeftype: $beeftype
      beefroom: $beefroom
      shelf: $shelf
    ) {
      id
      totalbeef
    }
  }
`;

export const QUERYROOMS = gql`
  query QUERYROOMS {
    allRoom {
      id
      roomname
      typekeep {
        id
        totalbeef
        beeftype {
          id
          nameTH
        }
      }
    }
  }
`;

const room1 = () => {
  const MySwal = withReactContent(Swal);
  const { data: dataroom } = useQuery(QUERYROOMS);
  console.log(dataroom);
  /*  console.log(data); */
  const [idroom, SetidRoom] = useState(""); //get ID room
  const [successCreateRoomName, setSuccessCreateRoomName] = useState(false); //done room name
  const [Inforoomname, SetInforoomName] = useState({
    beefroom: "",
    shelfname: "",
  });
  const [createBeefroom] = useMutation(CREATEROOMS, {
    variables: {
      ...Inforoomname,
    },
    onCompleted: (data) => {
      if (data) {
        setSuccessCreateRoomName(true);
        SetidRoom(data.createBeefroom.id);
      }
    },
  });
  const hanndleChangeRoomName = (e) => {
    SetInforoomName({
      ...Inforoomname,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitRoomName = async (e) => {
    try {
      e.preventDefault();
      await createBeefroom();
    } catch (error) {
      console.log(error);
    }
  };

  const [inputListroom, setInputListroom] = useState([
    {
      totalbeef: "",
      beeftype: "",
    }, //get totalbeef & beeftype room
  ]);

  const [createtypekeep] = useMutation(CREATETYPEKEEP, {
    onCompleted: (data) => {
      if (data) {
        MySwal.fire({
          icon: "success",
          title: "สำเร็จ",
          text: "ทำการตั้งค่าเสร็จสิ้น",
          confirmButtonText: (
            <span
              onClick={() =>
                Router.reload("beefwarehouse/beefstore/setting/room")
              }
            >
              ตกลง
            </span>
          ),
          confirmButtonColor: "#3085d6",
        });
      }
    },
  });

  const handleRemoveClickroom = (index) => {
    const listroom = [...inputListroom];
    listroom.splice(index, 1);
    setInputListroom(listroom);
  };

  const handleAddClickroom = () => {
    setInputListroom([
      ...inputListroom,
      {
        totalbeef: "",
        beeftype: "",
      },
    ]);
  };

  const handleInputroom = (e, index) => {
    const { name, value } = e.target;
    const listroom = [...inputListroom];
    listroom[index][name] = value;
    setInputListroom(listroom);
  };

  const handleSubmitroom = async () => {
    try {
      for (let i = 0; i < inputListroom.length; i++) {
        await createtypekeep({
          variables: {
            beeftype: inputListroom[i].beeftype,
            totalbeef: inputListroom[i].totalbeef,
            beefroom: idroom,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [edit, setedit] = useState(false);

  return (
    <div>
      <DivFromTop>
        <div style={{ margin: "-3px 5px 0px 0px" }}>
          <Icon size={20} icon={list} />
        </div>
        รายการห้องจัดเก็บ
      </DivFromTop>
      <DivFromDown>
        <div>
          {dataroom && dataroom.allRoom.length > 0 ? (
            dataroom.allRoom.map((prod) => (
              <>
                <div
                  style={{ margin: "auto", minWidth: "100%" }}
                >
                  <List key={prod.id} idroom={prod} />
                </div>
              </>
            ))
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center"
              }}
            >
              <div
                style={{
                  margin: "auto",
                  textAlign: "center",
                  color: "#ff0000",
                }}
              >
                <Icon size={150} icon={ic_info_outline} />
                <br />
                ไม่พบข้อมูล
              </div>
            </div>
          )
          }
        </div>
      </DivFromDown>
    </div>
  );
};

export default room1;
