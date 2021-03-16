import React, { useContext, useState, useRef, useEffect } from "react";
import styled from "styled-components";

import { Icon } from "react-icons-kit";
import { Table } from "react-bootstrap";
import {
  Savebuttoncolor,
  Editbuttoncolor,
  Removebuttoncolor,
} from "../../../utils/buttonColor";
import {  Removebutton } from "../../../utils/button";

import { list } from "react-icons-kit/fa/list";
import { DivBase } from "../../../utils/divBase";
import {
  DivFrom,
  DivFromTop,
  DivFromDown,
  Searchinput,
  Searchinput0,
  Searchinputarea,
  Searchbutton,
  Gobutton,
} from "./SlaughterFrom";
// import Footer from "../../Footer/index";
import dayjs from "dayjs";
import DatePicker, { registerLocale } from "react-datepicker";
import th from "date-fns/locale/th";
registerLocale("th", th);
import Datestyle from "../helps/datepicker.module.css";

import { Savebutton, Editbutton } from "../../../utils/button";
import { Spinner } from "react-bootstrap";

import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const QUERY = gql`
  query QUERY {
    allDisease {
      id
      name
      detail
    }
  }
`;

const CREATE = gql`
  mutation CREATE(
    $name: String!
    $detail: String!
  ) {
    createDisease(
      name: $name
      detail:$detail
    ) {
     id
     name
     detail
    }
  }
`;

const Index = () => {
  const [prod, setProd] = useState({
    name : "",
    detail: "",
 
  });
  // console.log(+prod.BBE);
  const [errorAlert, setErrorAlert] = useState(false);

  const { data } = useQuery(QUERY, {});
  const [createDisease, { loading, error }] = useMutation(CREATE, {
    onCompleted: (data) => {
      // console.log(data)
      window.location.reload(false);

    },
    refetchQueries: [
      {
        query: QUERY,
      },
    ],
  });

  const handleChange = (e) =>
    setProd({ ...prod, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      await createDisease({
        variables: {
          name: prod.name,
          detail: prod.detail,
          
        },
      });
    } catch (error) {
      setErrorAlert(true);
      // console.log(error);
    }
  };

  // console.log(data);
  useEffect(() => {
    setErrorAlert(false);
  }, [prod.code]);

  return (
    <>
      <DivBase>
        

        <DivFrom style={{ marginBottom: "15px" }}>
          <DivFromTop>
            <div style={{ margin: "-3px 5px 0px 0px" }}>
              <Icon size={20} icon={list} />
            </div>
            บันทึกข้อมูลโรค
          </DivFromTop>
          <DivFromDown
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gridRowGap: "5px",
              paddingBottom: "15px",
            }}
          >
            {/* ใส่ card */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 0fr 0.1fr 0.2fr 0.3fr",
                gridRowGap: "5px",
              }}
            >
              <div>
                ชื่อโรค : {}
               < Searchinput0 
               name="name"
               onChange={handleChange}

               />
              </div>
              <div style={{ gridColumnStart: 3, gridColumnEnd: 3 }}>
                อาการ : {}
                <Searchinputarea
                  name="detail"
                  onChange={handleChange}
                  style={{ width: "580px", height: "35px" }}
                />
              </div>

            
            </div>


              <Gobutton
               
                style={{
                  
                  margin: "5px 29px 0px auto",
                  float: "right",
                }}
                onClick={handleSubmit}
              >
                บันทึก
              </Gobutton>
      
            {/* {success && (
              <p
                style={{
                  color: "green",
                  position: "absolute",
                  display: "flex",
                  margin: "145px 0px 0px 81%",
                }}
              >
                บันทึกสำเร็จ
              </p>
            )} */}
          </DivFromDown>
        </DivFrom>

        <DivFrom>
          <DivFromTop>
            <div style={{ margin: "-3px 5px 0px 0px" }}>
              <Icon size={20} icon={list} />
            </div>
            รายการรักษา
          </DivFromTop>
          <DivFromDown
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gridRowGap: "5px",
            }}
          >
            <div>
              <Table
                striped
                bordered
                responsive
                hover
                style={{ margin: "auto" }}
              >
                   <thead>
                    <tr style={{ textAlign: "center" }}>
                      <th>ชื่อโรค</th>
                      <th>อาการของโรค</th>
                      <th>จัดการ</th>
                    </tr>
                  </thead>
                  <tbody>
                  {data &&
                      data.allDisease.map((prod) => (
                        <tr key={prod.id} style={{ }}>
                  <td>{prod.name}</td>
                  <td>{prod.detail}</td>
                  <td>
                  <Removebuttoncolor >
              <Removebutton />
            </Removebuttoncolor>
                  </td>
                  </tr> ))}
                  </tbody>
              </Table>
            </div>
          </DivFromDown>
        </DivFrom>
        {/* <Footer/> */}
      </DivBase>
    </>
  );
};

export default Index;
