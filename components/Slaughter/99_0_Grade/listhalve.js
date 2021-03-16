import React, { useState } from "react";
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
import Pickadate from "pickadate/builds/react-dom";
import TH from "pickadate/builds/translations/th_TH";

import { QUERYLIST } from "../99_1_Senttwo/index";

const UPDATE_GRADE = gql`
  mutation UPDATE_GRADE($id: ID!, $grade: String!) {
    updateGrade(id: $id, grade: $grade) {
      id
      numcow
      numkun
      pun
      weight
      price
      grade
      importslaughterDate
    }
  }
`;

const DELETE_GRADE = gql`
  mutation DELETE_GRADE($id: ID!) {
    deleteGrade(id: $id) {
      id
      numcow
      numkun
      pun
      weight
      price
      grade
      importslaughterDate
    }
  }
`;

const Imslaughter = ({ imslaughter }) => {
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [halveData, sethalveData] = useState(imslaughter);
  const [gradeData, setgradeData] = useState(halveData.grade);
  const [selectedDate, handleDateChange] = useState(
    // dayjs().format("ddd MMM DD YYYY")
    // dayjs().startOf('h').toISOString()
    // dayjs().startOf('h').add(1, 'day').toISOString()
    dayjs(halveData.sendAt).format("YYYY-MM-DD")
  );
  // console.log(gradeData);

  const [updateGrade] = useMutation(UPDATE_GRADE, {
    onCompleted: (data) => {
      // console.log(data.createHalveL)
      sethalveData(data.updateGrade);
      setEdit(false);
    },
    refetchQueries: [
      {
        query: QUERYLIST,
        variables: {
          barcode: "",
          createdAt: "",
          status: "",
        },
      },
    ],
    awaitRefetchQueries: true,
  });

  const [deleteGrade] = useMutation(DELETE_GRADE, {
    onCompleted: (data) => {
      // console.log(data.createHalveL)
      sethalveData(data.deleteGrade);
      setEdit(false);
    },
    refetchQueries: [
      {
        query: QUERYLIST,
        variables: {
          barcode: "",
          createdAt: "",
          status: "",
        },
      },
    ],
    awaitRefetchQueries: true,
  });

  const handleSubmitUpdate = async () => {
    setLoading(true);
    // console.log(halveData)
    await updateGrade({
      variables: {
        grade: gradeData.toString(),
        id: halveData.id,
      },
    });
    setEdit(false);
    setLoading(false);
  };

  const handleSubmitDeleteGrade = async () => {
    setLoading(true);
    // console.log(halveData)
    await deleteGrade({
      variables: {
        id: halveData.id,
      },
    });
    setEdit(false);
    setLoading(false);
  };

  return (
    <tr style={{ textAlign: "center" }}>
      <td>{halveData.numkun}</td>
      <td>{halveData.numkun}</td>
      <td>{halveData.pun}</td>
      <td>{halveData.weight}</td>
      <td>
        {halveData.grade && !edit ? (
          halveData.grade
        ) : (
          <select
            onChange={(event) => setgradeData(event.target.value)}
            style={{
              display: "inline",
              width: "134px",
              padding: "0.375rem 0.75rem",
              fontSize: "1rem",
              fontWeight: "400",
              textAlignLast: "center",
              lineHeight: "1.5",
              color: "#495057",
              backgroundColor: "#fff",
              backgroundClip: "padding-box",
              border: "1px solid #ced4da",
              borderRadius: "0.25rem",
              transition:
                "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
            }}
          >
            <option value="">กรุณาเลือกเกรด</option>
            <option value="2">2</option>
            <option value="2.5">2.5</option>
            <option value="3">3</option>
            <option value="3.5">3.5</option>
            <option value="4">4</option>
            <option value="4.5">4.5</option>
            <option value="5">5</option>
          </select>
        )}
      </td>
      <td>
        {halveData.grade ? (
          <Icon size={20} icon={check} style={{ color: "green" }} />
        ) : (
          <Icon size={20} icon={close} style={{ color: "red" }} />
        )}
      </td>

      <td>
        {loading ? (
          <Spinner animation="border" variant="primary" />
        ) : !halveData.grade && !edit ? (
          <Savebuttoncolor onClick={handleSubmitUpdate} style={{
            backgroundColor: `${
              !gradeData ? "gray" : ""
            }`,
          }} disabled={!gradeData}>
            <Savebutton />
          </Savebuttoncolor>
        ) : halveData.grade && !edit ? (
          <Editbuttoncolor onClick={() => setEdit(true)}>
            <Editbutton />
          </Editbuttoncolor>
        ) : halveData.grade && edit ? (
          <Savebuttoncolor onClick={handleSubmitUpdate} style={{
            backgroundColor: `${
              !gradeData ? "gray" : ""
            }`,
          }} disabled={!gradeData}>
            <Savebutton />
          </Savebuttoncolor>
        ) : (
          <div>
            <Savebuttoncolor onClick={() => setEdit(true)}>
              <Savebutton />
            </Savebuttoncolor>
          </div>
        )}
      </td>
    </tr>
  );
};

export default Imslaughter;
