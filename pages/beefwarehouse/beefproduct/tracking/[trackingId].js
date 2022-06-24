import React from 'react'
import { BackgroundStore } from "../../../../utils/background";
import Footer from "../../../../components/BeefWarehouse/Footer";
import Nav from "../../../../components/BeefWarehouse/BeefProduct/Nav/Nav";
import Tracking from "../../../../components/BeefWarehouse/BeefProduct/10Tracking"
const GetinPage = () => {
    return (
        <BackgroundStore><Nav /><Tracking /><Footer /></BackgroundStore>
    )
}

export default GetinPage