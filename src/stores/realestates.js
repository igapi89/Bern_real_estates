import { defineStore } from 'pinia'
import { getItems } from '@/api'

export const useStoreRealestates = defineStore('realestates', {
  state: () => ({
    realestates: []
  }),
  actions: {
    async getItems() {
      try {
        const { data } = await getItems()

        this.realestates = data
      } catch (error) {
        console.error(error)
      }
    }
  }
})
