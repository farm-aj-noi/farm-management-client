import React, { useState } from "react"
import styled from "styled-components";
import { useRouter } from "next/router"
import logo from '../defultcow.jpg'
import {
  Savebuttoncolor,
  Editbuttoncolor,
  Removebuttoncolor,
} from "../../../../utils/buttonColor";
import { Savebutton, Editbutton, Removebutton } from "../../../../utils/button";

import { Icon } from "react-icons-kit";
import { Table } from "react-bootstrap";

import { list } from "react-icons-kit/fa/list";
import { DivBase } from "../../../../utils/divBase";
import {
  DivFrom,
  DivFromTop,
  DivFromDown,
  Searchinput,
  Searchbutton,
  Divimg,
  DivFrom1,
} from "../GetinFrom";
import { Spinner } from "react-bootstrap";
// import Footer from "../../Footer/index";
import dayjs from "dayjs";
import DatePicker, { registerLocale } from "react-datepicker";
import th from "date-fns/locale/th";
registerLocale("th", th);

import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";


const UPDATE_GRADE = gql`
  mutation UPDATE_GRADE($id: String!
    , $numcow: String
    , $namecow: String
    , $pun: String
    , $weightstart: Float
    , $numfarmer: String
    , $numkun: String
    ) {
    updateCow(id: $id, numkun: $numkun
      ,numcow: $numcow
      ,namecow: $namecow
      ,pun: $pun
      ,weightstart: $weightstart
      ,numfarmer: $numfarmer) {
      numcow
      namecow
      pun
      weightstart
      numfarmer
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
const ProductId = () => {
  const [edit, setEdit] = useState(false);

  const [cowdetailData, setCowdetailData] = useState({
    numkun: '',
    numcow: ''
    , namecow: ''
    , pun: ''
    , weightstart: ''
    , numfarmer: ''
  });
  // const [loading, setLoading] = useState(false);

  const [onEdite, setOnEdit] = useState(false);

  const route = useRouter();
  // console.log(route);
  const handleChange = (e) => setCowdetailData({ ...cowdetailData, [e.target.name]: e.target.value });


  const [updateCow] = useMutation(UPDATE_GRADE, {
    onCompleted: (data) => {

      setCowdetailData(data.updateCow);
      // setEdit(false);
    },
    // refetchQueries: [
    //   {
    //     query: QUERY_PRODUCT,
    //     // variables: {
    //     //   barcode: "",
    //     //   createdAt: "",
    //     //   status: "",
    //     // },
    //   },
    // ],
    awaitRefetchQueries: true,
  });
  // const [cowdetailData, setCowdetailData] = useState();
  const { data, loading, error, } = useQuery(QUERY_PRODUCT, {
    variables: {
      id: route.query.productId

    }, onCompleted(res) {
      setCowdetailData(res.Cowdetail)
    }
  });

  console.log(cowdetailData)

  const handleSubmitUpdate = async () => {
    console.log(route.query.productId)
    await updateCow({

      variables: {
       // ...cowdetailData,
        id: route.query.productId,
        numkun: cowdetailData.numkun,
        numcow: cowdetailData.numcow,
        namecow: cowdetailData.namecow,
        pun: cowdetailData.pun,
       weightstart:+cowdetailData.weightstart,
        numfarmer: cowdetailData.numfarmer
      },
    });
    window.location.reload(false);

    setEdit(false);
  };
  if (error) return <p>Something went wrong, please try again.</p>

  if (loading) return <p>Loading ...</p>

  return (
    <>
      <DivBase style={{margin:"auto",
                display: "grid",
                gridTemplateColumns: " 0.4fr 1fr " ,
                gridRowGap: "5px",
                width:" max-content",
                left: "50%",
                transform: "translateX(-50%)"
              }}>
        <></>
        <DivFrom style={{ width: "270px" ,height:"min-content",margin:"20px",marginTop:"0" , marginRight:"2px"}}>
          
          <DivFromTop>
          <div style={{ margin: "-3px 5px 0px 0px" , fontSize:"20px" }}>

{/* <Icon size={25} icon={list} /> */}
</div>
<div style={{ margin: "-1px 5px 0px 0px" , fontSize:"20px" }}>
  รูปถ่ายโค

</div>
          </DivFromTop>
          <DivFromDown
            style={{
              display: "grid",
              gridTemplateColumns: "0.3fr",
      
              // gridRowGap: "5px",
              // paddingBottom: "20px",
            }}
          >
            <div
              className="mb-3"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr ",
              }}
            >
              <div >
                <div >
                  <div >
                    <div >
                        <a >
                        <Divimg style={{width:"240px"}}>
                          <img style={{

                            margin: "auto", objectFit: "cover", width: "100%", height: "100%", display: "relarive", padding: "4px", borderRadius: "30px"
                          }} alt="Image" src={cowdetailData.imagecow || logo} />
                        </Divimg >
                        </a>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </DivFromDown>
        </DivFrom>
        <DivFrom style={{ width: "750px" ,float:"Rigth"}}>
          
          <DivFromTop>
          <div style={{ margin: "-3px 5px 0px 0px" , fontSize:"20px" }}>

{/* <Icon size={25} icon={list} /> */}
</div>
<div style={{ margin: "-1px 5px 0px 0px" , fontSize:"20px" }}>
  เพิ่มโคเข้าระบบสหกรณ์เพื่อรออนุมัติ

</div>
          </DivFromTop>
          <DivFromDown
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              margin: "-3px 5px 0px 0px",
            
            }}
          >
       
            <div
              className="mb-3"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gridRowGap: "5px",
              }}
            >
              
    
          <DivFromDown
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gridRowGap: "5px",
              paddingBottom: "20px",
            }}
          >
            {/* ใส่ card */}

            <div
              className="mb-3"
              style={{
                display: "grid",
                gridTemplateColumns: "1.2fr 1.2fr 1fr",
                gridRowGap: "5px",
                margin: "auto"

              }}
            >
              <div>
                เลขใบแจ้งขุน : { }
                <div style={{ display: "grid", gridTemplateRows: "1fr 15px" }}>
                  <Searchinput
                    name="numkun"
                    value={cowdetailData.numkun}
                    maxLength="8"
                    disabled={!onEdite}
                    style={{ backgroundColor: `${!onEdite ? "#ececec" : 'white'}` }}
 
  onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                เลขโค : { }
                <div style={{ display: "grid", gridTemplateRows: "1fr 15px" }}>
                  <Searchinput
                    name="numcow"
                    value={cowdetailData.numcow}
                    maxLength="5"
                    disabled={!onEdite}
                    style={{ backgroundColor: `${!onEdite ? "#ececec" : 'white'}` }}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                ชื่อโค : { }
                <div style={{ display: "grid", gridTemplateRows: "1fr 15px" }}>
                  <Searchinput
                    name="namecow"
                    value={cowdetailData.namecow}
                    maxLength="100"
                    disabled={!onEdite}
                    style={{ backgroundColor: `${!onEdite ? "#ececec" : 'white'}` }}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                สายพันธุ์ : { }
                <div style={{ display: "grid", gridTemplateRows: "1fr 15px" }}>
                  <Searchinput
                    name="pun"
                    value={cowdetailData.pun}
                    maxLength="5"
                    disabled={!onEdite}
                    style={{ backgroundColor: `${!onEdite ? "#ececec" : 'white'}` }}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                จำนวนฟันหน้าคู่แท้ : { }
                <div style={{ display: "grid", gridTemplateRows: "1fr 15px" }}>
                  <Searchinput
                    name="teeth"
                    value={cowdetailData.teeth}
                    maxLength="2"
                    disabled
                    style={{ backgroundColor: "#ececec" }}
                  />
                </div>
              </div>
              <div>
                RFID : { }
                <div style={{ display: "grid", gridTemplateRows: "1fr 15px" }}>
                  <Searchinput
                    name="rfid"
                    value={cowdetailData.rfid}
                    maxLength="20"
                    disabled
                    style={{ backgroundColor: "#ececec" }}
                    // disabled={!onEdite}
                    // style={{ backgroundColor: `${!onEdite ? "#ececec" : 'white'}` }}
                    // onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                วัน/เดือน/ปี รับเข้าโค : { }
                <div style={{ display: "grid", gridTemplateRows: "1fr 15px" }}>
                  <Searchinput
                    name="pun"
                    value={dayjs(cowdetailData.date).format("DD-MM-YYYY")}
                    maxLength="5"
                    disabled
                    style={{ backgroundColor: "#ececec" }}

                  />
                </div>
              </div>
              <div>
                น้ำหนักปัจจุบัน : { }
                <div style={{ display: "grid", gridTemplateRows: "1fr 15px" }}>
                  <Searchinput
                    name="weightstart"
                    value={cowdetailData.weightstart}
                    maxLength="20"
                    disabled={!onEdite}
                    style={{ backgroundColor: `${!onEdite ? "#ececec" : 'white'}` }}
                    onChange={handleChange}

                  />
                </div>
              </div>
              <div>
                เพศโค : { }
                <div style={{ display: "grid", gridTemplateRows: "1fr 15px" }}>
                  <Searchinput
                    name="weightbirht"
                    value={cowdetailData.sex}
                    maxLength="20"
                    disabled
                    style={{ backgroundColor: "#ececec" }}
                    // disabled={!onEdite}
                    // style={{ backgroundColor: `${!onEdite ? "#ececec" : 'white'}` }}
                    // onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                วัน/เดือน/ปี เกิดโค : { }
                <div style={{ display: "grid", gridTemplateRows: "1fr 15px" }}>
                  <Searchinput
                    name="pun"
                    value={dayjs(cowdetailData.date).format("DD-MM-YYYY") }
                    maxLength="5"
                    disabled
                    style={{ backgroundColor: "#ececec" }}

                  />
                </div>
              </div>
              <div>
                น้ำหนักแรกเกิด : { }
                <div style={{ display: "grid", gridTemplateRows: "1fr 15px" }}>
                  <Searchinput
                    name="weightbirht"
                    value={cowdetailData.weightbirht}
                    maxLength="20"
                    style={{ backgroundColor: "#ececec" }}

                  />
                </div>
              </div>
              <div>
                Body Score : { }
                <div style={{ display: "grid", gridTemplateRows: "1fr 15px" }}>
                  <Searchinput
                    name="weightbirht"
                    value={cowdetailData.bodyscore}
                    maxLength="20"
                    style={{ backgroundColor: "#ececec" }}

                  />
                </div>
              </div>
            </div>
            <div
              className="mb-3"
              style={{
                display: "grid",
                gridTemplateColumns: "1.2fr 1.2fr 1fr",
                gridRowGap: "5px",
                paddingBottom: "10px",
                borderBottom: "1px gray solid",
                margin: "auto"
              }}
            >
              <div>
                รหัสสมาชิกเจ้าของโค : { }
                <div style={{ display: "grid", gridTemplateRows: "1fr 15px" }}>
                  <Searchinput
                    name="numfarmer"
                    value={cowdetailData.numfarmer}
                    maxLength="6"
                    disabled={!onEdite}
                    style={{ backgroundColor: `${!onEdite ? "#ececec" : 'white'}` }}
                    onChange={handleChange}

                  />
                </div>
              </div>
              <div>
                หมายเลขบัตรประชาชน : { }
                <div style={{ display: "grid", gridTemplateRows: "1fr 15px" }}>
                  <Searchinput
                    name="passport"
                    value={cowdetailData.passport}
                    maxLength="13"
                    disabled
                    style={{ backgroundColor: "#ececec" }}
                  />
                </div>
              </div>
              <div>
                ชื่อเจ้าของโค : { }
                <div style={{ display: "grid", gridTemplateRows: "1fr 15px" }}>
                  <Searchinput
                    name="namefarmer"
                    value={cowdetailData.namefarmer}
                    style={{ backgroundColor: "#ececec" }}
                    maxLength="100"
                  />
                </div>
              </div>
              <div>
{/*                 
                <Editbuttoncolor style={{
                  margin: "5px 0px 0px auto",

                }}
                  onClick={() => setOnEdit(!onEdite)}
                >
                  <Editbutton />
                </Editbuttoncolor> */}


                {loading ? (
          <Spinner animation="border" variant="primary" />
        ) :  !onEdite ? (
          <Editbuttoncolor style={{
            margin: "5px 0px 0px auto",

          }}
            onClick={() => setOnEdit(!onEdite)}
          >
            <Editbutton />แก้ไขข้อมูล
          </Editbuttoncolor>
        ) :  !onEdite ? (
          <Editbuttoncolor onClick={() => setOnEdit(onEdite)}>
            <Editbutton />
          </Editbuttoncolor>
        ) :  onEdite ? (
          <Savebuttoncolor
          onClick={handleSubmitUpdate}
          style={{
            backgroundColor: `${
              !cowdetailData ? "gray" : ""
            }`,
          }} disabled={!cowdetailData}>
            <Savebutton /> บันทึก
          </Savebuttoncolor>
        ) : (
          <div>
            {/* <Savebuttoncolor onClick={handleSubmitUpdate}>
              <Savebutton />
            </Savebuttoncolor> */}
          </div>
        )}
              </div>

            </div>
          </DivFromDown>
   
           </div>
              
          </DivFromDown>
          
        </DivFrom>
        {/* <Footer/> */}
  
        
        {/* <Footer/> */}
        <>
          <p></p>
        </>
       
      </DivBase>
      <div style={{ transform:"translate(0px,700px)"}}>
      <DivFrom style={{margin:'auto' ,width:'1050px'}}>
          <DivFromTop>
            <div style={{ margin: "0px 0px 0px 0px" }}>
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
                    <th>วันที่รักษา</th>
                    <th>ชื่อโรค</th>
                    <th>อาการของโรค</th>
                    <th>ยาหรือวัคซีนที่ใช้</th>
                    <th>จำนวน (CC)</th>
                    <th>ระยะหยุดยา</th>
                    {/* <th>วันที่หยุดยา</th> */}
                    <th>หมายเหตุ</th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.Cowdetail &&
                    data.Cowdetail.treats.length > 0 ? (
                      data.Cowdetail.treats.map((prod) => (
                        <tr key={prod.id} style={{ textAlign: "center" }}>
                          <td>
                            {dayjs(prod.datet)
                              .add(543, "y")
                              .locale("th")
                              .format("DD MMMM YYYY")}
                          </td>
                          <td>{prod.dise}</td>
                          <td>{prod.symptom}</td>
                          <td>{prod.medi}</td>
                          <td>{prod.quantity}</td>
                          <td>{prod.nofity}</td>
                          {/* <td>
                          {dayjs(prod.date)
                            .add(543, "y")
                            .add(prod.nofity, "d")
                            .locale("th")
                            .format("DD MMMM YYYY")}
                        </td> */}
                          <td>{prod.note ? prod.note : "-"}</td>
                        </tr>
                      ))
                    ) : (
                      <tr style={{ textAlign: "center" }}>
                        <td colSpan="7">ไม่พบข้อมูล</td>
                      </tr>
                    )}
                </tbody>
                {/* <tbody>
                  <tr>
                    <td>{data.Cowdetail.treats.dise}</td>
                    <td>{console.log(data.Cowdetail.treats[0].dise)}</td>
                    <td>{}</td>
                    <td>{}</td>
                    <td>{}</td>
                    <td>{}</td>
                    <td>{}</td>
                  </tr>
                </tbody> */}
              </Table>
            </div>
          </DivFromDown>
        </DivFrom>
      </div>
    </>
  );
};

export default ProductId;
