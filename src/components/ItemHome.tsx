import React from 'react'
import { ItemData } from '~/models/homeInterfaces'
import icons from '~/utils/icons'

interface Props {
  data: ItemData
  title: string
}

const { IoPlay, IoMdHeartEmpty, HiOutlineDotsHorizontal } = icons

const ItemHome: React.FC<Props> = ({ data, title }) => {
  console.log('data: ', data);

  return (
    <div className='w-[18%] cursor-pointer'>
      <div className='w-full h-full rounded  overflow-hidden relative group'>
        <div
          className={`invisible group-hover:visible rounded cursor-pointer z-10 w-full h-full absolute top-0 left-0 bg-[rgba(0,0,0,0.5)]`}
        ></div>
        <img
          src={data?.thumbnail}
          alt=''
          className='w-full h-full rounded object-contain transition-transform transform group-hover:scale-110 transform-origin-center duration-700 ease'
        />
        <div className={`invisible group-hover:visible z-20 absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center gap-7 text-white`}>
          <button
            title={title}
            className={`hover:opacity-0.8`}
          >
            <IoMdHeartEmpty size={20} />
          </button>
          <button
            title={title}
            className={`hover:opacity-0.8 py-2 pl-2 pr-[6px] border border-white flex items-center justify-center rounded-full`}
          >
            <IoPlay size={20} />
          </button>
          <button
            title={title}
            className={`hover:opacity-0.8`}
          >
            <HiOutlineDotsHorizontal size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ItemHome
