import React, { useState } from "react";
import { Icon8 } from "../../../../utils/Logograde";
import { DivCenter, TableForm, TableHead } from "../../Styleclass/Table";
import { DivFrom, DivFromTop, DivFromDown } from "../StyleDashboard";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { fromJSON } from "postcss";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import logo from "../../../../images/beefgrading/inputlogo.png";
import { StyleEdit, StyleSave, StyleCancle } from "../StyleDashboard";


const UPDATELOGOGRADE = gql`
  mutation UPDATELOGOGRADE($logo: String, $address: String) {
    updateGradeLogo(logo: $logo, address: $address) {
      logo
      address
    }
  }
`;

export const QUERYLOGOGRADE = gql`
  query Query {
    gradeLogo {
      logo
      address
    }
  }
`;
function detailsetting() {
  const MySwal = withReactContent(Swal);
  const { data } = useQuery(QUERYLOGOGRADE);
  // console.log(data);
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
      var dataUrl = canvas.toDataURL("image/png");
      /* var dataUrl1 = canvas.toDataURL('image/png'); */
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

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

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
    /* data.append("file", file_upload);
    data.append("upload_preset", "next-test");
    const res = await fetch(
        "https://api.cloudinary.com/v1_1/djnasfo5s/image/upload",
        {
            method: "post",
            body: data
        }
    );
    const result = await res.json(); */
    const result = await convertBase64(file);
    console.log(result);
    return result;

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
  //base 64
  const [editlogo, setEditlogo] = useState(false);
  const [editaddress, setEditaddress] = useState(false);
  const [inputaddress, setInputAddress] = useState({
    address: "",
  });
  const [updateGradeLogo] = useMutation(UPDATELOGOGRADE, {
    onCompleted: (data) => {
      if (data) {
        MySwal.fire({
          icon: "success",
          title: "สำเร็จ",
          text: "ทำการแก้เสร็จสิ้น",
          showConfirmButton: false,
          timer: 1500,
        });
        setEditlogo(false);
        setEditaddress(false);
      }
    },
    refetchQueries: [{ query: QUERYLOGOGRADE }],
  });
  const handleChage = (e) => {
    setInputAddress({
      ...inputaddress,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitLogo = async () => {
    try {
      const base64 = await uploadFile();
      if (base64) {
        await updateGradeLogo({
          variables: {
            logo: base64,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitAddress = async () => {
    try {
      await updateGradeLogo({
        variables: {
          address: inputaddress.address,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div style={{ padding: "0px 500px 0px 500px" }}>
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
        ></div>
        <Icon8 height="70px" weight="90px" />
        การตั้งค่าระบบ
      </DivCenter>
      <div
        style={{
          display: "flex",
          marginTop: "20px",
          columnGap: "20px",
        }}
      >
        <DivFrom style={{ width: "fit-content", marginTop: "0" }}>
          <DivFromTop>ตั้งค่าโลโก้</DivFromTop>
          <DivFromDown>
            <div>
              <a>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {editlogo ? (
                    <img
                      /*  style={{
                      objectFit: 'cover', width:
                        "100%" position: 'inherit',
                    }} */
                      alt="Image"
                      src={image.preview || logo}
                      height="250"
                      width="250"
                    />
                  ) : (
                    <img
                      /*  style={{
                      objectFit: 'cover', width:
                        "100%" position: 'inherit',
                    }} */
                      alt="Image"
                      src={
                        data &&
                        data.gradeLogo[0]
                          .logo /* || (data && data.reportlogo[0].logo) */
                      }
                      height="250"
                      width="250"
                    />
                  )}
                </div>
              </a>
              {editlogo ? (
                <>
                  <div style={{ marginTop: "5px" }}>
                    <input type="file" name="file" onChange={selectFile} />
                  </div>
                  <StyleSave
                    style={{  marginTop: "5px", textAlign: "center" }}
                    onClick={handleSubmitLogo}
                  >
                    ยืนยัน
                  </StyleSave>
                  <StyleCancle
                    style={{  marginTop: "5px", textAlign: "center" }}
                    onClick={() => setEditlogo(false)}
                  >
                    ยกเลิก
                  </StyleCancle>
                </>
              ) : (
                <StyleEdit
                  style={{ width: "100%", marginTop: "20px", textAlign: "center" }}
                  onClick={() => setEditlogo(true)}
                >
                  แก้ไขโลโก้
                </StyleEdit>
              )}
            </div>
          </DivFromDown>
        </DivFrom>
        <DivFrom style={{ marginTop: "0px" }}>
          <DivFromTop>ตั้งค่าที่อยู่สหกรณ์</DivFromTop>
          <DivFromDown>
            {editaddress ? (
              <textarea
                name="address"
                id="address"
                style={{ width: "100%" }}
                value={inputaddress.address}
                onChange={handleChage}
              />
            ) : (
              <p>{data && data.gradeLogo[0].address}</p>
            )}
            {editaddress ? (
              <div>
                <StyleSave
                  style={{
                    
                    float: "right",
                    marginBottom: "10px",
                  }}
                  onClick={handleSubmitAddress}
                >
                  บันทึก
                </StyleSave>
                <StyleCancle
                  style={{
                   
                    float: "right",
                    marginBottom: "10px",
                    marginRight: "5px",
                  }}
                  onClick={() => setEditaddress(false)}
                >
                  ยกเลิก
                </StyleCancle>
              </div>
            ) : (
              <StyleEdit
                style={{ float: "right", marginBottom: "10px" }}
                onClick={() => setEditaddress(true)}
              >
                แก้ไข
              </StyleEdit>
            )}
          </DivFromDown>
        </DivFrom>
      </div>
    </div>
  );
}

export default detailsetting;
