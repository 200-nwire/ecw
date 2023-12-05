export const getClientPayments = `
query clientPayments($clientId: ID, $companyId: ID, $sum: Int!, $after: Cursor) {
    invoices(filter: { company: $companyId, account: $clientId }, pagination: { first: $sum, after: $after }) {
      totalCount
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          createdOn
          type
          id
          code
          description
          deal
          order {
            product {
              name
            }
          }
          paymentMethod {
            cardNumber
            cardYear
            cardMonth
          }
          subscriptions {
            id
            car
          }
          totalDue
          receipt
          status
        }
      }
    }
  }
  
`