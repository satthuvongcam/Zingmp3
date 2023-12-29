import React from 'react'
import { ListItemSong } from '~/models/musicInterfaces'
import icons from '~/utils/icons'
import ItemSongAlbum from './ItemSongAlbum'
import dayjs from 'dayjs'

const { BsDot } = icons

interface Props {
  songs: ListItemSong[]
  duration: number
}

const ListSongAlbum = (props: Props) => {
  const { songs, duration } = props

  return (
    <div className='w-full flex flex-col text-xs text-[#696969]'>
      <div className='flex  items-center p-[10px] font-semibold'>
        <span className='w-1/2'>BÀI HÁT</span>
        <span className='w-[30%]'>ALBUM</span>
        <span className='flex-1 justify-end flex'>THỜI GIAN</span>
      </div>
      <div className='flex flex-col'>
        {songs?.map((item) => (
          <ItemSongAlbum key={item.encodeId} songData={item} />
        ))}
      </div>
      <span className='flex items-center gap-1 py-[10px] border-t border-[rgba(0,0,0,0.05)]'>
        <span>{`${songs?.length} bài hát`}</span>
        <BsDot size={24} />
        <span>{dayjs.unix(duration).format('HH:mm:ss')}</span>
      </span>
    </div>
  )
}

export default ListSongAlbum
