export interface IFilters {
  companyId?: string
  clientId?: string
  station?: string
  search?: string
  dates?: Array<number> | IDateRange
  after?: string
  first?: any
}

export interface IDateRange {
  since: number
  until: number
}
