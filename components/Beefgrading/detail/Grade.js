import * as tf from "@tensorflow/tfjs";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import React, { useContext, useState, useRef, useEffect } from "react";
import Router from "next/router";
import logo from "./defultcow.jpg";
import { Logobeefgrade } from "../../../utils/image";
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
import { Spinner } from "react-bootstrap";
import dayjs from "dayjs";
import { registerLocale } from "react-datepicker";
import th from "date-fns/locale/th";
registerLocale("th", th);

const CREATEGRADE = gql`
  mutation CREATEGRADE($pic: String, $halve: String, $SystemGrade: String) {
    createGrade(pic: $pic, halve: $halve, SystemGrade: $SystemGrade) {
      id
    }
  }
`;

const QUERYCOWFORGRADE = gql`
  query QUERYCOWFORGRADE($id: ID!) {
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
  // const [gradeData, setGradedata] = useState("");
  const { data, loading, error } = useQuery(QUERYCOWFORGRADE, {
    variables: {
      id: route.query.gradeId,
    },
    onCompleted(res) { },
  });
  const MySwal = withReactContent(Swal);
  const [createGrade] = useMutation(CREATEGRADE, {
    onCompleted: (data) => {
      if (data) {
        MySwal.fire({
          icon: "success",
          title: "ประมวณผลสำเร็จ",
          showDenyButton: true,
          /* showCancelButton: true, */
          confirmButtonText: (
            <span onClick={() => Router.push("/beefgrading/indexsum")}>
              ดำเนินการต่อ
            </span>
          ),
          denyButtonText: `ตกลง`,
          confirmButtonColor: "#3085d6",
          denyButtonColor: "#008631",
        });
      }
    },
  });

  const TARGET_CLASSES = {
    0: "2",
    1: "2.5",
    2: "3",
    3: "3.5",
    4: "4",
    5: "4.5",
    6: "5",
  };

  const [isModelLoading, setModel] = useState();
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [isImage, setImage] = useState("");
  const [isImage1, setImage1] = useState({ preview: "", raw: "" });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fnModel();
  }, []);

  const fnModel = async () => {
    const model = await tf.loadLayersModel("/model_2/model.json");
    setModel(model);
  };

  const handleChange = (e) => {
    const i = e.target.files;
    if (e.target.files.length) {
      setImage1({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
    setImage(i[0]);
  };

  var resizeImage = function (settings) {
    var file = settings.file;
    var maxSize = settings.maxSize;
    var reader = new FileReader();
    var image = new Image();
    var canvas = document.createElement("canvas");
    var dataURItoBlob = function (dataURI) {
      var bytes =
        dataURI.split(",")[0].indexOf("base64") >= 0
          ? atob(dataURI.split(",")[1])
          : unescape(dataURI.split(",")[1]);
      var mime = dataURI.split(",")[0].split(":")[1].split(";")[0];
      var max = bytes.length;
      var ia = new Uint8Array(max);
      for (var i = 0; i < max; i++) ia[i] = bytes.charCodeAt(i);
      return new Blob([ia], { type: mime });
    };
    var resize = function () {
      var width = image.width;
      var height = image.height;
      if (width > height) {
        if (width > maxSize) {
          height *= maxSize / width;
          width = maxSize;
        }
      } else {
        if (height > maxSize) {
          width *= maxSize / height;
          height = maxSize;
        }
      }
      canvas.width = width;
      canvas.height = height;
      canvas.getContext("2d").drawImage(image, 0, 0, width, height);
      var dataUrl = canvas.toDataURL("image/jpeg");
      return dataURItoBlob(dataUrl);
    };
    return new Promise(function (ok, no) {
      if (!file.type.match(/image.*/)) {
        no(new Error("Not an image"));
        return;
      }
      reader.onload = function (readerEvent) {
        image.onload = function () {
          return ok(resize());
        };
        image.src = readerEvent.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const uploadFile = async () => {
    const data = new FormData();
    var file_upload;
    await resizeImage({
      file: isImage,
      maxSize: 640,
    })
      .then(function (resizedImage) {
        console.log(resizedImage);
        console.log("upload resized image");
        file_upload = new File([resizedImage], "name");
      })
      .catch(function (err) {
        console.error(err);
      });
    data.append("file", file_upload);
    data.append("upload_preset", "graphql-basic");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/da7loumgx/image/upload",
      {
        method: "post",
        body: data,
      }
    );

    const result = await res.json();
    console.log(result);

    return result.secure_url;
  };

  const handleClick = async (event) => {
    let test2 = document.getElementById("test2223");
    if (isModelLoading && test2) {
      let tensor = tf.browser
        .fromPixels(test2, 3)
        .resizeNearestNeighbor([224, 224]) // change the image size
        .expandDims()
        .toFloat()
        .reverse(-1);

      let predictions = await isModelLoading.predict(tensor).data();
      console.log(predictions);

      let top5 = Array.from(predictions)
        .map(function (p, i) {
          // this is Array.map
          return {
            probability: p,
            className: TARGET_CLASSES[i], // we are selecting the value from the obj
          };
        })
        .sort(function (a, b) {
          return b.probability - a.probability;
        })
        .slice(0, 1);
      console.log(top5[0].className);
      document.getElementById("prediction-list").innerHTML = "";
      top5.forEach(function (p) {
        const node = document.createElement("li");
        node.innerHTML = `${p.className}`;
        console.log(node);
        document.getElementById("prediction-list").appendChild(node);
      });
      try {
        const url = await uploadFile();
        const grade = top5[0].className;
        if (url) {
          await createGrade({
            variables: {
              pic: url,
              halve: route.query.gradeId,
              SystemGrade: grade,
            },
          });
        }
        console.log("ผ่านแล้วจ้า");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
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
          <Logobeefgrade height="70px" weight="70px" />
        </div>
        ระบบการตัดเกรด
      </DivCenter>
      <div style={{
        display: "grid",
        padding: "20px 500px 0px 500px",
        gridTemplateColumns: "1fr 1fr",
        textAlign: "center",
        gridColumnGap: "20px"
      }}>
        <div>
          <DivFromHis>
            <DivFromTop style={{ fontSize: "20px" }}>
              รูปหน้าเกรดชิ้นเนื้อ
            </DivFromTop>
            <DivFromDown>
              <div>
                <Uploads /* style={{ margin: "-10px", marginTop: "-45px" }} */>
                  <a>
                    <div>
                      <img
                        /* style={{
                          objectFit: "cover",
                          width: "110%",
                          position: "inherit",
                        }} */
                        /* id="test2223" */
                        src={isImage1.preview || logo}
                        width="224"
                        height="224"
                      />
                    </div>
                  </a>
                  <br />
                </Uploads>
              </div>
              <div>
                <input
                  style={{
                    marginTop: "20px",
                  }}
                  type="file"
                  name="file"
                  onChange={handleChange}
                  accept="image/*"
                />
              </div>
            </DivFromDown>
          </DivFromHis>
        </div>
        <div>
          <DivFromHis>
            <DivFromTop style={{ fontSize: "20px" }}>
              ครอปส่วนรูปซากโคที่ต้องการตัดเกรด
            </DivFromTop>
            <DivFromDown>
              <div>
                <Uploads /* style={{ margin: "-10px", marginTop: "-45px" }} */>
                  <a>
                    <div>
                      <img
                        /* style={{
                          objectFit: "cover",
                          width: "110%",
                          position: "inherit",
                        }} */
                        /* id="test2223" */
                        src={isImage1.preview || logo}
                        width="224"
                        height="224"
                      />
                    </div>
                  </a>
                  <br />
                </Uploads>
              </div>
              <div>
                <input
                  style={{
                    marginTop: "20px",
                  }}
                  type="file"
                  name="file"
                  onChange={handleChange}
                  accept="image/*"
                />
              </div>
            </DivFromDown>
          </DivFromHis>
        </div>
      </div>
      <div style={{
        marginTop: "20px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        padding: "10px 500px 0px 500px",
        gridColumnGap: "20px"
      }}>
        <DivFromHis>
          <DivFromTop>
            <div style={{ margin: "-3px 5px 0px 0px", fontSize: "20px" }}></div>
            <div style={{ margin: "-1px 5px 0px 0px", fontSize: "20px" }}>
              ข้อมูลโค
            </div>
          </DivFromTop>
          <DivFromDown
            style={{
              padding: "0"
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
                <div
                  className="mb-3"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1.2fr 1.2fr 1fr",
                    gridRowGap: "5px",
                    margin: "auto",
                  }}
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
                  <div
                    className="mb-3"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 0.75fr 1fr 0.75fr",
                      gridRowGap: "5px",
                      marginTop: "5px",
                    }}
                  ></div>
                  {loadingCreate ? (
                    <Spinner
                      style={{
                        margin: "0px 12px 0px auto",
                        float: "right",
                      }}
                      animation="border"
                      variant="primary"
                    />
                  ) : (
                    <Gobutton onClick={handleClick}>ประมวลผล</Gobutton>
                  )}

                  {success && (
                    <p
                      style={{
                        color: "green",
                        position: "absolute",
                        display: "flex",
                        margin: "410px 0px 0px 78%",
                      }}
                    >
                      ประมวณผลสำเร็จ
                    </p>
                  )}
                  <div
                    style={{
                      marginLeft: "5px",
                    }}
                  >
                    <Link href="/beefgrading/list">
                      <ButtonBack
                        style={{
                          width: "200px",
                        }}
                      >
                        ย้อนกลับ
                      </ButtonBack>
                    </Link>
                  </div>
                </div>
              </DivFromDown>
            </div>
          </DivFromDown>
        </DivFromHis>
        <DivFromHis style={{ width: "100%", marginTop: 0 }}>
          <DivFromTop>
            <div
              style={{ margin: "-3px 5px 0px 0px", fontSize: "20px" }}
            ></div>
            <div style={{ margin: "-1px 5px 0px 0px", fontSize: "20px" }}>
              เกรดที่ได้
            </div>
          </DivFromTop>
          <DivFromDown style={{ padding: 0, height: "113px" }}>
            <div
              style={{
                fontSize: "100px",
                color: "green",
                listStyle: "none",
                textAlign: "center",
                padding: 0,
                marginTop: "-12px",
              }}
              id="prediction-list"
            >
              -
            </div>
          </DivFromDown>
        </DivFromHis>
      </div>
    </div>
  );
}
