import React, { useState } from 'react'
import { DivFrom, HeaderColor, DivFromTop, DivFromDown } from "./SettingFrom";
import logo from './defultcow.jpg';
import gql from 'graphql-tag';
<<<<<<< HEAD
import { useMutation } from '@apollo/react-hooks';

const CREATEREPORTSETTING = gql`
mutation CREATEREPORTSETTING($logo: String, $address: String) {
  createReportSet(logo: $logo, address: $address) {
=======
import { useMutation, useQuery } from '@apollo/react-hooks';
import { Editbuttoncolor, Removebuttoncolor, Savebuttoncolor } from "../../../../utils/buttonColor"
import { Editbutton, Savebutton, Removebutton } from "../../../../utils/button"

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Router from "next/router";
import { Spinner } from "react-bootstrap";

const UPDATEREPORTSETTING = gql`
mutation Mutation($logo: String, $address: String) {
  updateLogo(logo: $logo, address: $address) {
>>>>>>> dev65
    logo
    address
  }
}
`
<<<<<<< HEAD
function reportsetting() {
=======
const QUERYREPORTSETTTING = gql`
query QUERYREPORTSETTTING {
  reportlogo {
    logo
    address
  }
}
`

function reportsetting() {
    const MySwal = withReactContent(Swal);
>>>>>>> dev65
    const [file, setFile] = useState(null);
    const [image, setImage] = useState({ preview: "", raw: "" });

    var resizeImage = function (settings) {
        var file = settings.file;
        var maxSize = settings.maxSize;
        var reader = new FileReader();
        var image = new Image();
        var canvas = document.createElement('canvas');
        var dataURItoBlob = function (dataURI) {
            var bytes = dataURI.split(',')[0].indexOf('base64') >= 0 ?
                atob(dataURI.split(',')[1]) :
                unescape(dataURI.split(',')[1]);
            var mime = dataURI.split(',')[0].split(':')[1].split(';')[0];
            var max = bytes.length;
            var ia = new Uint8Array(max);
            for (var i = 0; i < max; i++)
                ia[i] = bytes.charCodeAt(i);
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
            canvas.getContext('2d').drawImage(image, 0, 0, width, height);
<<<<<<< HEAD
            var dataUrl = canvas.toDataURL('image/jpeg');
=======
            var dataUrl = canvas.toDataURL('image/png');
            /* var dataUrl1 = canvas.toDataURL('image/png'); */
>>>>>>> dev65
            return dataURItoBlob(dataUrl);
        };
        return new Promise(function (ok, no) {
            if (!file.type.match(/image.*/)) {
                no(new Error("Not an image"));
                return;
            }
            reader.onload = function (readerEvent) {
                image.onload = function () { return ok(resize()); };
                image.src = readerEvent.target.result;
            };
            reader.readAsDataURL(file);
        });
    }

<<<<<<< HEAD
=======
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

>>>>>>> dev65
    const uploadFile = async () => {
        const data = new FormData();
        var file_upload
        await resizeImage({
            file: file,
            maxSize: 500
        }).then(function (resizedImage) {
            console.log(resizedImage)
            console.log("upload resized image")
            file_upload = new File([resizedImage], "name")
        }).catch(function (err) {
            console.error(err);
        });
        data.append("file", file_upload);
        data.append("upload_preset", "next-test");
<<<<<<< HEAD
        const res = await fetch(
=======
       /*  const res = await fetch(
>>>>>>> dev65
            "https://api.cloudinary.com/v1_1/djnasfo5s/image/upload",
            {
                method: "post",
                body: data
            }
        );
<<<<<<< HEAD
        const result = await res.json();
        //   console.log(result)
=======
        const result = await res.json(); */
        const result = await convertBase64(file);
        console.log(result)
        return result

>>>>>>> dev65

        return result.secure_url;
    };
    //base 64
<<<<<<< HEAD
    /*   const getBase64FromUrl = async (url) => {
          const data = await fetch(url);
          const blob = await data.blob();
          return new Promise((resolve) => {
              const reader = new FileReader();
              reader.readAsDataURL(blob);
              reader.onloadend = () => {
                  const base64data = reader.result;
                  resolve(base64data);
              }
          });
      }
      getBase64FromUrl('https://res.cloudinary.com/djnasfo5s/image/upload/v1663390245/next-test/nblzl3bdev00rzi18u9w.jpg').then(console.log) */
=======


>>>>>>> dev65

    const selectFile = e => {
        const files = e.target.files;
        //   console.log(files)
        if (e.target.files.length) {
            setImage({
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0]
            });
        }
        setFile(files[0]);
    };

<<<<<<< HEAD
    const [inputaddress, SetinputAddress] = useState({
        address: ""
    })
    const [createReportSet, error] = useMutation(CREATEREPORTSETTING, {
        onCompleted: (data) => {
=======
    const { data } = useQuery(QUERYREPORTSETTTING);
    // console.log(data)

    const [inputaddress, SetinputAddress] = useState({
        address: ""
    })
    const [edit, Setedit] = useState(false)

    const Setreport = () => {
        Setedit(false),
            setImage({
                variables: {
                    preview: ""
                }
            })
       /*  Router.reload(); */
    }

    const Alert = () => {
        MySwal.fire({
            icon: "success",
            title: "สำเร็จ",
            text: "ทำการแก้ไขข้อมูลสิ้น",
            confirmButtonText: (
                <span
                    onClick={() =>
                        Router.push("beefwarehouse/beefstore/setting/reportsetting").then(() => Router.reload())
                    }
                >
                    ตกลง
                </span>
            ),
            confirmButtonColor: "#3085d6",
        });
    }
    const [loadingCreate, setLoadingCreate] = useState(false);

    const [updateLogo, error] = useMutation(UPDATEREPORTSETTING, {
        onCompleted: (data) => {
            if (data) {

            }
>>>>>>> dev65
            console.log("ผ่านละเหี้ย")
        }
    })

    const handleChage = (e) => {
        SetinputAddress({
            ...inputaddress,
            [e.target.name]: e.target.value,
        })
    }

<<<<<<< HEAD
=======

>>>>>>> dev65
    const handleSubmit = async () => {
        try {
            const url = await uploadFile();
            if (url) {
<<<<<<< HEAD
                await createReportSet({
=======
                await updateLogo({
>>>>>>> dev65
                    variables: {
                        logo: url,
                        address: inputaddress.address,
                    }
                })
            }
<<<<<<< HEAD
        } catch (error) {
            console.log(error)
        }

    }
=======
            /* else {
                await updateLogo({
                    variables: {
                        logo: data && data.reportlogo[0].logo,
                        address: inputaddress.address,
                    }
                })
            } */
            Alert();
        } catch (error) {
            console.log(error)
        }
    }


>>>>>>> dev65
    return (
        <div style={{ marginTop: "100px" }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <HeaderColor
                    style={{
                        width: "fit-content",
                        height: "fit-content",
                        padding: "5px 30px",
                    }}
                >
                    การตั้งค่าออกรายงาน
                </HeaderColor>
            </div>
            <DivFrom style={{ marginTop: "40px", width: "fit-content" }}>
                <DivFromTop>
                    การตั้งค่าออกรายงาน
                </DivFromTop>
                <DivFromDown>
                    <div style={{
                        display: "grid",
<<<<<<< HEAD
                        gridTemplateColumns: "300px 500px ",
=======
                        gridTemplateColumns: "300px 420px ",
>>>>>>> dev65
                        padding: "30px",
                        gridColumnGap: "50px",
                    }}>
                        <DivFrom style={{
                            width: "100%",
                            gridColumnStart: "1",
                            boxShadow: "0px 0px 2px grey",
                        }}>
                            <DivFromTop>
<<<<<<< HEAD
                                รูปโลโก้สหกรณ์ 250 x 250 px
=======
                                รูปโลโก้สหกรณ์
>>>>>>> dev65
                            </DivFromTop>
                            <DivFromDown>
                                <div style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}>
<<<<<<< HEAD
                                    <div style={{
                                        height: "250px",
                                        width: "250px",
                                        overFlow: "hidden",
                                        background: "f5f5f5c4",
                                        border: "1px solid #80808014"
                                    }}>
                                        <a>
                                            <div style={{ display: "flex", justifyContent: "center" }}>
                                                <img style={{ /* objectFit: 'cover', */ width: '100%', /* position: 'inherit', */ }} alt="Image" src={image.preview || logo} />
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div style={{ padding: "15px", paddingBottom: "0" }}>
                                    <input type="file" name='file' id="fie" onChange={selectFile} />
                                </div>
=======
                                    {edit ? (
                                        <div style={{
                                            height: "250px",
                                            width: "250px",
                                            overFlow: "hidden",
                                            background: "f5f5f5c4",
                                            border: "1px solid #80808014"
                                        }}>
                                            <a>
                                                <div style={{ display: "flex", justifyContent: "center" }}>
                                                    <img /* style={{ objectFit: 'cover', width: '100%', position: 'inherit', }} */ width="250" height="250" alt="Image" src={image.preview || data && data.reportlogo[0].logo} />
                                                </div>
                                            </a>
                                        </div>
                                    ) : (
                                        <div style={{
                                            height: "250px",
                                            width: "250px",
                                            overFlow: "hidden",
                                            background: "f5f5f5c4",
                                            border: "1px solid #80808014"
                                        }}>
                                            <a>
                                                <div style={{ display: "flex", justifyContent: "center" }}>
                                                    <img /* style={{ objectFit: 'cover', width: '100%', position: 'inherit', }} */ width="250" height="250" alt="Image" src={data && data.reportlogo[0].logo} />
                                                </div>
                                            </a>
                                        </div>
                                    )}

                                </div>
                                {edit ? (
                                    <div style={{ padding: "15px", paddingBottom: "0" }}>
                                        <input type="file" name='file' onChange={selectFile} />
                                    </div>
                                ) : (
                                    ""
                                )}
>>>>>>> dev65
                            </DivFromDown>
                        </DivFrom>
                        <div style={{
                            width: "100%",
                            gridColumnStart: "2"
                        }}>
                            <p style={{
                                fontSize: "28px",
                                fontWeight: 600,
<<<<<<< HEAD
                            }}
                            >ที่อยู่สหกรณ์
                            </p>
                            <textarea style={{
                                width: "100%",
                                height: "100px",
                                fontSize: "24px",
                                padding: "10px"
                            }}
                                id="address"
                                name="address"
                                value={inputaddress.address}
                                onChange={handleChage}
                            />
                            <button style={{ float: "right" }} onClick={handleSubmit}>
                                บันทึก
                            </button>
                        </div>
                    </div>
                </DivFromDown>
            </DivFrom>
        </div>
    )
=======
                                margin: 0,
                            }}
                            >ที่อยู่สหกรณ์
                            </p>
                            {edit ? (
                                <textarea style={{
                                    width: "100%",
                                    resize: "none",
                                    border: "1px solid #80808014",
                                    borderRadius: "4px",
                                    /*  padding: "5px", */
                                    fontSize: "18px"
                                }}
                                    /*  placeholder={data && data.reportlogo[0].address} */
                                    id="address"
                                    name="address"
                                    value={inputaddress.address || data && data.reportlogo[0].address}
                                    onChange={handleChage}
                                >
                                </textarea>
                            ) : (
                                <>
                                    <p style={{ fontSize: "18px" }}>{data && data.reportlogo[0].address}</p>
                                </>
                            )}
                            {edit ? (
                                <>
                                    {/* {!file && (
                                        <label style={{ color: "red" }}>กรุณาเลือกรูปภาพโลโก้</label>
                                    )} */}
                                    <Savebuttoncolor style={{
                                        float: "right",
                                        padding: "5px 15px 5px 15px",
                                        fontSize: "18px",
                                        fontWeight: "bold",
                                        letterSpacing: "0.5px",
                                        backgroundColor: `${!file
                                            ? "gray"
                                            : ""
                                            }`,
                                    }} onClick={handleSubmit}
                                        disabled={!file}
                                    >
                                        บันทึก
                                    </Savebuttoncolor>
                                    <Removebuttoncolor onClick={Setreport} style={{ float: "right", marginRight: "10px", padding: "5px 15px 5px 15px", fontSize: "18px", fontWeight: "bold", letterSpacing: "0.5px" }}>
                                        ยกเลิก
                                    </Removebuttoncolor>
                                </>
                            ) : (
                                <Editbuttoncolor onClick={() => Setedit(true)} style={{ float: "right", padding: "5px 15px 5px 15px", fontSize: "18px", fontWeight: "bold", letterSpacing: "0.5px" }}>
                                    แก้ไข
                                </Editbuttoncolor>

                            )}
                        </div>
                    </div>
                </DivFromDown >
            </DivFrom >
        </div >
    )
    /*  <Savebuttoncolor  style={{ float: "right", padding: "5px 15px 5px 15px", fontSize: "18px", fontWeight: "bold", letterSpacing: "0.5px" }} onClick={handleSubmit} >
    บันทึก
</Savebuttoncolor>
<Removebuttoncolor  onClick={Setreport} style={{ float: "right", marginRight: "10px", padding: "5px 15px 5px 15px", fontSize: "18px", fontWeight: "bold", letterSpacing: "0.5px" }}>
    ยกเลิก
</Removebuttoncolor> */
>>>>>>> dev65
}

export default reportsetting