// Create array elements to show
export const getArrSlider = (start: number, end: number, number: number) => {
  const limit = start > end ? number : end
  let output = []
  for (let i = start; i <= limit; i++) {
    output.push(i)
  }
  if (start > end) {
    for (let i = 0; i <= end; i++) {
      output.push(i)
    }
  }
  return output
}

export const handleShowImgBanner = (
  arrShow: number[],
  arrElement: HTMLCollectionOf<Element>,
  min: number,
  max: number,
  isPrev: boolean
) => {
  for (let i = 0; i < arrElement.length; i++) {
    // Delete classname
    arrElement[i]?.classList?.remove('animate-slide-right', 'order-last', 'z-10')
    arrElement[i]?.classList?.remove('animate-slide-left', 'order-first', 'z-20')
    arrElement[i]?.classList?.remove('animate-slide-left2', 'order-2', 'z-20')
    arrElement[i]?.classList?.remove('animate-slide-left', 'order-first', 'z-10')
    arrElement[i]?.classList?.remove('animate-slide-right', 'order-last', 'z-20')
    arrElement[i]?.classList?.remove('animate-slide-right2', 'order-2', 'z-20')

    // Hide or show img banner
    if (arrShow.some((item) => item === i)) {
      arrElement[i].style.cssText = 'display: block'
    } else {
      arrElement[i].style.cssText = `display: none`
    }
  }

  // console.log('min max', {min, max});
  // Add animation by adding classnames
  arrShow.forEach((item) => {
    if (isPrev === false) {
      if (item === max) {
        arrElement[item]?.classList?.add('animate-slide-right', 'order-last', 'z-10')
      } else if (item === min) {
        arrElement[item]?.classList?.add('animate-slide-left', 'order-first', 'z-20')
      } else {
        arrElement[item]?.classList?.add('animate-slide-left2', 'order-2', 'z-20')
      }
    } else {
      if (item === max) {
        arrElement[item]?.classList?.add('animate-slide-left', 'order-first', 'z-10')
      } else if (item === min) {
        arrElement[item]?.classList?.add('animate-slide-right', 'order-last', 'z-20')
      } else {
        arrElement[item]?.classList?.add('animate-slide-right2', 'order-2', 'z-20')
      }
    } 
  })
}
