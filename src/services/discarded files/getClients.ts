export const getClientsQuery = `
query clients(
  $after: Cursor
  $search: String
  $stations: [ID]
  $dates: RangeFilter
  $statuses: [SubscriptionStatus]
  $plans: [ID]
  $company: ID
  $sources: [Sources]
  $value: Int
  $clientsWithPurchases: Boolean
  $clientsWithSubscriptions: Boolean
) {
  accounts(
    pagination: { after: $after, first: 25 }
    search: $search
    filter: {
      stations: $stations
      dates: $dates
      statuses: $statuses
      plans: $plans
      company: $company
      value: $value
      clientsWithPurchases: $clientsWithPurchases
      clientsWithSubscriptions: $clientsWithSubscriptions
      sources: $sources
    }
  ) {
    pageInfo {
      endCursor
      hasNextPage
    }
    edges {
      node {
        id
        createdOn
        status
        points
        totalPurchases
        value
        company {
          name
        }
        profile {
          email
          name
          phone
          city
          firstname
          lastname
          source
        }
        subscriptions {
          id
          expiresOn
          status
          label
          discounts {
            code
            name
            id
          }
          station {
            name
            id
          }
          car
          plan {
            amount
            description
            id
          }
        }
      }
    }
  }
}
`
