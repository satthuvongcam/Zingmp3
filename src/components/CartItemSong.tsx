import dayjs from 'dayjs'
import { CustomFlowbiteTheme, Flowbite, Tooltip } from 'flowbite-react'
import React, { useRef, useState } from 'react'
import { ListItemSong } from '~/models/musicInterfaces'
import { useAppSelector } from '~/redux/hooks'
import { selectCurrentSong } from '~/redux/slices/musicSlice'
import ArtistToolTip from './ArtistToolTip'
import icons from '~/utils/icons'
import BgImage from './BgImage'

interface props {
  songRelease: ListItemSong
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

const { IoPlay } = icons

const CartItemSong: React.FC<props> = ({ songRelease }) => {
  const [playlistIdHover, setPlaylistIdHover] = useState<string>('')
  const currentSongId = useAppSelector(selectCurrentSong)

  // Lấy ngày hiện tại
  const today = new Date(Date.now()).getDate()

  // Lấy ngày ra mắt bài hát
  const releaseDate = dayjs.unix(songRelease?.releaseDate).date()

  // Tính số ngày chênh lệch
  const daysDiff = today - releaseDate

  const ref = useRef<HTMLSpanElement>(null)
  console.log()

  return (
    <div
      className={`flex px-[10px] py-[10px] ${
        songRelease.encodeId === currentSongId ? 'bg-[#ffffff4d]' : ''
      }`}
    >
      <div className='w-[60px] h-[60px] rounded-lg overflow-hidden relative group'>
        <BgImage
          Data={songRelease}
          Icon={IoPlay}
          Style={{ rounded: 'rounded-lg', width: 6, height: 6, iconSize: 20, isCircle: false }}
        />
      </div>
      <div className='ml-2 flex-1'>
        <div className='text-sm font-medium line-clamp-1 text-ellipsis break-words overflow-hidden'>
          {songRelease?.title}
        </div>
        <div className='w-full flex items-center gap-1 text-xs text-[#696969] mt-[3px]'>
          {songRelease?.artists?.map((artist, index) => {
            return (
              <div key={artist.id}>
                <Flowbite theme={{ theme: customTooltip }}>
                  <Tooltip
                    style='light'
                    content={<ArtistToolTip playlistId={playlistIdHover} artist={artist} />}
                  >
                    <span
                      ref={ref}
                      onMouseEnter={() => {
                        if (artist?.playlistId) {
                          setPlaylistIdHover(artist?.playlistId)
                        }
                      }}
                      onMouseLeave={() => {
                        setPlaylistIdHover('')
                      }}
                      className='cursor-pointer hover:text-[#0e8080] hover:underline'
                    >
                      {artist.name}
                    </span>
                    {index === songRelease?.artists?.length - 1 ? '' : ', '}
                  </Tooltip>
                </Flowbite>
              </div>
            )
          })}
        </div>
        <div className='mt-[3px] text-xs text-[#696969]'>
          {daysDiff === 0 ? 'Hôm nay' : daysDiff === 1 ? 'Hôm qua' : `${daysDiff} ngày trước`}
        </div>
      </div>
    </div>
  )
}

export default CartItemSong
