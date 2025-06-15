export interface CartItem {
  id: string
  productId?: string // для внутренних товаров
  offerKey?: string // для внешних товаров (AutoEuro)
  name: string
  description: string
  brand?: string
  article?: string
  price: number
  originalPrice?: number
  currency: string
  quantity: number
  deliveryTime?: string
  deliveryDate?: string
  warehouse?: string
  supplier?: string
  comment?: string
  selected: boolean
  favorite: boolean
  isExternal: boolean // true для товаров из AutoEuro
  image?: string
  weight?: number
  volume?: number
  canPurchase?: boolean
}

export interface CartSummary {
  totalItems: number
  totalPrice: number
  totalDiscount: number
  deliveryPrice: number
  finalPrice: number
}

export interface DeliveryInfo {
  type: string
  address: string
  date?: string
  price: number
}

export interface CartState {
  items: CartItem[]
  summary: CartSummary
  delivery: DeliveryInfo
  orderComment: string
  isLoading: boolean
  error?: string
}

export interface CartContextType {
  state: CartState
  addItem: (item: Omit<CartItem, 'id' | 'selected' | 'favorite'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  toggleSelect: (id: string) => void
  toggleFavorite: (id: string) => void
  updateComment: (id: string, comment: string) => void
  updateOrderComment: (comment: string) => void
  selectAll: () => void
  removeAll: () => void
  removeSelected: () => void
  updateDelivery: (delivery: Partial<DeliveryInfo>) => void
  clearCart: () => void
} 