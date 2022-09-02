import React from 'react'
import { BackgroundProduct } from "../../../../utils/background";
import Footer from "../../../../components/BeefWarehouse/Footer";
import Nav from "../../../../components/BeefWarehouse/BeefProduct/Nav/Nav";
import Getin from "../../../../components/BeefWarehouse/BeefProduct/13Trace/complete"
const GetinPage = () => {
    return (
        <BackgroundProduct>
            <Nav />
            <Getin />
            <Footer />
        </BackgroundProduct>
    )
}

export default GetinPage