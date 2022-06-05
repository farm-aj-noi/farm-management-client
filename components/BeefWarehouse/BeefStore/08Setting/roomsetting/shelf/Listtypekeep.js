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
      shelfname
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

/* export const UPDATENAME = gql`

`; */

const Listtypekeep = ({ listkeep }) => {
  const MySwal = withReactContent(Swal);
  const [infolistkeep, setinfolistkeep] = useState(listkeep);
  console.log(infolistkeep);
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

  return (
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
        {" "}
        ชื่อชั้นจัดเก็บ : {}
        <Searchinput
          /* value={prod.shelfname} */
          type="text"
          id="shelfname"
          name="shelfname"
          value={infolistkeep.shelfname}
          disabled
          style={{
            width: "156px",
            textAlign: "center",
            marginTop: "10px",
          }}
        />{" "}
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
        ประเภทจัดเก็บ : {}
        {infolistkeep &&
          infolistkeep.typekeep.map((prod) => (
            <select
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
          marginTop: "0px",
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
          marginLeft: "50px",
        }}
      >
        <Addbutton
          /*  onClick={() => setedit(true)} */
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
    </div>
  );
};

export default Listtypekeep;
