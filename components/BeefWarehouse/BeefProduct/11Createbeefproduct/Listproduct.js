import React, { useState } from "react";
import dayjs from "dayjs";
import Barcode from "./barcode"
const Listimproduct = ({ listp }) => {
    const [infoproduct, setinfoproduct] = useState(listp);
    console.log(infoproduct)
    return (
        <tr style={{ textAlign: "center" }} key={infoproduct.id}>
            <td>{infoproduct.producttype.nameTH}</td>
            <td>{infoproduct.producttype.code}</td>
            <td>{infoproduct.weight}</td>
            <td>
                {dayjs(infoproduct.MFG)
                    .locale("th")
                    .add(543, "year")
                    .format("DD/MM/YYYY")}
            </td>
            <td>{dayjs(infoproduct.BBE)
                .locale("th")
                .add(543, "year")
                .format("DD/MM/YYYY")}</td>
            <td>{infoproduct.barcode}<Barcode infoall={infoproduct} /></td>
        </tr>
    );
};

export default Listimproduct;