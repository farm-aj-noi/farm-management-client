import React, { useState } from "react";

import {
  DivFromTop,
  DivFromDown,
  Searchinput,
  Addbutton,
} from "../../SettingFrom";
import {
  Savebuttoncolor,
  Removebuttoncolor,
} from "../../../../../../utils/buttonColor";

import {
  Removebutton,
} from "../../../../../../utils/button";

import { Icon } from "react-icons-kit";
import { cog } from 'react-icons-kit/entypo/cog'

import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Router from "next/router";

import { Spinner } from "react-bootstrap";
import { QUERYROOMS } from "./room1"

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



const room = () => {
  const MySwal = withReactContent(Swal);

  // console.log(dataroom);
  /*  console.log(data); */
  const [idroom, SetidRoom] = useState(""); //get ID room
  const [successCreateRoomName, setSuccessCreateRoomName] = useState(false); //done room name
  const [Inforoomname, SetInforoomName] = useState({
    roomname: ""
  });
  console.log(Inforoomname.roomname)
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

  const alert = () => {
    MySwal.fire({
      icon: "success",
      title: "สำเร็จ",
      text: "ทำการตั้งค่าเสร็จสิ้น",
      showConfirmButton: false,
      timer: 1000
      /*  confirmButtonText: "ตกลง", */
      /* confirmButtonColor: "#3085d6", */
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        Router.push("beefwarehouse/beefstore/setting/room").then(() => Router.reload())
      }
      /* if (result.isConfirmed) {
        Router.reload("beefwarehouse/beefstore/import/import_halves")
      } */
    });
  }
  const [createtypekeep, { error, reset }] = useMutation(CREATETYPEKEEP, {
    onCompleted: (data) => {
      if (data) {

      }

    },
   /*  refetchQueries: [
      { query: QUERYROOMS }
    ] */
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

  const [loadingCreate, setLoadingCreate] = useState(false);

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
        setLoadingCreate(true)
      }
      setLoadingCreate(false)
      alert()
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div>
      <DivFromTop>
        <div style={{ margin: "-3px 5px 0px -5px" }}>
          <Icon size={20} icon={cog} />
        </div>
        บันทึกตั้งค่าห้องจัดเก็บ
      </DivFromTop>
      <DivFromDown>
        {!successCreateRoomName && (
          <>
            <div>
              ชื่อห้องจัดเก็บ : { }
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
                ชื่อห้องจัดเก็บ : { }
                <Searchinput
                  type="text"
                  id="roomname"
                  name="roomname"
                  value={Inforoomname.roomname}
                  disabled
                  style={{ width: "156px", textAlign: "center" }}
                />
              </div>
              <div
                style={{
                  width: "100%",
                  gridRowStart: "1",
                  gridRowEnd: "1",
                  gridColumnStart: "2",
                  marginTop: "0px",
                }}
              >
                {inputListroom.map((x, i) => {
                  return (
                    <div
                      style={{
                        display: "grid",
                        gridColumStart: "1",
                        gridColumn: `2 ${inputListroom.length !== 1 ? "" : ""}`,
                        gridTemplateColumns: `200px 200px 200px ${inputListroom.length !== 1 ? "40px" : ""
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
                        ประเภทจัดเก็บ : { }
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
                          <option value="5f1000ee8d55662dcc23d960">
                            ซากขวา
                          </option>
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
                        จำนวน : { }
                        <Searchinput
                          style={{
                            width: "150px",
                            textAlign: "center",
                            backgroundColor: `${!inputListroom[i].beeftype ? "#ececec" : ""
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
              </div>
              <div
                style={{
                  width: "100%",
                  gridRowStart: "3",
                  gridRowEnd: "3",
                  gridColumnStart: "3",
                  marginTop: "20px",
                  marginRight: "2px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    marginLeft: "5px",
                  }}
                >
                  <Addbutton
                    style={{
                      height: "38px",
                      width: " 150px",
                      marginRight: "5px",
                      fontSize: "16px"
                    }}
                    onClick={handleAddClickroom}
                  >
                    เพิ่มประเภทจัดเก็บ
                  </Addbutton>
                  {loadingCreate ? (
                    <Spinner
                      style={{ margin: "0px 12px 0px auto", float: "right" }}
                      animation="border"
                      variant="primary"
                    />
                  ) : (
                    <Savebuttoncolor
                      style={{
                        height: "38px",
                        width: " 50px",
                        fontSize: "16px"
                      }}
                      onClick={handleSubmitroom}
                    >
                      บันทึก
                    </Savebuttoncolor>
                  )}

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
