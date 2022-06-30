import React from 'react'
import { BackgroundStore } from "../../../utils/background";
import Nav from "../../../components/BeefWarehouse/BeefStore/Nav/Nav";
import Footer from "../../../components/BeefWarehouse/Footer";
import Transport from "../../../components/BeefWarehouse/BeefStore/13Transport"
const transport = () => {
    return (
        <BackgroundStore><Nav /><Transport /><Footer /></BackgroundStore>
    )
}

export default transport