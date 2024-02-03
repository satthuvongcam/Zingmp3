import { useEffect, useState } from 'react'
import { homeApi } from '~/apis'
import Slider from '~/components/Slider'
import { useAppDispatch } from '~/redux/hooks'
import { getHome, getBanner, getSongRelease } from '~/redux/slices/homeSlice'
import { Data, ListItemHome } from '~/models/homeInterfaces'
import ListRelease from '~/components/ListRelease'
import ListDataContainer from '~/components/ListDataContainer'
import RankingSong from '~/components/RankingSong'

const Home = () => {
  const [springDataHome, setSpringDataHome] = useState<Data>({} as Data)
  const [remixDataHome, setRemixDataHome] = useState<Data>({} as Data)
  const [chillDataHome, setChillDataHome] = useState<Data>({} as Data)
  // const [moodDataHome, setMoodDataHome] = useState<Data>({} as Data)
  const [rankingNewSongDataHome, setRankingNewSongDataHome] = useState<Data>({} as Data)

  const dispatch = useAppDispatch()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await homeApi.getHome()
        const data = response.items
        console.log('data: ', data)
        const bannerData = data.find((item: ListItemHome) => item.sectionType === 'banner')
        const releaseData = data.find((item: ListItemHome) => item.sectionType === 'new-release')
        const springData = data.find((item: ListItemHome) => item.sectionId === 'hSeasonTheme')
        const remixData = data.find((item: ListItemHome) => item.sectionId === 'hEditorTheme3')
        const chillData = data.find((item: ListItemHome) => item.sectionId === 'hEditorTheme')
        // const moodData = data.find((item: ListItemHome) => item.sectionId === 'hEditorTheme4')
        const rankingNewSongData = data.find(
          (item: ListItemHome) => item.sectionId === 'hNewrelease'
        )
        dispatch(getHome(data))
        dispatch(getBanner(bannerData.items))
        dispatch(getSongRelease(releaseData.items))
        setSpringDataHome(springData)
        setRemixDataHome(remixData)
        setChillDataHome(chillData)
        // setMoodDataHome(moodData)
        setRankingNewSongDataHome(rankingNewSongData)
      } catch (error) {
        console.log('Error: ', error)
      }
    }
    fetchData()
  }, [])

  return (
    <div className='w-full h-full bg-[#CED9D9]'>
      <Slider />
      <ListRelease />
      <ListDataContainer
        data={springDataHome}
        isShowAll={false}
        numberOfItem={5}
        isRanking={false}
      />
      <ListDataContainer data={remixDataHome} isShowAll={true} numberOfItem={5} isRanking={false} />
      <ListDataContainer data={chillDataHome} isShowAll={true} numberOfItem={5} isRanking={false} />
      {/* <ListDataContainer data={moodDataHome} isShowAll={true} numberOfItem={5} isRanking={false} /> */}
      <ListDataContainer data={rankingNewSongDataHome} isShowAll={true} isRanking={true} />
    </div>
  )
}

export default Home
