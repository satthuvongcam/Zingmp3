import React, { useEffect, useRef, useState } from 'react'
import { ItemData } from '~/models/homeInterfaces'
import icons from '~/utils/icons'
import BgImage from './BgImage'
import { CustomFlowbiteTheme, Flowbite, Tooltip } from 'flowbite-react'
import ArtistToolTip from './ArtistToolTip'
import dayjs from 'dayjs'
import { Artists } from '~/models/musicInterfaces'

interface Props {
  data: ItemData
  index: number
  arrShow: number[]
  setArrShow: any
}

const { IoPlay } = icons

const customTooltip: CustomFlowbiteTheme = {
  tooltip: {
    base: 'bg-transparent',
    arrow: {
      style: {
        light: 'bg-transparent'
      }
    }
  }
}

const RankingSong = (props: Props) => {
  const [playlistIdHover, setPlaylistIdHover] = useState<string>('')
  const { data, index, arrShow, setArrShow } = props

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const invalidId = setInterval(() => {
      const slides = document.querySelectorAll('slide')
      let newArr = arrShow.map((item) => item + 3)
      if (newArr.every((item) => item > 8)) {
        // Reset the array if all elements are greater than to 8
        newArr = [0, 1, 2]
      }
      slides.forEach((slide, index) => {
        if (index === arrShow[0]) {
          slide.classList.add('animate-slide-left', 'order-last', 'z-10')
        } else if (index === arrShow[1]) {
          slide.classList.add('animate-slide-left2', 'order-2', 'z-15')
        } else if (index === arrShow[2]) {
          slide.classList.add('animate-slide-left3', 'order-first', 'z-20')
        }
      })
      setArrShow(newArr)
    }, 10000)
    return () => {
      invalidId && clearInterval(invalidId)
    }
  }, [arrShow, index])

  return (
    <div
      ref={ref}
      className={`${
        arrShow.includes(index) ? 'block' : 'hidden'
      } flex slide gap-2 h-[150px] rounded w-[32%] px-[15px] py-[15px] bg-[#ffffff4c] cursor-pointer`}
    >
      <div className='w-[120px] h-[120px] cursor-pointer rounded-lg overflow-hidden relative group'>
        <BgImage
          Data={data}
          Icon={IoPlay}
          Style={{
            rounded: 'rounded-lg',
            width: 6,
            height: 6,
            widthParent: 10,
            heightParent: 10,
            iconSize: 30,
            isCircle: true
          }}
        />
      </div>
      <div className='flex flex-col justify-between flex-1'>
        <div>
          <div className='text-sm text-[#32323d] font-medium'>{data?.title}</div>
          <div className='w-full flex items-center flex-wrap gap-1 text-xs text-[#696969] mt-[3px]'>
            {data?.artists?.map((artist, index) => {
              return (
                <div key={artist.id} className='flex'>
                  <Flowbite theme={{ theme: customTooltip }}>
                    <Tooltip
                      style='light'
                      content={<ArtistToolTip playlistId={playlistIdHover} artist={artist} />}
                    >
                      <span
                        onMouseEnter={() => {
                          if (artist?.playlistId) {
                            setPlaylistIdHover(artist?.playlistId)
                          }
                        }}
                        onMouseLeave={() => {
                          setPlaylistIdHover('')
                        }}
                        className='hover:text-[#0e8080] hover:underline'
                      >
                        {index === data?.artists?.length - 1 ? artist?.name : `${artist?.name},`}
                      </span>
                    </Tooltip>
                  </Flowbite>
                </div>
              )
            })}
          </div>
        </div>
        <div className='flex items-end justify-between'>
          <span className='opacity-[0.4] text-stroke-1 text-[40px] font-black text-transparent font-custom'>
            #{index + 1}
          </span>
          <div className='text-[#696969] text-sm'>
            {dayjs.unix(data?.releaseDate).format('DD.MM.YYYY')}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RankingSong
