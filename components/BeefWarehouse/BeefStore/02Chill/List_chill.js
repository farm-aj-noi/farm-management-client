import React, { useState, useEffect } from "react";
import { Barcodebuttoncolor } from "../../../../utils/buttonColor";
import { Qrcodebutton } from "../../../../utils/button";
import dayjs from "dayjs";
import "dayjs/locale/th";

import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { CHILLSEARCHLIST } from "./index";

import { Savebuttoncolor } from "../../../../utils/buttonColor";
import { Savebutton, Editbutton, Removebutton } from "../../../../utils/button";
import { Router } from "next/router";

export const UPDATECHILLSTATUS = gql`
  mutation UpdateChillday($id: ID) {
    updateChillday(id: $id) {
      chillstatus {
        id
        code
        nameTH
      }
    }
  }
`;

const List_chill = ({ listchill }) => {
  const checkdate = dayjs().format("YYYY-MM-DDTHH:mm:ssZ[Z]");
  console.log(checkdate);


  const [ListChillInfo, SetListChillInfo] = useState(listchill);
  console.log(ListChillInfo.chilldateEnd);
  /*  console.log(ListChillInfo.chillstatus); */
  const [updateChillday, { error }] = useMutation(UPDATECHILLSTATUS, {
    onCompleted: (data) => {
      /* console.log(data.updateChillday);
      console.log(ListChillInfo.chillstatus.id); */
      SetListChillInfo({
        ...ListChillInfo,
        chillstatus: data.updateChillday.chillstatus,
      });
    },
    refetchQueries: [
      {
        query: CHILLSEARCHLIST,
      },
    ],
  });
  /* console.log(updateChillday); */
  const handleSubmit = async () => {
    try {
      await updateChillday({
        variables: {
          id: ListChillInfo.id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  /*   console.log(ListChillInfo.id); */
  return (
    <tr style={{ textAlign: "center" }}>
      <td>{ListChillInfo.user.name}</td>
      <td>
        {dayjs(ListChillInfo.chilldateStart)
          .locale("th")
          .add(543, "year")
          .format("DD/MM/YYYY")}
      </td>
      <td>
        {dayjs(ListChillInfo.chilldateEnd)
          .locale("th")
          .add(543, "year")
          .format("DD/MM/YYYY")}
      </td>
      <td>
        {dayjs(ListChillInfo.chilldateEnd)
          .locale("th")
          .add(543, "year")
          .format("h:mm:ss A")}
      </td>
      <td>{ListChillInfo.halve.beeftype.nameTH}</td>
      <td>{ListChillInfo.chillday.day} วัน</td>
      <td>{ListChillInfo.halve.imslaughter.numcow}</td>
      <td>{ListChillInfo.halve.beeftype.code}</td>
      <td>{ListChillInfo.halve.barcode}</td>
      <td>
        <Barcodebuttoncolor>
          <Qrcodebutton />
        </Barcodebuttoncolor>
      </td>
      <td>{ListChillInfo.halve.weightwarm} กก.</td>
      <td>{ListChillInfo.chillroom.roomnum}</td>
      <td>{ListChillInfo.chillstatus.nameTH}</td>
      <td>
        {checkdate >= dayjs(ListChillInfo.chilldateEnd).format("YYYY-MM-DDTHH:mm:ssZ[Z]") ? (
          <div>
            <Savebuttoncolor
              disabled={
                ListChillInfo.chillstatus.id === "6284ad91fbfac22364a6e431"
              }
              style={{
                backgroundColor: `${
                  ListChillInfo.chillstatus.id === "6284ad91fbfac22364a6e431"
                    ? "gray"
                    : ""
                }`,
              }}
              onClick={handleSubmit}
            >
              <Savebutton />
            </Savebuttoncolor>
          </div>
        ) : (
          "-"
        )}

        {/*  {error && (
          <p style={{ color: "red" }}>{error.graphQLErrors[0].message}</p>
        )} */}
      </td>
    </tr>
  );
};

export default List_chill;
