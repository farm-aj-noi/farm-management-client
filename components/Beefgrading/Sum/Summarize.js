import React, { useState, useContext } from "react";
import { Icon } from "react-icons-kit";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useRouter } from "next/router";
import { DivCenter } from "../Styleclass/Table";
import { u1F356 } from "react-icons-kit/noto_emoji_regular/u1F356";
import { Icon2 } from "../../../utils/Logograde";
import { DivBase } from "../../../utils/divBase";
import logo from "./defultcow.jpg";
import {
  DivFrom,
  DivFromTop,
  DivFromDown,
  Submitbutton,
  Backbutton,
} from "./GetinFrom";
import DatePicker, { registerLocale } from "react-datepicker";
import th from "date-fns/locale/th";
import { AuthContext } from "../../../appState/AuthProvider";
import { isEqualType } from "graphql";
registerLocale("th", th);
import Link from "next/link";
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

const UPDATEEXPERT = gql`
  mutation UPDATEEXPERT(
    $id: ID
    $expertName1: String
    $expertName2: String
    $expertName3: String
    $expertName4: String
    $expertName5: String
    $expertGrade: String
  ) {
    updateGrading(
      id: $id
      ExpertName1: $expertName1
      ExpertName2: $expertName2
      ExpertName3: $expertName3
      ExpertName4: $expertName4
      ExpertName5: $expertName5
      ExpertGrade: $expertGrade
    ) {
      id
    }
  }
`;

const QUERY_INFO = gql`
  query QUERY_INFO {
    historyGrade {
      id
      grade {
        pic
        SystemGrade
      }
    }
  }
`;

const QUERYGRADE = gql`
  query QUERYGRADE($id: ID!) {
    Cowgrade(id: $id) {
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
      }
      id
    }
  }
`;

const Summarize = () => {
  const route = useRouter();
  const { data: HistoryGradedata } = useQuery(QUERY_INFO);
  const { data } = useQuery(QUERYGRADE, {
    variables: {
      id: route.query.sumId,
    },
  });
  console.log(data);
  const [infoExpert, setInfoExpert] = useState({
    ExpertName1: "",
    ExpertName2: "",
    ExpertName3: "",
    ExpertName4: "",
    ExpertName5: "",
    ExpertGrade: "",
  });
  // console.log(infoExpert);
  const [updateGrading] = useMutation(UPDATEEXPERT, {
    onCompleted: (data) => {},
    refetchQueries: [
      {
        query: QUERYGRADE,
        variables: { id: route.query.sumId },
      },
    ],
  });

  const handleChange = (e) => {
    setInfoExpert({
      ...infoExpert,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const idgrade = data && data.Cowgrade[0].grade[0].id;
    console.log(idgrade);
    try {
      await updateGrading({
        variables: {
          id: idgrade,
          /*   ...infoExpert, */
          expertName1: infoExpert.ExpertName1,
          expertName2: infoExpert.ExpertName2,
          expertName3: infoExpert.ExpertName3,
          expertName4: infoExpert.ExpertName4,
          expertName5: infoExpert.ExpertName5,
          expertGrade: infoExpert.ExpertGrade,
        },
      });

    } catch (error) {
      console.log(error);
    }
  };
  const { user, signout } = useContext(AuthContext);
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
        <DivBase>
          <DivFrom style={{ width: "1200px" }}>
            <DivFromTop
              style={{
                height: "47px",
                color: "white",
                fontSize: "24px",
                fontWeight: "-moz-initial",
              }}
            >
              <Icon
                style={{ verticalAlign: "text-bottom", marginRight: "10px" }}
                icon={u1F356}
                size={30}
              />
              สรุปเกรดเนื้อโค
            </DivFromTop>
            <DivFromDown>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "500px 1fr",
                  gridGap: "15px",
                }}
              >
                <div
                  style={{ boxShadow: "0px 0px 2px grey", borderRadius: "9px" }}
                >
                  <DivFromTop style={{ fontSize: "20px" }}>
                    รูปตัวอย่างเนื้อโค
                  </DivFromTop>
                  <DivFromDown
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <div>
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
                    </div>
                  </DivFromDown>
                </div>
                <div
                  style={{
                    boxShadow: "0px 0px 2px grey",
                    borderRadius: "9px",
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "260px 1fr",
                      gridGap: "30px",
                      padding: "10px",
                    }}
                  >
                    <div style={{ fontSize: "18px" }}>
                      <h1 style={{ fontSize: "28px", margin: "0" }}>
                        พนักงานตัดเกรด
                      </h1>
                      <div>
                        ชื่อ-นามสกุล
                        <p
                          style={{
                            margin: "5px",
                            marginLeft: "0px",
                            border: "1px solid #AFAFAF",
                            borderRadius: "4px",
                            textAlign: "center",
                            width: "250px",
                            padding: "3px",
                          }}
                        >
                          {user && (
                            <>
                              <a
                                style={{
                                  margin: "auto 5px",
                                  textAlign: "left",
                                  fontSize: "18px",
                                  fontWeight: 600,
                                  letterSpacing: "1px",
                                }}
                              >
                                สวัสดี {user.name}
                              </a>
                            </>
                          )}
                        </p>
                      </div>
                      <div style={{ marginTop: "10px", fontSize: "18px" }}>
                        <h1 style={{ fontSize: "28px", margin: "0" }}>
                          ชื่อผู้เชี่ยวชาญ
                        </h1>
                        {data &&
                          data.Cowgrade.map((prod) => (
                            <>
                              <div>
                                1.ชื่อ-นามสกุล {}
                                {prod.grade[0].ExpertName1 ? (
                                  <p>{prod.grade[0].ExpertName1}</p>
                                ) : (
                                  <input
                                    style={{
                                      margin: "5px",
                                      marginLeft: "0px",
                                      border: "1px solid #AFAFAF",
                                      borderRadius: "4px",
                                      width: "250px",
                                      padding: "3px",
                                    }}
                                    name="ExpertName1"
                                    value={infoExpert.ExpertName1}
                                    onChange={handleChange}
                                  />
                                )}
                              </div>
                              <div>
                                2.ชื่อ-นามสกุล {}
                                {prod.grade[0].ExpertName2 ? (
                                  <p>{prod.grade[0].ExpertName2}</p>
                                ) : (
                                  <input
                                    style={{
                                      margin: "5px",
                                      marginLeft: "0px",
                                      border: "1px solid #AFAFAF",
                                      borderRadius: "4px",
                                      width: "250px",
                                      padding: "3px",
                                    }}
                                    name="ExpertName2"
                                    value={infoExpert.ExpertName2}
                                    onChange={handleChange}
                                  />
                                )}
                              </div>
                              <div>
                                3.ชื่อ-นามสกุล {}
                                {prod.grade[0].ExpertName3 ? (
                                  <p>{prod.grade[0].ExpertName3}</p>
                                ) : (
                                  <input
                                    style={{
                                      margin: "5px",
                                      marginLeft: "0px",
                                      border: "1px solid #AFAFAF",
                                      borderRadius: "4px",
                                      width: "250px",
                                      padding: "3px",
                                    }}
                                    name="ExpertName3"
                                    value={infoExpert.ExpertName3}
                                    onChange={handleChange}
                                  />
                                )}
                              </div>
                              <div>
                                4.ชื่อ-นามสกุล {}
                                {prod.grade[0].ExpertName4 ? (
                                  <p>{prod.grade[0].ExpertName4}</p>
                                ) : (
                                  <input
                                    style={{
                                      margin: "5px",
                                      marginLeft: "0px",
                                      border: "1px solid #AFAFAF",
                                      borderRadius: "4px",
                                      width: "250px",
                                      padding: "3px",
                                    }}
                                    name="ExpertName4"
                                    value={infoExpert.ExpertName4}
                                    onChange={handleChange}
                                  />
                                )}
                              </div>
                              <div>
                                5.ชื่อ-นามสกุล {}
                                {prod.grade[0].ExpertName5 ? (
                                  <p>{prod.grade[0].ExpertName5}</p>
                                ) : (
                                  <input
                                    style={{
                                      margin: "5px",
                                      marginLeft: "0px",
                                      border: "1px solid #AFAFAF",
                                      borderRadius: "4px",
                                      width: "250px",
                                      padding: "3px",
                                    }}
                                    name="ExpertName5"
                                    value={infoExpert.ExpertName5}
                                    onChange={handleChange}
                                  />
                                )}
                              </div>
                            </>
                          ))}
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          boxShadow: "0px 0px 2px grey",
                          borderRadius: "9px",
                          height: "fit-content",
                          marginTop: "30px",
                        }}
                      >
                        <DivFromTop style={{ fontSize: "20px" }}>
                          เกรดจากระบบ
                        </DivFromTop>
                        <DivFromDown
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
                              <div className="mb-3">
                                {prod.grade[0].SystemGrade}
                              </div>
                            ))}
                        </DivFromDown>
                      </div>           
                      <div style={{ fontSize: "18px", marginTop: "30px" }}>
                        <h1 style={{ fontSize: "20px", margin: "0" }}>
                          ช่องกรอกเกรดจากผู้เชี่ยวชาญ : {}
                        </h1>
                        <input
                          style={{
                            margin: "5px",
                            marginLeft: "0px",
                            border: "1px solid #AFAFAF",
                            borderRadius: "4px",
                            textAlign: "center",
                            padding: "3px",
                          }}
                          name="ExpertGrade"
                          value={infoExpert.ExpertGrade}
                          onChange={handleChange}
                        />
                        <Submitbutton
                          style={{ margin: "10px 10px", width: "70px" }}
                          onClick={handleSubmit}
                        >
                          บันทึก
                        </Submitbutton>
                        <Link href="/beefgrading/indexsum">
                          <Backbutton style={{ width: "70px" }}>
                            ย้อนกลับ
                          </Backbutton>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </DivFromDown>
          </DivFrom>
        </DivBase>
        {/* detail */}
      </div>
    </>
  );
};

export default Summarize;
