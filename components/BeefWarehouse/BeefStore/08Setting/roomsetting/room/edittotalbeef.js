import React, { useState } from "react";
import {
  DivFrom,
  DivFromTop,
  DivFromDown,
  HeaderColor,
  Searchinput,
  Addbutton,
  DivBase1,
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
  console.log(infoCount);
  const [editkeep, seteditkeep] = useState(false);

  const [uppdatetypekeep, { loading, error }] = useMutation(UPDATECOUNT, {
    onCompleted: (data) => {
      seinfoCount(data.uppdatetypekeep);
      seteditkeep(false);
      MySwal.fire({
        icon: "success",
        title: "สำเร็จ",
        text: "ทำการแก้ไขข้อมูลเสร็จสิ้น",
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
