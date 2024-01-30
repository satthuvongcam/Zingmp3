import { useState } from 'react'
import icons from '~/utils/icons'
import CardListSong from './CardListSong'

const { MdOutlineKeyboardArrowRight } = icons

const ListRelease = () => {
  const tabs = ['all', 'vPop', 'others']
  const [type, setType] = useState<string>('all')

  return (
    <div className='px-[59px] mt-12'>
      <h1 className='text-xl font-semibold mb-5'>Mới phát hành</h1>
      <div className='flex items-center justify-between text-xs mb-4'>
        <div className='flex items-center gap-4'>
          {tabs.map((tab) => (
            <button
              onClick={() => setType(tab)}
              className={`px-6 py-1 rounded-full border border-solid ${
                type === tab
                  ? 'border-[#0e8080] bg-[#0e8080] text-white opacity-[0.8] hover:opacity-[1]'
                  : 'border-[#0000001a]'
              }`}
            >
              {tab === 'all' ? 'TẤT CẢ' : tab === 'vPop' ? 'VIỆT NAM' : 'QUỐC TẾ'}
            </button>
          ))}
        </div>
        <div className='flex items-center gap-1 text-[#696969] cursor-pointer hover:text-[#0f7070] font-normal'>
          <span>TẤT CẢ</span>
          <MdOutlineKeyboardArrowRight size={20} />
        </div>
      </div>
      <div className='flex gap-4 items-center'>
        <CardListSong type={type} page={1} pageSize={4} />
        <CardListSong type={type} page={2} pageSize={4} />
        <CardListSong type={type} page={3} pageSize={4} />
      </div>
    </div>
  )
}

export default ListRelease
