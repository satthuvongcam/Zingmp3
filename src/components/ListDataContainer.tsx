import { Data } from '~/models/homeInterfaces'
import icons from '~/utils/icons'
import ItemHome from './ItemHome'
import RankingSong from './RankingSong'
import { useState } from 'react'

interface Props {
  data: Data
  isShowAll: boolean
  numberOfItem?: number
  isRanking: boolean
}

const { MdOutlineKeyboardArrowRight, GoChevronLeft, GoChevronRight } = icons

const ListDataContainer = (props: Props) => {
  const { data, isShowAll, numberOfItem, isRanking } = props
  const [arrShow, setArrShow] = useState<number[]>([0, 1, 2])

  const handlePrevImage = () => {
    if (arrShow.includes(0)) {
      setArrShow([6, 7, 8])
    } else {
      const newArr = arrShow.map((item) => item - 3)
      setArrShow(newArr)
    }
  }

  const handleNextImage = () => {
    if (arrShow.includes(data?.items?.length)) {
      setArrShow([0, 1, 2])
    } else {
      const newArr = arrShow.map((item) => item + 3)
      setArrShow(newArr)
    }
  }

  return (
    <div className='mt-12 h-full px-[59px]'>
      <div className='flex items-center justify-between'>
        <h2 className='mb-5 text-xl font-bold'>{data?.title}</h2>
        {isShowAll && (
          <div className='flex items-center gap-1 text-[#696969] cursor-pointer hover:text-[#0f7070] font-normal text-xs'>
            <span>TẤT CẢ</span>
            <MdOutlineKeyboardArrowRight size={20} />
          </div>
        )}
      </div>
      <div className='flex justify-between relative'>
        {numberOfItem !== 5 && (
          <>
            <div className='absolute top-1/2 -left-[19px] -translate-y-1/2 z-[5]'>
              <button
                onClick={handlePrevImage}
                className={`outline-none border-none w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-[0_2px_4px_0_rgba(0, 0, 0, .2)] opacity-[0.6] hover:opacity-[1]`}
              >
                <GoChevronLeft size={25} />
              </button>
            </div>
            <div className='absolute top-1/2 -right-[19px] -translate-y-1/2 z-[5]'>
              <button
                onClick={handleNextImage}
                className={`outline-none border-none w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-[0_2px_4px_0_rgba(0, 0, 0, .2)] opacity-[0.6] hover:opacity-[1]`}
              >
                <GoChevronRight size={25} />
              </button>
            </div>
          </>
        )}
        {data?.items?.map((item, index) => {
          if (isRanking) {
            return (
              <RankingSong
                key={item?.encodeId}
                data={item}
                index={index}
                arrShow={arrShow}
                setArrShow={setArrShow}
              />
            )
          } else {
            if (numberOfItem) {
              if (index < numberOfItem) {
                return <ItemHome title={data.title} data={item} key={item?.encodeId} />
              }
            }
          }
        })}
        {arrShow.includes(8) && (
          <div className='flex items-center justify-center text-[#0e8080] font-bold text-sm h-[150px] rounded w-[32%] px-[15px] py-[15px] bg-[#ffffff4c] cursor-pointer'>
            <span> XEM TẤT CẢ</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default ListDataContainer
