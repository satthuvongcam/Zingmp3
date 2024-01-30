import { IconType } from 'react-icons'
import { ListItemSong } from '~/models/musicInterfaces'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import {
  selectCurrentSong,
  selectIsPlaying,
  setCurrentSongId,
  setPlay
} from '~/redux/slices/musicSlice'

interface Style {
  rounded: string
  width: number
  height: number
  iconSize: number
  widthParent?: number
  heightParent?: number
  isCircle: boolean
}

interface Props {
  Data: ListItemSong
  Icon: IconType
  Style: Style
}

const BgImage = (props: Props) => {
  const { Data, Icon, Style } = props

  const isPlaying = useAppSelector(selectIsPlaying)
  const currentSongId = useAppSelector(selectCurrentSong)

  const dispatch = useAppDispatch()

  return (
    <>
      <div
        className={`${
          currentSongId === Data?.encodeId ? 'visible' : 'invisible'
        } group-hover:visible ${
          Style.rounded
        } cursor-pointer z-10 w-full h-full absolute top-0 left-0 bg-[rgba(0,0,0,0.5)]`}
      ></div>
      <img
        src={Data?.thumbnail}
        alt='Avatar release song'
        className={`w-full h-full ${Style.rounded} transition-transform transform group-hover:scale-110 transform-origin-center duration-700 ease`}
      />
      {isPlaying ? (
        <span
          onClick={() => {
            if (Data?.encodeId !== currentSongId) {
              dispatch(setPlay(true))
              dispatch(setCurrentSongId(Data?.encodeId))
            } else {
              dispatch(setPlay(!isPlaying))
            }
          }}
          className={`${
            isPlaying && currentSongId === Data?.encodeId ? 'visible' : 'invisible'
          } group-hover:visible z-10 cursor-pointer absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center text-white hover:opacity-0.8`}
        >
          {isPlaying && currentSongId === Data?.encodeId ? (
            <span
              className={`bg-cover flex items-center justify-center ${
                Style.isCircle &&
                `w-${Style.widthParent} h-${Style.heightParent} border-2 border-white rounded-full`
              }`}
            >
              <span
                className={`bg-[url('https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif')] w-${Style.width} h-${Style.height}`}
              ></span>
            </span>
          ) : (
            <Icon size={Style.iconSize} />
          )}
        </span>
      ) : (
        <span
          onClick={() => {
            if (Data?.encodeId !== currentSongId) {
              dispatch(setPlay(true))
              dispatch(setCurrentSongId(Data?.encodeId))
            } else {
              dispatch(setPlay(!isPlaying))
            }
          }}
          className={`${
            currentSongId === Data?.encodeId ? 'visible' : 'invisible'
          } group-hover:visible cursor-pointer z-10 absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center text-white hover:opacity-0.8`}
        >
          <Icon size={Style.iconSize} />
        </span>
      )}
    </>
  )
}

export default BgImage
