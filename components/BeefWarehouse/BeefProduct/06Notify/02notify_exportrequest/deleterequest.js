import React, { useState } from "react";
import { Removebuttoncolor } from "../../../../../utils/buttonColor";

import { Removebutton } from "../../../../../utils/button";

import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Router from "next/router";

const DELETEREQUESTEXPORT = gql`
mutation DELETEREQUESTEXPORT($id: ID) {
  deleteRequestP(id: $id) {
    id
  }
}
`;

const deleterequest = ({ listre }) => {
  const MySwal = withReactContent(Swal);
  const [infodelete, setinfodelete] = useState(listre);
  const [deleteRequestP] = useMutation(DELETEREQUESTEXPORT, {
    onCompleted: (data) => {
      MySwal.fire({
        icon: "success",
        title: "สำเร็จ",
        text: "ทำการลบข้อมูลสิ้น",
        confirmButtonText: (
          <span
            onClick={() =>
              Router.reload("beefwarehouse/beefproduct/notify/notify_exportrequest")
            }
          >
            ตกลง
          </span>
        ),
        confirmButtonColor: "#3085d6",
      });
    }
  });

  const handdleSubmitDelete = async () => {
    try {
      await deleteRequestP({
        variables: {
          id: infodelete.id,
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <Removebuttoncolor onClick={handdleSubmitDelete}>
        <Removebutton />
      </Removebuttoncolor>
    </div>
  );
};

export default deleterequest;
