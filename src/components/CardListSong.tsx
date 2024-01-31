import React, { useEffect, useState } from 'react'
import { useAppSelector } from '~/redux/hooks'
import { selectSongRelease } from '~/redux/slices/homeSlice'
import CartItemSong from './CartItemSong'
import { ListItemSong } from '~/models/musicInterfaces'

interface props {
  type: string
  pageSize: number
  page: number
}

const CardListSong: React.FC<props> = ({ type, page, pageSize }) => {
  const [data, setData] = useState<ListItemSong[]>([])
  const listSongRelease = useAppSelector(selectSongRelease)
  const dataAll = listSongRelease.all.slice(0, 12)
  const dataVPop = listSongRelease.vPop.slice(0, 12)
  const dataOthers = listSongRelease.others.slice(0, 12)

  useEffect(() => {
    const handleFetchData = () => {
      if (type === 'all') {
        setData(dataAll.slice((page - 1) * pageSize, page * pageSize))
      } else if (type === 'vPop') {
        setData(dataVPop.slice((page - 1) * pageSize, page * pageSize))
      } else {
        setData(dataOthers.slice((page - 1) * pageSize, page * pageSize))
      }
    }
    handleFetchData()
  }, [type, page])

  return (
    <div className='w-[32%]'>
      {data.map((item) => (
        <CartItemSong key={item?.encodeId} songRelease={item} />
      ))}
    </div>
  )
}

export default CardListSong
