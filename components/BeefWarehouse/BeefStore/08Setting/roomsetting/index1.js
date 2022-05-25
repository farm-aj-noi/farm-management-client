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

const index1 = () => {
  const MySwal = withReactContent(Swal);
  const [RoomInfo, SetRoomInfo] = useState({ roomname: "" });
  const [success, setSuccess] = useState(false);
  const [success1, setSuccess1] = useState(false);
  const [idroom, SetidRoom] = useState("");

  const [typekeephalve, Settypekeephalve] = useState({
    totalbeef: "",
    beeftype: "",
  });

  const [createtypekeep] = useMutation(CREATETYPEKEEP, {
    onCompleted: (data) => {
      if (data) {
        setSuccess1(true);
        setSuccess2(false);
      }
    },
  });

  const [inputList1, setInputList1] = useState([
    {
      totalbeef: "",
      beeftype: "",
    },
  ]);
  const handleRemoveClick1 = (index) => {
    const list1 = [...inputList1];
    list1.splice(index, 1);
    setInputList1(list1);
  };

  const handleAddClick1 = () => {
    setInputList1([
      ...inputList1,
      {
        totalbeef: "",
        beeftype: "",
      },
    ]);
  };

  const handleInputChange1 = (e, index) => {
    const { name, value } = e.target;
    const list1 = [...inputList1];
    list1[index][name] = value;
    setInputList1(list1);
  };

  const [createBeefroom, { loading, data }] = useMutation(CREATEROOMS, {
    variables: {
      ...RoomInfo,
    },
    onCompleted: (data) => {
      if (data) {
        setSuccess(true);
        SetidRoom(data.createBeefroom.id);
      }
    },
  });

  const handleChange = (e) => {
    SetRoomInfo({
      ...RoomInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await createBeefroom();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit2 = async (e) => {
    try {
      e.preventDefault();
      for (let j = 0; j < inputList1.length; j++) {
        await createtypekeep({
          variables: {
            beeftype: inputList1[j].beeftype,
            totalbeef: inputList1[j].totalbeef,
            beefroom: idroom,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  /////////////////////////////////////////////////////////////////////////
  const [success2, setSuccess2] = useState(false);
  const [cretateshelp1, Setcretatesshelp] = useState({
    shelfname: "",
  });
  const [createShelf, error] = useMutation(CREATESHELF, {
    onCompleted: (data) => {
      setidshelf(data.createShelf.id);
    },
  });

  const handleInputChangeshelf = (e, index) => {
    const { name, value } = e.target;
    const shelp1 = [...cretateshelp1];
    shelp1[index][name] = value;
    Setcretatesshelp(shelp1);
  };

  const handleRemoveClickshelf = (index) => {
    const shelp1 = [...cretateshelp1];
    shelp1.splice(index, 1);
    Setcretatesshelp(shelp1);
  };

  const handleAddClickshelf = () => {
    Setcretatesshelp([
      ...cretateshelp1,
      {
        shelfname: "",
      },
    ]);
  };

  const handleSubmitshelf = async () => {
    try {
      for (let k = 0; k < cretateshelp1.length; k++) {
        await createShelf({
          variables: {
            shelfname: cretateshelp1[k].shelfname,
            beefroom: idroom,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange1 = (e) => {
    Setcretatesshelp({
      ...cretateshelp1,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit3 = async (e) => {
    try {
      e.preventDefault();
      await createShelf({
        variables: {
          /*           shelfname: cretateshelp1.shelfname, */
          beefroom: idroom,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const [inputList, setInputList] = useState([
    {
      shelfname: "",
      shelf: "",
      totalbeef: "",
    },
  ]);

  const [idshelf, setidshelf] = useState("");

  const handleSubmit1 = async () => {
    try {
      for (let i = 0; i < inputList.length; i++) {
        await createtypekeep({
          variables: {
            beeftype: inputList[i].beeftype,
            totalbeef: inputList[i].totalbeef,
            beefroom: idroom,
            shelf: idshelf,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleAddClick = () => {
    setInputList([
      ...inputList,
      {
        shelfname: "",
        beefroom: "",
        shelf: "",
      },
    ]);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };
  ////////////////////////////////////////////////////////////////

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
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `350fr 170fr 170fr  ${
                  inputList1.length !== 1 ? "40px" : ""
                }170px`,
                gridRowGap: "5px",
                marginLeft: "30px",
              }}
            >
              <>
                {/*  {!success && ( */}
                <div>
                  ชื่อห้องจัดเก็บ : {}
                  <Searchinput
                    type="text"
                    id="roomname"
                    name="roomname"
                    style={{ width: "156px", textAlign: "center" }}
                    value={RoomInfo.roomname}
                    onChange={handleChange}
                  />
                  <Savebuttoncolor
                    /*  disabled={!RoomInfo.roomname} */
                    style={{
                      height: "38px",
                      width: " 50px",

                      /*  backgroundColor: `${!RoomInfo.roomname ? "gray" : ""}`, */
                    }}
                    onClick={handleSubmit}
                  >
                    บันทึก
                  </Savebuttoncolor>
                </div>
                {/*  )} */}
                {/*   {success && ( */}
                <>
                  {/*  {!success1 && ( */}
                  <>
                    <div>
                      ชื่อห้องจัดเก็บ : {}
                      <Searchinput
                        type="text"
                        id="roomname"
                        name="roomname"
                        style={{ width: "156px", textAlign: "center" }}
                        value={RoomInfo.roomname}
                        disabled
                      />
                    </div>
                    <div>
                      {inputList1.map((x, j) => {
                        return (
                          <div
                            style={{
                              display: "grid",
                              gridColumStart: "3",
                              gridColumn: `1 ${
                                inputList1.length !== 1 ? "" : ""
                              }`,
                              gridTemplateColumns: ` 170px 170px ${
                                inputList1.length !== 1 ? "40px" : ""
                              } `,
                              gridRowGap: "5px",
                            }}
                          >
                            <div>
                              ประเภทจัดเก็บ : {}
                              <select
                                name="beeftype"
                                id="beeftype"
                                value={inputList1[j].beeftype}
                                onChange={(e) => handleInputChange1(e, j)}
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

                            <div>
                              จำนวนซากโคผ่าซีก : {}
                              <Searchinput
                                style={{
                                  width: "156px",
                                  textAlign: "center",
                                }}
                                name="totalbeef"
                                value={inputList1[j].totalbeef}
                                onChange={(e) => handleInputChange1(e, j)}
                              ></Searchinput>
                            </div>
                            {inputList1.length !== 1 && (
                              <Removebuttoncolor
                                style={{
                                  height: "38px",
                                  margin: " auto auto 0",
                                  width: " 38px",
                                  marginRight: "150px",
                                }}
                                onClick={() => handleRemoveClick1(j)}
                              >
                                <Removebutton />
                              </Removebuttoncolor>
                            )}
                          </div>
                        );
                      })}
                      ;
                    </div>
                    <div
                      style={{
                        display: "flex",
                        margin: "24px 0px 0px 0px",
                      }}
                    >
                      <Addbutton
                        style={{
                          height: "38px",
                          width: " 150px",
                          marginRight: "5px",
                        }}
                        onClick={handleAddClick1}
                      >
                        เพิ่มประเภทจัดเก็บ
                      </Addbutton>
                      <Savebuttoncolor
                        /*  disabled={!RoomInfo.roomname} */
                        style={{
                          height: "38px",
                          width: " 50px",

                          /*  backgroundColor: `${!RoomInfo.roomname ? "gray" : ""}`, */
                        }}
                        onClick={handleSubmit2}
                      >
                        บันทึก
                      </Savebuttoncolor>
                    </div>
                  </>
                  {/*  )} */}
                </>
                {/*  )} */}
              </>
            </div>
            {/*   {success1 && ( */}
            <>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: `170px 170px 170px 170px`,
                  gridRowGap: "5px",
                  borderBottom: "1px solid #ced4da",
                  paddingBottom: "20px",
                }}
              >
                <div>
                  ชื่อห้องจัดเก็บ : {}
                  <Searchinput
                    type="text"
                    id="roomname"
                    name="roomname"
                    style={{ width: "156px", textAlign: "center" }}
                    value={RoomInfo.roomname}
                    disabled
                  />
                </div>
                <div>
                  {inputList1.map((x, j) => {
                    return (
                      <div
                        style={{
                          display: "grid",
                          gridColumStart: "3",
                          gridColumn: `1 ${inputList1.length !== 1 ? "" : ""}`,
                          gridTemplateColumns: ` 170px 170px ${
                            inputList1.length !== 1 ? "40px" : ""
                          } `,
                          gridRowGap: "5px",
                        }}
                      >
                        <div>
                          ประเภทจัดเก็บ : {}
                          <select
                            name="beeftype"
                            id="beeftype"
                            value={inputList1[j].beeftype}
                            disabled
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

                        <div>
                          จำนวนซากโคผ่าซีก : {}
                          <Searchinput
                            style={{
                              width: "156px",
                              textAlign: "center",
                            }}
                            name="totalbeef"
                            value={inputList1[j].totalbeef}
                            disabled
                          ></Searchinput>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: `350fr 170fr 170fr  ${
                    cretateshelp1.length !== 1 ? "40px" : ""
                  }170px`,
                  gridRowGap: "5px",
                  marginLeft: "30px",
                }}
              >
                {cretateshelp1.map((x, k) => {
                  return (
                    <div
                      style={{
                        display: "grid",
                        gridColumStart: "3",
                        gridColumn: `1 ${inputList1.length !== 1 ? "" : ""}`,
                        gridTemplateColumns: ` 170px 170px ${
                          inputList1.length !== 1 ? "40px" : ""
                        } `,
                        gridRowGap: "5px",
                      }}
                    >
                      <div style={{ marginTop: "20px" }}>
                        ชื่อชั้นจัดเก็บ : {}
                        <Searchinput
                          style={{
                            width: "156px",
                            textAlign: "center",
                          }}
                          type="text"
                          name="shelfname"
                          value={cretateshelp1[k].shelfname}
                          onChange={(e) => handleInputChangeshelf(e, k)}
                        ></Searchinput>
                        {cretateshelp1.length !== 1 && (
                          <Removebuttoncolor
                            style={{
                              height: "38px",
                              margin: " auto auto 0",
                              width: " 38px",
                              marginRight: "150px",
                            }}
                            onClick={() => handleRemoveClickshelf(k)}
                          >
                            <Removebutton />
                          </Removebuttoncolor>
                        )}
                      </div>
                    </div>
                  );
                })}
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
                  /*  disabled={!RoomInfo.roomname} */
                  style={{
                    height: "38px",
                    width: " 50px",

                    /*  backgroundColor: `${!RoomInfo.roomname ? "gray" : ""}`, */
                  }}
                  onClick={handleSubmitshelf}
                >
                  บันทึก
                </Savebuttoncolor>
              </div>
              {/* <>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: `170px 170px 170px 170px`,
                    gridRowGap: "5px",
                    borderBottom: "1px solid #ced4da",
                    paddingBottom: "20px",
                  }}
                >
                  <div style={{ marginTop: "20px" }}>
                    ชื่อชั้นจัดเก็บ : {}
                    <Searchinput
                      style={{
                        width: "156px",
                        textAlign: "center",
                      }}
                      type="text"
                      name="shelfname"
                      value={cretateshelp1.shelfname}
                      disabled
                    ></Searchinput>
                  </div>
                  {inputList.map((x, i) => {
                    return (
                      <div
                        style={{
                          display: "grid",
                          gridColumStart: "2",
                          gridColumn: `1 ${inputList.length !== 1 ? "" : ""}`,
                          gridTemplateColumns: ` 170px 170px  ${
                            inputList.length !== 1 ? "40px" : ""
                          } `,
                          gridRowGap: "5px",
                          paddingTop: "10px",
                        }}
                      >
                        <div>
                          ประเภทจัดเก็บ : {}
                          <select
                            name="beeftype"
                            id="beeftype"
                            value={inputList[i].beeftype}
                            onChange={(e) => handleInputChange(e, i)}
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
                        <div>
                          จำนวน : {}
                          <Searchinput
                            style={{
                              width: "156px",
                              textAlign: "center",
                              backgroundColor: "#ececec",
                            }}
                            name="totalbeef"
                            value={inputList[i].totalbeef}
                            onChange={(e) => handleInputChange(e, i)}
                          ></Searchinput>
                        </div>
                        {inputList.length !== 1 && (
                          <Removebuttoncolor
                            style={{
                              height: "38px",
                              margin: " auto auto 0",
                              width: " 38px",
                              marginRight: "150px",
                            }}
                            onClick={() => handleRemoveClick(i)}
                          >
                            <Removebutton />
                          </Removebuttoncolor>
                        )}
                      </div>
                    );
                  })}
                  <div
                    style={{
                      display: "flex",
                      padding: "10px 0px 10px 10px",
                      float: "right",
                      margin: "10px 94px 0px auto",
                    }}
                  >
                    <Addbutton
                      style={{
                        height: "38px",
                        width: " 100px",
                        margin: "0px 5px 0px auto",
                      }}
                      onClick={handleAddClick}
                    >
                      เพิ่มข้อมูลชั้น
                    </Addbutton>
                    <Savebuttoncolor
                      disabled={!inputList}
                      style={{
                        backgroundColor: `${!inputList ? "gray" : ""}`,
                        height: "38px",
                        width: " 50px",
                        margin: "0px 0px 0px auto",
                      }}
                      onClick={handleSubmit1}
                    >
                      บันทึก
                    </Savebuttoncolor>
                  </div>
                </div>
              </> */}
            </>
            {/*  )} */}
          </DivFromDown>
        </DivFrom>
      </DivBase>
    </DivBase>
  );
};

export default index1;
