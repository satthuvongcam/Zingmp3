import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { musicApi } from '~/apis/apiMusic'
import { PlaylistInfo } from '~/models/musicInterfaces'
import * as dayjs from 'dayjs'
import { Scrollbars } from 'react-custom-scrollbars-2'
import ListSongAlbum from '~/components/ListSongAlbum'
import icons from '~/utils/icons'

const { IoPlayCircleOutline } = icons

const Album = () => {
  const { pid } = useParams()
  const [playlistData, setPlayListData] = useState<PlaylistInfo>({} as PlaylistInfo)
  console.log('playlistData: ', playlistData)

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (pid !== undefined) {
          const response = await musicApi.getDetailPlaylist(pid)
          if (response?.data.err === 0) {
            setPlayListData(response.data?.data)
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
          <div className='invisible group-hover:visible rounded-[8px] z-[1] w-full h-full absolute top-0 left-0 bg-[rgba(0,0,0,0.5)]'></div>
          <img
            src={playlistData?.thumbnailM}
            alt='thumbnail'
            className='w-full h-full object-contain rounded-[8px] transition-transform transform group-hover:scale-110 transform-origin-center duration-700 ease'
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
          <span className='flex gap-1 items-center text-[#696969] text-xs'>
            {playlistData?.artists?.map((item, index) => (
              <span className='hover:cursor-pointer hover:underline hover:text-[#0f7070]'>{index === playlistData?.artists?.length - 1 ? item?.name : `${item?.name},`}</span>
            ))}
          </span>
          <span className='flex gap-2 items-center text-[#696969] text-xs'>
            {`${Math.round(playlistData?.like / 1000)}K người yêu thích`}
          </span>
        </div>
      </div>
      <Scrollbars style={{width: '100%', height: '80%'}}>
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
