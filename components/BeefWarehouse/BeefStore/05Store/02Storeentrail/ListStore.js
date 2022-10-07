import React, { useState } from "react";
import {
  Editbuttoncolor,
  Savebuttoncolor
} from "../../../../../utils/buttonColor";
import { Editbutton, Savebutton } from "../../../../../utils/button";
import dayjs from "dayjs";
import Modalqrcode from "../../12Qrcode/storeen";

import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Router from "next/router";
import { Searchinput } from "../StoreFrom"
const UPDATEINFOE = gql`
mutation UPDATEINFOE($id: ID, $info: String) {
  updateInfoE(id: $id, info: $info) {
    id
  }
}
`
const ListStore = ({ Listentrail }) => {
  const MySwal = withReactContent(Swal);
  const [ListEntrailData, SetListStoreData] = useState(Listentrail);
  const [success, setsuccess] = useState(false);
  const [updateInfoE] = useMutation(UPDATEINFOE, {
    onCompleted: (data) => {
      setsuccess(false);
      MySwal.fire({
        icon: "success",
        title: "สำเร็จ",
        text: "ทำการแก้ไขข้อมูลเสร็จสิ้น",
        confirmButtonText: (
          <span
            onClick={() =>
              Router.reload("beefwarehouse/beefstore/Allstore/storeentrail")
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
    SetListStoreData({
      ...ListEntrailData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async () => {
    try {
      await updateInfoE({
        variables: {
          ...ListEntrailData
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <tr style={{ textAlign: "center" }}>
      <td>{ListEntrailData.cownum}</td>
      <td>{ListEntrailData.offal}</td>
      <td>{ListEntrailData.toe}</td>
      <td>{ListEntrailData.head}</td>
      <td>{ListEntrailData.skin}</td>
      <td>{ListEntrailData.liver}</td>
      <td>{ListEntrailData.fat}</td>
      <td>{ListEntrailData.onkale}</td>
      <td>{ListEntrailData.tail}</td>
      <td>{ListEntrailData.gallbladder}</td>
      <td>{ListEntrailData.scrap}</td>
      <td>{ListEntrailData.barcode}</td>
      <td>
        <Modalqrcode key={ListEntrailData.id} listen={ListEntrailData} />
      </td>
      <td>
        {dayjs(ListEntrailData.Expdate).add(543, "year").format("DD/MM/YYYY")}
      </td>
      <td>{ListEntrailData.beefroom}</td>
      {success ? (
        <td >
          <input name="info"
            value={ListEntrailData.info}
            onChange={handleChange}
            style={{ textAlign: "center" }}>
          </input>
        </td>
      ) : (<td>
        {ListEntrailData.info ? ListEntrailData.info : "-"}</td>)
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

export default ListStore;
