import React, { useContext, useState, useRef, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Icon } from "react-icons-kit";
import { paste } from "react-icons-kit/icomoon/paste";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import logo from "./defultcow.jpg";
import { useRouter } from "next/router";
import { print } from 'react-icons-kit/fa/print'
import { iosSearchStrong } from "react-icons-kit/ionicons/iosSearchStrong";
import { DivCenter, TableForm, TableHead } from "../Styleclass/Table";
import { u1F356 } from 'react-icons-kit/noto_emoji_regular/u1F356'
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
  Submitbutton,
  Backbutton
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
  const [image, setImage] = useState({ preview: "", raw: "" });
  const [prod, setProd] = useState({
    imagecow: "",
  });
  console.log(sumData);

  return (
    <>
      <div>
        {/* header */}
        <DivCenter
          style={{
            fontSize: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "30px",
          }}
        >
          <Icon2 height="70px" weight="70px" />
          สรุปเกรดเนื้อโค
        </DivCenter>


        {/* header */}

        {/* detail */}
        <DivBase>
          <DivFrom style={{ width: "1200px" }}>
            <DivFromTop style={{
              height: "47px",
              color: "white",
              fontSize: "24px",
              fontWeight: "-moz-initial",
            }}>
              <Icon
                style={{ verticalAlign: "text-bottom", marginRight: "10px" }}
                icon={u1F356}
                size={30}
              />
              สรุปเกรดเนื้อโค
            </DivFromTop>
            <DivFromDown>
              <div style={{
                display: "grid",
                gridTemplateColumns: "500px 1fr",
                gridGap: "15px",
              }}>
                <div style={{ boxShadow: "0px 0px 2px grey", borderRadius: "9px" }}>
                  <DivFromTop style={{ fontSize: "20px" }}>
                    รูปตัวอย่างเนื้อโค
                  </DivFromTop>
                  <DivFromDown style={{
                    display: "flex",
                    justifyContent: "center",
                  }}>
                    <div style={{
                      width: "450px",
                      height: "450px",
                      backgroundColor: "red",
                    }}>
                      {/* image beef */}
                    </div>
                  </DivFromDown>
                </div>
                <div style={{
                  boxShadow: "0px 0px 2px grey",
                  borderRadius: "9px",
                }}>
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "260px 1fr",
                    gridGap: "30px",
                    padding: "10px",
                  }}>
                    <div style={{ fontSize: "18px" }}>
                      <h1 style={{ fontSize: "28px", margin: "0" }}>
                        พนักงานตัดเกรด
                      </h1>
                      <div>
                        ชื่อ-นามสกุล { }
                        <input
                          style={{
                            margin: "5px",
                            marginLeft: "0px",
                            border: "1px solid #AFAFAF",
                            borderRadius: "4px",
                            textAlign: "center",
                            width: "250px",
                            padding: "3px"
                          }}
                          value="นายปิยณัฐ พัฒน์ทวีกิจ"
                          disabled />
                      </div>
                      <div style={{ marginTop: "10px", fontSize: "18px" }}>
                        <h1 style={{ fontSize: "28px", margin: "0" }}>
                          ชื่อผู้เชี่ยวชาญ
                        </h1>
                        <div>
                          1.ชื่อ-นามสกุล { }
                          <input
                            style={{
                              margin: "5px",
                              marginLeft: "0px",
                              border: "1px solid #AFAFAF",
                              borderRadius: "4px",
                              width: "250px",
                              padding: "3px"
                            }}
                          />
                        </div>
                        <div>
                          2.ชื่อ-นามสกุล { }
                          <input
                            style={{
                              margin: "5px",
                              marginLeft: "0px",
                              border: "1px solid #AFAFAF",
                              borderRadius: "4px",
                              width: "250px",
                              padding: "5px"
                            }}
                          />
                        </div>
                        <div>
                          3.ชื่อ-นามสกุล { }
                          <input
                            style={{
                              margin: "5px",
                              marginLeft: "0px",
                              border: "1px solid #AFAFAF",
                              borderRadius: "4px",
                              width: "250px",
                              padding: "5px"
                            }}
                          />
                        </div>
                        <div>
                          4.ชื่อ-นามสกุล { }
                          <input
                            style={{
                              margin: "5px",
                              marginLeft: "0px",
                              border: "1px solid #AFAFAF",
                              borderRadius: "4px",
                              width: "250px",
                              padding: "5px"
                            }}
                          />
                        </div>
                        <div>
                          5.ชื่อ-นามสกุล { }
                          <input
                            style={{
                              margin: "5px",
                              marginLeft: "0px",
                              border: "1px solid #AFAFAF",
                              borderRadius: "4px",
                              width: "250px",
                              padding: "5px"
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <div style={{ boxShadow: "0px 0px 2px grey", borderRadius: "9px", height: "fit-content" }}>
                        <DivFromTop style={{ fontSize: "20px" }}>เกรดจากระบบ</DivFromTop>
                        <DivFromDown style={{ textAlign: "center", fontSize: "70px", padding: "0", fontWeight: "bold", color: "green" }}>
                          3.5
                        </DivFromDown>
                      </div>
                      <div style={{ boxShadow: "0px 0px 2px grey", borderRadius: "9px", height: "fit-content", marginTop: "30px" }}>
                        <DivFromTop style={{ fontSize: "20px" }}>เกรดจากผู้เชี่ยวชาญ</DivFromTop>
                        <DivFromDown style={{ textAlign: "center", fontSize: "70px", padding: "0", fontWeight: "bold" }}>
                          -
                        </DivFromDown>
                      </div>
                      <div style={{ fontSize: "18px", marginTop: "30px" }}>
                        <h1 style={{ fontSize: "20px", margin: "0" }}>
                          กรอกเกรดที่ต้องการ : { }
                        </h1>
                        <input
                          style={{
                            margin: "5px",
                            marginLeft: "0px",
                            border: "1px solid #AFAFAF",
                            borderRadius: "4px",
                            textAlign: "center",

                            padding: "3px"
                          }}
                        />
                        <Submitbutton style={{ margin: "10px 10px", width: "70px" }}>บันทึก</Submitbutton>
                        <Backbutton style={{ width: "70px" }}>ย้อนกลับ</Backbutton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </DivFromDown>
          </DivFrom>
        </DivBase>
        {/* detail */}
      </div >
    </>
  );

}


export default Summarize;
