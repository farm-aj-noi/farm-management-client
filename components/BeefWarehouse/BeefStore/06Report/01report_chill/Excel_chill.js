import React from "react";

import { Icon } from "react-icons-kit";
import { printer } from "react-icons-kit/ikons/printer";

import { ButtonExcel } from "../ReportFrom";

const Excel_chill = () => {
  return (
    <ButtonExcel>
      <Icon
        style={{ verticalAlign: "text-bottom", marginRight: "5px" }}
        icon={printer}
        size={20}
      />
      รายงานExcel
    </ButtonExcel>
  );
};

export default Excel_chill;
