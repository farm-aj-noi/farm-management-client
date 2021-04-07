// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import { useRouter , Router} from "next/router"

// import { Icon } from "react-icons-kit";
// import { Table } from "react-bootstrap";
// import Card from 'react-bootstrap/Card'
// import { list } from "react-icons-kit/fa/list";
// import { DivBase } from "../../../../utils/divBase";
// import {
//   Savebuttoncolor,
//   Editbuttoncolor,
//   Removebuttoncolor,
// } from "../../../../utils/buttonColor";
// import {
//   DivFrom,
//   DivFromTop,
//   DivFromDown,
//   Searchinput,
//   Searchinputarea,
//   Gobutton,
// } from "../SlaughterFrom";
// import { Spinner, Modal ,Button} from "react-bootstrap";

// // import Footer from "../../Footer/index";
// import dayjs from "dayjs";
// import DatePicker, { registerLocale } from "react-datepicker";
// import th from "date-fns/locale/th";
// registerLocale("th", th);

// import { useQuery, useMutation } from "@apollo/react-hooks";
// import gql from "graphql-tag";

// const UPDATE = gql`
//   mutation UPDATE($id: ID!, $statuscow: String!) {
//     updateTstatus(id: $id, statuscow: $statuscow) {
//       statuscow
//     }
//   }
// `;

// const UPDATED_D = gql`
//   mutation UPDATED_D($id: ID!, $statuscow: String!) {
//     updateDead(id: $id, statuscow: $statuscow) {
//       statuscow
//     }
//   }
// `;
// const QUERY_PRODUCT = gql`
//   query QUERY_PRODUCT($id: ID!) {
//     Cowdetail(id: $id) {
//       numcow
//     namecow
//     date
//     numkun
//   numfarmer
//   namefarmer
//   passport
//   pun
//   teeth
//   rfid
//   bodyscore
//   datebirhtday
//   imagecow
//   weightbirht
//   weightstart
//   sex
//   treats{
//     dise
//   nofity
//   datet
//   quantity
//   note
//   symptom
//   medi
//   }
//     }
//   }`
// const DetailId = () => {

//   const route = useRouter();
//   // console.log(route);

//   const { data,loading, error  } = useQuery(QUERY_PRODUCT, {
//     variables: {
//       id: route.query.detailId
//     }
//   });
//   console.log( route.query.detailId)

//   const [updateTstatus, ] = useMutation(UPDATE, {
//     onCompleted: (data) => {
//       route.push("/registercow/showlisttreat")

//     },
   

//   }
//   );
//   const [updateDead, ] = useMutation(UPDATED_D, {
//     onCompleted: (data) => {
//       route.push("/registercow/showlisttreat")

//     },
   

//   }
//   );
//   const handleSubmit = async () => {
//     try {
//       await handleClose;
//       await updateTstatus({
//         variables: {
//           ...prod,
//         },
//       });
//     } catch (error) {
//     ////  ลิ้งหน้าอื่น //// 
//     }
//   };
  
//   const handleSubmitDead = async () => {
//     try {
//       await handleClose;
//       await updateDead({
//         variables: {
//           ...prod,
//         },
//       });
//     } catch (error) {
//     ////  ลิ้งหน้าอื่น //// 
//     }
//   };

//   const [show, setShow] = useState(false);
//   const [prod, setProd] = useState({
//     statuscow: "",
//     id:route.query.detailId
//   });

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);
//   if (error) return <p>Something went wrong, please try again.</p>

//   if (loading) return <p>Loading ...</p>
  
//   return (
//     <>
//       <DivBase>
//         <DivFrom style={{ marginBottom: "15px" }}>
//           <DivFromTop>
//             <div style={{ margin: "-3px 5px 0px 0px" }}>
//               <Icon size={20} icon={list} />
//             </div>
//             ข้อมูลโค
//           </DivFromTop>
//           <DivFromDown
//             style={{
//               display: "grid",
//               gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
//               gridRowGap: "5px",
//             }}
//           >
//             {/* ใส่ card */}

//             <div>
//               ใบแจ้งขุน : { }
//               <Searchinput
//                 style={{ width: "156px" }}
//                 value={data.Cowdetail.numkun}
//                 disabled
//               />
//             </div>
//             <div>
//               เบอร์โค : { }
//               <Searchinput

//                 style={{ width: "156px", backgroundColor: "#ececec" }}
//                 disabled
//                 value={data.Cowdetail.numcow}

//               />
//             </div>
//             <div>
//               สายพันธุ์ : { }
//               <Searchinput

//                 style={{ width: "156px", backgroundColor: "#ececec" }}
//                 disabled
//                 value={data.Cowdetail.pun}

//               />
//             </div>
//             <div>
//               รหัสสมาชิก : { }
//               <Searchinput
//                 value={data.Cowdetail.numfarmer}
//                 style={{ width: "156px", backgroundColor: "#ececec" }}
//                 disabled
//               />
//             </div>
//             <div>
//               ชื่อสมาชิก : { }
//               <Searchinput
//                 value={data.Cowdetail.namefarmer}

//                 style={{ width: "156px", backgroundColor: "#ececec" }}
//                 disabled
//               />
//             </div>
//           </DivFromDown>
//         </DivFrom>


//         <DivFrom>
//           <DivFromTop>
//             <div style={{ margin: "-3px 5px 0px 0px" }}>
//               <Icon size={20} icon={list} />
//             </div>
//             รายการรักษา
//           </DivFromTop>
//           <DivFromDown
//             style={{
//               display: "grid",
//               gridTemplateColumns: "1fr",
//               gridRowGap: "5px",
//             }}
//           >
//             <div>
//               {data &&
//                 data.Cowdetail &&
//                 data.Cowdetail.treats.length > 0 ? (
//                   data.Cowdetail.treats.map((prod) => (
//                     <Card 
//                     style={{borderColor:"#95D4E7"}}
//                     >
//                       <Card.Header>รายการรักษาวันที่ {prod.datet.substring(0, 10)} </Card.Header>
//                       <Card.Body>
//                         <Card.Text>


//                           {/* ใส่ card */}
//                           <div
//                             style={{
//                               display: "grid",
//                               gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
//                               gridRowGap: "5px",
//                             }}
//                           >
//                             <div>
//                               วัน/เดือน/ปี รับเข้าโค : { }
//                               <div style={{ display: "grid", gridTemplateRows: "1fr 15px" }}>
//                                 <Searchinput
//                                   name="pun"
//                                   value={prod.datet.substring(0, 10)}
//                                   maxLength="5"
//                                   style={{ backgroundColor: "#ececec",  width: "200px", }}
//                                   disabled
//                                 />
//                               </div>
//                             </div>
//                             <div>
//                               ชื่อโรค : { }
//                               <div style={{ display: "grid", gridTemplateRows: "1fr 15px" }}>
//                                 <Searchinput
//                                   name="dise"
//                                   value={prod.dise}
//                                   maxLength="5"
//                                   style={{ backgroundColor: "#ececec", }}
//                                   disabled
//                                 />
//                               </div>
//                             </div>
//                             <div style={{ gridColumnStart: 3, gridColumnEnd: 6 }}>
//                               อาการ : { }
//                               <Searchinputarea
//                                 name="symptom"
//                                 style={{ width: "493px", backgroundColor: "#ececec", height: "35px" }}
//                                 value={prod.symptom}
//                                 disabled
//                               />
//                             </div>



//                             <div>
//                               ยา/วัคซีนที่ใช้ :{ }
//                               <div style={{ gridColumnStart: 3 }}>
//                                 <Searchinput
//                                   name="medi"
//                                   value={prod.medi}
//                                   style={{  width: "200px",backgroundColor: "#ececec", }}
//                                   maxLength="5"
//                                   disabled
//                                 />
//                               </div>
//                             </div>
//                             <div>
//                               ระยะหยุดยา(วัน) : { }
//                               <Searchinput
//                                 name="nofity"
//                                 value={prod.nofity}
//                                 disabled
//                                 type="number"
//                                 style={{ backgroundColor: "#ececec", width: "156px" }}
//                               />
//                             </div>
//                             <div>
//                               จำนวน (CC) : { }
//                               <Searchinput
//                                 value={prod.quantity}
//                                 name="quantity"
//                                 type="number"
//                                 disabled
//                                 style={{ backgroundColor: "#ececec", width: "176px" }}
//                               />
//                             </div>
                           
//                             <div>
//                               หมายเหตุ : { }
//                               <Searchinput
//                                 name="note"
//                                 value={prod.note}
//                               disabled
//                                 style={{ width: "306px",backgroundColor: "#ececec", }}
//                               />
//                             </div>

                            
//                           </div>
//                         </Card.Text>
//                       </Card.Body>

//                     </Card>

//                   ))
//                 ) : (
//                   <tr style={{ textAlign: "center" }}>
//                     <td colSpan="7">ไม่พบข้อมูล</td>
//                   </tr>
//                 )}
//               <> </>
//             </div>   
//             <div style={{width:"260px",margin:"auto"}} >
//             {loading ? (
//             <Spinner animation="border" variant="primary" />
//           ) : (
//              <Savebuttoncolor style={{width:"120px"}} onClick={handleShow} 
//             //  disabled={
//             //  prod.statuscow === "ตาย"
//             // }
//             // style={{
//             //   backgroundColor: `${
//             //     !prod.statuscow 
//             //       ? "gray"
//             //       : ""
//             //   }`,
//             // }}
//             >
//                รักษาสำเร็จ
//              </Savebuttoncolor>
//           )}&ensp;
//              <Removebuttoncolor 
             
//              style={{width:"120px"}}
//              onClick={handleSubmitDead}>
//                ตาย
//             </Removebuttoncolor>
//         </div>
//           </DivFromDown>
//         </DivFrom>
//         <>
//           <p></p>
    
           
//         </>
//         <Modal
//         show={show}
//         onHide={handleClose}
//         backdrop="static"
//         keyboard={false}
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>ยืนยันการรักษา</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           คุณต้องบันทึกข้อมูลหรือไม่?
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             ปิด
//           </Button>
//           <Button variant="primary" onClick={handleSubmit}>
//             ยืนยัน
//           </Button>
//         </Modal.Footer>
//       </Modal>

//         {/* <Footer/> */}
//       </DivBase>
//     </>
//   );
// };

// export default DetailId;
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter , Router} from "next/router"

import { Icon } from "react-icons-kit";
import { Table } from "react-bootstrap";
import Card from 'react-bootstrap/Card'
import { list } from "react-icons-kit/fa/list";
import { DivBase } from "../../../../utils/divBase";
import {
  Savebuttoncolor,
  Editbuttoncolor,
  Removebuttoncolor,
} from "../../../../utils/buttonColor";
import {
  DivFrom,
  DivFromTop,
  DivFromDown,
  Searchinput,
  Searchinputarea,
  Gobutton,
} from "../SlaughterFrom";
import { Spinner, Modal ,Button} from "react-bootstrap";

// import Footer from "../../Footer/index";
import dayjs from "dayjs";
import DatePicker, { registerLocale } from "react-datepicker";
import th from "date-fns/locale/th";
registerLocale("th", th);

import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const UPDATE = gql`
  mutation UPDATE($id: ID!, $statuscow: String!) {
    updateTstatus(id: $id, statuscow: $statuscow) {
      statuscow
    }
  }
`;

const UPDATED_D = gql`
  mutation UPDATED_D($id: ID!, $statuscow: String! ,$importDateDead:String,$notedead:String ) {
    updateDead(id: $id, statuscow: $statuscow ,  importDateDead: $importDateDead,notedead: $notedead) {
      statuscow
    }
  }
`;
const QUERY_PRODUCT = gql`
  query QUERY_PRODUCT($id: ID!) {
    Cowdetail(id: $id) {
      numcow
    namecow
    date
    numkun
  numfarmer
  namefarmer
  passport
  pun
  teeth
  rfid
  bodyscore
  datebirhtday
  imagecow
  weightbirht
  weightstart
  sex
  treats{
    dise
  nofity
  datet
  quantity
  note
  symptom
  medi
  }
    }
  }`
const DetailId = () => {

  var data_treat = []

  const [treat, setTreat] = useState([])
  

  const route = useRouter();
  // console.log(route);

  const { data,loading, error  } = useQuery(QUERY_PRODUCT, {
    variables: {
      id: route.query.detailId
    },
    onCompleted: (data) => {
      console.log(data.Cowdetail);
      data_treat = []

      if(data.Cowdetail){
        for (let i = 0; i < data.Cowdetail.treats.length; i++) {
          const element = data.Cowdetail.treats[i];

          let check = data_treat.findIndex(e =>  e.datet == element.datet)

          let list
          if (check < 0){
            console.log(111)
            list = {
              datet: element.datet,
              dise: element.dise,
              symptom: element.symptom,
              list_dis: [{
                medi: element.medi,
                notify: element.nofity,
                note: element.note,
                quantity: element.quantity
              }]
            }
            data_treat.push(list)

            console.log('123',data_treat)

          } else {
            list = {
                medi: element.medi,
                notify: element.nofity,
                note: element.note,
                quantity: element.quantity
              }
              data_treat[check].list_dis.push(list)
              console.log('456',data_treat)
          }
        }

        console.log(data_treat)
      }
      setTreat(data_treat)
      // if(data_treat.length > 0) {
      //   let list = {}

        
      // }
    },
  });
  console.log( route.query.detailId)

  const [updateTstatus, ] = useMutation(UPDATE, {
    onCompleted: (data) => {
      route.push("/registercow/showlisttreat")

    },
   

  }
  );
  const [updateDead, ] = useMutation(UPDATED_D, {
    onCompleted: (data) => {
      route.push("/registercow/showlisttreat")

    },
   

  }
  );
  const handleChange = e => setDrod({ ...drod, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      await handleClose;
      await updateTstatus({
        variables: {
          ...prod,
        },
      });
    } catch (error) {
    ////  ลิ้งหน้าอื่น //// 
    }
  };
  
  const handleSubmitDead = async () => {
    try {
      await handleClose;
      await updateDead({
        variables: {
          ...drod,
        },
      });
    } catch (error) {
    ////  ลิ้งหน้าอื่น //// 
    }
  };

  const [show, setShow] = useState(false);
  const [prod, setProd] = useState({
    statuscow: "",
    id:route.query.detailId
  });
  const [drod, setDrod] = useState({
    statuscow: "ตาย",
    notedead:"",
    importDateDead: new Date(),
    id:route.query.detailId
  });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  if (error) return <p>Something went wrong, please try again.</p>

  if (loading) return <p>Loading ...</p>
  
  return (
    <>
      <DivBase>
        <DivFrom style={{ marginBottom: "15px" }}>
          <DivFromTop>
            <div style={{ margin: "-3px 5px 0px 0px" }}>
              <Icon size={20} icon={list} />
            </div>
            ข้อมูลโค
          </DivFromTop>
          <DivFromDown
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
              gridRowGap: "5px",
            }}
          >
            {/* ใส่ card */}

            <div>
              ใบแจ้งขุน : { }
              <Searchinput
                style={{ width: "156px" }}
                value={data.Cowdetail.numkun}
                disabled
              />
            </div>
            <div>
              เบอร์โค : { }
              <Searchinput

                style={{ width: "156px", backgroundColor: "#ececec" }}
                disabled
                value={data.Cowdetail.numcow}

              />
            </div>
            <div>
              สายพันธุ์ : { }
              <Searchinput

                style={{ width: "156px", backgroundColor: "#ececec" }}
                disabled
                value={data.Cowdetail.pun}

              />
            </div>
            <div>
              รหัสสมาชิก : { }
              <Searchinput
                value={data.Cowdetail.numfarmer}
                style={{ width: "156px", backgroundColor: "#ececec" }}
                disabled
              />
            </div>
            <div>
              ชื่อสมาชิก : { }
              <Searchinput
                value={data.Cowdetail.namefarmer}

                style={{ width: "156px", backgroundColor: "#ececec" }}
                disabled
              />
            </div>
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
              {data &&
                data.Cowdetail &&
                data.Cowdetail.treats.length > 0 ? (
                  treat.map((prod) => (
  
                    <Card 
                    style={{borderColor:"#95D4E7"}}
                    >
                      <Card.Header>รายการรักษาวันที่ {prod.datet.substring(0, 10)} </Card.Header>
                      <Card.Body>
                        <Card.Text>


                          {/* ใส่ card */}
                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
                              gridRowGap: "5px",
                            }}
                          >
                            <div>
                              วัน/เดือน/ปี รับเข้าโค : { }
                              <div style={{ display: "grid", gridTemplateRows: "1fr 15px" }}>
                                <Searchinput
                                  name="pun"
                                  value={prod.datet.substring(0, 10)}
                                  maxLength="5"
                                  style={{ backgroundColor: "#ececec",  width: "200px", }}
                                  disabled
                                />
                              </div>
                            </div>
                            <div>
                              ชื่อโรค : { }
                              <div style={{ display: "grid", gridTemplateRows: "1fr 15px" }}>
                                <Searchinput
                                  name="dise"
                                  value={prod.dise}
                                  maxLength="5"
                                  style={{ backgroundColor: "#ececec", }}
                                  disabled
                                />
                              </div>
                            </div>
                            <div style={{ gridColumnStart: 3, gridColumnEnd: 6 }}>
                              อาการ : { }
                              <Searchinputarea
                                name="symptom"
                                style={{ width: "493px", backgroundColor: "#ececec", height: "35px" }}
                                value={prod.symptom}
                                disabled
                              />
                            </div>

                            {prod.list_dis.map((list_dis) => ( 
                              <div style={{display: "flex",gridColumn : "1 / 6"}}>
                              <div>
                              ยา/วัคซีนที่ใช้ :{ }
                              <div style={{ gridColumnStart: 3 }}>
                                <Searchinput
                                  name="medi"
                                  value={list_dis.medi}
                                  style={{  width: "200px",backgroundColor: "#ececec", }}
                                  maxLength="5"
                                  disabled
                                />
                              </div> 
                             </div> 
                             <div>
                              ระยะหยุดยา(วัน) : { }
                              <Searchinput
                                name="nofity"
                                value={list_dis.notify}
                                disabled
                                type="number"
                                style={{ backgroundColor: "#ececec", width: "156px" }}
                              />
                             </div>
                             <div>
                              จำนวน (CC) : { }
                              <Searchinput
                                value={list_dis.quantity}
                                name="quantity"
                                type="number"
                                disabled
                                style={{ backgroundColor: "#ececec", width: "176px" }}
                              />
                             </div>
                             
                             <div>
                              หมายเหตุ : { }
                              <Searchinput
                                name="note"
                                value={list_dis.note}
                              disabled
                                style={{ width: "306px",backgroundColor: "#ececec", }}
                              />
                             </div>

                             </div>
                           ))}         

                            
                          </div>
                        </Card.Text>
                      </Card.Body>

                    </Card>

                  ))
                ) : (
                  <tr style={{ textAlign: "center" }}>
                    <td colSpan="7">ไม่พบข้อมูล</td>
                  </tr>
                )}
              <> </>
            </div>   
            <div style={{width:"260px",margin:"auto"}} >
            {loading ? (
            <Spinner animation="border" variant="primary" />
          ) : (
             <Savebuttoncolor style={{width:"120px"}} onClick={handleSubmit} 
            >
               รักษาสำเร็จ
             </Savebuttoncolor>
          )}&ensp;
             <Removebuttoncolor 
             
             style={{width:"120px"}}
             onClick={handleShow} 
            //  onClick={handleSubmitDead}
             >
               ตาย
            </Removebuttoncolor>
        </div>
          </DivFromDown>
        </DivFrom>
        <>
          <p></p>
    
           
        </>
        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>ยืนยันการรักษา</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
              <span style={{color:"red"}}>*</span> สาเหตุการตาย : { }
                <div style={{ display: "grid", gridTemplateRows: "1fr 15px" }}>
                  <Searchinput
                    name="notedead"
          
                    onChange={handleChange}
                    maxLength="100"
                    style={{
                      width: "465px",
                    }}
                  />
                
                </div>
              </div>
             
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            ปิด
          </Button>
          <Button variant="primary" onClick={handleSubmitDead}>
            ยืนยัน

          </Button>
        </Modal.Footer>
      </Modal>

        {/* <Footer/> */}
      </DivBase>
    </>
  );
};

export default DetailId;