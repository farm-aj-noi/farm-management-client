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
import { NavItem, Card } from "react-bootstrap";

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
    <>
      <div style={{
        marginTop: "10px",
        border: "1px solid #d9d9d9",
        padding: "15px",
        borderRadius: "4px",
      }}>
        <div>
          ชั้นจัดเก็บ : { }
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
       
        {databasket && databasket.allBasket.length > 0 ? (databasket.allBasket.map((prod) => (
          <div
            style={{ margin: "auto", minWidth: "100%" }}
          >
            <Basket key={prod.id} listallbas={prod} />
          </div>
        ))) : (<Card style={{ marginTop: "10px", textAlign: "center", padding: "20px", backgroundColor: "#f7f7f7" }}>ไม่พบข้อมูล</Card>)
        }
      </div>



    </>
  );
};

export default listbas;
