import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { homeApi } from '~/apis'
import Slider from '~/components/Slider'
import { useAppSelector, useAppDispatch } from '~/redux/hooks'
import { getHome, getBanner } from '~/redux/slices/homeSlice'
import { ItemHome } from '~/models/homeInterfaces'

const Home = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await homeApi.getHome()
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
    <div className='w-full bg-[#CED9D9]'>
      <Slider />
      {Array.from({length: 30}).map((item, i) => <div key={i}>HI</div>)}
    </div>
  )
}

export default Home
