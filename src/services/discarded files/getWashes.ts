export const getWashes = `
query washes(
    $station: ID
    $companyId: ID
    $clientId: ID
    $dates: RangeFilter
    $after: Cursor
    $first: Int = 25
    $search: String
  ) {
    washes(
      search: $search
      filter: { company: $companyId, account: $clientId, station: $station, dates: $dates }
      pagination: { after: $after, first: $first }
    ) {
      pageInfo {
        endCursor
        hasNextPage
      }
      totalCount
      edges {
        node {
          id
          total
          periodic
          washedOn
          station {
            id
          }
          today
          account {
            id
            profile {
              name
              phone
            }
          }
          status
          car
          image
          subscription {
            station {
              id
              name
            }
            plan {
              id
              description
              items {
                quantity
              }
            }
            expiresOn
          }
        }
      }
    }
  }
  
`
