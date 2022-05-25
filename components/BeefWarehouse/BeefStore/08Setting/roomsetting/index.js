import React, { useState, useeffect } from "react";

import { Badge, Table } from "react-bootstrap";
import {
  DivFrom,
  DivFromTop,
  DivFromDown,
  HeaderColor,
  Searchinput,
  Addbutton,
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

import Nav_setting from "../Nav_setting";

import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Router from "next/router";

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

export const CREATESHELF = gql`
  mutation CREATESHELF($shelfname: String, $beefroom: String) {
    createShelf(shelfname: $shelfname, beefroom: $beefroom) {
      id
      shelfname
      beefroom {
        id
      }
    }
  }
`;

export const QUERYROOM = gql`
  query Query {
    allRoom {
      id
      roomname
    }
  }
`;

export const QUERYSHELF = gql`
  query QUERYSHELF($id: ID) {
    listShelf(id: $id) {
      shelfname
      id
    }
  }
`;

export const CREATBASKET = gql`
  mutation CREATBASKET($beefroom: String, $shelf: String, $basketname: String) {
    createBasket(beefroom: $beefroom, shelf: $shelf, basketname: $basketname) {
      id
      basketname
    }
  }
`;

function index() {
  const MySwal = withReactContent(Swal);
  // query room
  const { data: dataroom } = useQuery(QUERYROOM);

  // query room

  // room
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
  //room

  //typekeep
  const [inputListroom, setInputListroom] = useState([
    {
      totalbeef: "",
      beeftype: "",
    }, //get totalbeef & beeftype room
  ]);
  const [successkeeproom, setSuccesskeeproom] = useState(false);
  const [createtypekeep] = useMutation(CREATETYPEKEEP, {
    onCompleted: (data) => {
      if (data) {
        //
        setSuccesskeeproom(true);
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

  //type room
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

  //type room

  //type shelf
  const [inputListshelf, setInputListshelf] = useState([
    {
      totalbeef: "",
      beeftype: "",
    },
  ]);

  const handleRemoveClickshelf = (index) => {
    const listshelf = [...inputListshelf];
    listshelf.splice(index, 1);
    setInputListshelf(listshelf);
  };

  const handleAddClickshelf = () => {
    setInputListshelf([
      ...inputListshelf,
      {
        totalbeef: "",
        beeftype: "",
      },
    ]);
  };

  const handleInputshelf = (e, index) => {
    const { name, value } = e.target;
    const listshelf = [...inputListshelf];
    listshelf[index][name] = value;
    setInputListshelf(listshelf);
  };

  const handleSubmitshelf = async () => {
    try {
      for (let j = 0; j < inputListshelf.length; j++) {
        await createtypekeep({
          variables: {
            beeftype: inputListshelf[j].beeftype,
            totalbeef: inputListshelf[j].totalbeef,
            shelf: idshelf,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  //type shelf

  //typekeep

  //create shelf
  const [idshelf, SetidShelf] = useState(""); //get ID room
  const [successCreateShelfname, setSuccessCreateShelfName] = useState(false); //done room name
  const [Infoshelf, SetInfoshelf] = useState("");
  const [test, Settst] = useState("");
  const [createShelf] = useMutation(CREATESHELF, {
    variables: {
      ...Infoshelf,
    },

    onCompleted: (data) => {
      if (data) {
        setSuccessCreateShelfName(true);
        SetidShelf(data.createShelf.id);
      }
    },
  });
  /*   console.log(Infoshelf.beefroom); */
  const hanndleChangeShelfname = (e) => {
    SetInfoshelf({
      ...Infoshelf,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitShelfname = async (e) => {
    try {
      e.preventDefault();
      await createShelf();
    } catch (error) {
      console.log(error);
    }
  };

  //create shelf

  //create basket

  const [Infobasket, setInfobasket] = useState({
    basketname: "",
    shelf: "",
    beefroom: "",
  });
  const { data: shelfdata } = useQuery(QUERYSHELF, {
    variables: {
      id: Infobasket.beefroom,
    },
  });

  const [createBasket] = useMutation(CREATBASKET, {
    variables: {
      ...Infobasket,
    },
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

  const handleChangeBasket = (e) => {
    setInfobasket({
      ...Infobasket,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitBasket = async (e) => {
    try {
      e.preventDefault();
      await createBasket();
    } catch (error) {
      console.log(error);
    }
  };

  //create basket
  return (
    <DivBase>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <HeaderColor
          style={{
            width: "fit-content",
            height: "fit-content",
            padding: "5px 30px",
          }}
        >
          การตั้งค่า
        </HeaderColor>
      </div>
      <DivBase
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 200px 850px 1fr",
          gridRowGap: "15px",
          gridColumnGap: "20px",
          textAlign: "start",
        }}
      >
        <DivFrom
          style={{
            width: "100%",
            marginTop: "0",
            gridRowStart: "2",
            gridRowEnd: "5",
            gridColumnStart: "2",
          }}
        >
          <Nav_setting />
        </DivFrom>
        <DivFrom
          style={{
            width: "100%",
            gridRowStart: "2",
            gridRowEnd: "3",
            gridColumnStart: "3",
            marginTop: "0px",
          }}
        >
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
                      backgroundColor: `${
                        !Inforoomname.roomname ? "gray" : ""
                      }`,
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
                          gridColumn: `2 ${
                            inputListroom.length !== 1 ? "" : ""
                          }`,
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
        </DivFrom>
        <DivFrom
          style={{
            width: "100%",
            gridRowStart: "3",
            gridRowEnd: "3",
            gridColumnStart: "3",
            marginTop: "0px",
          }}
        >
          <DivFromTop>
            <div style={{ margin: "-3px 5px 0px 0px" }}>
              <Icon size={20} icon={list} />
            </div>
            บันทึกตั้งค่าชั้นจัดเก็บ
          </DivFromTop>
          <DivFromDown>
            {!successCreateShelfname && (
              <div
                style={{ display: "grid", gridTemplateColumns: `230px 300px` }}
              >
                <div
                  style={{
                    width: "100%",
                    gridRowStart: "1",
                    gridRowEnd: "1",
                    gridColumnStart: "1",
                  }}
                >
                  ห้องจัดเก็บ : {}
                  <select
                    name="beefroom"
                    id="beefroom"
                    value={Infoshelf.beefroom}
                    onChange={hanndleChangeShelfname}
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
                    {dataroom &&
                      dataroom.allRoom.map((prod) => (
                        <option key={prod.id} value={prod.id}>
                          {prod.roomname}
                        </option>
                      ))}
                  </select>
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
                  ชื่อชั้นจัดเก็บ : {}
                  <Searchinput
                    type="text"
                    id="shelfname"
                    name="shelfname"
                    value={Infoshelf.shelfname}
                    disabled={!Infoshelf.beefroom}
                    onChange={hanndleChangeShelfname}
                    style={{
                      width: "156px",
                      textAlign: "center",
                      backgroundColor: `${
                        !Infoshelf.beefroom ? "#ececec" : ""
                      }`,
                    }}
                  />
                  <Savebuttoncolor
                    style={{
                      height: "38px",
                      width: " 50px",
                      backgroundColor: `${
                        !Infoshelf.beefroom || !Infoshelf.shelfname
                          ? "gray"
                          : ""
                      }`,
                    }}
                    disabled={!Infoshelf.beefroom || !Infoshelf.shelfname}
                    onClick={handleSubmitShelfname}
                  >
                    บันทึก
                  </Savebuttoncolor>
                </div>
              </div>
            )}

            {successCreateShelfname && (
              <>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: `200px 200px 200px 200px`,
                    paddingBottom: "10px",
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
                    ห้องจัดเก็บ : {}
                    <select
                      name="beefroom"
                      id="beefroom"
                      disabled
                      value={Infoshelf.beefroom}
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
                      {dataroom &&
                        dataroom.allRoom.map((prod) => (
                          <option key={prod.id} value={prod.id}>
                            {prod.roomname}
                          </option>
                        ))}
                    </select>
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
                    ชื่อชั้นจัดเก็บ : {}
                    <Searchinput
                      type="text"
                      id="shelfname"
                      name="shelfname"
                      value={Infoshelf.shelfname}
                      disabled
                      style={{ width: "156px", textAlign: "center" }}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      margin: "0px 0px 0px 0px",
                      marginLeft: "5px",
                      paddingBottom: "10px",
                      float: "right",
                      marginTop: "24px",
                    }}
                  >
                    <Addbutton
                      style={{
                        height: "38px",
                        width: " 150px",
                        marginRight: "5px",
                      }}
                      onClick={handleAddClickshelf}
                    >
                      เพิ่มประเภทจัดเก็บ
                    </Addbutton>
                    <Savebuttoncolor
                      style={{
                        height: "38px",
                        width: " 50px",
                      }}
                      onClick={handleSubmitshelf}
                    >
                      บันทึก
                    </Savebuttoncolor>
                  </div>
                </div>

                {inputListshelf.map((x, j) => {
                  return (
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: ` 200px 200px 200px 200px`,
                      }}
                    >
                      <div
                        style={{
                          display: "grid",
                          gridColumStart: "1",
                          gridRowStart: "1",
                          gridColumn: `2 ${
                            inputListroom.length !== 1 ? "" : ""
                          }`,
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
                            value={inputListshelf[j].beeftype}
                            onChange={(e) => handleInputshelf(e, j)}
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
                            <option value="5f446195ecd6732ad8108684">
                              เนื้อสันคอ
                            </option>
                            <option value="5f4461a8ecd6732ad8108685">
                              ที-โบน
                            </option>
                            <option value="5f4461bfecd6732ad8108686">
                              เนื้อสันนอก
                            </option>
                            <option value="5f4461d6ecd6732ad8108687">
                              ที-โบน สเต็ก
                            </option>
                            <option value="5f44620cecd6732ad8108688">
                              ริบอาย
                            </option>
                            <option value="5f446224ecd6732ad8108689">
                              ใบบัวสเต็ก
                            </option>
                            <option value="5f44623aecd6732ad810868a">
                              เนื้อสันใน
                            </option>
                            <option value="5f44624fecd6732ad810868b">
                              สันสะโพก
                            </option>
                            <option value="5f446262ecd6732ad810868c">
                              เสือร้องไห้
                            </option>
                            <option value="5f44628decd6732ad810868d">
                              เนื้อซี่โครง
                            </option>
                            <option value="5f4462a4ecd6732ad810868e">
                              พับใน
                            </option>
                            <option value="5f4462b6ecd6732ad810868f">
                              ตะพาบ
                            </option>
                            <option value="5f4462c8ecd6732ad8108690">
                              ลูกมะพร้าว
                            </option>
                            <option value="5f4462ddecd6732ad8108691">
                              ปลาบู่ทอง
                            </option>
                            <option value="5f4462eeecd6732ad8108692">
                              ใบพาย
                            </option>
                            <option value="5f4462feecd6732ad8108693">
                              หางตะเข้
                            </option>
                            <option value="5f44630fecd6732ad8108694">
                              น่อง
                            </option>
                            <option value="5f446320ecd6732ad8108695">
                              พับนอก
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
                                !inputListshelf[j].beeftype ? "#ececec" : ""
                              }`,
                            }}
                            disabled={!inputListshelf[j].beeftype}
                            name="totalbeef"
                            value={inputListshelf[j].totalbeef}
                            onChange={(e) => handleInputshelf(e, j)}
                          ></Searchinput>
                          {inputListshelf.length !== 1 && (
                            <Removebuttoncolor
                              style={{
                                height: "38px",
                                margin: " auto auto 0",
                                width: " 38px",
                              }}
                              onClick={() => handleRemoveClickshelf(j)}
                            >
                              <Removebutton />
                            </Removebuttoncolor>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </DivFromDown>
        </DivFrom>
        <DivFrom
          style={{
            width: "100%",
            gridRowStart: "4",
            gridRowEnd: "4",
            gridColumnStart: "3",
            marginTop: "0px",
          }}
        >
          <DivFromTop>
            <div style={{ margin: "-3px 5px 0px 0px" }}>
              <Icon size={20} icon={list} />
            </div>
            บันทึกตั้งค่าตะกร้าจัดเก็บ
          </DivFromTop>
          <DivFromDown style={{ display: "flex" }}>
            <div>
              ห้องจัดเก็บ : {}
              <select
                name="beefroom"
                id="beefroom"
                value={Infobasket.beefroom}
                onChange={handleChangeBasket}
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
                {dataroom &&
                  dataroom.allRoom.map((prod) => (
                    <option key={prod.id} value={prod.id}>
                      {prod.roomname}
                    </option>
                  ))}
              </select>
            </div>
            <div style={{ marginLeft: "10px" }}>
              ชั้นจัดเก็บ : {}
              <select
                disabled={!Infobasket.beefroom}
                name="shelf"
                id="shelf"
                value={Infobasket.shelf}
                onChange={handleChangeBasket}
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
                {shelfdata &&
                  shelfdata.listShelf.map((prod) => (
                    <option key={prod.id} value={prod.id}>
                      {prod.shelfname}
                    </option>
                  ))}
              </select>
            </div>
            <div style={{ marginLeft: "10px" }}>
              ชื่อตะกร้าจัดเก็บ : {}
              <Searchinput
                disabled={!Infobasket.shelf}
                type="text"
                id="basketname"
                name="basketname"
                value={Infobasket.basketname}
                onChange={handleChangeBasket}
                style={{
                  width: "156px",
                  textAlign: "center",
                  backgroundColor: `${!Infobasket.shelf ? "#ececec" : ""}`,
                }}
              />
              <Savebuttoncolor
                style={{
                  height: "38px",
                  width: " 50px",
                  backgroundColor: `${!Infobasket.basketname ? "gray" : ""}`,
                }}
                disabled={!Infobasket.basketname}
                onClick={handleSubmitBasket}
              >
                บันทึก
              </Savebuttoncolor>
            </div>
          </DivFromDown>
        </DivFrom>
      </DivBase>
    </DivBase>
  );
}

export default index;
