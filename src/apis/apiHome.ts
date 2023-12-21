import apiService from '~/apiService'

export const getHome = () =>
  new Promise(async (res, rej) => {
    try {
      const response = await apiService({
        url: '/home',
        method: 'get'
      })
      res(response)
    } catch (error) {
      rej(error)
    }
  })

export const HomeAPI = {
  async getHome(): Promise<any> {
    const url = '/home'
    return apiService.get(url)
  }
}
