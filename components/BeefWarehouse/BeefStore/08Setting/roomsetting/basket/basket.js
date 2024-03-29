import React, { useState } from "react";

import {
  DivFromTop,
  DivFromDown,
  Searchinput,
} from "../../SettingFrom";

import {
  Savebuttoncolor,
} from "../../../../../../utils/buttonColor";

import { Icon } from "react-icons-kit";
import { cog } from 'react-icons-kit/entypo/cog'

import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Router from "next/router";


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

const basket = () => {
  const MySwal = withReactContent(Swal);
  const { data: dataroom } = useQuery(QUERYROOM);
  const [Infobasket, setInfobasket] = useState({
    basketname: "",
    shelf: "",
    beefroom: "",
  });
  const { data: shelfdata } = useQuery(QUERYSHELF, {
    variables: {
      id: Infobasket.beefroom,
    },
  });

  const [createBasket] = useMutation(CREATBASKET, {
    variables: {
      ...Infobasket,
    },
    onCompleted: (data) => {
      if (data) {
        MySwal.fire({
          icon: "success",
          title: "สำเร็จ",
          text: "ทำการตั้งค่าเสร็จสิ้น",
          showConfirmButton: false,
          timer: 1000
          /*  confirmButtonText: "ตกลง", */
          /* confirmButtonColor: "#3085d6", */
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            Router.push("beefwarehouse/beefstore/setting/basket").then(() => Router.reload())
          }
          /* if (result.isConfirmed) {
            Router.reload("beefwarehouse/beefstore/import/import_halves")
          } */
        });
      }
    },
  });

  const handleChangeBasket = (e) => {
    setInfobasket({
      ...Infobasket,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitBasket = async (e) => {
    try {
      e.preventDefault();
      await createBasket();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div>
        <DivFromTop>
          <div style={{ margin: "-3px 5px 0px -5px" }}>
            <Icon size={20} icon={cog} />
          </div>
          บันทึกตั้งค่าตะกร้าจัดเก็บ
        </DivFromTop>
        <DivFromDown>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `230px  230px 350px`,
            }}
          >
            {" "}
            <div>
              ห้องจัดเก็บ : { }
              <select
                name="beefroom"
                id="beefroom"
                value={Infobasket.beefroom}
                onChange={handleChangeBasket}
                style={{
                  height: "38px",
                  width: "156px",
                  border: "1px solid #AFAFAF",
                  borderRadius: "4px",
                  textAlign: "center",
                  fontSize: "14px",
                }}
              >
                <option value="">เลือก</option>
                {dataroom &&
                  dataroom.allRoom.map((prod) => (
                    <option key={prod.id} value={prod.id}>
                      {prod.roomname}
                    </option>
                  ))}
              </select>
            </div>
            <div style={{ marginLeft: "10px" }}>
              ชั้นจัดเก็บ : { }
              <select
                disabled={!Infobasket.beefroom}
                name="shelf"
                id="shelf"
                value={Infobasket.shelf}
                onChange={handleChangeBasket}
                style={{
                  height: "38px",
                  width: "156px",
                  border: "1px solid #AFAFAF",
                  borderRadius: "4px",
                  textAlign: "center",
                  fontSize: "14px",
                }}
              >
                <option value="">เลือก</option>
                {shelfdata &&
                  shelfdata.listShelf.map((prod) => (
                    <option key={prod.id} value={prod.id}>
                      {prod.shelfname}
                    </option>
                  ))}
              </select>
            </div>
            <div style={{ marginLeft: "10px" }}>
              ชื่อตะกร้าจัดเก็บ : { }
              <Searchinput
                disabled={!Infobasket.shelf}
                type="text"
                id="basketname"
                name="basketname"
                value={Infobasket.basketname}
                onChange={handleChangeBasket}
                style={{
                  width: "156px",
                  textAlign: "center",
                  backgroundColor: `${!Infobasket.shelf ? "#ececec" : ""}`,
                }}
              />
              <Savebuttoncolor
                style={{
                  height: "38px",
                  width: " 50px",
                  backgroundColor: `${!Infobasket.basketname ? "gray" : ""}`,
                }}
                disabled={!Infobasket.basketname}
                onClick={handleSubmitBasket}
              >
                บันทึก
              </Savebuttoncolor>
            </div>
          </div>
        </DivFromDown>
      </div>
    </>
  );
};

export default basket;
