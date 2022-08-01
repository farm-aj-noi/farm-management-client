import { useMutation } from "@apollo/react-hooks";
import React, { useState } from "react";
import gql from "graphql-tag";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Router from "next/router";

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

import { Icon } from "react-icons-kit";

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

const editkeep = ({ edittype }) => {
  const MySwal = withReactContent(Swal);
  const [infotype, setinfotype] = useState(edittype);
  /* console.log(infotype); */
  const [editkeep, seteditkeep] = useState(false);
  const [uppdatetypekeep, { loading, error }] = useMutation(UPDATECOUNT, {
    onCompleted: (data) => {
      setinfotype(data.uppdatetypekeep);
      seteditkeep(false);
      MySwal.fire({
        icon: "success",
        title: "สำเร็จ",
        text: "ทำการแก้ไขข้อมูลเสร็จสิ้น",
        confirmButtonText: (
          <span
            onClick={() =>
              Router.push("beefwarehouse/beefstore/setting/shelf").then(() => Router.reload())
            }
          >
            ตกลง
          </span>
        ),
        confirmButtonColor: "#3085d6",
      });
    },
  });
  const handdleChangeupdatetypekeep = (e) => {
    setinfotype({ ...infotype, [e.target.name]: e.target.value });
  };
  const handleSubmittypekeep = async () => {
    if (infotype === edittype) {
      setinfotype(edittype);
      seteditkeep(false);
      return;
    }
    try {
      await uppdatetypekeep({
        variables: {
          ...infotype,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const [deletetypekeep] = useMutation(DELETETYPEKEEP, {
    onCompleted: (data) => {
      MySwal.fire({
        icon: "success",
        title: "สำเร็จ",
        text: "ทำการลบข้อมูลสิ้น",
        confirmButtonText: (
          <span
            onClick={() =>
              Router.push("beefwarehouse/beefstore/setting/shelf").then(() => Router.reload())
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
      await deletetypekeep({
        variables: {
          id: infotype.id,
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
            value={infotype.totalbeef}
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

export default editkeep;
