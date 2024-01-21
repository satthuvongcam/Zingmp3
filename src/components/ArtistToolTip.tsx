import dayjs from 'dayjs'
import React, { useEffect, useRef, useState } from 'react'
import { musicApi } from '~/apis/apiMusic'
import { Artists, ListItemSong, PlaylistInfo } from '~/models/musicInterfaces'
import icons from '~/utils/icons'
import CardItem from './CardList'
import CardList from './CardList'

interface Props {
  playlistId: string
  artist: Artists | null
}

const { AiOutlineUserAdd } = icons

const ArtistToolTip = (props: Props) => {
  const { playlistId, artist } = props
  const [artistData, setArtistData] = useState<PlaylistInfo | null>(null)
  const [songRelease, setSongRelease] = useState<ListItemSong[]>([])

  console.log('playlistId: ', playlistId)

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
        <CardList />
      ) : (
        <>
          <div className='absolute w-[348px] h-auto top-0 left-5 rounded-2xl bg-[#e0ebeb]'>
            <div className='h-20 px-4 py-4 w-full flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <div className='w-12 h-12 rounded-full'>
                  <img
                    src={artist?.thumbnail}
                    alt='Avatar Artist'
                    className='w-full h-full rounded-full object-cover cursor-pointer'
                  ></img>
                </div>
                <div>
                  <div className='text-sm text-[#32323D] font-semibold hover:text-[#0F7070]'>
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
                        <div className='w-full h-[70px] rounded-lg'>
                          <img
                            src={item?.thumbnail}
                            alt='Avatar release song'
                            className='w-full h-[70px] rounded-lg'
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
                        <CardItem />
                        <CardItem />
                        <CardItem />
                        <CardItem />
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
