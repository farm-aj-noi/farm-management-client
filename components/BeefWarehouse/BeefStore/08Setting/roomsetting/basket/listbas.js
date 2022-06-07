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

import Basket from "./listallbas";

export const QUERYBASKET = gql`
  query QUERYBASKET($id: ID) {
    allBasket(id: $id) {
      basketname
      id
    }
  }
`;

const listbas = ({ listbas }) => {
  const [infobasket, setinfobasket] = useState(listbas);
  const { data: databasket } = useQuery(QUERYBASKET, {
    variables: {
      id: infobasket.id,
    },
  });
  console.log(databasket);
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
        }}
      >
        ชั้นจัดเก็บ : {}
        <Searchinput
          value={infobasket.shelfname}
          style={{
            marginTop: "10px",
            textAlign: "center",
            marginBottom: "10px",
          }}
          disabled
        ></Searchinput>
      </div>
      <div
        style={{
          width: "100%",
          gridRowStart: "1",
          gridRowEnd: "1",
          gridColumnStart: "2",
          marginBottom: "10px",
        }}
      >
        ตะกร้าจัดเก็บ : {}
        {databasket &&
          databasket.allBasket.map((prod) => (
            <Basket key={prod.id} listallbas={prod} />
          ))}
      </div>
    </div>
  );
};

export default listbas;
