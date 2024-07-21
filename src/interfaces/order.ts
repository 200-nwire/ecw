interface PickedIn {
  name: string
}

interface Account {
  id: string
  profile: {
    name: string
  }
  createdOn: number
}

interface Product {
  name: string
}

interface OrderNode {
  id: string
  pickedIn?: PickedIn
  pickedQuantity: number
  quantity: number
  pickedOn: string
  status: string
  totalDue: number
  createdOn: number
  account: Account
  product: Product
}

interface Order {
  node: OrderNode
}

export default Order
