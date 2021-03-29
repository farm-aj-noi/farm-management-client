import React, { useContext, useState, useRef, useEffect } from "react";
import styled from "styled-components";
import {notepad_add} from 'react-icons-kit/ikons/notepad_add'

import { Icon } from "react-icons-kit";
import { Table } from "react-bootstrap";
import {  Removebutton } from "../../../utils/button";
import {
  Savebuttoncolor,
  Editbuttoncolor,
  Removebuttoncolor,
} from "../../../utils/buttonColor";
import { list } from "react-icons-kit/fa/list";
import { DivBase } from "../../../utils/divBase";
import {
  DivFrom,
  DivFromTop,
  DivFromDown,
  Searchinput,
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
import { useRouter } from "next/router"

import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { route } from "next/dist/next-server/server/router";
const DELETE_Drug = gql`
  mutation DELETE_Drug($id: ID!) {
    deleteDrug(id: $id) {
     id
     name
    }
  }
`;

const QUERY_DRUG = gql`
  query QUERY_DRUG {
    allDrug {
      id
      name
      nofity
    }
  }
`;

const CREATE = gql`
  mutation CREATE(
    $name: String!
    $nofity: Int
  ) {
    createDrug(
      name: $name
      nofity: $nofity
    ) {
      name
      nofity
    }
  }
`;

const Index = () => {
  const [errorAlert, setErrorAlert] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [prod, setProd] = useState({
    name: "",
    nofity: 0,
  });
  const route = useRouter();
  // const [alert, setAlert] = useState({
  //   name: false,
  //   nofity: false,
    
  // });
  // const handleChange = (name, value) => setProd({ ...prod, [name]: value });
  const handleChange = e => setProd({ ...prod, [e.target.name]: e.target.value });
  // console.log(prod)

  const { data: datadrug } = useQuery(QUERY_DRUG, {
  }
  );

  const [deleteDrug] = useMutation(DELETE_Drug, {
    onCompleted: (data) => {  
    },
    refetchQueries: [
      {
        query: QUERY_DRUG,
      },
    ],
  });

  const [createDrug, error] = useMutation(CREATE, {
    onCompleted: (data) => {
      window.location.reload(false);

      // console.log(data)
    },
    
    refetchQueries: [
      {
        query: QUERY_DRUG,
        ...prod
      },
    ],
  });

  const handleSubmitDelete = async (id) => {
    // console.log(id)
      try { 
        await deleteDrug({
          variables: {
id:id
          },
        }
        );
      } catch (error) {
        // console.log(error);
      }
  };
// console.log(prod.id  )
  const handleSubmit = async () => {
    setLoadingCreate(true);


    try {
      await createDrug({
        variables: {
          ...prod,
          nofity: +prod.nofity,
        },
      });
    } catch (error) {
      setErrorAlert(true);
      // console.log(error);
    }
    // try {
    //   await createDrug({
    //     variables: {
    //       ...prod,
    //       nofity: +prod.nofity,
    //     },
        
    //   });
    //   // console.log(prod) ;
    //   // console.log(name) ;
    //   // console.log(nofity) ; 
    //    setLoadingCreate(false);

    //   } catch (error) {
    //   setErrorAlert(true);
    //   setLoadingCreate(false);
    //   // console.log(error);
    // }
  };
  
 
  return (
    <>
      <DivBase>
        

        <DivFrom style={{ marginBottom: "15px" }}>
          <DivFromTop>
            <div style={{ margin: "-3px 5px 0px 0px" }}>
              <Icon size={20} icon={notepad_add} />
            </div>
            บันทึกข้อมูลยา
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
                gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
                gridRowGap: "5px",
              }}
            >
            
              

              <div>
               ชื่อ ยา/วัคซีนที่ใช้ :{}
                <Searchinput
                  name="name"
                  onChange={handleChange}
                  style={{ width: "156px" }}
                />
              </div>
              <div>
                ระยะหยุดยา(วัน) : {}
                <Searchinput
                  name="nofity"
                  onChange={handleChange}
                  type="number"
                  style={{ width: "156px" }}
                />
              </div>
      
              <div>
                ข้อควรระวัง/ผลข้างเคียง : {}
                <Searchinput
                  name="note"
                  onChange={handleChange}
                  style={{ width: "324px" }}
                />
              </div>
              <div>
                หมายเหตุ : {}
                <Searchinput
                  name="note"
                  onChange={handleChange}
                  style={{ width: "226px" }}
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
                      <th>ชื่อยา</th>
                      <th>ระยะหยุดยา</th>
                      {/* <th>ข้อควรระวัง/ผลข้างเคียง</th>
                      <th>หมายเหตุ</th> */}
                      <th style={{width:"30px"}}>จัดการ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                  datadrug &&
                  datadrug.allDrug &&
                  datadrug.allDrug.length > 0 ? (
                    datadrug.allDrug.map((prod) => (
                  
                        <tr key={prod.id} style={{ textAlign: "center" }}>
                  <td>{prod.name}</td>
                  <td>{prod.nofity}</td>
                  <td>
                  <Removebuttoncolor onClick={ e => handleSubmitDelete(prod.id)}>
              <Removebutton />
            </Removebuttoncolor>
                  </td>
                  </tr> ))
                  ) : (
                    <tr style={{ textAlign: "center" }}>
                      <td colSpan="7">ไม่พบข้อมูล</td>
                    </tr>
                  )}</tbody>
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
