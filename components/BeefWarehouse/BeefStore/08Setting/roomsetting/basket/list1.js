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
import { NavItem, Card } from "react-bootstrap";

import Listbasket from "./listbas";

export const QUERYSHELF = gql`
  query QUERYSHELF($id: ID) {
    listShelf(id: $id) {
      shelfname
      id
    }
  }
`;

const list1 = ({ listroom1 }) => {
  const [inforoom, setinforoom] = useState(listroom1);
  const { data: datashelf } = useQuery(QUERYSHELF, {
    variables: {
      id: inforoom.id,
    },
  });
  console.log(inforoom);
  return (
    <div
      style={{
        border: "1px solid #bcbcbc",
        padding: "15px",
        borderRadius: "4px",
        marginTop: "10px"
        /*  backgroundColor: "red", */

      }}
    >
      <div>
        ห้องจัดเก็บ : { }
        <Searchinput
          value={inforoom.roomname}
          style={{
            textAlign: "center",

          }}
          disabled
        ></Searchinput>
      </div>

      {datashelf && datashelf.listShelf.length > 0 ? (datashelf.listShelf.map((prod) => (
        <Listbasket key={prod.id} listbas={prod} />
      ))) : (<Card style={{ marginTop: "10px", textAlign: "center", padding: "20px", backgroundColor: "#f7f7f7" }}>ไม่พบข้อมูล</Card>)

      }

    </div >
  );
};

export default list1;
