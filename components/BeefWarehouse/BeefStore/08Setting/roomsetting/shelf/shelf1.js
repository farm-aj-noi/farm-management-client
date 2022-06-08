import React, { useState } from "react";

import {
  DivFromTop,
  DivFromDown,
  Searchinput,
  Addbutton,
} from "../../SettingFrom";
import {
  Savebuttoncolor,
  Removebuttoncolor,
} from "../../../../../../utils/buttonColor";

import { Removebutton } from "../../../../../../utils/button";

import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";

import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Router from "next/router";

import Listshelf from "./Listshelf";

export const QUERYROOM = gql`
  query Query {
    allRoom {
      id
      roomname
    }
  }
`;

export const CREATESHELF = gql`
  mutation CREATESHELF($shelfname: String, $beefroom: String) {
    createShelf(shelfname: $shelfname, beefroom: $beefroom) {
      id
      shelfname
      beefroom {
        id
      }
    }
  }
`;

export const CREATETYPEKEEP = gql`
  mutation CREATETYPEKEEP(
    $totalbeef: String
    $beeftype: String
    $beefroom: String
    $shelf: String
  ) {
    createtypekeep(
      totalbeef: $totalbeef
      beeftype: $beeftype
      beefroom: $beefroom
      shelf: $shelf
    ) {
      id
      totalbeef
    }
  }
`;

const shelf1 = () => {
  const MySwal = withReactContent(Swal);

  const { data: dataroom } = useQuery(QUERYROOM);

  const [idshelf, SetidShelf] = useState(""); //get ID room
  const [successCreateShelfname, setSuccessCreateShelfName] = useState(false); //done room name
  const [Infoshelf, SetInfoshelf] = useState("");
  const [createShelf] = useMutation(CREATESHELF, {
    variables: {
      ...Infoshelf,
    },

    onCompleted: (data) => {
      if (data) {
        setSuccessCreateShelfName(true);
        SetidShelf(data.createShelf.id);
      }
    },
  });
  /*   console.log(Infoshelf.beefroom); */
  const hanndleChangeShelfname = (e) => {
    SetInfoshelf({
      ...Infoshelf,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitShelfname = async (e) => {
    try {
      e.preventDefault();
      await createShelf();
    } catch (error) {
      console.log(error);
    }
  };

  const [successkeeproom, setSuccesskeeproom] = useState(false);
  const [createtypekeep] = useMutation(CREATETYPEKEEP, {
    onCompleted: (data) => {
      if (data) {
        //
        setSuccesskeeproom(true);
        MySwal.fire({
          icon: "success",
          title: "สำเร็จ",
          text: "ทำการตั้งค่าเสร็จสิ้น",
          confirmButtonText: (
            <span
              onClick={() =>
                Router.reload("beefwarehouse/beefstore/setting/room")
              }
            >
              ตกลง
            </span>
          ),
          confirmButtonColor: "#3085d6",
        });
      }
    },
  });

  const [inputListshelf, setInputListshelf] = useState([
    {
      totalbeef: "",
      beeftype: "",
    },
  ]);

  const handleRemoveClickshelf = (index) => {
    const listshelf = [...inputListshelf];
    listshelf.splice(index, 1);
    setInputListshelf(listshelf);
  };

  const handleAddClickshelf = () => {
    setInputListshelf([
      ...inputListshelf,
      {
        totalbeef: "",
        beeftype: "",
      },
    ]);
  };

  const handleInputshelf = (e, index) => {
    const { name, value } = e.target;
    const listshelf = [...inputListshelf];
    listshelf[index][name] = value;
    setInputListshelf(listshelf);
  };

  const handleSubmitshelf = async () => {
    try {
      for (let j = 0; j < inputListshelf.length; j++) {
        await createtypekeep({
          variables: {
            beeftype: inputListshelf[j].beeftype,
            totalbeef: inputListshelf[j].totalbeef,
            shelf: idshelf,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <DivFromTop>
        <div style={{ margin: "-3px 5px 0px 0px" }}>
          <Icon size={20} icon={list} />
        </div>
        รายการชั้นจัดเก็บ
      </DivFromTop>
      <DivFromDown>
        <div>
          {dataroom &&
            dataroom.allRoom.map((prod) => (
              <Listshelf key={prod.id} Listshelfs={prod} />
            ))}
        </div>
      </DivFromDown>
    </div>
  );
};

export default shelf1;
