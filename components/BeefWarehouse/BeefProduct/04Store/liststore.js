import React, { useState } from "react";
import dayjs from "dayjs";
import { Editbutton, Savebutton } from "../../../../utils/button";
import { Editbuttoncolor, Savebuttoncolor } from "../../../../utils/buttonColor";
import Qrcode from "./Qrcode";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Router from "next/router";

const UPDATEINFOPRODUCT = gql`
mutation UpdateInfoP($id: ID, $info: String) {
  updateInfoP(id: $id, info: $info) {
    id
  }
}
`

const liststore = ({ listall }) => {
  const MySwal = withReactContent(Swal);
  const [success, setsuccess] = useState(false);
  const [infoall, setinfoall] = useState(listall);
  console.log(infoall)
  const [updateInfoP] = useMutation(UPDATEINFOPRODUCT, {
    onCompleted: (data) => {
      setsuccess(false);
      MySwal.fire({
        icon: "success",
        title: "สำเร็จ",
        text: "ทำการแก้ไขข้อมูลเสร็จสิ้น",
        confirmButtonText: (
          <span
            onClick={() =>
              Router.reload("beefwarehouse/beefstore/Allstore/store")
            }
          >
            ตกลง
          </span>
        ),
        confirmButtonColor: "#3085d6",
      });
    }
  })

  const handleChange = (e) => {
    setinfoall({
      ...infoall,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async () => {
    try {
      await updateInfoP({
        variables: {
          ...infoall
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
console.log(infoall.MFGdate)
  return (
    <tr style={{ textAlign: "center" }}>
      <td>{infoall.producttype}</td>
      <td>{infoall.code}</td>
      <td>{infoall.barcode}</td>
      <td>
        <Qrcode key={infoall.id} alllist={infoall} />
      </td>
      <td>{infoall.weight}</td>
      <td>
        {dayjs(infoall.MFGdate).locale("th").add(543, "year").format("DD/MM/YYYY")}
      </td>
      <td>
        {dayjs(infoall.BBEdate).locale("th").add(543, "year").format("DD/MM/YYYY")}
      </td>
      <td>{infoall.productroom}</td>
      <td>{infoall.freezer}</td>
      <td>{infoall.pbasket}</td>
      {success ? (<td><input name="info" value={infoall.info} onChange={handleChange} style={{ textAlign: "center" }}></input></td>) : (<td>
        {infoall.info !== null ? infoall.info : "-"}</td>)
      }
      <td>
        {success ? (
          <Savebuttoncolor onClick={handleSubmit}><Savebutton /></Savebuttoncolor>
        ) : (
          <Editbuttoncolor onClick={() => setsuccess(true)}>
            <Editbutton />
          </Editbuttoncolor>
        )}
      </td>
    </tr>
  );
};

export default liststore;
