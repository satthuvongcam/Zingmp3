import React, { useEffect, useRef, useState } from 'react'
import { ItemData } from '~/models/homeInterfaces'
import icons from '~/utils/icons'
import BgImage from './BgImage'
import { CustomFlowbiteTheme, Flowbite, Tooltip } from 'flowbite-react'
import ArtistToolTip from './ArtistToolTip'

interface Props {
  data: ItemData
  index: number
  length: number
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
  const [arrShow, setArrShow] = useState<number[]>([0, 1, 2])

  const { data, index, length } = props
  console.log('data: ', data)

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const invalidId = setInterval(() => {
      const newArr = arrShow.map((item) => {
        if (item >= length) {
          item = 0
        } else {
          item += 3
        }
        return item
      })
      setArrShow(newArr)
      // arrShow.includes(index)
    }, 5000)
    return () => {
      invalidId && clearInterval(invalidId)
    }
  }, [...arrShow])

  return (
    <div
      ref={containerRef}
      className={`${
        index === length ? 'block' : 'hidden'
      } flex gap-2 h-[150px] rounded w-[32%] px-[15px] py-[15px] bg-[#ffffff4c]  group cursor-pointer`}
    >
      <div className='w-[120px] h-[120px] cursor-pointer rounded-lg overflow-hidden relative'>
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
      <div>
        <div className='text-sm text-[#32323d] font-medium'>{data?.title}</div>
        <div className='w-full flex items-center flex-wrap gap-1 text-xs text-[#696969] mt-[3px]'>
          {data?.artists?.map((artist, index) => (
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
          ))}
        </div>
      </div>
    </div>
  )
}

export default RankingSong
