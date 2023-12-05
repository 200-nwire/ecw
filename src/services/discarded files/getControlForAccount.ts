export const getControlForAccount = `
query control(
    $stations: [ID]
    $clientId: ID
    $dates: RangeFilter
    $only: [EventTypes!]!
    $after: Cursor
    $first: Int!
  ) {
    events(
      filter: { owner: $clientId, stations: $stations, dates: $dates, only: $only }
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
          createdOn
          meta {
            source {
              ... on Manager {
                ManagerProfile: profile {
                  name
                }
              }
              ... on Account {
                AccountProfile: profile {
                  email
                }
              }
            }
          }
          name
          payload {
            ... on NoteAddedData {
              text
            }
            ... on Wash {
              car
              id
              total
              periodic
              washedOn
              account {
                id
                profile {
                  name
                  phone
                }
              }
              status
              image
              subscription {
                station {
                  id
                  name
                }
                expiresOn
              }
            }
            ... on SubscriptionCanceledData {
              id
              reason
            }
            ... on GenericEventData {
              id
            }
            ... on ItemChangedData {
              car
              id
              oldCar
            }
            ... on PlanChangedData {
              id
              plan {
                description
              }
              oldPlan {
                description
              }
            }
            ... on StationChangedData {
              id
              station {
                id
                name
              }
              oldStation {
                id
                name
              }
            }
            ... on PaymentData {
              id
              invoice {
                createdOn
                type
                id
                paymentMethod {
                  cardNumber
                }
                subscriptions {
                  id
                  car
                }
                totalDue
                receipt
                status
                attempts
              }
            }
            ... on PaymentMethodData {
              id
              paymentMethod {
                cardNumber
                id
              }
            }
            ... on SubscriptionDeletedData {
              car
              id
            }
          }
        }
      }
    }
  }
  
`