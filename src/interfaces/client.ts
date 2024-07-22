export interface IClient {
  node: {
    id: string
    createdOn: string
    status: string
    profile: {
      name: string
      phone: string
      source: string
    }
    points: number
    totalPurchases: number
    subscriptions: Subscription[]
  }
}

interface Subscription {
  status: 'CANCELED' | 'UNPAID' | 'PENDING' | 'ACTIVE'
  car: string | null
  expiresOn: number
  plan: {
    description: string | null
  }
  station: {
    name: string | null
  }
}
