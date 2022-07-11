import React, { useState } from 'react'

const test = ({ test1 }) => {
    const [test, settest] = useState(test1)
    return (
        <tr style={{ textAlign: "center" }}>
            <td>{test.beeftype.nameTH}</td>
            <td>{test.beeftype.code}</td>
            <td>{ }</td>
            <td>{test.weight}</td>
            <td>{test.barcode}</td>
            <td ><input type="checkbox" value={test.id} /></td>
        </tr>
    )
}

export default test