import apiService from '~/apiService'

export const homeApi = {
  async getHome(): Promise<any> {
    const url = '/home'
    return apiService.get(url)
  },

  async search(): Promise<any> {
    const url = '/search'
    return apiService.get(url)
  }
}
