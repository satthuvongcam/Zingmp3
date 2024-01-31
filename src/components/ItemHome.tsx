import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { ItemData } from '~/models/homeInterfaces'
import icons from '~/utils/icons'

interface Props {
  data: ItemData
  title: string
}

const { IoPlay, IoMdHeartEmpty, IoMdHeart, HiOutlineDotsHorizontal } = icons

const ItemHome: React.FC<Props> = ({ data, title }) => {
  const [isActive, setIsActive] = useState<boolean>(false)

  return (
    <div className='w-[18%] h-full'>
      <div className='w-full rounded cursor-pointer overflow-hidden relative group'>
        <div
          className={`invisible group-hover:visible rounded cursor-pointer z-10 w-full h-full absolute top-0 left-0 bg-[rgba(0,0,0,0.5)]`}
        ></div>
        <img
          src={data?.thumbnail}
          alt=''
          className='w-full h-full rounded object-contain transition-transform transform group-hover:scale-110 transform-origin-center duration-700 ease'
        />
        <div
          className={`invisible group-hover:visible z-20 absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center gap-7 text-white`}
        >
          <button
            title={'Thêm vào thư viện'}
            onClick={() => {
              setIsActive((prev) => !prev)
              if (!isActive) {
                toast('Đã thêm playlist vào thư viện')
              } else {
                toast('Đã xóa playlist khỏi thư viện')
              }
            }}
            className={`hover:opacity-0.8 px-[5px] py-[5px] ${
              isActive && 'text-[#0e8080]'
            } bg-transparent hover:bg-[#ffffff4d] hover:rounded-full`}
          >
            {isActive ? <IoMdHeart size={20} /> : <IoMdHeartEmpty size={20} />}
          </button>
          <button
            title={title}
            className={`hover:opacity-[1] opacity-[0.8] py-2 pl-2 pr-[6px] border border-white flex items-center justify-center rounded-full`}
          >
            <IoPlay size={20} />
          </button>
          <button
            title={'Khác'}
            className={`hover:opacity-0.8 px-[5px] py-[5px] bg-transparent hover:bg-[#ffffff4d] hover:rounded-full`}
          >
            <HiOutlineDotsHorizontal size={20} />
          </button>
        </div>
      </div>
      <div className='text-sm text-[#696969] mt-2 line-clamp-2 text-ellipsis break-words overflow-hidden'>{data?.sortDescription}</div>
    </div>
  )
}

export default ItemHome
