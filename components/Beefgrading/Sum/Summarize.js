import React from "react";
import { Table } from "react-bootstrap";
import { Icon } from "react-icons-kit";
import { paste } from "react-icons-kit/icomoon/paste";
import {print} from 'react-icons-kit/fa/print'
import { iosSearchStrong } from "react-icons-kit/ionicons/iosSearchStrong";
import { DivCenter, TableForm, TableHead } from "../Styleclass/Table";
import {u1F356} from 'react-icons-kit/noto_emoji_regular/u1F356'
import { Logobeefgrade } from "../../../utils/image"
import Link from "next/link";
import {
  ButtonQrcodeColor,
  ButtonHeaderColor,
  ButtonSearchColor,
  ButtonRecordColor,
  ButtonSubmit,
  ButtonImagecolor,
  ButtonBack
} from "../Styleclass/Button";

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
function Summarize() {
    return (
        <div>
          <DivCenter style={{ fontSize: "36px", 
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: "30px", 
            }} >
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
                
                ระบบการตัดเกรด
              </h1>
              <b style={{ fontSize: "24px", margin: "20px", marginTop: "20px" }}>
                รูปซากโค
              </b>
             
              
              <div
              style={{
                width: "400px",
                height: "400px",
                marginLeft: "20px",
                marginTop: "20px",
                backgroundColor: "white",
                borderRadius: "5px",
                borderTop: "none",
                borderRadius: "5px",
                boxShadow:
                  " 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 0px 10px 0 rgba(0, 0, 0, 0.1)",
              }} 
            >
          </div>
              <DivCenter style={{ marginLeft: "700px" }}>
              <div >
                  <Link href="/beef_store/grading">
                  <ButtonBack>
                    ยกเลิก
                  </ButtonBack>
                  </Link>
                  <Link href="/beef_store/grading">
                  <ButtonSubmit>
                    บันทึก
                  </ButtonSubmit>
                  </Link>
              </div>
              </DivCenter>
            </div>
          </DivCenter>
        </div>
          
         
      );
    }


export default Summarize;
