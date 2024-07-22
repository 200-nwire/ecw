export interface IWash {
  id?: string
  subscription: {
    plan?: {
      description: string
    }
    station: {
      name: string
    }
    expiresOn: number
  }
  car: string
  washedOn: number
  image: string
  account: {
    profile: {
      name: string
    }
  }
  today: number
  total: number
  status: string
}
