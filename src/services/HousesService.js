import { AppState } from '../AppState.js'
import { House } from '../models/House.js'
import { api } from './AxiosService.js'

export class HousesService {
  async getHouses() {
    const res = await api.get('api/houses')
    AppState.houses = res.data.map(h => new House(h))
    console.log(res.data)
  }

  async getHouseById(houseId) {
    const res = await api.get('api/houses/' + houseId)
    AppState.house = new House(res.data)
  }

  async deleteHouse(houseId) {
    await api.delete('api/houses/' + houseId)
  }

  async createHouse(newHouse) {
    const res = await api.post('api/houses', newHouse)
    AppState.houses.push(new House(res.data))
    return res.data
  }

  async editHouse(targetHouse) {
    const res = await api.put('api/houses/' + targetHouse.id, targetHouse)
    AppState.house = new House(res.data) 
  }
}

export const housesService = new HousesService()
