import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { musicApi } from '~/apis/apiMusic'
import { Artists, ListItemSong, PlaylistInfo } from '~/models/musicInterfaces'
import icons from '~/utils/icons'
import CardItemSkeleton from './CardItemSkeleton'
import CardListSkeleton from './CardListSkeleton'
import BgImage from './BgImage'

interface Props {
  playlistId: string
  artist: Artists | null
}

const { AiOutlineUserAdd, IoPlay } = icons

const ArtistToolTip = (props: Props) => {
  const { playlistId, artist } = props
  const [artistData, setArtistData] = useState<PlaylistInfo | null>(null)
  const [songRelease, setSongRelease] = useState<ListItemSong[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (playlistId !== '' && playlistId !== undefined) {
          setArtistData(null)
          setSongRelease([])
          const response = await musicApi.getDetailPlaylist(playlistId)
          setArtistData(response?.data?.data)
          handleAddSongRelease(response?.data?.data)
        }
      } catch (error) {
        console.log('Error: ', error)
      }
    }
    fetchData()
  }, [playlistId])

  const handleAddSongRelease = (data: PlaylistInfo) => {
    const listSongs = data?.song?.items
    if (listSongs) {
      const sortData = listSongs.sort((a, b) => {
        return b.releaseDate - a.releaseDate
      })
      setSongRelease(sortData.slice(0, 4))
    }
  }

  return (
    <>
      {artistData === null ? (
        <CardListSkeleton />
      ) : (
        <>
          <div className='absolute w-[348px] h-auto top-0 right-[10px] rounded-2xl bg-[#e0ebeb]'>
            <div className='h-20 px-4 py-4 w-full flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <div className='w-12 h-12 rounded-full relative group'>
                  <div
                    className={`invisible group-hover:visible rounded-full cursor-pointer z-10 w-full h-full absolute top-0 left-0 bg-[rgba(0,0,0,0.5)]`}
                  ></div>
                  <img
                    src={artist?.thumbnail}
                    alt='Avatar Artist'
                    className='w-full h-full rounded-full object-cover cursor-pointer'
                  ></img>
                  {/* {isPlaying ? ( */}
                  <span
                    className={`invisible group-hover:visible z-20 cursor-pointer absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center text-white hover:opacity-0.8`}
                  >
                    {/* {isPlaying ? (
                        <span
                          className={`bg-cover flex items-center justify-center w-[50px] h-[50px] border-2 border-white rounded-full`}
                        >
                          <span
                            className={`bg-[url('https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif')] w-9 h-9`}
                          ></span>
                        </span>
                      ) : ( */}
                    <IoPlay size={20} />
                    {/* )}
                    </span>
                  ) : (
                    <span
                      className={`${
                        isBlockBgImage ? 'visible' : 'invisible'
                      } group-hover:visible cursor-pointer z-20 absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center text-white hover:opacity-0.8`}
                    >
                      <IoPlay size={20} /> */}
                  </span>
                  {/* )} */}
                </div>
                <div>
                  <div className='text-sm text-[#32323D] font-semibold cursor-pointer hover:text-[#0F7070]'>
                    {artist?.name}
                  </div>
                  {artist?.totalFollow ? (
                    <div className='text-xs text-[#696969] mt-[2px]'>
                      {`${Math.round(artist?.totalFollow / 1000)}K quan tâm`}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className='px-3 py-1 bg-[#0E8080] text-white font-medium rounded-full flex items-center gap-1 cursor-pointer opacity-[0.8] hover:opacity-[1]'>
                <AiOutlineUserAdd />
                <span>QUAN TÂM</span>
              </div>
            </div>
            <div className='px-4'>
              <div className='text-sm text-[#32323D] mb-2 font-bold'>Mới nhất</div>
              {artist?.playlistId && (
                <div className='flex gap-2'>
                  {songRelease.length > 0 ? (
                    songRelease.map((item) => (
                      <div key={item?.encodeId} className='w-[23%]'>
                        <div className='w-full overflow-hidden h-[70px] rounded-lg relative group'>
                          <BgImage
                            Data={item}
                            Icon={IoPlay}
                            Style={{
                              rounded: 'rounded-lg',
                              width: 6,
                              height: 6,
                              iconSize: 20,
                              isCircle: false
                            }}
                          />
                        </div>
                        <div className='my-1 text-xs text-[#32323D] w-full h-[70px]'>
                          <div className='line-clamp-2 h-[30px] text-ellipsis break-words overflow-hidden'>
                            {item?.title}
                          </div>
                          <div className='h-auto mt-[3px]'>
                            {dayjs.unix(item?.releaseDate).get('year')}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className='px-4 pb-5'>
                      <div className='h-[21px] w-16 rounded-full bg-[#c3d0cf] animate-pulse mb-2'></div>
                      <div className='flex items-center justify-between'>
                        <CardItemSkeleton />
                        <CardItemSkeleton />
                        <CardItemSkeleton />
                        <CardItemSkeleton />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default ArtistToolTip
