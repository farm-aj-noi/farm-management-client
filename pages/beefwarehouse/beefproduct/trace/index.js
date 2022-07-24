import React from 'react'
import { BackgroundStore } from "../../../../utils/background";
import Footer from "../../../../components/BeefWarehouse/Footer";
import Nav from "../../../../components/BeefWarehouse/BeefProduct/Nav/Nav";
import Trace from "../../../../components/BeefWarehouse/BeefProduct/13Trace"
const index = () => {
    return (
        <BackgroundStore>
            <Nav />
            <Trace />
            <Footer />
        </BackgroundStore>
    )
}

export default index