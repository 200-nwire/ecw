interface PaymentMethod {
    cardNumber: string;
  }
  
  interface Subscription {
    car: string;
  }
  
  interface PaymentNode {
    id: string;
    paymentMethod: PaymentMethod;
    receipt: string;
    createdOn: number;
    totalDue: number;
    subscriptions: Subscription[];
  }
  
  interface Payment {
    node: PaymentNode;
  }
  
  export default Payment;
  