import React, { useContext, useState, useRef, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {
  Savebuttoncolor,
  Editbuttoncolor,
  Removebuttoncolor,
} from "../../../utils/buttonColor";
import { Savebutton, Editbutton, Removebutton } from "../../../utils/button";
import { Spinner } from "react-bootstrap";

import { Icon } from "react-icons-kit";
import { check } from "react-icons-kit/fa/check";
import { close } from "react-icons-kit/fa/close";

import { Wightinput } from "./SlaughterFrom";
// import LoadingPage from "../../../helps/LoadingPage";
import dayjs from "dayjs";
import DatePicker, { registerLocale } from "react-datepicker";
import th from "date-fns/locale/th";
registerLocale("th", th);
import Datestyle from "../helps/datepicker.module.css";

const UPDATE = gql`
  mutation UPDATE($id: String!
    , $dateStop: Int
    ) {
    updateDrug(id: $id,
       dateStop: $dateStop
     ) {
       id
     dateStop
     name
     
    }
  }
`;

const Drug = ({ drug }) => {
  //calendar
 
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [halveData, sethalveData] = useState(drug);

  // console.log(halveData)

  const [updateDrug] = useMutation(UPDATE, {
    onCompleted: (data) => {
      // console.log(data.createHalveL)
      sethalveData({
        ...halveData,
        dateStop: data.updateDrug.dateStop
      });
      setEdit(false);
    },
  });
  console.log(halveData)

  const handleChange = (e) => {
    // const pricecal = imslaughterData.weight * 150;
    sethalveData({
      ...halveData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async () => {
    if (halveData === drug) {
      sethalveData(drug);
      setEdit(false);
      return;
    } else {
      await updateDrug({
        variables: {
          ...halveData,        
          dateStop: +halveData.dateStop,
        },
      });
    }
  };

  // const handleSubmitUpdate = async () => {
  //   setLoading(true);
  //   // console.log(halveData)
  //   await updateDrug({
  //     variables: {
  //       dateStop: halveData.dateStop,
  //       id: halveData.id,
  //     },
  //   });
  //   setEdit(false);
  //   setLoading(false);
  // };

  return (
    <tr style={{ textAlign: "center" }}>
      <td>{halveData.name}</td>
      <td>
        {!halveData.nofity && !edit ? (
          <Wightinput
            type="number"
            name="dateStop"
            disabled={!edit}

            value={halveData.dateStop}
            onChange={handleChange}
          />
        ) : halveData.nofity && !edit ? (
          halveData.dateStop
        ) : (
          <Wightinput
            type="number"
            // disabled={!edit}

            name="dateStop"
            value={halveData.dateStop}
            onChange={handleChange}
          />
        )}
      </td>
      <td>
        {loading ? (
          <Spinner animation="border" variant="primary" />
        ) : !halveData.dateStop && !edit ? (
          <Savebuttoncolor onClick={handleSubmit}>
            <Savebutton />
          </Savebuttoncolor>
        ) : halveData.dateStop && !edit ? (
          <Editbuttoncolor onClick={() => setEdit(true)}>
            <Editbutton />
          </Editbuttoncolor>
        ) : (
          <div>
            <Savebuttoncolor onClick={handleSubmit}>
              <Savebutton />
            </Savebuttoncolor>
          </div>
        )}
      </td>
      {/* <td>
        {halveData.dateStop && !edit ? (
          <div>
            <div style={{ display: "none" }}>
            <input
                    name="dateStop"
                    value={halveData.dateStop}
                    maxLength="5"
                    style={{ width:"60px",border:"5px",textAlign:"center" }}
                    onChange={handleChange}
                  />
            </div>
          </div>
        ) : (
          <input
          name="dateStop"
          value={halveData.dateStop}
          maxLength="5"
          style={{ width:"60px",border:"5px",textAlign:"center"}}
          onChange={handleChange}
        />

        )}
      </td>

      <td>
        {loading ? (
          <Spinner animation="border" variant="primary" />
        ) : !halveData.dateStop && !edit ? (
          <Savebuttoncolor onClick={handleSubmitUpdate}>
            <Savebutton />
          </Savebuttoncolor>
        ) : halveData.dateStop && !edit ? (
          <Editbuttoncolor
            disabled={halveData.dateStop}
            style={{
              backgroundColor: `${halveData.dateStop ? "gray" : ""}`,
            }}
            onClick={() => setEdit(true)}
          >
            <Editbutton />
          </Editbuttoncolor>
        ) : halveData.dateStop && edit ? (
          <Savebuttoncolor onClick={handleSubmitUpdate}>
            <Savebutton />
          </Savebuttoncolor>
        ) : (
          <div>
            <Savebuttoncolor onClick={handleSubmitUpdate}>
              <Savebutton />
            </Savebuttoncolor>
          </div>
        )}
      </td> */}
    </tr>
  );
};

export default Drug;
