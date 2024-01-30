import React from 'react'
import { Data } from '~/models/homeInterfaces'
import icons from '~/utils/icons'
import ItemHome from './ItemHome'

interface Props {
  data: Data
  isShowAll: boolean
}

const { MdOutlineKeyboardArrowRight } = icons

const ListDataContainer = (props: Props) => {
  const { data, isShowAll } = props

  return (
    <div className='mt-12 px-[59px] pb-[500px]'>
      <div className='flex items-center justify-between'>
        <h2 className='mb-5 text-xl font-bold'>{data?.title}</h2>
        {isShowAll && (
          <div className='flex items-center gap-1 text-[#696969] cursor-pointer hover:text-[#0f7070] font-normal text-xs'>
            <span>TẤT CẢ</span>
            <MdOutlineKeyboardArrowRight size={20} />
          </div>
        )}
      </div>
      <div className='flex items-center justify-between'>
        {data?.items?.map((item, index) => {
          if (index < 5) {
            return <ItemHome title={data.title} data={item} key={item?.encodeId} />
          }
        })}
      </div>
    </div>
  )
}

export default ListDataContainer
