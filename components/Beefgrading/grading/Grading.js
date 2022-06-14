import React, { useContext, useState, useRef, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import ListGrade from "./listgrade";
import {picture} from 'react-icons-kit/ikons/picture';
import { Icon } from "react-icons-kit";
import logo from './defultcow.jpg'
import { Logobeefgrade } from "../../../utils/image"
import { DivBase } from "../../../utils/divBase";
import Link from "next/link";
import { Table } from "react-bootstrap";
import { DivCenter, TableForm, TableHead } from "../Styleclass/Table";
import {u1F356} from 'react-icons-kit/noto_emoji_regular/u1F356'
import {
  ButtonQrcodeColor,
  ButtonHeaderColor,
  ButtonSearchColor,
  ButtonRecordColor,
  ButtonSubmit,
  ButtonImagecolor,
  ButtonBack
} from "../Styleclass/Button";
import {
  DivFrom,
  DivFromTop,
  DivFromDown,
  Btns,
  IMG,
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

export const LISTGRADE = gql`
  query LISTGRADE {
    listhalvegrade {
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
  mutation CREATE(
    $imagecow: String
  ) {
    createCow(
      imagecow: $imagecow
    ) {
      imagecow
    }
  }
`;

const Grading = () => {
  const { data, loading, error } = useQuery(LISTGRADE);
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
};

function blobToFile(theBlob, fileName){
  //A Blob() is almost a File() - it's just missing the two properties below which we will add
  theBlob.lastModifiedDate = new Date();
  theBlob.name = fileName;
  return theBlob;
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
        file_upload  = new File([resizedImage], "name")
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

  const [prod, setProd] = useState({
    
    imagecow: ""
  });

  const [alert, setAlert] = useState({
    imagecow: false
  });

  
  return (
    
    <>
    <div>
      <DivCenter style={{ fontSize: "36px", 
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
          <b style={{ fontSize: "24px", margin: "20px" }}>
            เลือกรูปซากโคที่ต้องการตัดเกรด
          </b>
         
          
          <div>
          <DivBase style={{margin:"auto",
               display: "grid",
               gridTemplateColumns: " 0.4fr 1fr " ,
               gridRowGap: "5px",
               width:" max-content",
               left: "50%",
               transform: "translateX(-50%)"
             }}>
       <></>
       <DivFrom style={{ width: "400px" ,height:"400px",margin:"20px",marginTop:"0" , marginRight:"2px"}}>
         

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
                   <br />
                   <div>
                     <Uploads style={{ margin:"-10px",marginTop: "-45px" }}>
                       <a>
                         <div >
                           <img style={{objectFit:'cover',width: '110%', position:'inherit',}} alt="Image" src={image.preview||logo} />
                         </div>
                       </a>
                       <br />
                     </Uploads>
                   </div>
                 </div>
               </div>
                 <p></p>
                 <div >
                   <input 
         type="file"
         name="file"
         id="file"
         onChange={selectFile} />
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
       <DivFrom style={{ width: "750px" ,float:"Rigth"}}>   
       </DivFrom>
      </DivBase>
        </div>
          <DivCenter style={{ marginLeft: "700px" }}>
          <div style={{ textAlign: "center", marginTop: "0px" }}>
            <b style={{ fontSize: "24px", textAlign: "right" }}>ข้อมูลโค</b>
            <Table responsive striped bordered hover>
              <thead>
                <th colspan="2">รหัสซาก</th>
               
              </thead>
              <thead>
                <th colspan="2">บาร์โค้ด</th>
               
              </thead>
              <thead>
                <th colspan="2">น้ำหนักซาก Kg.</th>
                <th>ซากซ้าย</th>
                
                <th>ซากขวา</th>
                
              </thead>
              <thead>
                <th colspan="2">วันที่เข้าบ่ม</th>
                
              </thead>
              <thead>
                <th colspan="2">วันที่ตัดเกรด</th>
                
              </thead>
              <thead>
                <th colspan="2">ห้องบ่ม</th>
                
              </thead>
              <thead>
                <th colspan="2">สายพันธุ์</th>
                
              </thead>
              <tbody>
                    {data &&
                      data.listhalvegrade.map((prod) => (
                        <ListGrade key={prod.id} ListGrade = {prod} />
                      ))}
                  </tbody>
              <Link href="/beef_store/grading">
              <ButtonBack>
                ย้อนกลับ
              </ButtonBack>
              </Link>
              <Link href="/beef_store/grading">
              <ButtonSubmit>
                ทำการประมวลผล
              </ButtonSubmit>
              </Link>
            </Table>
          </div>
          </DivCenter>
        </div>
      </DivCenter>
    </div>
    
     
   </>
  );
};

export default Grading;
