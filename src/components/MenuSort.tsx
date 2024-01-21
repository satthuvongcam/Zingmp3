import React from 'react'
import { useDispatch } from 'react-redux'
import { ListItemSong } from '~/models/musicInterfaces'
import { useAppSelector } from '~/redux/hooks'
import { selectOriginalPlaylist, selectPlaylist, setPlaylist } from '~/redux/slices/musicSlice'

interface props {
  isOpen: boolean
  item1: String
  item2: String
  item3: String
  item4: String
}

const MenuSort: React.FC<props> = ({ isOpen, item1, item2, item3, item4 }) => {
  const playlist = useAppSelector(selectPlaylist)
  const originalPlaylist = useAppSelector(selectOriginalPlaylist)
  const dispatch = useDispatch()

  const handleSort = (type: keyof ListItemSong | null) => {
    if (!type) {
      dispatch(setPlaylist(originalPlaylist))
    } else {
      const sortedSongs = [...playlist]
      const sort = sortedSongs.sort((a: ListItemSong, b: ListItemSong) => {
        if (type === 'album') {
          if (!a[type] && !b[type]) {
            return -1
          }

          if (!a[type]) {
            return 1
          }

          if (!b[type]) {
            return -1
          }
          return a[type]['title'].localeCompare(b[type]['title'], 'vi', { sensitivity: 'base' })
        } else if (type === 'artistsNames' || type === 'title') {
          return a[type].localeCompare(b[type], 'vi', { sensitivity: 'base' })
        } else {
          return 0
        }
      })
      dispatch(setPlaylist(sort))
    }
  }

  return (
    <div
      className={`${
        isOpen ? 'block' : 'hidden'
      } px-[5px] py-[5px] text-xs rounded-lg bg-[#e0ebeb] shadow-[0_2px_8px_0_rgba(0, 0, 0, .2)] w-max min-w-full z-[99] absolute top-7 left-0`}
    >
      <div
        onClick={() => handleSort(null)}
        className='rounded px-[10px] py-[10px] text-left cursor-pointer hover:text-[#0f7070] hover:bg-[#ffffff4d]'
      >
        {item1}
      </div>
      <div
        onClick={() => handleSort('title')}
        className='rounded px-[10px] py-[10px] text-left cursor-pointer hover:text-[#0f7070] hover:bg-[#ffffff4d]'
      >
        {item2}
      </div>
      <div
        onClick={() => handleSort('artistsNames')}
        className='rounded px-[10px] py-[10px] text-left cursor-pointer hover:text-[#0f7070] hover:bg-[#ffffff4d]'
      >
        {item3}
      </div>
      <div
        onClick={() => handleSort('album')}
        className='rounded px-[10px] py-[10px] text-left cursor-pointer hover:text-[#0f7070] hover:bg-[#ffffff4d]'
      >
        {item4}
      </div>
    </div>
  )
}

export default MenuSort
