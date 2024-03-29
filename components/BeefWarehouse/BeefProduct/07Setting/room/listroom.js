import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {
  Searchinput,
} from "../SettingFrom";


import {
  Savebuttoncolor,
  Editbuttoncolor,
  Removebuttoncolor,
} from "../../../../../utils/buttonColor";

import {
  Removebutton,
  Editbutton,
  Savebutton,
} from "../../../../../utils/button";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Router from "next/router";

const UPDATEROOM = gql`
  mutation Mutation($id: ID, $roomname: String) {
    updateProductroom(id: $id, roomname: $roomname) {
      id
      roomname
    }
  }
`;

const DELETEROOM = gql`
  mutation DELETEROOM($id: ID) {
    deleteProductroom(id: $id) {
      id
      roomname
    }
  }
`;

const listroom = ({ listr }) => {
  const MySwal = withReactContent(Swal);
  const [edit, setedit] = useState(false);
  const [inforoom, setinforoom] = useState(listr);
  /* console.log(inforoom) */
  const [updateProductroom] = useMutation(UPDATEROOM, {
    onCompleted: (data) => {
      setedit(false);
      MySwal.fire({
        icon: "success",
        title: "สำเร็จ",
        text: "ทำการแก้ไขข้อมูลสิ้น",
        showConfirmButton: false,
        timer: 1000
        /*  confirmButtonText: "ตกลง", */
        /* confirmButtonColor: "#3085d6", */
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          /* Router.push("beefwarehouse/beefstore/setting/room").then(() => Router.reload()) */
        }
        /* if (result.isConfirmed) {
          Router.reload("beefwarehouse/beefstore/import/import_halves")
        } */
      });
    },
  });

  const handleChange = (e) => {
    setinforoom({
      ...inforoom,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (inforoom === listr) {
      setinforoom(listr);
      setedit(false);
      return;
    }
    try {
      await updateProductroom({
        variables: {
          ...inforoom,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const DeleteAlert = () => {
    Swal.fire({
      title: 'ต้องการลบข้อมูล?',
      text: "ยืนยันการลบข้อมูลประเภทตู้แช่จัดเก็บ!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ตกลง',
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {
        handdleSubmitDelete();
        MySwal.fire({
          icon: "success",
          title: "สำเร็จ",
          text: "ทำการลบข้อมูลสิ้น",
          showConfirmButton: false,
          timer: 1000
          /*  confirmButtonText: "ตกลง", */
          /* confirmButtonColor: "#3085d6", */
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            Router.push("beefwarehouse/beefproduct/setting/room").then(() => Router.reload())
          }
          /* if (result.isConfirmed) {
            Router.reload("beefwarehouse/beefstore/import/import_halves")
          } */
        });
      }
    })
  }

  const [deleteProductroom] = useMutation(DELETEROOM, {
    onCompleted: (data) => {
      /*   MySwal.fire({
          icon: "success",
          title: "สำเร็จ",
          text: "ทำการลบข้อมูลสิ้น",
          confirmButtonText: (
            <span
              onClick={() =>
                Router.reload("beefwarehouse/beefproduct/setting/room")
              }
            >
              ตกลง
            </span>
          ),
          confirmButtonColor: "#3085d6",
        }); */
    },
  });
  const handdleSubmitDelete = async () => {
    try {
      await deleteProductroom({
        variables: {
          id: inforoom.id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <tr style={{ textAlign: "center" }}>
      <td>
        {edit ? (
          <Searchinput
            name="roomname"
            value={inforoom.roomname}
            style={{ width: "100px", textAlign: "center" }}
            onChange={handleChange}
          />
        ) : (
          inforoom.roomname
        )}
      </td>
      <td>
        {edit ? (
          <Savebuttoncolor onClick={handleSubmit}>
            <Savebutton />
          </Savebuttoncolor>
        ) : (
          <Editbuttoncolor onClick={() => setedit(true)}>
            <Editbutton />
          </Editbuttoncolor>
        )}
      </td>
      <td>
        <Removebuttoncolor onClick={DeleteAlert}>
          <Removebutton />
        </Removebuttoncolor>
      </td>
    </tr>
  );
};

export default listroom;
