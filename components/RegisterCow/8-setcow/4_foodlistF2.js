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
    , $CP: Float, $TDN: Float, $name: String ,$type:String
    ) {
        updateFoodset(id: $id,
            CP:$CP, TDN:$TDN, name:$name ,type:$type
     ) {
      id
      name
      TDN
      CP
      type
    }
  }
`;

const Foodset = ({ foodset }) => {
  //calendar
 
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [halveData, sethalveData] = useState(foodset);

  // console.log(halveData)

  const [updateFoodset] = useMutation(UPDATE, {
    onCompleted: (data) => {
      // console.log(data.createHalveL)
      sethalveData({
        ...halveData,
        name: data.updateFoodset.name,
        TDN: data.updateFoodset.TDN,
        CP: data.updateFoodset.CP,
        type:data.updateFoodset.type

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
    if (halveData === foodset) {
      sethalveData(foodset);
      setEdit(false);
      return;
    } else {
      await updateFoodset({
        variables: {
          ...halveData,        
          name: halveData.name,
          TDN: +halveData.TDN,
          CP: +halveData.CP,
          type:halveData.type
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
        {!halveData.name && !edit ? (
          <Wightinput
            type="String"
            name="name"
            disabled={!edit}

            value={halveData.name}
            onChange={handleChange}
          />
        ) : halveData.name && !edit ? (
          halveData.name
        ) : (
          <Wightinput
            type="String"
            // disabled={!edit}

            name="name"
            value={halveData.name}
            onChange={handleChange}
          />
        )}
      </td>
      <td>
        {!halveData.name && !edit ? (
          <Wightinput
            type="number"
            name="CP"
            disabled={!edit}

            value={halveData.CP}
            onChange={handleChange}
          />
        ) : halveData.name && !edit ? (
          halveData.CP
        ) : (
          <Wightinput
            type="number"
            // disabled={!edit}

            name="CP"
            value={halveData.CP}
            onChange={handleChange}
          />
        )}
      </td>
      <td>
        {!halveData.name && !edit ? (
          <Wightinput
            type="number"
            name="TDN"
            disabled={!edit}

            value={halveData.TDN}
            onChange={handleChange}
          />
        ) : halveData.name && !edit ? (
          halveData.TDN
        ) : (
          <Wightinput
            type="number"
            // disabled={!edit}

            name="TDN"
            value={halveData.TDN}
            onChange={handleChange}
          />
        )}
      </td>
      <td>
        {loading ? (
          <Spinner animation="border" variant="primary" />
        ) : !halveData.name && !edit ? (
          <Savebuttoncolor onClick={handleSubmit}>
            <Savebutton />
          </Savebuttoncolor>
        ) : halveData.name && !edit ? (
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
    
    </tr>
    
  );
  
};

export default Foodset;
