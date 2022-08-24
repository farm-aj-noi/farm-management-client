import React from 'react'
import { BackgroundProduct } from "../../../../utils/background";
import Footer from "../../../../components/BeefWarehouse/Footer";
import Nav from "../../../../components/BeefWarehouse/BeefProduct/Nav/Nav";
import Tracking from "../../../../components/BeefWarehouse/BeefProduct/10Tracking"
const GetinPage = () => {
    return (
        <BackgroundProduct>
            <Nav />
            <Tracking />
            <Footer />
        </BackgroundProduct>
    )
}

export default GetinPage