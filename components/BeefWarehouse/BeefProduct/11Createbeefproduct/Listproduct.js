import React, { useState } from "react";
import dayjs from "dayjs";
const Listimproduct = ({ listp }) => {
    const [infoproduct, setinfoproduct] = useState(listp);

    return (
        <tr style={{ textAlign: "center"}}>
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
            <td>{infoproduct.barcode}</td>
        </tr>
    );
};

export default Listimproduct;