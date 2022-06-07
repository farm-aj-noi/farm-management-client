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

  return (
    <div
      style={{
        border: "1px solid #AFAFAF",
        padding: "0px 15px 15px 15px",
        margin: "10px",
        borderRadius: "4px",
      }}
    >
      <div>
        ห้องจัดเก็บ : {}
        <Searchinput
          value={Listshelf.roomname}
          style={{
            marginTop: "10px",
            textAlign: "center",
          }}
          disabled
        ></Searchinput>
      </div>

      {datashelf &&
        datashelf.listShelf.map((prod) => (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `200px 200px 200px 
               200px`,
              marginTop: "10px",
              marginLeft: "30px",
              paddingBottom: "20px",
              /*  backgroundColor: "red", */
              borderBottom: "1px solid #AFAFAF",
            }}
          >
          <Editname key={prod.id} listkeep={prod} />
            <Listtypekeep key={prod.id} listkeep={prod} />
          </div>
        ))}
    </div>
  );
};

export default Listshelf;
