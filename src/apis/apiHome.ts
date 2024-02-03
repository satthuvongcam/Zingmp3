import apiService from '~/apiService'

export const homeApi = {
  async getHome(): Promise<any> {
    const url = '/home'
    return apiService.get(url)
  },
  async getSuggest(): Promise<any> {
    const url = '/search'
    return apiService.get(url)
  },
  async search(keyword: string): Promise<any> {
    const url = '/search'
    const param = `/?keyword=${keyword}`
    return apiService.get(url + param)
  }
}
