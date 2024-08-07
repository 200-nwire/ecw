export const getClient = `
query client($clientId: ID) {
    account(id: $clientId) {
      id
      createdOn
      status
      points
      totalPurchases
      profile {
        email
        name
        phone
        city
        firstname
        lastname
        source
      }
      value
      company {
        id
        name
        logo
      }
      subscriptions {
        company {
          id
          name
        }
        id
        status
        createdOn
        chargedOn
        expiresOn
        image
        label
        metering
        usage
        discounts {
          code
          name
          id
        }
        paymentMethod {
          cardNumber
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
          code
        }
      }
      paymentMethods {
        id
        cardNumber
      }
    }
  }
  
`
