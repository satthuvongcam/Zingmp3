import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { musicApi } from '~/apis/apiMusic'
import { PlaylistInfo } from '~/models/musicInterfaces'
import * as dayjs from 'dayjs'
import { Scrollbars } from 'react-custom-scrollbars-2'
import ListSongAlbum from '~/components/ListSongAlbum'
import icons from '~/utils/icons'
import { CustomFlowbiteTheme, Flowbite, Tooltip } from 'flowbite-react'
import ArtistToolTip from '~/components/ArtistToolTip'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import {
  selectIsPlaying,
  setOriginalPlaylist,
  setPlay,
  setPlaylist
} from '~/redux/slices/musicSlice'

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

const { IoPlayCircleOutline, IoPlay, IoPauseOutline, IoMdHeartEmpty, HiOutlineDotsHorizontal } =
  icons

const Album = () => {
  const { pid } = useParams()
  const [playlistData, setPlayListData] = useState<PlaylistInfo>({} as PlaylistInfo)
  const [playlistIdHover, setPlaylistIdHover] = useState<string>('')
  const isPlaying = useAppSelector(selectIsPlaying)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (pid !== undefined) {
          const response = await musicApi.getDetailPlaylist(pid)
          if (response?.data.err === 0) {
            setPlayListData(response.data?.data)
            dispatch(setPlaylist(response.data?.data?.song?.items))
            dispatch(setOriginalPlaylist(response.data?.data?.song?.items))
          }
        }
      } catch (error) {
        console.log('Error fetching data in album: ', error)
      }
    }
    fetchData()
  }, [pid])

  return (
    <div className='flex w-full gap-8 h-full px-[59px]'>
      <div className='flex-none w-1/4 flex flex-col items-center gap-2'>
        <div className='w-full rounded-[8px] shadow-[0_5px_8px_0_rgba(0, 0, 0, .2)] relative group cursor-pointer overflow-hidden'>
          <div
            className={`invisible group-hover:visible rounded-[8px] z-[1] w-full h-full absolute top-0 left-0 bg-[rgba(0,0,0,0.5)]`}
          ></div>
          <img
            src={playlistData?.thumbnailM}
            alt='thumbnail'
            className={`w-full h-full object-contain rounded-[8px] transition-transform transform group-hover:scale-110 transform-origin-center duration-700 ease`}
          />
          <span className='invisible group-hover:visible z-[2] absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center text-white hover:opacity-0.8'>
            <IoPlayCircleOutline size={50} />
          </span>
        </div>
        <div className='flex flex-col items-center gap-1'>
          <h3 className='text-[20px] font-bold text-[#32323d]'>{playlistData?.title}</h3>
          <span className='flex gap-2 items-center text-[#696969] text-xs'>
            <span>Cập nhật: </span>
            <span>{dayjs.unix(playlistData?.contentLastUpdate).format('DD/MM/YYYY')}</span>
          </span>
          <span className='flex gap-1 flex-wrap items-center text-[#696969] text-xs'>
            {playlistData?.artists?.map((item, index) => {
              return (
                <Flowbite theme={{ theme: customTooltip }}>
                  <Tooltip
                    style='light'
                    content={<ArtistToolTip playlistId={playlistIdHover} artist={item} />}
                  >
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
                      {index === playlistData?.artists?.length - 1 ? item?.name : `${item?.name},`}
                    </span>
                  </Tooltip>
                </Flowbite>
              )
            })}
          </span>
          <span className='flex gap-2 items-center text-[#696969] text-xs'>
            {playlistData?.like >= 1000
              ? `${Math.round(playlistData?.like / 1000)}K người yêu thích`
              : `${playlistData?.like} người yêu thích`}
          </span>
          <div className='my-4'>
            <button
              onClick={() => {
                dispatch(setPlay(!isPlaying))
              }}
              className='flex items-center justify-center gap-1 bg-[#0e8080] border border-[#0e8080] px-6 py-[9px] rounded-full opacity-[0.9] hover:opacity-[1] text-white text-sm font-semibold'
            >
              {isPlaying === true ? (
                <>
                  <IoPauseOutline size={16} />
                  <span>TẠM DỪNG</span>
                </>
              ) : (
                <>
                  <IoPlay size={16} />
                  <span>TIẾP TỤC PHÁT</span>
                </>
              )}
            </button>
          </div>
          <span className='flex gap-5 items-center'>
            <button
              title='Thêm vào thư viện'
              className='flex items-center justify-center rounded-full bg-[#ffffff4d] w-[35px] h-[35px] opacity-[0.6] hover:opacity-[1]'
            >
              <IoMdHeartEmpty size={16} />
            </button>
            <button
              title='Khác'
              className='flex items-center justify-center rounded-full bg-[#ffffff4d] w-[35px] h-[35px] opacity-[0.6] hover:opacity-[1]'
            >
              <HiOutlineDotsHorizontal size={16} />
            </button>
          </span>
        </div>
      </div>
      <Scrollbars style={{ width: '100%', height: '80%' }}>
        <div className='flex-auto mb-40'>
          <span className='text-sm'>
            <span className='text-[#696969]'>Lời tựa </span>
            <span className='text-[#32323D]'>{playlistData?.sortDescription}</span>
          </span>
          <ListSongAlbum
            songs={playlistData?.song?.items}
            duration={playlistData?.song?.totalDuration}
          />
        </div>
      </Scrollbars>
    </div>
  )
}

export default Album
