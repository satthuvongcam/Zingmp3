const CardItemSkeleton = () => {
  return (
    <>
      <div>
        <div className='w-[70px] h-[70px] rounded-lg bg-[#c3d0cf] animate-pulse'></div>
        <div className='h-3 w-full rounded-full bg-[#c3d0cf] animate-pulse my-1'></div>
        <div className='h-3 w-full rounded-full bg-[#c3d0cf] animate-pulse'></div>
        <div className='h-2 w-8 rounded-full bg-[#c3d0cf] animate-pulse mt-[3px]'></div>
      </div>
    </>
  )
} 

export default CardItemSkeleton
