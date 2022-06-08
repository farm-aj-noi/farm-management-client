import React, { useState } from "react";

import { Icon } from "react-icons-kit";
import { printer } from "react-icons-kit/ikons/printer";

import { ButtonExcel } from "../ReportFrom";

import { CSVLink } from "react-csv";

import dayjs from "dayjs";
import "dayjs/locale/th";

const excel = () => {
  return (
    <div>
      <ButtonExcel type="button" value="print Excel">
        <Icon
          style={{ verticalAlign: "text-bottom", marginRight: "5px" }}
          icon={printer}
          size={20}
        />
        รายงานExcel
      </ButtonExcel>
    </div>
  );
};

export default excel;
