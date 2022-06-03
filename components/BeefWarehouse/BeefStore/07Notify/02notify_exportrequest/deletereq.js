import React, { useState } from "react";
import { Removebuttoncolor } from "../../../../../utils/buttonColor";

import { Removebutton } from "../../../../../utils/button";

import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Router from "next/router";

export const DELETEREQ = gql`
  mutation DELETEREQ($id: ID) {
    deleteRequest(id: $id) {
      id
      name
    }
  }
`;

const deletereq = ({ listreq }) => {
  const MySwal = withReactContent(Swal);
  const [infoListreq, setInforeq] = useState(listreq);
  const [deleteRequest] = useMutation(DELETEREQ, {
    onCompleted: (data) => {
      MySwal.fire({
        icon: "success",
        title: "สำเร็จ",
        text: "ทำการลบข้อมูลสิ้น",
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
    },
  });
  const handdleSubmitDelete = async () => {
    try {
      await deleteRequest({
        variables: {
          id: infoListreq.id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Removebuttoncolor onClick={handdleSubmitDelete}>
        <Removebutton />
      </Removebuttoncolor>
    </>
  );
};

export default deletereq;
