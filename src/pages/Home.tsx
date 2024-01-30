import { useEffect, useState } from 'react'
import { homeApi } from '~/apis'
import Slider from '~/components/Slider'
import { useAppDispatch } from '~/redux/hooks'
import { getHome, getBanner, getSongRelease } from '~/redux/slices/homeSlice'
import { Data, ListItemHome } from '~/models/homeInterfaces'
import ListRelease from '~/components/ListRelease'
import ListDataContainer from '~/components/ListDataContainer'

const Home = () => {
  const [springDataHome, setSpringDataHome] = useState<Data>({} as Data)

  console.log('springDataHome: ', springDataHome)

  const dispatch = useAppDispatch()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await homeApi.getHome()
        const data = response.data.data.items
        console.log('data: ', data)
        const bannerData = data.find((item: ListItemHome) => item.sectionType === 'banner')
        const releaseData = data.find((item: ListItemHome) => item.sectionType === 'new-release')
        const springData = data.find((item: ListItemHome) => item.sectionId === 'hSeasonTheme')
        console.log('springData: ', springData)
        dispatch(getHome(data))
        dispatch(getBanner(bannerData.items))
        dispatch(getSongRelease(releaseData.items))
        setSpringDataHome(springData)
      } catch (error) {
        console.log('Error: ', error)
      }
    }
    fetchData()
  }, [])

  return (
    <div className='w-full bg-[#CED9D9]'>
      <Slider />
      <ListRelease />
      <ListDataContainer data={springDataHome} isShowAll={false} />
    </div>
  )
}

export default Home
