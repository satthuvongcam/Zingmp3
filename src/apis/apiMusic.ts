import apiService from '~/apiService'

export const musicApi = {
  async getSong(songId: string): Promise<any> {
    const url = '/song'
    const params = `/?id=${songId}`

    return apiService.get(url + params)
  },
  async getDetailSong(songId: string): Promise<any> {
    const url = '/infosong'
    const params = `/?id=${songId}`
    return apiService.get(url + params)
  },
  async getDetailPlaylist(playlistId: string): Promise<any> {
    const url = '/detailplaylist'
    const params = `/?id=${playlistId}`
    return apiService.get(url + params)
  }
}
