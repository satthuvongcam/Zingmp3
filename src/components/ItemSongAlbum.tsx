import React, { useRef, useState } from 'react'
import { ListItemSong } from '~/models/musicInterfaces'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import icons from '~/utils/icons'
import dayjs from 'dayjs'
import {
  selectCurrentSong,
  selectIsPlaying,
  setIsAlbum,
  setCurrentSongId,
  setPlay,
  setPlaylist
} from '~/redux/slices/musicSlice'
import { CustomFlowbiteTheme, Flowbite, Tooltip } from 'flowbite-react'
import ArtistToolTip from './ArtistToolTip'
import BgImage from './BgImage'

const { BsMusicNoteBeamed, IoPlay } = icons

interface Props {
  songData: ListItemSong
}

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

const ItemSongAlbum: React.FC<Props> = ({ songData }) => {
  const dispatch = useAppDispatch()
  const isPlaying = useAppSelector(selectIsPlaying)
  const currentSongId = useAppSelector(selectCurrentSong)
  const [playlistIdHover, setPlaylistIdHover] = useState<string>('')

  return (
    <div
      className={`flex ${
        currentSongId == songData?.encodeId ? 'bg-[#DDE4E4]' : ''
      } justify-center cursor-default group items-center p-[10px] border-t border-[rgba(0,0,0,0.05)] hover:bg-[#DDE4E4]`}
    >
      <div
        onDoubleClick={() => {
          dispatch(setCurrentSongId(songData?.encodeId))
          dispatch(setPlay(!isPlaying))
          dispatch(setIsAlbum(true))
        }}
        className='flex items-center gap-3 w-1/2'
      >
        <span className='group-hover:hidden'>
          <BsMusicNoteBeamed size={14} />
        </span>
        <span className='hidden group-hover:block w-[14px] h-[14px]'>
          <input
            type='checkbox'
            className='flex items-center outline-none border-[rgba(50, 50, 61, 0.5)] w-full h-full font-bold rounded-[3px]'
          />
        </span>
        <div className='w-9 h-9 relative overflow-hidden rounded-md'>
          <BgImage
            Data={songData}
            Icon={IoPlay}
            Style={{ rounded: 'rounded-md', width: 6, height: 6, iconSize: 16, isCircle: false }}
          />
        </div>
        <div className='flex flex-col flex-1 w-[100px] pr-5'>
          <div className='text-sm font-medium text-[#32323D] text-ellipsis overflow-hidden whitespace-nowrap'>
            {songData?.title}
          </div>
          <div className='text-ellipsis overflow-hidden whitespace-nowrap'>
            {songData?.artists?.map((item, index) => {
              return (
                // <Flowbite theme={{ theme: customTooltip }}>
                //   <Tooltip
                //     style='light'
                //     content={<ArtistToolTip playlistId={playlistIdHover} artist={item} />}
                //   >
                // <Tooltip
                //   style='light'
                //   content={<ArtistToolTip playlistId={playlistIdHover} artist={item} />}
                // >
                <span
                  key={item.id}
                  onMouseEnter={() => {
                    if (item?.playlistId) {
                      setPlaylistIdHover(item?.playlistId)
                    }
                  }}
                  onMouseLeave={() => {
                    setPlaylistIdHover('')
                  }}
                  className='hover:cursor-pointer hover:underline relative hover:text-[#0f7070] mr-1'
                >
                  {index === songData?.artists?.length - 1 ? item?.name : `${item?.name},`}
                </span>
                //  </Tooltip>
                //   </Tooltip>
                // </Flowbite>
              )
            })}
          </div>
        </div>
      </div>
      <div className='w-[30%] text-ellipsis overflow-hidden whitespace-nowrap'>
        {songData?.album?.title}
      </div>
      <div className='flex flex-1 justify-end'>
        {dayjs.unix(songData?.duration).format('mm:ss')}
      </div>
    </div>
  )
}

export default ItemSongAlbum
