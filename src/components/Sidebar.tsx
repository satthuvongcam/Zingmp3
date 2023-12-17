import React from 'react'
import logo from '~/assets/images/logo-light.svg'
import { sidebarMenu } from '~/utils/menu'
import { NavLink, useNavigate } from 'react-router-dom'

const Sidebar = () => {
  const nav = useNavigate()

  return (
    <div className='flex flex-col bg-[#DDE4E4]'>
      <div
        onClick={() => {
          nav('')
        }}
        className='w-full pl-7 pr-[25px] py-[15px] height-[70px] flex justify-start items-center'
      >
        <img src={logo} alt='Logo' className='w-[120px] h-10 cursor-pointer' />
      </div>
      <div className='flex flex-col'>
        {sidebarMenu.map((item, index) => (
          <NavLink
            to={item.path}
            key={index.toString()}
            end={item.end}
            className={({ isActive }) =>
              isActive
                ? 'py-3 px-[21px] font-semibold text-[14px] text-[#0F7070] flex items-center gap-3 bg-[#e7ecec] border-l-[2px] border-l-[#0F7070]'
                : 'py-3 px-[21px] font-semibold text-[14px] text-[#32323D] flex items-center gap-3'
            }
          >
            <item.icon />
            <span>{item.title}</span>
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
