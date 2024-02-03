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

export const toNonAccentVietnamese = (str: string) => {
  str = str.replace(/A|Á|À|Ã|Ạ|Â|Ấ|Ầ|Ẫ|Ậ|Ă|Ắ|Ằ|Ẵ|Ặ/g, 'A')
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
  str = str.replace(/E|É|È|Ẽ|Ẹ|Ê|Ế|Ề|Ễ|Ệ/, 'E')
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
  str = str.replace(/I|Í|Ì|Ĩ|Ị/g, 'I')
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
  str = str.replace(/O|Ó|Ò|Õ|Ọ|Ô|Ố|Ồ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ỡ|Ợ/g, 'O')
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
  str = str.replace(/U|Ú|Ù|Ũ|Ụ|Ư|Ứ|Ừ|Ữ|Ự/g, 'U')
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
  str = str.replace(/Y|Ý|Ỳ|Ỹ|Ỵ/g, 'Y')
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
  str = str.replace(/Đ/g, 'D')
  str = str.replace(/đ/g, 'd')
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '') // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, '') // Â, Ê, Ă, Ơ, Ư
  return str
}

export const compareText = (str1: string, str2: string) => {
  const arrText = str1.split(' ')
  const arrText2 = str2.split(' ')
  let result = false
  arrText.forEach((text) => {
    arrText2.forEach((text2) => {
      if (text.toLowerCase() === text2.toLowerCase()) {
        result = true
        return
      }
    })
  })
  console.log('result: ', result);
  return result
}
