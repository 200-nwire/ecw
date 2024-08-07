export const getOrders = `
query orders(
    $clientId: ID
    $sum: Int = 25
    $after: Cursor
    $dates: RangeFilter
    $statuses: [OrderStatus]
    $stations: [ID]
    $products: [ID]
  ) {
    orders(
      pagination: { first: $sum, after: $after }
      filter: { account: $clientId, stations: $stations, dates: $dates, statuses: $statuses, products: $products }
    ) {
      totalCount
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          account {
            createdOn
            id
            paymentMethods {
              cardNumber
            }
            points
            profile {
              name
            }
          }
          status
          totalDue
          quantity
          pickedQuantity
          points
          product {
            name
            id
          }
          pickedIn {
            id
            name
          }
          pickedOn
          id
          createdOn
        }
      }
    }
  }
  
`
