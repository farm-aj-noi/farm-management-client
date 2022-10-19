import React, { useState } from "react";
import {
  Searchinput,
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

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Router from "next/router";

export const UPDATECOUNT = gql`
  mutation UPDATECOUNT($id: ID, $totalbeef: String) {
    uppdatetypekeep(id: $id, totalbeef: $totalbeef) {
      id
      totalbeef
    }
  }
`;

export const DELETETYPEKEEP = gql`
  mutation DELETETYPEKEEP($id: ID) {
    deletetypekeep(id: $id) {
      id
      totalbeef
    }
  }
`;

const edittotalbeef = ({ editcount }) => {
  const MySwal = withReactContent(Swal);
  const [infoCount, seinfoCount] = useState(editcount);
  // console.log(infoCount);
  const [editkeep, seteditkeep] = useState(false);

  const [uppdatetypekeep, { loading, error }] = useMutation(UPDATECOUNT, {
    onCompleted: (data) => {
      seinfoCount(data.uppdatetypekeep);
      seteditkeep(false);
      MySwal.fire({
        icon: "success",
        title: "สำเร็จ",
        text: "ทำการแก้ไขข้อมูลเสร็จสิ้น",
        showConfirmButton: false,
        timer: 1000
        /*  confirmButtonText: "ตกลง", */
        /* confirmButtonColor: "#3085d6", */
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          /*  Router.push("beefwarehouse/beefstore/setting/room").then(() => Router.reload()) */
        }
        /* if (result.isConfirmed) {
          Router.reload("beefwarehouse/beefstore/import/import_halves")
        } */
      });
    },
  });
  const handdleChangeupdatetypekeep = (e) => {
    seinfoCount({ ...infoCount, [e.target.name]: e.target.value });
  };
  const handleSubmittypekeep = async () => {
    if (infoCount === editcount) {
      seinfoCount(editcount);
      seteditkeep(false);
      return;
    }
    try {
      await uppdatetypekeep({
        variables: {
          ...infoCount,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const [deletetypekeep] = useMutation(DELETETYPEKEEP, {
    onCompleted: (data) => {
      Swal.fire({
        title: 'ต้องการลบข้อมูล?',
        text: "ยืนยันการลบข้อมูลประเภทซากโค!",
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
            text: "ทำการลบข้อมูลเสร็จสิ้น",
            showConfirmButton: false,
            timer: 1000
            /*  confirmButtonText: "ตกลง", */
            /* confirmButtonColor: "#3085d6", */
          }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
              Router.push("beefwarehouse/beefstore/setting/room").then(() => Router.reload())
            }
            /* if (result.isConfirmed) {
              Router.reload("beefwarehouse/beefstore/import/import_halves")
            } */
          });
        }
      })
    },
  });

  const DeleteAlert = () => {

  }

  const handdleSubmitDelete = async () => {
    try {
      await deletetypekeep({
        variables: {
          id: infoCount.id,
        },
      });
      /* console.log(data.allRoom.id); */
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {editkeep ? (
        <div>
          <Searchinput
            name="totalbeef"
            style={{
              marginTop: "10px",
              textAlign: "center",
              width: "110px",
            }}
            onChange={handdleChangeupdatetypekeep}
          ></Searchinput>
          <Savebuttoncolor onClick={handleSubmittypekeep}>
            <Savebutton />
          </Savebuttoncolor>
        </div>
      ) : (
        <div>
          <Searchinput
            style={{
              marginTop: "10px",
              textAlign: "center",
              width: "110px",
            }}
            disabled
            value={infoCount.totalbeef}
          ></Searchinput>
          <Editbuttoncolor onClick={() => seteditkeep(true)}>
            <Editbutton />
          </Editbuttoncolor>
          <Removebuttoncolor
            style={{
              marginLeft: "5px",
            }}
            onClick={handdleSubmitDelete}
          >
            <Removebutton />
          </Removebuttoncolor>
        </div>
      )}
    </>
  );
};

export default edittotalbeef;
