import React, { useState } from "react";

import { ButtonSubmit, ButtonSummit1 } from "../ChillFrom";

import { Icon } from "react-icons-kit";
import { save } from "react-icons-kit/fa/save";
import { arrowRight2 } from "react-icons-kit/icomoon/arrowRight2";

import { Modal } from "react-bootstrap";
import Modalcss from "./Modal.module.css";

const Submit_Chill = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <ButtonSubmit onClick={handleShow}>
        ดำเนินการ
        <Icon
          style={{ verticalAlign: "text-bottom", marginLeft: "5px" }}
          icon={arrowRight2}
          size={20}
        />
      </ButtonSubmit>
      <Modal
        show={show}
        onHide={handleClose}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName={Modalcss.mymodal}
      >
        <Modal.Header closeButton>
          <Modal.Title>กำหนดรายละเอียดบ่ม</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ flexDirection: "column", alignItems: "center" }}>
            <form>
              <label
                style={{
                  margin: "5px 0px 0px 5px",
                }}
              >
                ชื่อผู้ทำการบ่ม
              </label>
              <input
                style={{
                  margin: "5px",
                  height: "35px",
                  borderRadius: "4px",
                  border: "1px solid #dddddd",

                  textAlign: "center",
                  width: "150px",
                }}
                type="text"
                name="ชื่อผู้ทำการบ่ม"
                placeholder=" ชื่อผู้ทำการบ่ม"
              />
              <label
                style={{
                  margin: "5px 0px 0px 5px",
                }}
              >
                วันที่และเวลาเริ่มบ่ม
              </label>
              <input
                style={{
                  margin: "5px",
                  height: "35px",
                  borderRadius: "4px",
                  border: "1px solid #dddddd",

                  textAlign: "center",
                  width: "150px",
                }}
                type="password"
                name="วันที่และเวลาเริ่มบ่ม"
                placeholder=" วันที่และเวลาเริ่มบ่ม"
              />
              <label
                style={{
                  margin: "5px 0px 0px 5px",
                }}
              >
                ระยะเวลาบ่ม
              </label>
              <select
                name="beef"
                id="beef"
                style={{
                  margin: "5px",
                  height: "35px",
                  borderRadius: "4px",
                  border: "1px solid #dddddd",
                  textAlign: "center",
                  width: "150px",
                }}
              >
                <option value="7 day">7 วันมาตรฐาน</option>
                <option value="etc">อื่น ๆ</option>
              </select>
              <div>
                <label
                  style={{
                    margin: "5px 0px 0px 5px",
                  }}
                >
                  ห้องบ่ม
                </label>
                <select
                  name="beef"
                  id="beef"
                  style={{
                    margin: "5px",
                    height: "35px",
                    borderRadius: "4px",
                    border: "1px solid #dddddd",
                    textAlign: "center",
                    width: "50px",
                  }}
                >
                  <option value="7 day">1</option>
                  <option value="etc">2</option>
                </select>
              </div>
              <label style={{ marginTop: "15px", fontSize: "20px" }}>
                จำนวนรายการทั้งหมด รายการ
              </label>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <ButtonSummit1
            style={{ height: "35px", width: "80px" }}
            onClick={handleClose}
          >
            บันทึก
            <Icon
              style={{ verticalAlign: "text-bottom", marginLeft: "5px" }}
              icon={save}
              size={20}
            />
          </ButtonSummit1>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Submit_Chill;
