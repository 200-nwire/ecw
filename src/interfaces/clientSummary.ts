export interface IClientSummary {
    totalAccounts: {
        Active: string;
        OnHold: string;
    },
    totalSubscriptions: {
        Active: string;
        OnHold: string;
        Inactive: string;
    }
  }