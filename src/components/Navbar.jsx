import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div
      className='w-[5vw] '>

      <div className='flex flex-col gap-2'>
        <NavLink to={'/itemsShow'}  >
          Items list
        </NavLink>
        <NavLink to={'/storedItems'}>
          All Items
        </NavLink>
        <NavLink to={'/crud'} >
          Add Items
        </NavLink>
        <NavLink to={'/'} >
          Main
        </NavLink>
      </div>

    </div>
  )
}

export default Navbar