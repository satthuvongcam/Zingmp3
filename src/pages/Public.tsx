import React from 'react'
import Sidebar from '~/components/Sidebar'
import { Outlet } from 'react-router-dom'
import Header from '~/components/Header'

const Public = () => {
  return (
    <div className='w-full h-full flex bg-[#CED9D9]'>
      <div className='w-[240px] h-full flex-none'>
        <Sidebar />
      </div>
      <div className='flex-1'>
        <div className='h-[70px] px-[59px] flex items-center mb-5 flex-1'>
          <Header />
        </div>
        <Outlet />
      </div>
    </div>
  )
}

export default Public
