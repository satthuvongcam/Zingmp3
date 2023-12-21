import React from 'react'
import icons from '~/utils/icons'
import Search from './Search'
import { Tooltip, Avatar } from 'flowbite-react'
import avatar from '~/assets/images/avatar.jpg'

const { BsArrowLeft, BsArrowRight, CiSettings } = icons

const Header = () => {
  return (
    <div className='flex items-center justify-center w-full px-[59px]'>
      <div className='flex gap-6 w-full items-center'>
        <div className='flex gap-6 text-gray-400'>
          <span>
            <BsArrowLeft size={24} />
          </span>
          <span>
            <BsArrowRight size={24} />
          </span>
        </div>
        <div className='w-1/2'>
          <Search />
        </div>
      </div>
      <div className='flex items-center justify-center gap-6'>
        <Tooltip content='Cài đặt'>
          <div className='w-10 h-10 flex items-center justify-center bg-[#e7ecec] rounded-[999px] cursor-pointer hover:bg-[#d5dddd]'>
            <CiSettings size={20} />
          </div>
        </Tooltip>
        <div className='w-10 h-10 flex items-center justify-center cursor-pointer opacity-[0.9] hover:opacity-[1]'>
          <Avatar img={avatar} alt='Avatar' rounded className='object-cover' />
        </div>
      </div>
    </div>
  )
}

export default Header
