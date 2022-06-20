import React, { useState } from "react";
import {
  Removebuttoncolor,
  Editbuttoncolor,
} from "../../../../../utils/buttonColor";
import { Removebutton, Editbutton } from "../../../../../utils/button";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Router from "next/router";

const DELETETYPE = gql`
  mutation DELETETYPE($id: ID) {
    deleteProducttype(id: $id) {
      id
    }
  }
`;



const list = ({ listtype }) => {
  const MySwal = withReactContent(Swal);
  const [infotype, setinfotype] = useState(listtype);
  const [deleteProducttype] = useMutation(DELETETYPE, {
    onCompleted: (data) => {
      MySwal.fire({
        icon: "success",
        title: "สำเร็จ",
        text: "ทำการลบข้อมูลสิ้น",
        confirmButtonText: (
          <span
            onClick={() => Router.reload("beefwarehouse/beefproduct/setting")}
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
      await deleteProducttype({
        variables: {
          id: infotype.id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <tr style={{ textAlign: "center" }}>
        <td>{infotype.code}</td>
        <td>{infotype.nameTH}</td>
        <td>{infotype.nameEN}</td>
        <td>{infotype.BBE}</td>
        <td>{infotype.unit.name}</td>
        <td>
          <Editbuttoncolor>
            <Editbutton />
          </Editbuttoncolor>
        </td>
        <td>
          <Removebuttoncolor onClick={handdleSubmitDelete}>
            <Removebutton />
          </Removebuttoncolor>
        </td>
      </tr>
    </>
  );
};

export default list;
