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

export const UPDATEBASKET = gql`
  mutation UPDATEBASKET($id: ID, $basketname: String) {
    updateBasket(id: $id, basketname: $basketname) {
      id
      basketname
    }
  }
`;

export const DELETEBASKET = gql`
  mutation DELETEBASKET($id: ID) {
    deleteBasket(id: $id) {
      id
      basketname
    }
  }
`;

const listallbas = ({ listallbas }) => {
  const [infobasall, setinfobasall] = useState(listallbas);
  const MySwal = withReactContent(Swal);
  const [Editname, setEditname] = useState(false);
  const [updateBasket] = useMutation(UPDATEBASKET, {
    onCompleted: (data) => {
      setinfobasall(data.updateBasket);
      setEditname(false);
      MySwal.fire({
        icon: "success",
        title: "สำเร็จ",
        text: "ทำการแก้ไขข้อมูลเสร็จสิ้น",
        confirmButtonText: (
          <span
            onClick={() =>
              Router.reload("beefwarehouse/beefstore/setting/basket")
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
    setinfobasall({ ...infobasall, [e.target.name]: e.target.value });
  };

  const handdleSubmit = async () => {
    if (infobasall === listallbas) {
      setinfobasall(listallbas);
      setEditname(false);
      return;
    }
    try {
      await updateBasket({
        variables: {
          ...infobasall,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const [deleteBasket] = useMutation(DELETEBASKET, {
    onCompleted: (data) => {
      MySwal.fire({
        icon: "success",
        title: "สำเร็จ",
        text: "ทำการลบข้อมูลสิ้น",
        confirmButtonText: (
          <span
            onClick={() =>
              Router.reload("beefwarehouse/beefstore/setting/basket")
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
      await deleteBasket({
        variables: {
          id: infobasall.id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {Editname ? (
        <div>
          <Searchinput
            type="text"
            id="basketname"
            name="basketname"
            value={infobasall.basketname}
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
        <div>
          <Searchinput
            /* value={prod.shelfname} */
            type="text"
            id="basketname"
            name="basketname"
            value={infobasall.basketname}
            disabled
            style={{
              width: "156px",
              textAlign: "center",
              marginTop: "10px",
              width: "120px",
            }}
          />
          <Editbuttoncolor onClick={() => setEditname(true)}>
            <Editbutton />
          </Editbuttoncolor>
          <Removebuttoncolor
            onClick={handdleSubmitDelete}
            style={{ marginLeft: "5px" }}
          >
            ลบ
          </Removebuttoncolor>
        </div>
      )}
    </div>
  );
};

export default listallbas;
