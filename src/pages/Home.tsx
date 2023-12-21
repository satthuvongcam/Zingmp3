import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { HomeAPI } from '~/apis'
import Slider from '~/components/Slider'
import { useAppSelector, useAppDispatch } from '~/redux/hooks'
import { getHome, selectHome, selectBanner, getBanner } from '~/redux/slices/homeSlice'
import { ItemHome } from '~/models/homeInterfaces'

const Home = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await HomeAPI.getHome()
        const data = response.data.data.items
        const dataBanner = data.find((item: ItemHome) => item.sectionType === 'banner')
        dispatch(getHome(data))
        dispatch(getBanner(dataBanner.items))
      } catch (error) {
        console.log('Error: ', error)
      }
    }
    fetchData()
  }, [])

  return (
    <div className='w-full px-[59px] bg-[#CED9D9]'>
      <Slider />
    </div>
  )
}

export default Home
