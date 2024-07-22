export const getClientsSummary = `query clients(
    $after: Cursor
    $search: String
    $stations: [ID]
    $dates: RangeFilter
    $statuses: [SubscriptionStatus]
    $sources: [Sources]
    $plans: [ID]
    $company: ID
  ) {
    accounts(
      pagination: { after: $after, first: 25 }
      search: $search
      filter: {
        company: $company
        stations: $stations
        dates: $dates
        statuses: $statuses
        plans: $plans
        sources: $sources
      }
    ) {
      summary {
        totalAccounts {
          Active
          Inactive
          OnHold
        }
        totalSubscriptions {
          Active
          Inactive
          OnHold
        }
      }
    }
  }`
