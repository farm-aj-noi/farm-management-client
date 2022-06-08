import React, { useState } from "react";

import { Icon } from "react-icons-kit";
import { printer } from "react-icons-kit/ikons/printer";

import { ButtonExcel } from "../NavFrom";

import { AuthContext } from "../../../../../appState/AuthProvider";

import dayjs from "dayjs";

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

pdfMake.fonts = {
  THSarabunNew: {
    normal: "THSarabunNew.ttf",
    bold: "THSarabunNew-Bold.ttf",
    italics: "THSarabunNew-Italic.ttf",
    bolditalics: "THSarabunNew-BoldItalic.ttf",
  },
  Roboto: {
    normal: "Roboto-Regular.ttf",
    bold: "Roboto-Medium.ttf",
    italics: "Roboto-Italic.ttf",
    bolditalics: "Roboto-MediumItalic.ttf",
  },
};

const paper = () => {
  return (
    <div>
      <ButtonExcel type="button" value="print Excel">
        <Icon
          style={{ verticalAlign: "text-bottom", marginRight: "5px" }}
          icon={printer}
          size={20}
        />
        พิมพ์รายการ
      </ButtonExcel>
    </div>
  );
};

export default paper;
