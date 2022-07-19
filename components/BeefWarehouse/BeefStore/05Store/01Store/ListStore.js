import React, { useState } from "react";
import {
  Editbuttoncolor,
  Savebuttoncolor
} from "../../../../../utils/buttonColor";
import { Editbutton, Savebutton } from "../../../../../utils/button";
import dayjs from "dayjs";
import "dayjs/locale/th";
import Modalqrcode from "../../12Qrcode/store";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Router from "next/router";

const UPDATEINFOH = gql`
mutation UPDATEINFOH($id: ID, $info: String) {
  updateInfoH(id: $id, info: $info) {
    id
  }
}
`

const UPDATEINFOQ = gql`
mutation UPDATEINFOQ($id: ID, $info: String) {
  updateInfoQ(id: $id, info: $info) {
    id
  }
}
`

const UPDATEINFOL = gql`
mutation UPDATEINFOL($id: ID, $info: String) {
  updateInfoL(id: $id, info: $info) {
    id
  }
}
`

const UPDATEINFOC = gql`
mutation UPDATEINFOC($id: ID, $info: String) {
  updateInfoC(id: $id, info: $info) {
    id
  }
}
`

const ListStore = ({ Liststore }) => {
  const MySwal = withReactContent(Swal);
  const [ListStoreData, SetListStoreData] = useState(Liststore);
  const [success, setsuccess] = useState(false);
  const [updateInfoH] = useMutation(UPDATEINFOH, {
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
  const [updateInfoQ] = useMutation(UPDATEINFOQ, {
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
  const [updateInfoL] = useMutation(UPDATEINFOL, {
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
  const [updateInfoC] = useMutation(UPDATEINFOC, {
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
    SetListStoreData({
      ...ListStoreData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async () => {
    try {
      if (ListStoreData.beefname === "ซากโคผ่าซีก") {
        await updateInfoH({
          variables: {
            ...ListStoreData
          }
        })
      }
      if (ListStoreData.beefname === "ซากโคสี่เสี้ยว") {
        await updateInfoQ({
          variables: {
            ...ListStoreData
          }
        })
      }
      if (ListStoreData.beefname === "ก้อนเนื้อ") {
        await updateInfoL({
          variables: {
            ...ListStoreData
          }
        })
      }
      if (ListStoreData.beefname === "ชิ้นเนื้อ") {
        await updateInfoC({
          variables: {
            ...ListStoreData
          }
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
  console.log(ListStoreData.id)
  console.log(ListStoreData.beefname)
  return (
    <tr style={{ textAlign: "center" }}>
      <td>{ListStoreData.beeftype}</td>
      <td>{ListStoreData.cownum}</td>
      <td>{ListStoreData.code}</td>
      <td>{ListStoreData.barcode}</td>
      <td>
        <Modalqrcode key={ListStoreData.id} liststore={ListStoreData} />
      </td>
      <td>{ListStoreData.weightwarm ? ListStoreData.weightwarm : "-"}</td>
      <td>{ListStoreData.weight ? ListStoreData.weight : "-"}</td>

      <td>
        {dayjs(ListStoreData.Expdate)
          .locale("th")
          .add(543, "year")
          .format("DD/MM/YYYY")}
      </td>
      <td></td>
      <td>{ListStoreData.beefroom ? ListStoreData.beefroom : "-"}</td>
      <td>{ListStoreData.shelf ? ListStoreData.shelf : "-"}</td>
      <td>{ListStoreData.basket ? ListStoreData.basket : "-"}</td>
      <td>{ListStoreData.status}</td>
      {success ? (<td><input name="info" value={ListStoreData.info} onChange={handleChange} style={{ textAlign: "center" }}></input></td>) : (<td>
        {ListStoreData.info !== null ? ListStoreData.info : "-"}</td>)
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
      {/* <td>{ListStoreData.beeftypeid}</td> */}
    </tr >
  );
};

export default ListStore;
