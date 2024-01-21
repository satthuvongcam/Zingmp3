import React, { useState } from 'react'
import { ListItemSong } from '~/models/musicInterfaces'
import icons from '~/utils/icons'
import ItemSongAlbum from './ItemSongAlbum'
import dayjs from 'dayjs'
import MenuSort from './MenuSort'
import { useAppSelector } from '~/redux/hooks'
import { selectPlaylist } from '~/redux/slices/musicSlice'

const { BsDot, FaSort } = icons

interface Props {
  songs: ListItemSong[]
  duration: number
}

const ListSongAlbum = (props: Props) => {
  const { songs, duration } = props
  const [isOpenMenuSort, setIsOpenMenuSort] = useState<boolean>(false)
  const playlist = useAppSelector(selectPlaylist)

  return (
    <div className='w-full flex flex-col text-xs text-[#696969]'>
      <div className='flex  items-center p-[10px] font-semibold'>
        <span className='w-1/2 flex items-center gap-2 cursor-pointer'>
          <span
            onClick={() => setIsOpenMenuSort(!isOpenMenuSort)}
            onBlur={() => setIsOpenMenuSort(false)}
            className='relative'
          >
            <FaSort size={16} />
            <span>
              <MenuSort
                isOpen={isOpenMenuSort}
                item1='Mặc định'
                item2='Tên bài hát (A-Z)'
                item3='Tên ca sĩ (A-Z)'
                item4='Tên Album (A-Z)'
              />
            </span>
          </span>
          <span>BÀI HÁT</span>
        </span>
        <span className='w-[30%]'>ALBUM</span>
        <span className='flex-1 justify-end flex'>THỜI GIAN</span>
      </div>
      <div className='flex flex-col'>
        {playlist?.map((item) => (
          <ItemSongAlbum key={item.encodeId} songData={item} />
        ))}
      </div>
      <span className='flex items-center gap-1 py-[10px] border-t border-[rgba(0,0,0,0.05)]'>
        <span>{`${songs?.length} bài hát`}</span>
        <BsDot size={24} />
        {/* <span>{dayjs.unix(duration).format('HH:mm:ss')}</span> */}
        <span>{dayjs.unix(duration).format('HH:mm:ss')}</span>
      </span>
    </div>
  )
}

export default ListSongAlbum
