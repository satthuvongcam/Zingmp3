import { MouseEvent, useEffect, useRef, useState } from 'react'
import { useAppSelector, useAppDispatch } from '~/redux/hooks'
import {
  selectIsPlaying,
  selectCurrentSong,
  setPlay,
  selectIsAlbum,
  selectPlaylist,
  setCurrentSongId
} from '~/redux/slices/musicSlice'
import icons from '~/utils/icons'
import { ListItemSong } from '~/models/musicInterfaces'
import { musicApi } from '~/apis/apiMusic'
import { toast } from 'react-toastify'
import dayjs from 'dayjs'

const {
  FaRegHeart,
  BsThreeDotsVertical,
  BsVolumeMute,
  BsMusicNoteList,
  CiShuffle,
  MdSkipPrevious,
  MdSkipNext,
  IoPlayCircleOutline,
  IoPauseCircleOutline,
  IoRepeat,
  IoVolumeMediumOutline
} = icons

interface Props {
  setIsShowSideBarRight: any
}

const Player = (props: Props) => {
  const {setIsShowSideBarRight} = props

  const isPlaying = useAppSelector(selectIsPlaying)
  const currentSongId = useAppSelector(selectCurrentSong)
  const isAlbum = useAppSelector(selectIsAlbum)
  const playlist = useAppSelector(selectPlaylist)
  const [audio, setAudio] = useState(new Audio())
  const [songInfo, setSongInfo] = useState<ListItemSong>({} as ListItemSong)
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout>()
  const [currentTimeSong, setCurrentTimeSong] = useState<number>(0)
  const [indexSong, setIndexSong] = useState<number>(
    playlist.findIndex((item) => item.encodeId === currentSongId)
  )
  const [isShuffle, setIsShuffle] = useState<boolean>(false)
  const [volume, setVolume] = useState<number>(100)
  const [curVolume, setCurVolume] = useState<number>(100)
  const [isActiveButton, setIsActiveButton] = useState<boolean>(false)

  const trackRef = useRef<HTMLDivElement>(null)
  const thumbReb = useRef<HTMLDivElement>(null)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isPlaying === true) {
      dispatch(setPlay(false))
    }
  }, [])

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

  useEffect(() => {
    intervalId && clearInterval(intervalId)
    audio.pause()
    if (isPlaying) {
      audio.play()
      const intervalid = setInterval(() => {
        let percent = Math.round((audio.currentTime * 10000) / songInfo.duration) / 100
        if (thumbReb.current) {
          thumbReb.current.style.cssText = `right: ${100 - percent}%`
        }
        setCurrentTimeSong(Math.round(audio.currentTime))
        const index = playlist.findIndex((item) => item.encodeId === currentSongId)
        setIndexSong(index)
        if (audio.ended) {
          if (isShuffle === false) {
            if (index < playlist.length - 1) {
              dispatch(setPlay(false))
              setIndexSong((prev) => prev + 1)
              dispatch(setCurrentSongId(playlist[indexSong + 1].encodeId))
              dispatch(setPlay(true))
            } else {
              dispatch(setPlay(false))
            }
          } else {
            handleShuffle()
          }
        }
      }, 200)
      setIntervalId(intervalid)
    }
  }, [audio, isPlaying, isShuffle])

  useEffect(() => {
    audio.volume = volume / 100
  }, [volume])

  const handleTogglePlayMusic = async () => {
    if (isPlaying) {
      audio.pause()
      dispatch(setPlay(false))
    } else {
      audio.play()
      dispatch(setPlay(true))
    }
  }

  const handleClickProgressBar = (e: MouseEvent<HTMLDivElement>) => {
    const trackRect = trackRef.current?.getBoundingClientRect()
    if (trackRect?.left) {
      const percent = Math.round(((e.clientX - trackRect?.left) * 10000) / trackRect.width) / 100
      if (thumbReb.current) {
        thumbReb.current.style.cssText = `right: ${100 - percent}%`
      }
      audio.currentTime = (percent * songInfo.duration) / 100
      setCurrentTimeSong((percent * songInfo.duration) / 100)
    }
  }

  const handlePrevSong = () => {
    if (isAlbum) {
      if (indexSong > 0) {
        setIndexSong((prev) => prev - 1)
        dispatch(setCurrentSongId(playlist[indexSong - 1].encodeId))
        dispatch(setPlay(true))
      }
    }
  }

  const handleNextSong = () => {
    if (isAlbum) {
      if (indexSong < playlist.length - 1) {
        setIndexSong((prev) => prev + 1)
        dispatch(setCurrentSongId(playlist[indexSong + 1].encodeId))
        dispatch(setPlay(true))
      }
    }
  }

  const handleShuffle = () => {
    setIsShuffle((prev) => !prev)
    if (isShuffle) {
      const randomIndex = Math.round(Math.random() * playlist.length) - 1
      dispatch(setCurrentSongId(playlist[randomIndex].encodeId))
      dispatch(setPlay(true))
    }
  }

  const handleChangeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target) {
      if (+e.target.value > 0) {
        setCurVolume(+e.target.value)
      }
      setVolume(+e.target.value)
    }
  }

  return (
    <div className='bg-[#c0d8d8] h-full px-5 flex z-50'>
      <div className='w-[30%] flex-auto flex gap-3 items-center group'>
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
          <button
            onClick={handleShuffle}
            className={`cursor-pointer ${isShuffle ? 'text-[#0F7070]' : 'text-black'}`}
            title={`${isShuffle ? 'Tắt phát ngẫu nhiên' : 'Bật phát ngẫu nhiên'}`}
          >
            <CiShuffle size={24} />
          </button>
          <button
            onClick={handlePrevSong}
            className={`${
              isAlbum === true && indexSong > 0
                ? 'cursor-pointer'
                : 'text-gray-400 cursor-not-allowed'
            }`}
          >
            <MdSkipPrevious size={24} />
          </button>
          <button
            className='text-gray-700 p-1 cursor-pointer hover:text-[#0E8080]'
            onClick={handleTogglePlayMusic}
          >
            {isPlaying ? <IoPauseCircleOutline size={40} /> : <IoPlayCircleOutline size={40} />}
          </button>
          <button
            onClick={handleNextSong}
            className={`${
              isAlbum === true && indexSong < playlist.length - 1
                ? 'cursor-pointer'
                : 'text-gray-400 cursor-not-allowed'
            }`}
          >
            <MdSkipNext size={24} />
          </button>
          <button className='cursor-pointer' title='Bật phát lại tất cả'>
            <IoRepeat size={24} />
          </button>
        </div>

        <div className='w-full flex items-center'>
          <span>{dayjs.unix(currentTimeSong).format('mm:ss')}</span>
          <div
            ref={trackRef}
            className='bg-[rgba(0,0,0,0.1)] hover:h-[8px] cursor-pointer relative m-auto h-[3px] w-4/5 rounded-l-full rounded-r-full'
            onClick={handleClickProgressBar}
          >
            <div
              ref={thumbReb}
              id='thumb-progress'
              className='bg-[#0e8080] absolute top-0 left-0 bottom-0 rounded-l-full rounded-r-full'
            ></div>
          </div>
          <span>{dayjs.unix(songInfo?.duration).format('mm:ss')}</span>
        </div>
      </div>
      <div className='w-[30%] flex-auto flex items-center justify-end'>
        <div className='flex gap-2 items-center'>
          <span
            onClick={() => setVolume((prev) => (prev === 0 ? curVolume : 0))}
            className='text-gray-600 cursor-pointer'
          >
            {volume > 0 ? <IoVolumeMediumOutline size={25} /> : <BsVolumeMute size={25} />}
          </span>
          <input
            type='range'
            min={0}
            max={100}
            value={volume}
            onChange={handleChangeVolume}
            className='custom-range w-[60%]'
          />
        </div>
        <div className='w-[1px] h-[33px] mx-2 bg-[#0000000d]'></div>
        <button
          title='Danh sách phát'
          onClick={() => {
            setIsActiveButton((prev) => !prev)
            setIsShowSideBarRight((prev: boolean) => !prev)
          }}
          className={`${
            isActiveButton
              ? 'bg-[#0e8080] text-white opacity-[0.8] hover:opacity-[1]'
              : 'bg-[#ffffff1a] text-[#32323d]'
          } rounded h-[30px] px-[5px] border border-solid font-medium text-xs ml-5`}
        >
          <BsMusicNoteList size={16} />
        </button>
      </div>
    </div>
  )
}

export default Player
