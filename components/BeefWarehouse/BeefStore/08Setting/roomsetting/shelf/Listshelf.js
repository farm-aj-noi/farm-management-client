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

export const QUERYSHELF = gql`
  query ListShelf($id: ID) {
    listShelf(id: $id) {
      id
      shelfname
      typekeep {
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
    <div>
      <>
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
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `200px 200px 200px 
         200px`,
            marginTop: "10px",
            marginLeft: "30px",
            paddingBottom: "20px",
            borderBottom: "1px solid #AFAFAF",
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
            {datashelf &&
              datashelf.listShelf.map((prod) => {
                return (
                  <>
                    <Searchinput
                      value={prod.shelfname}
                      type="text"
                      id="shelfname"
                      name="shelfname"
                      disabled
                      style={{
                        width: "156px",
                        textAlign: "center",
                        marginTop: "10px",
                      }}
                    />
                  </>
                );
              })}
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
            {" "}
            ประเภทจัดเก็บ : {}
            {datashelf &&
              datashelf.listShelf.map((x, i) => {
                return (
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
                    <option>{datashelf.listShelf[i].typekeep.totalbeef}</option>
                  </select>
                );
              })}
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
            {" "}
            จำนวน : {}
            {datashelf &&
              datashelf.listShelf.map((x, i) => {
                return (
                  <Searchinput
                    style={{
                      marginTop: "10px",
                      textAlign: "center",
                    }}
                    disabled
                  ></Searchinput>
                );
              })}
          </div>
        </div>
      </>
    </div>
  );
};

export default Listshelf;
