import React from 'react'
import { ListItemSong } from '~/models/musicInterfaces'
import { useAppDispatch } from '~/redux/hooks'
import icons from '~/utils/icons'
import dayjs from 'dayjs'
import { setPlay, setCurrentSongId } from '~/redux/slices/musicSlice'

const { BsMusicNoteBeamed } = icons

interface Props {
  songData: ListItemSong
}

const ItemSongAlbum: React.FC<Props> = ({ songData }) => {
  const dispatch = useAppDispatch()

  return (
    <div
      onClick={() => {
        dispatch(setCurrentSongId(songData?.encodeId))
        dispatch(setPlay(true))
      }}
      className='flex justify-center cursor-default items-center p-[10px] border-t border-[rgba(0,0,0,0.05)] hover:bg-[#DDE4E4]'
    >
      <div className='flex items-center gap-3 w-1/2'>
        <span>
          <BsMusicNoteBeamed />
        </span>
        <img
          src={songData?.thumbnail}
          alt='img song'
          className='w-10 h-10 object-cover rounded-md'
        />
        <span className='flex flex-col w-full'>
          <span className='text-sm font-medium text-[#32323D]'>{songData?.album?.title}</span>
          <div className='flex gap-1'>
            {songData?.artists?.map((item, index) => (
              <span className='hover:cursor-pointer hover:underline hover:text-[#0f7070]'>
                {index === songData?.artists?.length - 1 ? item?.name : `${item?.name},`}
              </span>
            ))}
          </div>
        </span>
      </div>
      <div className='flex w-[30%] items-center justify-start'>{songData?.album?.title}</div>
      <div className='flex flex-1 justify-end'>
        {dayjs.unix(songData?.duration).format('mm:ss')}
      </div>
    </div>
  )
}

export default ItemSongAlbum
