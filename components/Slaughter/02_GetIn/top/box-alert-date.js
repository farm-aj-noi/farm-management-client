import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import "dayjs/locale/th";
import { Form, Row } from "react-bootstrap";
import MyCss from "./box-alert-date.module.css";

const box_alert_date = (props) => {
  const [date, setDate] = useState();
  const datetest = () => {
    setDate(
      dayjs()
        .locale("th")
        .add(543, "year")
        .format("ที่ D MMMM พ.ศ.YYYY เวลา HH:mm น.")
        // .format("llll")
    );
  };

  useEffect(() => {
    const interval = setInterval(datetest, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <Form className={MyCss.badFormOutRegister}>
        <Row
          style={{
            width: "100%",
            margin: "auto",
            position: "initial",
            zindex: "-1",
          }}
        >
          <div className={MyCss.baddate}>
            {props.name}
            {date}
          </div>
        </Row>
        <Row
          style={{
            width: "100%",
            margin: "auto",
            position: "initial",
            zindex: "-1",
          }}
        >
          <div className={MyCss.badcount}>
            <p>{props.count}</p>
          </div>
        </Row>
      </Form>
    </div>
  );
};

export default box_alert_date;
