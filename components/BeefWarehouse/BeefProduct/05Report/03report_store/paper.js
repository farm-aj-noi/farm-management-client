import React, { useState, useContext } from "react";

import { AuthContext } from "../../../../../appState/AuthProvider";

import dayjs from "dayjs";

import { Icon } from "react-icons-kit";
import { printer } from "react-icons-kit/ikons/printer";

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { ButtonPDF } from "../ReportFrom";

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
      <ButtonPDF type="button" value="print PDF">
        <Icon
          style={{ verticalAlign: "text-bottom", marginRight: "5px" }}
          icon={printer}
          size={20}
        />
        รายงานPDF
      </ButtonPDF>
    </div>
  );
};

export default paper;
