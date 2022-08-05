import { useMutation, useQuery } from "@apollo/react-hooks";
import React, { useState } from "react";
import gql from "graphql-tag";

import QUERYROOMS from "./room";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Edittotal from "./edittotalbeef";
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

import { DivBase } from "../../../../../../utils/divBase";

import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";

import { Accordion, Card, Button } from "react-bootstrap";

import Editname from "./editname";

export const DELETEROOM = gql`
  mutation DELETEROOM($id: ID) {
    deleteBeefroom(id: $id) {
      id
    }
  }
`;

export const UPDATETYPEKEEP = gql`
  mutation UPDATETYPEKEEP(
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

export const QUERY = gql`
  query TypeRoom($beefroom: String) {
    TypeRoom(beefroom: $beefroom) {
      id
      totalbeef
    }
  }
`;

const deleteroom = ({ idroom }) => {
  const MySwal = withReactContent(Swal);
  const [roominfo, setRoominfo] = useState(idroom);

  const { data } = useQuery(QUERY, {
    variables: {
      beefroom: roominfo.id,
    },
  });
  /*   console.log(data); */
  const [deleteBeefroom] = useMutation(DELETEROOM, {
    onCompleted: (data) => {
      MySwal.fire({
        icon: "success",
        title: "สำเร็จ",
        text: "ทำการลบข้อมูลสิ้น",
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
    },
    refeetchQueries: [{ query: QUERYROOMS }],
  });

  const handdleSubmitDelete = async () => {
    try {
      await deleteBeefroom({
        variables: {
          id: roominfo.id,
        },
      });
      /* console.log(data.allRoom.id); */
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

  const [createtypekeep] = useMutation(UPDATETYPEKEEP, {
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
            beefroom: roominfo.id,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [edit, setedit] = useState(false);

  return (
    <>
      <Accordion>
        <Card>
          <Card.Header>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "300px 1fr 150px 150px ",
              }}
            >
              <Editname key={roominfo.id} idroom={roominfo} />
              <div></div>
              <Accordion.Toggle
                as={Button}
                variant="link"
                eventKey={roominfo.id}
                style={{
                  float: "right",
                  margin: "0px 0",
                  padding: "5px 8px",
                  color: "white",
                  background: "#3bafda",
                }}
              >
                รายละเอียด
              </Accordion.Toggle>
              <Removebuttoncolor
                onClick={handdleSubmitDelete}
                style={{ marginLeft: "10px", fontSize: "16px", gridColumStart: "4" }}
              >
                ลบ
              </Removebuttoncolor>
            </div>
          </Card.Header>
          <Accordion.Collapse eventKey={roominfo.id}>
            <Card.Body>
              {
                edit ? (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: `200px 200px 200px 200px `,
                    }}
                  >
                    <>
                      <div
                        style={{
                          width: "100%",
                          gridRowStart: "1",
                          gridRowEnd: "1",
                          gridColumnStart: "2",
                        }}
                      >
                        ประเภทจัดเก็บ : { }
                        {roominfo &&
                          roominfo.typekeep.map((prod) => (
                            <select
                              value={prod.beeftype.id}
                              style={{
                                height: "38px",
                                width: "156px",
                                border: "1px solid #AFAFAF",
                                borderRadius: "4px",
                                textAlign: "center",
                                fontSize: "14px",
                                marginTop: "10px",
                              }}
                              disabled
                            >
                              <option>{prod.beeftype.nameTH}</option>
                            </select>
                          ))}
                      </div>
                      <div
                        style={{
                          width: "100%",
                          gridRowStart: "1",
                          gridRowEnd: "1",
                          gridColumnStart: "3",
                        }}
                      >
                        จำนวน : { }
                        <>
                          {data &&
                            data.TypeRoom.map((prod) => (
                              <Edittotal key={prod.id} editcount={prod} />
                            ))}
                        </>
                      </div>
                      <div
                        style={{
                          gridRowStart: "2",
                          gridRowEnd: "2",
                          gridColumnStart: "2",
                          marginBomtom: "100px",
                        }}
                      >
                        {inputListroom.map((x, i) => {
                          return (
                            <div
                              style={{
                                marginTop: "10px",
                                display: "grid",
                                gridColumStart: "1",
                                gridColumn: `1 ${inputListroom.length !== 1 ? "" : ""}`,
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
                          gridRowStart: "3",
                          gridColumnStart: "2",
                          gridColumnEnd: "4",
                          marginTop: "20px",
                          marginLeft: "133px"
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
                          <Removebuttoncolor
                            style={{
                              height: "38px",
                              width: "50px",
                              fontSize: "16px",
                              marginRight: "5px"
                            }}
                            onClick={() => setedit(false)}
                          >
                            ยกเลิก
                          </Removebuttoncolor>
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
                ) : (
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: `200px 200px 200px 200px `,
                  }}>
                    <div
                      style={{
                        width: "100%",
                        gridRowStart: "1",
                        gridRowEnd: "1",
                        gridColumnStart: "2",
                      }}
                    >
                      ประเภทจัดเก็บ : { }
                      {roominfo &&
                        roominfo.typekeep.map((prod) => (
                          <select
                            value={prod.beeftype.id}
                            style={{
                              height: "38px",
                              width: "156px",
                              border: "1px solid #AFAFAF",
                              borderRadius: "4px",
                              textAlign: "center",
                              fontSize: "14px",
                              marginTop: "10px",
                            }}
                            disabled
                          >
                            <option>{prod.beeftype.nameTH}</option>
                          </select>
                        ))}
                    </div>
                    <div
                      style={{
                        width: "100%",
                        gridRowStart: "1",
                        gridRowEnd: "1",
                        gridColumnStart: "3",
                      }}
                    >
                      จำนวน : { }
                      <>
                        {data &&
                          data.TypeRoom.map((prod) => (
                            <Edittotal key={prod.id} editcount={prod} />
                          ))}
                      </>
                    </div>
                    <div
                      style={{
                        width: "100%",
                        gridRowStart: "2",
                        gridRowEnd: "2",
                        gridColumnStart: "3",
                        marginTop: "10px",
                        marginLeft: "43px",
                      }}
                    >
                      <Addbutton
                        onClick={() => setedit(true)}
                        style={{
                          fontSize: "16px",
                          width: "150px",
                          height: "38px",
                          marginBottom: "4px",
                        }}
                      >
                        เพิ่มประเภทจัดเก็บ
                      </Addbutton>

                    </div>
                  </div>
                )
              }
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>


    </>
  );
};

export default deleteroom;
