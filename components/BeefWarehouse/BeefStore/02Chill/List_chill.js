import React, { useState, useEffect } from "react";

import dayjs from "dayjs";
import "dayjs/locale/th";

import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { CHILLSEARCHLIST } from "./index";

import { Savebuttoncolor } from "../../../../utils/buttonColor";
import { Savebutton } from "../../../../utils/button";


import Modalqrcode from "../12Qrcode/chill";

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
  const checkdate = dayjs().locale("th").format("YYYY-MM-DDTHH:mm:ssZ[Z]");
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

  const tdStyle = {

    fontSize: "16px"
  }

  return (
    <tr style={{ textAlign: "center" }}>
      <td style={tdStyle}>{ListChillInfo.user.name}</td>
      <td style={tdStyle}>
        {dayjs(ListChillInfo.chilldateStart)
          .locale("th")
          .add(543, "year")
          .format("DD/MM/YYYY")}
      </td>
      <td style={tdStyle}>
        {dayjs(ListChillInfo.chilldateEnd)
          .locale("th")
          .add(543, "year")
          .format("DD/MM/YYYY")}
      </td>
      <td style={tdStyle}>
        {dayjs(ListChillInfo.chilldateEnd)
          .locale("th")
          .add(543, "year")
          .format("h:mm:ss A")}
      </td>
      <td style={tdStyle}>{ListChillInfo.halve.beeftype.nameTH}</td>
      <td style={tdStyle}>{ListChillInfo.chillday.day} วัน</td>
      <td style={tdStyle}>{ListChillInfo.halve.imslaughter.numcow}</td>
      <td style={tdStyle}>{ListChillInfo.halve.beeftype.code}</td>
      <td style={tdStyle}>{ListChillInfo.halve.barcode}</td>
      <td style={tdStyle}>
        <Modalqrcode key={ListChillInfo.id} listchill={ListChillInfo} />
      </td>
      <td style={tdStyle}>{ListChillInfo.halve.weightwarm} กก.</td>
      <td style={tdStyle}>{ListChillInfo.chillroom.roomnum}</td>
      <td style={tdStyle}>{ListChillInfo.chillstatus.nameTH}</td>
      <td style={tdStyle}>
        {checkdate >=
          dayjs(ListChillInfo.chilldateEnd)
            .locale("th")
            .format("YYYY-MM-DDTHH:mm:ssZ[Z]") ? (
          <div>
            <Savebuttoncolor
              disabled={
                ListChillInfo.chillstatus.id === "6284ad91fbfac22364a6e431"
              }
              style={{
                backgroundColor: `${ListChillInfo.chillstatus.id === "6284ad91fbfac22364a6e431"
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
      </td>
    </tr>
  );
};

export default List_chill;
