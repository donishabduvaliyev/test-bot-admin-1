import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Navbar from '../components/Navbar'

function Layout() {
    return (
        <div>
            <Header />
            <div className='flex'>
                <Navbar />
                <Outlet />


            </div>
        </div>
    )
}

export default Layout