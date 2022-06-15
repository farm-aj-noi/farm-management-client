import React, { useContext, useState, useRef, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Icon } from "react-icons-kit";
import { paste } from "react-icons-kit/icomoon/paste";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useRouter } from "next/router";
import {print} from 'react-icons-kit/fa/print'
import { iosSearchStrong } from "react-icons-kit/ionicons/iosSearchStrong";
import { DivCenter, TableForm, TableHead } from "../Styleclass/Table";
import {u1F356} from 'react-icons-kit/noto_emoji_regular/u1F356'
import { Icon3, Icon2, Icon4, Icon5, Icon7 } from "../../../utils/Logograde";
import Link from "next/link";
import { DivBase } from "../../../utils/divBase";
import {
  ButtonQrcodeColor,
  ButtonHeaderColor,
  ButtonSearchColor,
  ButtonRecordColor,
  ButtonSubmit,
  ButtonImagecolor,
  ButtonBack,
} from "../Styleclass/Button";
import { Savebutton, Editbutton, Removebutton } from "../../../utils/button";
import {
  Savebuttoncolor,
  Editbuttoncolor,
  Removebuttoncolor,
} from "../../../utils/buttonColor";
import {
  DivFrom,
  DivFromTop,
  DivFromDown,
  Btns,
  IMG,
  Divimg,
  Uploads,
  Searchinput,
  Searchbutton,
  Gobutton,
} from "./GetinFrom";
import { Spinner } from "react-bootstrap";
// import Footer from "../../Footer/index";
import dayjs from "dayjs";
import DatePicker, { registerLocale } from "react-datepicker";
import th from "date-fns/locale/th";
registerLocale("th", th);

const thstyle = {
  border: "1px solid #dddddd",
  textAlign: "center",
  padding: "10px",
  fontSize: "18px",
};

const tdstyle = {
  border: "1px solid #dddddd",
  textAlign: "center",
  padding: "5px",
  fontSize: "14px",
};

const QUERY_INFO = gql`
  query QUERY_INFO($id: ID!) {
    Cowgrade(id: $id) {
      id
      weightwarm
      weightcool
      barcode
      imslaughter {
        pun
      }
      beeftype {
        code
      }
      chill {
        chillroom {
          roomnum
        }
        chilldateStart
        chilldateEnd
      }
    }
  }
`;

/* const CREATE = gql`
  mutation CREATE($imagecow: String) {
    createCow(imagecow: $imagecow) {
      imagecow
    }
  }
`;
 */

const Summarize = () => {

  const [errorAlert, setErrorAlert] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [edit, setEdit] = useState(false);
  const [sumData, setSumdata] = useState("");
  const [onEdite, setOnEdit] = useState(false);
  const [success, setSuccess] = useState(false);
  const route = useRouter();
  const handleChange = (e) =>
    setSumdata({ ...sumData, [e.target.name]: e.target.value });
  const { data, loading, error } = useQuery(QUERY_INFO, {
    variables: {
      id: route.query.sumId,
    },
    onCompleted(res) {
      setSumdata(res.Cowgrade);
    },
  });

  console.log(sumData);

    return (
      <>
      <div>
        <DivCenter
          style={{
            fontSize: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "30px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "5px",
            }}
          >
            <Icon2 height="70px" weight="70px" />
          </div>
          สรุปเกรดเนื้อโค
        </DivCenter>
        <DivCenter style={{ marginTop: "20px" }}>
          <div
            style={{
              width: "1200px",
              height: "650px",
              backgroundColor: "white",
              borderRadius: "5px",
              borderTop: "none",
              borderRadius: "5px",
              boxShadow:
                " 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 0px 10px 0 rgba(0, 0, 0, 0.1)",
            }}
          >
            <h1
              style={{
                height: "47px",
                color: "white",
                fontSize: "24px",
                backgroundColor: "#3BAFDA",
                borderRadius: "5px 5px 0px 0px",
                padding: "7px 5px 5px 15px",
                margin: "0px",
                display: "flex",
                alignItems: "center",
                fontWeight: "-moz-initial",
              }}
            >
              <Icon
                style={{ verticalAlign: "text-bottom", marginRight: "10px" }}
                icon={u1F356}
                size={30}
              />
              สรุปเกรดเนื้อโค
            </h1>

            <DivBase
              style={{
                margin: "auto",
                display: "grid",
                gridTemplateColumns: " 0.4fr 1fr ",
                gridRowGap: "5px",
                width: " max-content",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              <></>

              
          <div>               
            <DivFrom
                style={{
                  width: "270px",
                  height: "min-content",
                  margin: "20px",
                  marginTop: "0",
                  marginRight: "2px",
                }}
              >
                <DivFromTop>
                  <div
                    style={{ margin: "-3px 5px 0px 0px", fontSize: "20px" }}
                  ></div>
                  <div style={{ margin: "-1px 5px 0px 0px", fontSize: "20px" }}>
                    เกรดจากระบบ
                  </div>
                </DivFromTop>

                
                <DivFromDown
            style={{
              display: "grid",
              gridTemplateColumns: "0.3fr",
              height: "200px",
      
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

            </div>

            </DivFromDown>
            </DivFrom>

            
            
            <DivFrom
                style={{
                  width: "270px",
                  height: "min-content",
                  margin: "20px",
                  marginTop: "0",
                  marginRight: "2px",
                }}
              >
                <DivFromTop>
                  <div
                    style={{ margin: "-3px 5px 0px 0px", fontSize: "20px" }}
                  ></div>
                  <div style={{ margin: "-1px 5px 0px 0px", fontSize: "20px" }}>
                  เกรดจากผู้เชี่ยวชาญ
                  </div>
                </DivFromTop>

                
                <DivFromDown
            style={{
              display: "grid",
              gridTemplateColumns: "0.3fr",
              height: "200px",
      
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
              
            </div>

            </DivFromDown>
            </DivFrom>
            
            </div>  
           
              
              {/* <Footer/> */}

              {/* <Footer/> */}
              
              
            </DivBase>
            <DivFrom
                style={{
                  width: "270px",
                  height: "min-content",
                  margin: "20px",
                  marginTop: "30px",
                  marginRight: "2px",
                }}
              >
                <DivFromTop>
                  <div
                    style={{ margin: "-3px 5px 0px 0px", fontSize: "20px" }}
                  ></div>
                  <div style={{ margin: "-1px 5px 0px 0px", fontSize: "20px" }}>
                    รูปตัวอย่างเนื้อโค
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
                          }} alt="Image" /* src={cowdetailData.imagecow || logo} */ />
                        </Divimg >
                        </a>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            </DivFromDown>
            </DivFrom>

            <div style={{
                  width: "270px",
                  height: "min-content",
                  margin: "20px",
                  marginTop: "30px",
                  marginRight: "2px",
                  fontSize: "18px",
                }}>
                ลงชื่อผู้เชี่ยวชาญตัดเกรด : { }
                <div style={{ display: "grid", gridTemplateRows: "1fr 15px" }}>
                  
                  <Searchinput
                    name="numkun"
                    maxLength="8"
                    enable={!onEdite}
                    style={{ backgroundColor: `${!onEdite ? "#ececec" : 'white'}` }}
                  />
                </div>
              </div>

          </div>
          
        </DivCenter>
        
      </div>
    </>
  );
      
    }


export default Summarize;
