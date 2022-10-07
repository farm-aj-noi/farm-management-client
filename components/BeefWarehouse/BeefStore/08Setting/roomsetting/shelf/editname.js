import { useMutation, useQuery } from "@apollo/react-hooks";
import React, { useState } from "react";
import gql from "graphql-tag";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Router from "next/router";

export const UPDATESHELF = gql`
  mutation UPDATESHELF($id: ID, $shelfname: String) {
    updateShelf(id: $id, shelfname: $shelfname) {
      id
      shelfname
    }
  }
`;

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

import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";

const editname = ({ listkeep1 }) => {
  const MySwal = withReactContent(Swal);
  const [Editname, setEditname] = useState(false);
  const [infolistkeep, setinfolistkeep] = useState(listkeep1);
  const [updateShelf] = useMutation(UPDATESHELF, {
    onCompleted: (data) => {
      setinfolistkeep(data.updateShelf);
      setEditname(false);
      MySwal.fire({
        icon: "success",
        title: "สำเร็จ",
        text: "ทำการแก้ไขข้อมูลเสร็จสิ้น",
        confirmButtonText: (
          <span
            onClick={() =>
              Router.push("beefwarehouse/beefstore/setting/shelf").then(() => Router.reload())
            }
          >
            ตกลง
          </span>
        ),
        confirmButtonColor: "#3085d6",
      });
    },
  });

  const handdleChange = (e) => {
    setinfolistkeep({ ...infolistkeep, [e.target.name]: e.target.value });
  };

  const handdleSubmit = async () => {
    if (infolistkeep === listkeep1) {
      setinfolistkeep(listkeep1);
      setEditname(false);
      return;
    }
    try {
      await updateShelf({
        variables: {
          ...infolistkeep,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {Editname ? (
        <div
          style={{
            width: "100%",
            gridRowStart: "1",
            gridRowEnd: "1",
            gridColumnStart: "1",
            marginTop: "0px",
          }}
        >
          ชื่อชั้นจัดเก็บ : { }
          <Searchinput
            type="text"
            id="shelfname"
            name="shelfname"
            value={infolistkeep.shelfname}
            onChange={handdleChange}
            style={{
              width: "156px",
              textAlign: "center",
              marginTop: "10px",
              width: "140px",
            }}
          />
          <Savebuttoncolor onClick={handdleSubmit}>
            <Savebutton />
          </Savebuttoncolor>
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            gridRowStart: "1",
            gridRowEnd: "1",
            gridColumnStart: "1",
            marginTop: "0px",
          }}
        >
          ชื่อชั้นจัดเก็บ : { }
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
              width: "140px",
            }}
          />
          <Editbuttoncolor onClick={() => setEditname(true)}>
            <Editbutton />
          </Editbuttoncolor>
        </div>
      )}
    </div>
  );
};

export default editname;
