import { fetchStationsService, fetchWashesService } from '@/services/stations/Stations';
import { defineStore } from 'pinia';

export const useStationStore = defineStore({
    id: 'stations',

  state: () => ({
    stations: [] as any,
    washes: [] as any,
    fullClientWashes: [] as any,
    hasNextPage: true as any,
    endCursor: '' as any
  }),

  actions: {
    async getStations() {
        try {
            const { data } = await fetchStationsService();
            this.stations = data.stations;
        } catch {
            console.log('error')
        }
    },
    async getWashes(filters?: {}, getFullWashes = false) {
        try {
            const { data } = await fetchWashesService(filters);
            if (this.hasNextPage) {
                if (getFullWashes) this.fullClientWashes.push(...data.washes.edges)
                else this.washes.push(...data.washes.edges)
            }
            this.hasNextPage = data.washes.pageInfo.hasNextPage;
            this.endCursor = data.washes.pageInfo.endCursor;
        } catch {
            console.log('error')
        }
    },  
  }
})