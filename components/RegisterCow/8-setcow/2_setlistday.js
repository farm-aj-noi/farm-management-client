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
    , $year: Int, $month: Int, $weight: Float
    ) {
      updateDayslaugh(id: $id,
         year: $year,
         month: $month
,        weight: $weight

     ) {
      id
      year
      month
      weight
     
    }
  }
`;

const Dayslaugh = ({ dayslaugh }) => {
  //calendar
 
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [halveData, sethalveData] = useState(dayslaugh);

  // console.log(halveData)

  const [updateDayslaugh] = useMutation(UPDATE, {
    onCompleted: (data) => {
      // console.log(data.createHalveL)
      sethalveData({
        ...halveData,
        year: data.updateDayslaugh.year,
        month: data.updateDayslaugh.month,
        weight: data.updateDayslaugh.weight

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
    if (halveData === dayslaugh) {
      sethalveData(dayslaugh);
      setEdit(false);
      return;
    } else {
      await updateDayslaugh({
        variables: {
          ...halveData,        
          year: +halveData.year,
          month: +halveData.month,
          weight: +halveData.weight
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
      <td>
        {!halveData.year && !edit ? (
          <Wightinput
            type="number"
            name="year"
            disabled={!edit}

            value={halveData.year}
            onChange={handleChange}
          />
        ) : halveData.year && !edit ? (
          halveData.year
        ) : (
          <Wightinput
            type="number"
            // disabled={!edit}

            name="year"
            value={halveData.year}
            onChange={handleChange}
          />
        )} -  {!halveData.year && !edit ? (
          <Wightinput
            type="number"
            name="month"
            disabled={!edit}

            value={halveData.month}
            onChange={handleChange}
          />
        ) : halveData.year && !edit ? (
          halveData.month
        ) : (
          <Wightinput
            type="number"
            // disabled={!edit}

            name="month"
            value={halveData.month}
            onChange={handleChange}
          />
        )}
      </td>
      <td>
      {!halveData.weight && !edit ? (
          <Wightinput
            type="number"
            name="weight"
            disabled={!edit}

            value={halveData.weight}
            onChange={handleChange}
          />
        ) : halveData.year && !edit ? (
          halveData.weight
        ) : (
          <Wightinput
            type="number"
            // disabled={!edit}

            name="weight"
            value={halveData.weight}
            onChange={handleChange}
          />
        )}
      </td>
      <td>
        {loading ? (
          <Spinner animation="border" variant="primary" />
        ) : !halveData.year && !edit ? (
          <Savebuttoncolor onClick={handleSubmit}>
            <Savebutton />
          </Savebuttoncolor>
        ) : halveData.year && !edit ? (
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

export default Dayslaugh;
