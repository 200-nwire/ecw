import { IFilters } from '@/interfaces/filters'
import {
  fetchStationsService,
  fetchStationWashesSummaryService,
  fetchWashesService,
} from '@/services/stations/Stations'
import { defineStore } from 'pinia'

export const useStationStore = defineStore({
  id: 'stations',

  state: () => ({
    stations: [] as any,
    isLoadingStations: true as Boolean,
    currStation: {} as any,
    isLoadingStation: true as Boolean,
    currStationWashesSummary: {} as any,
    washes: [] as any,
    isLoadingWashes: true as any,
    fullClientWashes: [] as any,
    hasNextPage: true as any,
    endCursor: '' as any,
    totalWashes: 0 as any,
  }),

  actions: {
    resetPreviousStationInfo() {
      this.currStation = {} as any
      this.currStationWashesSummary = {} as any
      this.washes = [] as any
      this.fullClientWashes = [] as any
      this.hasNextPage = true
      this.endCursor = ''
      this.totalWashes = 0
    },
    async getStations() {
      try {
        this.isLoadingStations = true
        const { data } = await fetchStationsService()
        this.stations = data.stations
      } catch {
        console.log('error')
      } finally {
        this.isLoadingStations = false
      }
    },
    async getStation(stationId: String) {
      try {
        this.isLoadingStation = true
        const { data } = await fetchStationsService(stationId ?? this.stations?.[0]?.id)
        this.currStation = data.stations?.find((station: any) => station.id === stationId)
      } catch {
        console.log('error')
      } finally {
        this.isLoadingStation = false
      }
    },
    async getWashes(filters?: IFilters, initialLoad = false) {
      try {
        this.isLoadingWashes = true
        if (initialLoad) {
          this.washes = []
          this.hasNextPage = true
          this.endCursor = ''
        }
        filters = {
          ...filters,
          dates: {
            since: filters?.dates?.[0],
            until: filters?.dates?.[1],
          },
          after: this.endCursor
        }
        const { data } = await fetchWashesService(filters)
        this.washes.push(...(data.washes?.edges ?? []))
        this.hasNextPage = data.washes.pageInfo.hasNextPage
        this.endCursor = data.washes.pageInfo.endCursor
        this.totalWashes = data.washes.totalCount
      } catch {
        console.log('error')
      } finally {
        this.isLoadingWashes = false
      }
    },
    async getStationWashesSummary(filters?: IFilters) {
      try {
        filters = {
          ...filters,
          dates: {
            since: filters?.dates?.[0],
            until: filters?.dates?.[1],
          },
        }
        const { data } = await fetchStationWashesSummaryService(filters)
        this.currStationWashesSummary = data.washes.summary
      } catch {
        console.log('error')
      }
    },
  },
})
