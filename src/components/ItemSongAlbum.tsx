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
  const itemImageRef = useRef<HTMLSpanElement>(null)
  const itemPlayRef = useRef<HTMLSpanElement>(null)

  console.log('playlistIdHover: ', playlistIdHover)

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
        <div className='w-10 h-10 relative'>
          <div
            className={`${
              currentSongId === songData?.encodeId ? 'visible' : 'invisible'
            } group-hover:visible rounded-md z-[1] w-full h-full absolute top-0 left-0 bg-[rgba(0,0,0,0.5)]`}
          ></div>
          <img
            src={songData?.thumbnail}
            alt='img song'
            className='w-10 h-10 object-cover rounded-md cursor-pointer'
          />
          <span
            onClick={() => {
              if (currentSongId !== songData?.encodeId) {
                dispatch(setCurrentSongId(songData?.encodeId))
                dispatch(setPlay(true))
                dispatch(setIsAlbum(true))
                itemImageRef.current?.classList.add(
                  `bg-[url('https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif')]`
                )
                itemImageRef.current?.classList.add('visible')
              } else if (isPlaying === false) {
                dispatch(setPlay(true))
                dispatch(setIsAlbum(true))
                itemImageRef.current?.classList.add(
                  `bg-[url('https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif')]`
                )
                itemImageRef.current?.classList.add('visible')
                itemPlayRef.current?.classList.add('hidden')
              } else {
                dispatch(setPlay(false))
                itemImageRef.current?.classList.remove(
                  `bg-[url('https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif')]`
                )
                itemPlayRef.current?.classList.remove('hidden')
                itemPlayRef.current?.classList.add('block')
              }
            }}
            ref={itemImageRef}
            className={`${
              currentSongId == songData?.encodeId && isPlaying
                ? `visible bg-[url('https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif')]`
                : currentSongId == songData?.encodeId && isPlaying === false
                ? 'visible'
                : 'invisible'
            } group-hover:visible cursor-pointer z-[2] absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center text-white hover:opacity-0.8`}
          >
            {currentSongId == songData?.encodeId && isPlaying ? (
              <span ref={itemPlayRef} className='hidden'>
                <IoPlay size={18} />
              </span>
            ) : (
              <span ref={itemPlayRef} className='block'>
                <IoPlay size={18} />
              </span>
            )}
          </span>
        </div>
        <span className='flex flex-col flex-1'>
          <span className='text-sm font-medium text-[#32323D]'>{songData?.title}</span>
          <div className='flex gap-1'>
            {songData?.artists?.map((item, index) => {
              console.log('item: ', item)

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
                    className='hover:cursor-pointer hover:underline relative hover:text-[#0f7070]'
                  >
                    {index === songData?.artists?.length - 1 ? item?.name : `${item?.name},`}
                  </span>
                // </Tooltip>
                //   </Tooltip>
                // </Flowbite>
              )
            })}
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
