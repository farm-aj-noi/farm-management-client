import React, { useState } from "react";
import { ic_info_outline } from "react-icons-kit/md/ic_info_outline";
import {
  DivFrom,
  DivFromTop,
  DivFromDown,
  HeaderColor,
  Searchinput,
  Addbutton,
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

import Nav_setting from "../../Nav_setting";

import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Router from "next/router";

import List1 from "./list1";

export const QUERYROOM = gql`
  query Query {
    allRoom {
      id
      roomname
    }
  }
`;

export const QUERYSHELF = gql`
  query QUERYSHELF($id: ID) {
    listShelf(id: $id) {
      shelfname
      id
    }
  }
`;

export const CREATBASKET = gql`
  mutation CREATBASKET($beefroom: String, $shelf: String, $basketname: String) {
    createBasket(beefroom: $beefroom, shelf: $shelf, basketname: $basketname) {
      id
      basketname
    }
  }
`;

export const QUERYBASKET = gql`
  query QUERYBASKET($id: ID) {
    allBasket(id: $id) {
      basketname
      shelf {
        shelfname
      }
    }
  }
`;

export const QUERYBASKETALL = gql`
  query Baskets {
    Baskets {
      id
      basketname
      shelf {
        shelfname
        id
      }
      beefroom {
        roomname
        id
      }
    }
  }
`;

const basket1 = () => {
  const { data: dataroom } = useQuery(QUERYROOM);
  const { data: shelf } = useQuery(QUERYSHELF, {
    variables: {
      id: dataroom,
    },
  });
  return (
    <>
      <div>
        <DivFromTop>
          <div style={{ margin: "-3px 5px 0px 0px" }}>
            <Icon size={20} icon={list} />
          </div>
          รายการตะกร้าจัดเก็บ
        </DivFromTop>
        <DivFromDown>
          <div>
            {dataroom && dataroom.allRoom.length > 0 ? 
            (
              dataroom.allRoom.map((prod) => (
              <List1 key={prod.id} listroom1={prod} />
            ))
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center"
                }}
              >
                <div
                  style={{
                    margin: "auto",
                    textAlign: "center",
                    color: "#ff0000",
                  }}
                >
                  <Icon size={150} icon={ic_info_outline} />
                  <br />
                  ไม่พบข้อมูล
                </div>
              </div>
            )
            }
          </div>
        </DivFromDown>
      </div>
    </>
  );
};

export default basket1;
