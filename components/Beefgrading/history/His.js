import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import React, { useContext, useState, useRef, useEffect } from "react";
import Router from "next/router";
import { Icon4 } from "../../../utils/Logograde";
import { DivBase } from "../../../utils/divBase";
import Link from "next/link";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { DivCenter } from "../Styleclass/Table";
import { ButtonBack } from "../Styleclass/Button";
import {
  DivFrom,
  DivFromTop,
  DivFromDown,
  Uploads,
  Searchinput,
  Gobutton,
  DivFromHis,
} from "./GetinFrom";
import { Editbuttoncolor, Savebuttoncolor } from "../../../utils/buttonColor";
import { Spinner } from "react-bootstrap";
import dayjs from "dayjs";
import { registerLocale } from "react-datepicker";
import th from "date-fns/locale/th";
registerLocale("th", th);

const UPDATEGRADE = gql`
  mutation UPDATEGRADE($id: ID, $expertGrade: String) {
    updateGrading(id: $id, ExpertGrade: $expertGrade) {
      id
    }
  }
`;

const QUERYHISINFO = gql`
  query QUERYHISINFO($id: ID!) {
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
      grade {
        id
        pic
        SystemGrade
        ExpertGrade
        ExpertName1
        ExpertName2
        ExpertName3
        ExpertName4
        ExpertName5
        userName
      }
    }
  }
`;
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

export default function Home() {
  const route = useRouter();
  const { data, loading, error } = useQuery(QUERYHISINFO, {
    variables: {
      id: route.query.hisId,
    },
  });
  const [editgrade, seteditgrade] = useState({
    grade: ""
  });
  console.log(editgrade);
  const [updateGrading] = useMutation(UPDATEGRADE, {
    onCompleted: (data) => {
      if (data) {
        setedit(false);
      }
    },
    refetchQueries: [
      {
        query: QUERYHISINFO,
        variables: { id: route.query.hisId }
      }
    ]
    /* refetchQueries: [
      {
        query: QUERYHISINFO,
        variables: { id: route.query.sumId },
      },
    ], */
  });
  const handleChange = (e) => {
    seteditgrade({
      ...editgrade,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const idgrade = data && data.Cowgrade[0].grade[0].id;
    // console.log(idgrade);
    try {
      await updateGrading({
        variables: {
          id: idgrade,
          expertGrade: editgrade.grade,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const [edit, setedit] = useState(false);

  return (
    <DivBase>
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
          <Icon4 height="70px" weight="70px" />
        </div>
        ประวัติการตัดเกรด
      </DivCenter>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "500px 1fr",
          padding: "30px 350px 0px 350px",
          gridColumnGap: "50px",
        }}
      >
        <DivFromHis style={{ marginTop: "0px" }}>
          <DivFromTop style={{ fontSize: "20px" }}>
            รูปตัวอย่างเนื้อโค
          </DivFromTop>
          <DivFromDown style={{ width: "fit-content" }}>
            {data &&
              data.Cowgrade.map((prod) => (
                <img
                  style={{
                    margin: "auto",
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                    display: "relarive",
                    padding: "4px",
                    borderRadius: "30px",
                    height: "480px",
                    width: "480px",
                  }}
                  alt="Image"
                  src={prod.grade[0].pic}
                />
              ))}
          </DivFromDown>
        </DivFromHis>
        <div>
          <DivFromHis style={{ marginLeft: "-30px" }}>
            <DivFromTop>
              <div
                style={{ margin: "-3px 5px 0px 0px", fontSize: "20px" }}
              ></div>
              <div style={{ margin: "-1px 5px 0px 0px", fontSize: "20px" }}>
                รายละเอียดรายการตัดเกรด
              </div>
            </DivFromTop>
            <DivFromDown>
              <div
                style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr " }}
              >
                {data &&
                  data.Cowgrade.map((prod) => (
                    <>
                      <div>
                        รหัสซากโค : { }
                        <div
                          style={{
                            display: "grid",
                            gridTemplateRows: "1fr 15px",
                          }}
                        >
                          <Searchinput
                            name="code"
                            value={prod.beeftype.code}
                            maxLength="8"
                            disabled
                          />
                        </div>
                      </div>
                      <div>
                        บาร์โค้ด : { }
                        <div
                          style={{
                            display: "grid",
                            gridTemplateRows: "1fr 15px",
                          }}
                        >
                          <Searchinput
                            name="barcode"
                            value={prod.barcode}
                            maxLength="5"
                            disabled
                          />
                        </div>
                      </div>
                      <div>
                        น้ำหนักซากอุ่น : { }
                        <div
                          style={{
                            display: "grid",
                            gridTemplateRows: "1fr 15px",
                          }}
                        >
                          <Searchinput
                            name="weightwarm"
                            value={prod.weightwarm}
                            maxLength="100"
                            disabled
                          />
                        </div>
                      </div>
                      <div>
                        น้ำหนักซากเย็น : { }
                        <div
                          style={{
                            display: "grid",
                            gridTemplateRows: "1fr 15px",
                          }}
                        >
                          <Searchinput
                            name="weighcool"
                            value={prod.weightcool ? prod.weightcool : "-"}
                            maxLength="5"
                            disabled
                          />
                        </div>
                      </div>
                      <div>
                        วันที่เข้าบ่ม : { }
                        <div
                          style={{
                            display: "grid",
                            gridTemplateRows: "1fr 15px",
                          }}
                        >
                          <Searchinput
                            name="chillstart"
                            value={dayjs(prod.chill.chilldateStart).format(
                              "DD-MM-YYYY"
                            )}
                            maxLength="2"
                            disabled
                          />
                        </div>
                      </div>
                      <div>
                        วันที่ตัดเกรด : { }
                        <div
                          style={{
                            display: "grid",
                            gridTemplateRows: "1fr 15px",
                          }}
                        >
                          <Searchinput
                            name="chilldateEnd"
                            value={dayjs(prod.chill.chilldateEnd).format(
                              "DD-MM-YYYY"
                            )}
                            maxLength="20"
                            disabled
                          />
                        </div>
                      </div>

                      <div>
                        ห้องบ่ม : { }
                        <div
                          style={{
                            display: "grid",
                            gridTemplateRows: "1fr 15px",
                          }}
                        >
                          <Searchinput
                            name=""
                            value={prod.chill[0].chillroom.roomnum}
                            maxLength="5"
                            disabled
                          />
                        </div>
                      </div>
                      <div>
                        สายพันธุ์ : { }
                        <div
                          style={{
                            display: "grid",
                            gridTemplateRows: "1fr 15px",
                          }}
                        >
                          <Searchinput
                            name="pun"
                            value={prod.imslaughter.pun}
                            maxLength="20"
                            disabled
                          />
                        </div>
                      </div>
                    </>
                  ))}
              </div>
            </DivFromDown>
          </DivFromHis>
          <DivFromHis style={{ marginTop: "5px", marginLeft: "-30px" }}>
            <DivFromTop>
              <div
                style={{ margin: "-3px 5px 0px 0px", fontSize: "20px" }}
              ></div>
              <div style={{ margin: "-1px 5px 0px 0px", fontSize: "20px" }}>
                รายละเอียดรายการตัดเกรด
              </div>
            </DivFromTop>
            <DivFromDown>
              <div
                style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr " }}
              >
                {data &&
                  data.Cowgrade.map((prod) => (
                    <>
                      <div>
                        ชื่อพนักงานคัดเกรด : { }
                        <div
                          style={{
                            display: "grid",
                            gridTemplateRows: "1fr 15px",
                          }}
                        >
                          <Searchinput
                            name=""
                            value={prod.grade[0].userName}
                            maxLength="5"
                            disabled
                          />
                        </div>
                      </div>
                      <div>
                        ชื่อผู้เชี่ยวชาญคนที่ 1 : { }
                        <div
                          style={{
                            display: "grid",
                            gridTemplateRows: "1fr 15px",
                          }}
                        >
                          <Searchinput
                            name=""
                            value={prod.grade[0].ExpertName1}
                            maxLength="5"
                            disabled
                          />
                        </div>
                      </div>
                      <div>
                        ชื่อผู้เชี่ยวชาญคนที่ 2 : { }
                        <div
                          style={{
                            display: "grid",
                            gridTemplateRows: "1fr 15px",
                          }}
                        >
                          <Searchinput
                            name=""
                            value={prod.grade[0].ExpertName2}
                            maxLength="5"
                            disabled
                          />
                        </div>
                      </div>
                      <div>
                        ชื่อผู้เชี่ยวชาญคนที่ 3 : { }
                        <div
                          style={{
                            display: "grid",
                            gridTemplateRows: "1fr 15px",
                          }}
                        >
                          <Searchinput
                            name=""
                            value={prod.grade[0].ExpertName3}
                            maxLength="5"
                            disabled
                          />
                        </div>
                      </div>
                      <div>
                        ชื่อผู้เชี่ยวชาญคนที่ 4 : { }
                        <div
                          style={{
                            display: "grid",
                            gridTemplateRows: "1fr 15px",
                          }}
                        >
                          <Searchinput
                            name=""
                            value={prod.grade[0].ExpertName4}
                            maxLength="5"
                            disabled
                          />
                        </div>
                      </div>
                      <div>
                        ชื่อผู้เชี่ยวชาญคนที่ 5 : { }
                        <div
                          style={{
                            display: "grid",
                            gridTemplateRows: "1fr 15px",
                          }}
                        >
                          <Searchinput
                            name=""
                            value={prod.grade[0].ExpertName5}
                            maxLength="5"
                            disabled
                          />
                        </div>
                      </div>
                    </>
                  ))}
              </div>
            </DivFromDown>
          </DivFromHis>
          <DivFromHis
            style={{
              marginTop: "5px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              boxShadow: "none",
              gridColumnGap: "20px",
              marginLeft: "-30px",
            }}
          >
            <div style={{ boxShadow: "0px 0px 2px grey", borderRadius: "9px" }}>
              <DivFromTop>
                <div
                  style={{ margin: "-3px 5px 0px 0px", fontSize: "20px" }}
                ></div>
                <div style={{ margin: "-1px 5px 0px 0px", fontSize: "20px" }}>
                  เกรดจากระบบ
                </div>
              </DivFromTop>
              <DivFromDown>
                <div
                  style={{
                    textAlign: "center",
                    fontSize: "70px",
                    padding: "0",
                    fontWeight: "bold",
                    color: "green",
                  }}
                >
                  {data &&
                    data.Cowgrade.map((prod) => (
                      <div className="mb-3">{prod.grade[0].SystemGrade}</div>
                    ))}
                </div>
              </DivFromDown>
            </div>
            <div style={{ boxShadow: "0px 0px 2px grey", borderRadius: "9px" }}>
              <DivFromTop>
                <div
                  style={{ margin: "-3px 5px 0px 0px", fontSize: "20px" }}
                ></div>
                <div style={{ margin: "-1px 5px 0px 0px", fontSize: "20px" }}>
                  เกรดจากผู้เชี่ยวชาญ
                </div>
              </DivFromTop>
              <DivFromDown>
                <div
                  style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
                >
                  {edit ? (
                    <Searchinput
                      name="grade"
                      style={{
                        textAlign: "center",
                        height: "50px",
                        marginTop: "20px",
                        fontSize: "40px"
                      }}
                      value={editgrade.grade}
                      onChange={handleChange}
                    />
                  ) : (
                    <div
                      style={{
                        textAlign: "center",
                        fontSize: "70px",
                        padding: "0",
                        fontWeight: "bold",
                        color: "green",
                      }}
                    >
                      {data &&
                        data.Cowgrade.map((prod) => (
                          <div className="mb-3">{prod.grade[0].ExpertGrade}</div>
                        ))}
                    </div>
                  )}

                  <div style={{ marginTop: "30px", marginLeft: "30px" }}>
                    {edit ? (
                      <Savebuttoncolor
                        style={{
                          height: "40px",
                          width: "135px",
                        }}
                        onClick={handleSubmit}
                      >
                        บันทึก
                      </Savebuttoncolor>
                    ) : (
                      <Editbuttoncolor
                        style={{
                          height: "40px",
                          width: "135px",
                        }}
                        onClick={() => setedit(true)}
                      >
                        เเก้ไขเกรด
                      </Editbuttoncolor>
                    )}
                  </div>
                </div>
                <div></div>
              </DivFromDown>
            </div>
          </DivFromHis>
          <div style={{ marginTop: "5px", marginLeft: "505px" }}>
            <Link href="/beefgrading/history">
              <ButtonBack style={{ height: "40px", width: "150px" }}>
                ย้อนกลับ
              </ButtonBack>
            </Link>
          </div>
        </div>
      </div>
    </DivBase>
  );
}
