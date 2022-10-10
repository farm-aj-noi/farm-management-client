import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {
  Savebuttoncolor,
  Editbuttoncolor,
  Removebuttoncolor,
} from "../../../../../utils/buttonColor";
import {
  Savebutton,
  Editbutton,
  Removebutton,
} from "../../../../../utils/button";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Router from "next/router";
import { QUERYCHILLROOM } from "./index"
export const DELETECHILLROOM = gql`
  mutation DELETECHILLROOM($id: ID) {
    deleteChillroom(id: $id) {
      id
      roomnum
    }
  }
`;

const listChillroom = ({ listchillroom }) => {
  const MySwal = withReactContent(Swal);
  const [infochillroom, setinfochillroom] = useState(listchillroom);
  const [deleteChillroom] = useMutation(DELETECHILLROOM, {
    onCompleted: (data) => {
      /* if (data) {
        MySwal.fire({
          icon: "success",
          title: "สำเร็จ",
          text: "ลบห้องบ่มเสร็จสิ้น",
          confirmButtonText: (
            <span
              onClick={() =>
                Router.reload("beefwarehouse/beefstore/setting/chillroom")
              }
            >
              ตกลง
            </span>
          ),
          confirmButtonColor: "#3085d6",
        });
      } */
    },
    refetchQueries: [
      { query: QUERYCHILLROOM }
    ]
  });

  const DeleteAlert = () => {
    Swal.fire({
      title: 'ต้องการลบข้อมูล?',
      text: "ยืนยันการลบข้อมูลห้องบ่ม!",
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
          /*  confirmButtonText: (
             <span
               onClick={() =>
                 Router.push("beefwarehouse/beefstore/setting/chillroom").then(() => Router.reload())
               }
             >
               ตกลง
             </span>
           ),
           confirmButtonColor: "#3085d6", */
          showConfirmButton: false,
          timer: 1000
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            Router.reload("beefwarehouse/beefstore/setting/chillroom")
          }
        });
      }
    })
  }

  const handdleSubmitDelete = async () => {
    try {
      await deleteChillroom({
        variables: {
          id: infochillroom.id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <tr style={{ textAlign: "center" }}>
        <td> {infochillroom.roomnum}</td>
        <td>
          <Removebuttoncolor onClick={DeleteAlert}>
            <Removebutton />
          </Removebuttoncolor>
        </td>
      </tr>
    </>
  );
};

export default listChillroom;
