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

import { DivBase } from "../../../../../../utils/divBase";

import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";

import Edittotalbeef from "./editkeep";

export const DELETESHELF = gql`
  mutation DELETESHELF($id: ID) {
    deleteShelf(id: $id) {
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

const Listtypekeep = ({ listkeep }) => {
  const MySwal = withReactContent(Swal);
  const [infolistkeep, setinfolistkeep] = useState(listkeep);
  /*  console.log(infolistkeep); */
  const [deleteShelf] = useMutation(DELETESHELF, {
    onCompleted: (data) => {
      MySwal.fire({
        icon: "success",
        title: "สำเร็จ",
        text: "ทำการลบข้อมูลสิ้น",
        confirmButtonText: (
          <span
            onClick={() =>
              Router.reload("beefwarehouse/beefstore/setting/shelf")
            }
          >
            ตกลง
          </span>
        ),
        confirmButtonColor: "#3085d6",
      });
    },
  });

  const handdleSubmitDelete = async () => {
    try {
      await deleteShelf({
        variables: {
          id: infolistkeep.id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
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
                Router.reload("beefwarehouse/beefstore/setting/shelf")
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
            shelf: infolistkeep.id,
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
      {edit ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `200px 200px 200px 200px`,
          }}
        >
          <div
            style={{
              width: "100%",
              gridRowStart: "1",
              gridRowEnd: "1",
              gridColumnStart: "1",
              marginTop: "0px",
            }}
          >
            ประเภทจัดเก็บ : {}
            {infolistkeep &&
              infolistkeep.typekeep.map((prod) => (
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
              gridColumnStart: "2",
            }}
          >
            จำนวน : {}
            {infolistkeep &&
              infolistkeep.typekeep.map((prod) => (
                <Edittotalbeef key={prod.id} edittype={prod} />
              ))}
          </div>
          <div
            style={{
              gridRowStart: "2",
              gridRowEnd: "2",
              gridColumnStart: "1",
              marginBomtom: "100px",
            }}
          >
            {inputListshelf.map((x, j) => {
              return (
                <div
                  style={{
                    marginTop: "10px",
                    display: "grid",
                    gridColumStart: "1",
                    gridColumn: `1 ${inputListshelf.length !== 1 ? "" : ""}`,
                    gridTemplateColumns: `200px 200px 200px ${
                      inputListshelf.length !== 1 ? "40px" : ""
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
                      <option value="5f44624fecd6732ad810868b">สันสะโพก</option>
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
                      <option value="5f4462feecd6732ad8108693">หางตะเข้</option>
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
              );
            })}
          </div>
          <div
            style={{
              gridRowStart: "3",
              gridColumnStart: "2",
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
          <div>
            <Removebuttoncolor
              style={{
                marginLeft: "170px",
                height: "38px",
                width: "55px",
                fontSize: "20px",
              }}
              onClick={() => setedit(false)}
            >
              ยกเลิก
            </Removebuttoncolor>
          </div>
        </div>
      ) : (
        <>
          <div
            style={{
              width: "100%",
              gridRowStart: "1",
              gridRowEnd: "1",
              gridColumnStart: "2",
            }}
          >
            ประเภทจัดเก็บ : {}
            {infolistkeep &&
              infolistkeep.typekeep.map((prod) => (
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
            จำนวน : {}
            {infolistkeep &&
              infolistkeep.typekeep.map((prod) => (
                <Edittotalbeef key={prod.id} edittype={prod} />
              ))}
          </div>
          <div
            style={{
              width: "100%",
              gridRowStart: "1",
              gridRowEnd: "1",
              gridColumnStart: "4",
              marginLeft: "30px",
            }}
          >
            <Addbutton
              onClick={() => setedit(true)}
              style={{
                fontSize: "20px",
                width: "140px",
                marginBottom: "4px",
              }}
            >
              เพิ่มประเภทจัดเก็บ
            </Addbutton>
            <Removebuttoncolor
              onClick={handdleSubmitDelete}
              style={{ marginLeft: "10px", fontSize: "20px", width: "50px" }}
            >
              ลบ
            </Removebuttoncolor>
          </div>
        </>
      )}
    </>
  );
};

export default Listtypekeep;
