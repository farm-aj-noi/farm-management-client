import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Router from "next/router";
import { LISTCHILLDAY } from "./index"
export const DELETECHILLDAY = gql`
  mutation DELETECHILLDAY($id: ID) {
    deleteChillday(id: $id) {
      id
      day
    }
  }
`;
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
const listChill = ({ listchill }) => {
  const MySwal = withReactContent(Swal);
  const [chilldayInfo, setChilldayInfo] = useState(listchill);
  const [deleteChillday] = useMutation(DELETECHILLDAY, {
    onCompleted: (data) => {
      /* if (data) {
        MySwal.fire({
          icon: "success",
          title: "สำเร็จ",
          text: "ลบระยะเวลาบ่มเสร็จสิ้น",
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
      { query: LISTCHILLDAY }
    ]
  });

  const DeleteAlert = () => {
    Swal.fire({
      title: 'ต้องการลบข้อมูล?',
      text: "ยืนยันการลบข้อมูลระยะเวลาบ่ม!",
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
      await deleteChillday({
        variables: {
          id: chilldayInfo.id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <tr style={{ textAlign: "center" }}>
        <td>{chilldayInfo.day} วัน</td>

        <td>
          <Removebuttoncolor onClick={DeleteAlert}>
            <Removebutton />
          </Removebuttoncolor>
        </td>
      </tr>
    </>
  );
};

export default listChill;
