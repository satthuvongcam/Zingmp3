import CardItemSkeleton from './CardItemSkeleton'

const CardListSkeleton = () => {
  return (
    <div className='absolute w-[348px] h-auto top-0 right-[10px] skeleton bg-[#e0ebeb]'>
      <div className='h-20 px-4 py-4 w-full flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <div className='w-12 h-12 rounded-full bg-[#c3d0cf] animate-pulse'></div>
          <div>
            <div className='h-4 w-24 rounded-full bg-[#c3d0cf] animate-pulse mb-2'></div>
            <div className='h-3 w-20 rounded-full bg-[#c3d0cf] animate-pulse'></div>
          </div>
        </div>
        <div className='px-3 py-2 rounded-full w-[100px] h-6 bg-[#c3d0cf] animate-pulse'></div>
      </div>
      <div className='px-4 pb-5'>
        <div className='h-[21px] w-16 rounded-full bg-[#c3d0cf] animate-pulse mb-2'></div>
        <div className='flex items-center justify-between'>
          <CardItemSkeleton />
          <CardItemSkeleton />
          <CardItemSkeleton />
          <CardItemSkeleton />
        </div>
      </div>
    </div>
  )
}

export default CardListSkeleton
