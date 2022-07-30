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
import Listtypekeep from "./Listtypekeep";
import Editname from "./editname";
import { NavItem, Card } from "react-bootstrap";



export const QUERYSHELF = gql`
  query ListShelf($id: ID) {
    listShelf(id: $id) {
      id
      shelfname
      typekeep {
        id
        totalbeef
        beeftype {
          nameTH
          id
        }
      }
    }
  }
`;

const Listshelf = ({ Listshelfs }) => {
  const [Listshelf, setListshelf] = useState(Listshelfs);

  const { data: datashelf } = useQuery(QUERYSHELF, {
    variables: {
      id: Listshelf.id,
    },
  });
  console.log(datashelf)
  return (
    <div
      style={{
        border: "1px solid #bcbcbc",
        padding: "15px ",
        margin: "10px",
        borderRadius: "4px",
      }}
    >
      <div>
        ห้องจัดเก็บ : { }
        <Searchinput
          value={Listshelf.roomname}
          style={{

            textAlign: "center",
            marginBottom: "10px",
          }}
          disabled
        ></Searchinput>
      </div>
      {datashelf && datashelf.listShelf.length > 0 ? (datashelf.listShelf.map((prod) => (
        <div
          style={{ margin: "auto", minWidth: "100%" }}
        >
          {/* <Editname key={prod.id} listkeep={prod} /> */}
          <Listtypekeep key={prod.id} listkeep={prod} />
        </div>
      ))) : (<Card style={{ textAlign: "center", padding: "20px", backgroundColor: "#f7f7f7" }}>ไม่พบข้อมูล</Card>)}


    </div>
  );
};

export default Listshelf;
