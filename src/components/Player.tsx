import React, { useEffect, useRef, useState } from 'react'
import { useAppSelector, useAppDispatch } from '~/redux/hooks'
import { selectIsPlaying, selectCurrentSong, setPlay } from '~/redux/slices/musicSlice'
import icons from '~/utils/icons'
import { ListItemSong } from '~/models/musicInterfaces'
import { musicApi } from '~/apis/apiMusic'
import { toast } from 'react-toastify'
import dayjs from 'dayjs'

const {
  FaRegHeart,
  BsThreeDotsVertical,
  CiShuffle,
  MdSkipPrevious,
  MdSkipNext,
  IoPlayCircleOutline,
  IoPauseCircleOutline,
  IoRepeat
} = icons

const Player = () => {
  const isPlaying = useAppSelector(selectIsPlaying)
  const currentSongId = useAppSelector(selectCurrentSong)
  const [audio, setAudio] = useState(new Audio())
  const [songInfo, setSongInfo] = useState<ListItemSong>({} as ListItemSong)
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout>()
  const [currentTimeSong, setCurrentTimeSong] = useState<number>(0)

  const trackRef = useRef<HTMLDivElement>(null)
  const thumbReb = useRef<HTMLDivElement>(null)

  const dispatch = useAppDispatch()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await musicApi.getDetailSong(currentSongId)
        const res2 = await musicApi.getSong(currentSongId)
        if (res1.data.err === 0) {
          setSongInfo(res1.data.data)
        }
        if (res2.data.err === 0) {
          audio.pause()
          setAudio(new Audio(res2.data.data['128']))
        } else {
          dispatch(setPlay(false))
          setAudio(new Audio())
          toast.info(res2.data.msg)
        }
      } catch (error) {
        console.log('Error fetching data in player: ', error)
      }
    }
    fetchData()
  }, [currentSongId])

  const play = async () => {
    await audio.play()
  }

  useEffect(() => {
    intervalId && clearInterval(intervalId)
    audio.pause()
    audio.load()
    audio.currentTime = 0
    if (isPlaying) {
      audio.play()
      const intervalid = setInterval(() => {
        let percent = Math.round((audio.currentTime * 1000) / songInfo.duration) / 100
        if (thumbReb.current) {
          thumbReb.current.style.cssText = `right: ${100 - percent}%`
        }
        setCurrentTimeSong(Math.round(audio.currentTime))
      }, 200)
      setIntervalId(intervalid)
    }
  }, [audio, isPlaying])

  const handleTogglePlayMusic = async () => {
    if (isPlaying) {
      audio.pause()
      dispatch(setPlay(false))
    } else {
      play()
      dispatch(setPlay(true))
    }
  }

  return (
    <div className='bg-[#c0d8d8] h-full px-5 flex z-50'>
      <div className='w-[30%] flex-auto flex gap-3 items-center'>
        <img
          src={songInfo?.thumbnail}
          alt='Image Detail Song'
          className='w-16 h-16 object-cover rounded-md'
        />
        <div className='flex flex-col'>
          <span className='font-semibold text-gray-600 text-sm'>{songInfo?.title}</span>
          <span className='text-xs text-gray-500'>{songInfo?.artistsNames}</span>
        </div>
        <div className='flex gap-4'>
          <span>
            <FaRegHeart size={16} />
          </span>
          <span>
            <BsThreeDotsVertical size={16} />
          </span>
        </div>
      </div>
      <div className='w-[40%] flex-auto flex items-center justify-center flex-col py-2'>
        <div className='flex items-center justify-center gap-6'>
          <span className='cursor-pointer' title='Bật phát ngẫu nhiên'>
            <CiShuffle size={24} />
          </span>
          <span className='cursor-pointer'>
            <MdSkipPrevious size={24} />
          </span>
          <span
            className='text-gray-700 p-1 cursor-pointer hover:text-[#0E8080]'
            onClick={handleTogglePlayMusic}
          >
            {isPlaying ? <IoPauseCircleOutline size={40} /> : <IoPlayCircleOutline size={40} />}
          </span>
          <span className='cursor-pointer'>
            <MdSkipNext size={24} />
          </span>
          <span className='cursor-pointer' title='Bật phát lại tất cả'>
            <IoRepeat size={24} />
          </span>
        </div>

        <div className='w-full flex items-center'>
          <span>{dayjs.unix(currentTimeSong).format('mm:ss')}</span>
          <div
            ref={trackRef}
            className='bg-[rgba(0,0,0,0.1)] relative m-auto h-[3px] w-4/5 rounded-l-full rounded-r-full'
          >
            <div
              ref={thumbReb}
              id='thumb-progress'
              className='bg-[#0e8080] absolute top-0 left-0 h-[3px] rounded-l-full rounded-r-full'
            ></div>
          </div>
          <span>{dayjs.unix(songInfo?.duration).format('mm:ss')}</span>
        </div>
      </div>
      <div className='w-[30%] flex-auto flex items-center'>Volume</div>
    </div>
  )
}

export default Player
