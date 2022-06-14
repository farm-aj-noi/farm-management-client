import React, { useContext, useState, useRef, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useRouter } from "next/router";
import { picture } from "react-icons-kit/ikons/picture";
import { Icon } from "react-icons-kit";
import logo from "./defultcow.jpg";
import { Logobeefgrade } from "../../../utils/image";
import { DivBase } from "../../../utils/divBase";
import Link from "next/link";
import { Table } from "react-bootstrap";
import { DivCenter, TableForm, TableHead } from "../Styleclass/Table";
import { u1F356 } from "react-icons-kit/noto_emoji_regular/u1F356";
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

const CREATE = gql`
  mutation CREATE($imagecow: String) {
    createCow(imagecow: $imagecow) {
      imagecow
    }
  }
`;
const Product = () => {
  const [errorAlert, setErrorAlert] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [edit, setEdit] = useState(false);
  const [gradeData, setGradedata] = useState("");
  const [onEdite, setOnEdit] = useState(false);
  const [success, setSuccess] = useState(false);
  const route = useRouter();
  const handleChange = (e) =>
    setGradedata({ ...gradeData, [e.target.name]: e.target.value });
  const { data, loading, error } = useQuery(QUERY_INFO, {
    variables: {
      id: route.query.gradeId,
    },
    onCompleted(res) {
      setGradedata(res.Cowgrade);
    },
  });

  console.log(gradeData);

  const [file, setFile] = useState(null);
  const [image, setImage] = useState({ preview: "", raw: "" });

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

  function blobToFile(theBlob, fileName) {
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
  }

  const uploadFile = async () => {
    const data = new FormData();
    var file_upload;
    await resizeImage({
      file: file,
      maxSize: 500,
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
    data.append("upload_preset", "next-test");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/djnasfo5s/image/upload",
      {
        method: "post",
        body: data,
      }
    );

    const result = await res.json();
    //   console.log(result)

    return result.secure_url;
  };

  const selectFile = (e) => {
    const files = e.target.files;
    //   console.log(files)

    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
    setFile(files[0]);
  };

  const [prod, setProd] = useState({
    imagecow: "",
  });

  const [alert, setAlert] = useState({
    imagecow: false,
  });

  const [createCow] = useMutation(CREATE, {
    onCompleted: (data) => {
      console.log(11111111111111);
      setSuccess(true),
        //  setProd({
        //   numcow: "",
        //   numkun: "",
        //   pun: "",
        //   numfarmer: "",
        //   passport: "",
        //   teeth: "",
        //   rfid: "",
        //   bodyscore: "",
        //   namefarmer: "",
        //   namecow: "",
        //   sex: "",
        //   weightstart: "",
        //   weightbirht: "",
        //   statuscow: "กำลังขุน",
        //   imagecow: "",
        //   group: "",
        //   district: ""
        //   , province: "", amphur: "", zipcode: ""
        // });

        //   setTimeout(function () {
        //     setSuccess(false);
        //   }, 3000);
        window.location.reload();
    },
  });
  // console.log(data);

  const handleSubmit = async () => {
    setLoadingCreate(true);

    try {
      const url = await uploadFile();
      if (url) {
        console.log(123);
        await createCow({
          variables: {
            ...prod,
            date: selectedDate2,
            datebirhtday: selectedDate,
            weightstart: +prod.weightstart,
            weightbirht: +prod.weightbirht,
            imagecow: url,
          },
        });
        console.log(11111);
        window.location.reload();
      }
      setLoadingCreate(false);
    } catch (error) {
      setErrorAlert(true);
      setLoadingCreate(false);
      // console.log(error);
    }
  };
  useEffect(() => {
    setErrorAlert(false);
  }, [prod.numkun]);

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
            <Logobeefgrade height="70px" weight="70px" />
          </div>
          ระบบการตัดเกรด
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
              ระบบการตัดเกรด
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
                    เลือกรูปซากโคที่ต้องการตัดเกรด
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
                    <div>
                      <div>
                        <div>
                          <br />
                          <div>
                            <Uploads
                              style={{ margin: "-10px", marginTop: "-45px" }}
                            >
                              <a>
                                <div>
                                  <img
                                    style={{
                                      objectFit: "cover",
                                      width: "110%",
                                      position: "inherit",
                                    }}
                                    alt="Image"
                                    src={image.preview || logo}
                                  />
                                </div>
                              </a>
                              <br />
                            </Uploads>
                          </div>
                        </div>
                      </div>
                      <p></p>
                      <div>
                        <input
                          type="file"
                          name="file"
                          id="file"
                          onChange={selectFile}
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className="mb-3"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 0.75fr 1fr 0.75fr",
                      gridRowGap: "5px",
                      marginTop: "5px",
                    }}
                  ></div>
                </DivFromDown>
              </DivFrom>
              <DivFrom style={{ width: "750px", float: "Rigth" }}>
                <DivFromTop>
                  <div style={{ margin: "-3px 5px 0px 0px", fontSize: "20px" }}>
                    {/* <Icon size={25} icon={list} /> */}
                  </div>
                  <div style={{ margin: "-1px 5px 0px 0px", fontSize: "20px" }}>
                    ข้อมูลโค
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
                          margin: "auto",
                        }}
                      >
                        {data &&
                          data.Cowgrade.map((prod) => (
                            <>
                              <div>
                                รหัสซากโค : {}
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
                                    disabled={!onEdite}
                                    style={{
                                      backgroundColor: `${
                                        !onEdite ? "#ececec" : "white"
                                      }`,
                                    }}
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>
                              <div>
                                บาร์โค้ด : {}
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
                                    disabled={!onEdite}
                                    style={{
                                      backgroundColor: `${
                                        !onEdite ? "#ececec" : "white"
                                      }`,
                                    }}
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>
                              <div>
                                น้ำหนักซากอุ่น : {}
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
                                    disabled={!onEdite}
                                    style={{
                                      backgroundColor: `${
                                        !onEdite ? "#ececec" : "white"
                                      }`,
                                    }}
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>
                              <div>
                                น้ำหนักซากเย็น : {}
                                <div
                                  style={{
                                    display: "grid",
                                    gridTemplateRows: "1fr 15px",
                                  }}
                                >
                                  <Searchinput
                                    name="weighcool"
                                    value={
                                      prod.weightcool ? prod.weightcool : "-"
                                    }
                                    maxLength="5"
                                    disabled={!onEdite}
                                    style={{
                                      backgroundColor: `${
                                        !onEdite ? "#ececec" : "white"
                                      }`,
                                    }}

                                  />
                                </div>
                              </div>
                              <div>
                                วันที่เข้าบ่ม : {}
                                <div
                                  style={{
                                    display: "grid",
                                    gridTemplateRows: "1fr 15px",
                                  }}
                                >
                                  <Searchinput
                                    name="chillstart"
                                    value={dayjs(
                                      prod.chill.chilldateStart
                                    ).format("DD-MM-YYYY")}
                                    maxLength="2"
                                    disabled
                                    style={{ backgroundColor: "#ececec" }}
                                  />
                                </div>
                              </div>
                              <div>
                                วันที่ตัดเกรด : {}
                                <div
                                  style={{
                                    display: "grid",
                                    gridTemplateRows: "1fr 15px",
                                  }}
                                >
                                  <Searchinput
                                    name="chilldateEnd"
                                    value={dayjs(
                                      prod.chill.chilldateEnd
                                    ).format("DD-MM-YYYY")}
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
                                ห้องบ่ม : {}
                                <div
                                  style={{
                                    display: "grid",
                                    gridTemplateRows: "1fr 15px",
                                  }}
                                >
                                  <Searchinput
                                    name=""
                                    /* value={prod.chill.chillroom.roomnum} */
                                    maxLength="5"
                                    disabled
                                    style={{ backgroundColor: "#ececec" }}
                                  />
                                </div>
                              </div>
                              <div>
                                สายพันธุ์ : {}
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
                                    disabled={!onEdite}
                                    style={{
                                      backgroundColor: `${
                                        !onEdite ? "#ececec" : "white"
                                      }`,
                                    }}
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>
                            </>
                          ))}

                        {/* <div>
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
              </div> */}

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
                          <Gobutton onClick={handleSubmit}>บันทึก</Gobutton>
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
                            บันทึกสำเร็จ
                          </p>
                        )}
                        <Link href="/beefgrading/list">
                          <ButtonBack>ย้อนกลับ</ButtonBack>
                        </Link>
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
          </div>
        </DivCenter>
      </div>
    </>
  );
};

export default Product;
