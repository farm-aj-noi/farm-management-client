import React, { useState } from 'react'
import { DivFrom, HeaderColor, DivFromTop, DivFromDown } from "./SettingFrom";
import logo from './defultcow.jpg';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const CREATEREPORTSETTING = gql`
mutation CREATEREPORTSETTING($logo: String, $address: String) {
  createReportSet(logo: $logo, address: $address) {
    logo
    address
  }
}
`
function reportsetting() {
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
            var dataUrl = canvas.toDataURL('image/jpeg');
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
        const res = await fetch(
            "https://api.cloudinary.com/v1_1/djnasfo5s/image/upload",
            {
                method: "post",
                body: data
            }
        );
        const result = await res.json();
        //   console.log(result)

        return result.secure_url;
    };
    //base 64
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

    const [inputaddress, SetinputAddress] = useState({
        address: ""
    })
    const [createReportSet, error] = useMutation(CREATEREPORTSETTING, {
        onCompleted: (data) => {
            console.log("ผ่านละเหี้ย")
        }
    })

    const handleChage = (e) => {
        SetinputAddress({
            ...inputaddress,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async () => {
        try {
            const url = await uploadFile();
            if (url) {
                await createReportSet({
                    variables: {
                        logo: url,
                        address: inputaddress.address,
                    }
                })
            }
        } catch (error) {
            console.log(error)
        }

    }
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
                        gridTemplateColumns: "300px 500px ",
                        padding: "30px",
                        gridColumnGap: "50px",
                    }}>
                        <DivFrom style={{
                            width: "100%",
                            gridColumnStart: "1",
                            boxShadow: "0px 0px 2px grey",
                        }}>
                            <DivFromTop>
                                รูปโลโก้สหกรณ์ 250 x 250 px
                            </DivFromTop>
                            <DivFromDown>
                                <div style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}>
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
                            </DivFromDown>
                        </DivFrom>
                        <div style={{
                            width: "100%",
                            gridColumnStart: "2"
                        }}>
                            <p style={{
                                fontSize: "28px",
                                fontWeight: 600,
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
}

export default reportsetting