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
      <div>
        ห้องจัดเก็บ : {}
        <Searchinput
          value={inforoom.roomname}
          style={{
            marginTop: "10px",
            textAlign: "center",
          }}
          disabled
        ></Searchinput>
      </div>
      <div>
        {datashelf &&
          datashelf.listShelf.map((prod) => (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `200px 200px 200px 
                 200px`,
                /*   marginTop: "10px",
                marginLeft: "30px",
                paddingBottom: "20px",  */
              }}
            >
              <Listbasket key={prod.id} listbas={prod} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default list1;
