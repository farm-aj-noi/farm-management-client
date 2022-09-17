import React from 'react'
/* import ManageProductOnline from '../components/ManageProductOnline'
import UserProduct from '../components/UserProducts' */
import ManageProductOnline from '../../components/Saleonline/ManageProductOnline'
import Nav from "../../components/Saleonline/Nav/Nav"
const ManageProductOnlinePage = () => {
    return (
        <div>
            <Nav />
            <ManageProductOnline />
            {/* <UserProduct/> */}
        </div>
    )
}

export default ManageProductOnlinePage
