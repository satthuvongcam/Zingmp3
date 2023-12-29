import apiService from '~/apiService'

export const homeApi = {
  async getHome(): Promise<any> {
    const url = '/home'
    return apiService.get(url)
  }
}
