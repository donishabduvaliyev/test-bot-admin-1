import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import Crud from './pages/Crud'
import StoredItems from './pages/StoredItems'
import ItemsShow from './pages/itemsShow'
import App from './App'
import Layout from './Layout/Layout'

function RouterPage() {




    return (
        <Routes >
            <Route path='/' element={<Layout />} >

                <Route path='crud' element={<Crud />} />
                <Route index element={<App />} />

                <Route path='itemsShow' element={<ItemsShow />} />
                <Route path='storedItems' element={<StoredItems />} />
            </Route>


        </Routes>
    )
}

export default RouterPage