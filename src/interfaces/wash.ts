export interface IWash {
    node: {
      id?: string;
      subscription: {
        station: {
          name: string;
        };
        expiresOn: number;
      };
      car: string;
      washedOn: number;
    };
  }
  