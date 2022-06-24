import React, { useState, useContext } from "react";

import { Icon } from "react-icons-kit";
import { printer } from "react-icons-kit/ikons/printer";

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

import {ButtonExcel } from "../GraphFrom.js";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const Paper_Graph = () => {
  return (
    <ButtonExcel>
      <Icon
        style={{ verticalAlign: "text-bottom", marginRight: "5px" }}
        icon={printer}
        size={20}
      />
      พิมพ์รายการ
    </ButtonExcel>
  );
};

export default Paper_Graph;
