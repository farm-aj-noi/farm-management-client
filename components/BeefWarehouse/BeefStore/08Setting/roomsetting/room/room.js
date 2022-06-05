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

const room = () => {
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
        บันทึกตั้งค่าห้องจัดเก็บ
      </DivFromTop>
      <DivFromDown>
        {!successCreateRoomName && (
          <>
            <div>
              ชื่อห้องจัดเก็บ : {}
              <Searchinput
                type="text"
                id="roomname"
                name="roomname"
                value={Inforoomname.roomname}
                onChange={hanndleChangeRoomName}
                style={{ width: "156px", textAlign: "center" }}
              />
              <Savebuttoncolor
                style={{
                  height: "38px",
                  width: " 50px",
                  backgroundColor: `${!Inforoomname.roomname ? "gray" : ""}`,
                }}
                disabled={!Inforoomname.roomname}
                onClick={handleSubmitRoomName}
              >
                บันทึก
              </Savebuttoncolor>
            </div>
            <div
              style={{
                border: "1px solid #AFAFAF",
                marginTop: "10px",
                padding: "10px 20px 20px 20px",
                borderRadius: "4px",
              }}
            >
              รายการห้องจัดเก็บ :
              {dataroom &&
                dataroom.allRoom.map((prod) => (
                  <>
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
                      <Editname key={prod.id} idroom={prod} />
                      <List key={prod.id} idroom={prod} />
                    </div>
                  </>
                ))}
            </div>
          </>
        )}
        {successCreateRoomName && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `200px 200px 200px 200px`,
            }}
          >
            <>
              <div
                style={{
                  width: "100%",
                  gridRowStart: "1",
                  gridRowEnd: "1",
                  gridColumnStart: "1",
                  marginTop: "0px",
                }}
              >
                ชื่อห้องจัดเก็บ : {}
                <Searchinput
                  type="text"
                  id="roomname"
                  name="roomname"
                  value={Inforoomname.roomname}
                  disabled
                  style={{ width: "156px", textAlign: "center" }}
                />
              </div>
              {inputListroom.map((x, i) => {
                return (
                  <div
                    style={{
                      display: "grid",
                      gridColumStart: "1",
                      gridColumn: `2 ${inputListroom.length !== 1 ? "" : ""}`,
                      gridTemplateColumns: `200px 200px 200px ${
                        inputListroom.length !== 1 ? "40px" : ""
                      } 200px`,
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        gridRowStart: "1",
                        gridRowEnd: "1",
                        gridColumnStart: "1",
                      }}
                    >
                      {" "}
                      ประเภทจัดเก็บ : {}
                      <select
                        name="beeftype"
                        id="beeftype"
                        value={inputListroom[i].beeftype}
                        onChange={(e) => handleInputroom(e, i)}
                        style={{
                          height: "38px",
                          width: "156px",
                          border: "1px solid #AFAFAF",
                          borderRadius: "4px",
                          textAlign: "center",
                          fontSize: "14px",
                        }}
                      >
                        <option value="">เลือก</option>
                        <option value="5f1000e28d55662dcc23d95e">
                          ซากซ้าย
                        </option>
                        <option value="5f1000ee8d55662dcc23d960">ซากขวา</option>
                        <option value="5f338f035f7703096453abb8">
                          ซากขวา-ขาหน้า
                        </option>
                        <option value="5f338f0d5f7703096453abb9">
                          ซากขวา-ขาหลัง
                        </option>
                        <option value="5f338eeb5f7703096453abb6">
                          ซากซ้าย-ขาหน้า
                        </option>
                        <option value="5f338ef65f7703096453abb7">
                          ซากซ้าย-ขาหลัง
                        </option>
                      </select>
                    </div>
                    <div
                      style={{
                        width: "100%",
                        gridRowStart: "1",
                        gridRowEnd: "1",
                        gridColumnStart: "2",
                      }}
                    >
                      จำนวน : {}
                      <Searchinput
                        style={{
                          width: "150px",
                          textAlign: "center",
                          backgroundColor: `${
                            !inputListroom[i].beeftype ? "#ececec" : ""
                          }`,
                        }}
                        disabled={!inputListroom[i].beeftype}
                        name="totalbeef"
                        value={inputListroom[i].totalbeef}
                        onChange={(e) => handleInputroom(e, i)}
                      ></Searchinput>
                      {inputListroom.length !== 1 && (
                        <Removebuttoncolor
                          style={{
                            height: "38px",
                            margin: " auto auto 0",
                            width: " 38px",
                          }}
                          onClick={() => handleRemoveClickroom(i)}
                        >
                          <Removebutton />
                        </Removebuttoncolor>
                      )}
                    </div>
                  </div>
                );
              })}
              <div
                style={{
                  width: "100%",
                  gridRowStart: "1",
                  gridRowEnd: "1",
                  gridColumnStart: "4",
                  marginTop: "0px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    margin: "24px 0px 0px 0px",
                    marginLeft: "5px",
                  }}
                >
                  <Addbutton
                    style={{
                      height: "38px",
                      width: " 150px",
                      marginRight: "5px",
                    }}
                    onClick={handleAddClickroom}
                  >
                    เพิ่มประเภทจัดเก็บ
                  </Addbutton>
                  <Savebuttoncolor
                    style={{
                      height: "38px",
                      width: " 50px",
                    }}
                    onClick={handleSubmitroom}
                  >
                    บันทึก
                  </Savebuttoncolor>
                </div>
              </div>
            </>
          </div>
        )}
      </DivFromDown>
    </div>
  );
};

export default room;
