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

import { Removebutton } from "../../../../../../utils/button";

import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";

import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Router from "next/router";

import Listshelf from "./Listshelf";

export const QUERYROOM = gql`
  query Query {
    allRoom {
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

const shelf = () => {
  const MySwal = withReactContent(Swal);

  const { data: dataroom } = useQuery(QUERYROOM);

  const [idshelf, SetidShelf] = useState(""); //get ID room
  const [successCreateShelfname, setSuccessCreateShelfName] = useState(false); //done room name
  const [Infoshelf, SetInfoshelf] = useState("");
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
  return (
    <div>
      <DivFromTop>
        <div style={{ margin: "-3px 5px 0px 0px" }}>
          <Icon size={20} icon={list} />
        </div>
        บันทึกตั้งค่าชั้นจัดเก็บ
      </DivFromTop>
      <DivFromDown>
        {!successCreateShelfname && (
          <>
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
                ห้องจัดเก็บ : { }
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
                ชื่อชั้นจัดเก็บ : { }
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
                    backgroundColor: `${!Infoshelf.beefroom ? "#ececec" : ""}`,
                  }}
                />
                <Savebuttoncolor
                  style={{
                    height: "38px",
                    width: " 50px",
                    backgroundColor: `${!Infoshelf.beefroom || !Infoshelf.shelfname ? "gray" : ""
                      }`,
                  }}
                  disabled={!Infoshelf.beefroom || !Infoshelf.shelfname}
                  onClick={handleSubmitShelfname}
                >
                  บันทึก
                </Savebuttoncolor>
              </div>
            </div>
          </>
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
                ห้องจัดเก็บ : { }
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
                ชื่อชั้นจัดเก็บ : { }
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
                  width: "100%",
                  gridRowStart: "1",
                  gridRowEnd: "1",
                  gridColumnStart: "2",

                }}>
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
                          gridColumn: `2 ${inputListshelf.length !== 1 ? "" : ""}`,
                          gridTemplateColumns: `200px 200px 200px ${inputListshelf.length !== 1 ? "40px" : ""
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
                            <option value="5f4461a8ecd6732ad8108685">ที-โบน</option>
                            <option value="5f4461bfecd6732ad8108686">
                              เนื้อสันนอก
                            </option>
                            <option value="5f4461d6ecd6732ad8108687">
                              ที-โบน สเต็ก
                            </option>
                            <option value="5f44620cecd6732ad8108688">ริบอาย</option>
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
                            <option value="5f4462a4ecd6732ad810868e">พับใน</option>
                            <option value="5f4462b6ecd6732ad810868f">ตะพาบ</option>
                            <option value="5f4462c8ecd6732ad8108690">
                              ลูกมะพร้าว
                            </option>
                            <option value="5f4462ddecd6732ad8108691">
                              ปลาบู่ทอง
                            </option>
                            <option value="5f4462eeecd6732ad8108692">ใบพาย</option>
                            <option value="5f4462feecd6732ad8108693">
                              หางตะเข้
                            </option>
                            <option value="5f44630fecd6732ad8108694">น่อง</option>
                            <option value="5f446320ecd6732ad8108695">พับนอก</option>
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
                              backgroundColor: `${!inputListshelf[j].beeftype ? "#ececec" : ""
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
              </div>
              <div
                style={{
                  width: "100%",
                  gridRowStart: "3",
                  gridRowEnd: "3",
                  gridColumnStart: "4",
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
                  onClick={handleAddClickshelf}
                >
                    เพิ่มประเภทจัดเก็บ
                  </Addbutton>
                  <Savebuttoncolor
                    style={{
                      height: "38px",
                      width: " 50px",
                      fontSize: "16px"
                    }}
                    onClick={handleSubmitshelf}
                  >
                    บันทึก
                  </Savebuttoncolor></div>

              </div>
            </div>
          </>
        )}
      </DivFromDown>
    </div>
  );
};

export default shelf;
