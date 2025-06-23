'use client'

import React, { createContext, useContext, useReducer, useEffect, useState } from 'react'
import { CartState, CartContextType, CartItem, DeliveryInfo } from '@/types/cart'

// Начальное состояние корзины
const initialState: CartState = {
  items: [],
  summary: {
    totalItems: 0,
    totalPrice: 0,
    totalDiscount: 0,
    deliveryPrice: 39,
    finalPrice: 0
  },
  delivery: {
    type: 'Доставка курьером',
    address: 'Калининградская область, Калиниград, улица Понартская, 5, кв./офис 1, Подъезд 1, этаж 1',
    price: 39
  },
  orderComment: '',
  isLoading: false
}

// Типы действий
type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'id' | 'selected' | 'favorite'> }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'TOGGLE_SELECT'; payload: string }
  | { type: 'TOGGLE_FAVORITE'; payload: string }
  | { type: 'UPDATE_COMMENT'; payload: { id: string; comment: string } }
  | { type: 'UPDATE_ORDER_COMMENT'; payload: string }
  | { type: 'SELECT_ALL' }
  | { type: 'REMOVE_ALL' }
  | { type: 'REMOVE_SELECTED' }
  | { type: 'UPDATE_DELIVERY'; payload: Partial<DeliveryInfo> }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] }
  | { type: 'LOAD_FULL_STATE'; payload: { items: CartItem[]; delivery: DeliveryInfo; orderComment: string } }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string }

// Функция для генерации ID
const generateId = () => Math.random().toString(36).substr(2, 9)

// Функция для расчета итогов
const calculateSummary = (items: CartItem[], deliveryPrice: number) => {
  const selectedItems = items.filter(item => item.selected)
  const totalItems = selectedItems.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const totalDiscount = selectedItems.reduce((sum, item) => {
    const discount = item.originalPrice ? (item.originalPrice - item.price) * item.quantity : 0
    return sum + discount
  }, 0)
  const finalPrice = totalPrice + deliveryPrice

  return {
    totalItems,
    totalPrice,
    totalDiscount,
    deliveryPrice,
    finalPrice
  }
}

// Редьюсер корзины
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        item => 
          (item.productId && item.productId === action.payload.productId) ||
          (item.offerKey && item.offerKey === action.payload.offerKey)
      )

      let newItems: CartItem[]
      
      if (existingItemIndex >= 0) {
        // Увеличиваем количество существующего товара
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        )
      } else {
        // Добавляем новый товар
        const newItem: CartItem = {
          ...action.payload,
          id: generateId(),
          selected: true,
          favorite: false
        }
        newItems = [...state.items, newItem]
      }

      const newSummary = calculateSummary(newItems, state.delivery.price)
      
      return {
        ...state,
        items: newItems,
        summary: newSummary
      }
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload)
      const newSummary = calculateSummary(newItems, state.delivery.price)
      
      return {
        ...state,
        items: newItems,
        summary: newSummary
      }
    }

    case 'UPDATE_QUANTITY': {
      const newItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(1, action.payload.quantity) }
          : item
      )
      const newSummary = calculateSummary(newItems, state.delivery.price)
      
      return {
        ...state,
        items: newItems,
        summary: newSummary
      }
    }

    case 'TOGGLE_SELECT': {
      const newItems = state.items.map(item =>
        item.id === action.payload
          ? { ...item, selected: !item.selected }
          : item
      )
      const newSummary = calculateSummary(newItems, state.delivery.price)
      
      return {
        ...state,
        items: newItems,
        summary: newSummary
      }
    }

    case 'TOGGLE_FAVORITE': {
      const newItems = state.items.map(item =>
        item.id === action.payload
          ? { ...item, favorite: !item.favorite }
          : item
      )
      
      return {
        ...state,
        items: newItems
      }
    }

    case 'UPDATE_COMMENT': {
      const newItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, comment: action.payload.comment }
          : item
      )
      
      return {
        ...state,
        items: newItems
      }
    }

    case 'UPDATE_ORDER_COMMENT': {
      return {
        ...state,
        orderComment: action.payload
      }
    }

    case 'SELECT_ALL': {
      const allSelected = state.items.every(item => item.selected)
      const newItems = state.items.map(item => ({
        ...item,
        selected: !allSelected
      }))
      const newSummary = calculateSummary(newItems, state.delivery.price)
      
      return {
        ...state,
        items: newItems,
        summary: newSummary
      }
    }

    case 'REMOVE_ALL': {
      const newSummary = calculateSummary([], state.delivery.price)
      
      return {
        ...state,
        items: [],
        summary: newSummary
      }
    }

    case 'REMOVE_SELECTED': {
      const newItems = state.items.filter(item => !item.selected)
      const newSummary = calculateSummary(newItems, state.delivery.price)
      
      return {
        ...state,
        items: newItems,
        summary: newSummary
      }
    }

    case 'UPDATE_DELIVERY': {
      const newDelivery = { ...state.delivery, ...action.payload }
      const newSummary = calculateSummary(state.items, newDelivery.price)
      
      return {
        ...state,
        delivery: newDelivery,
        summary: newSummary
      }
    }

    case 'CLEAR_CART': {
      const newSummary = calculateSummary([], state.delivery.price)
      
      return {
        ...state,
        items: [],
        summary: newSummary
      }
    }

    case 'LOAD_CART': {
      const newSummary = calculateSummary(action.payload, state.delivery.price)
      
      return {
        ...state,
        items: action.payload,
        summary: newSummary
      }
    }

    case 'LOAD_FULL_STATE': {
      const newSummary = calculateSummary(action.payload.items, action.payload.delivery.price || state.delivery.price)
      
      return {
        ...state,
        items: action.payload.items,
        delivery: action.payload.delivery,
        orderComment: action.payload.orderComment,
        summary: newSummary
      }
    }

    case 'SET_LOADING': {
      return {
        ...state,
        isLoading: action.payload
      }
    }

    case 'SET_ERROR': {
      return {
        ...state,
        error: action.payload,
        isLoading: false
      }
    }

    default:
      return state
  }
}

// Создание контекста
const CartContext = createContext<CartContextType | undefined>(undefined)

// Провайдер корзины
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)
  const [isInitialized, setIsInitialized] = useState(false)

  // Загрузка корзины из localStorage при инициализации
  useEffect(() => {
    if (typeof window === 'undefined') return

    console.log('🔄 Загружаем состояние корзины из localStorage...')
    
    const savedCartState = localStorage.getItem('cartState')
    if (savedCartState) {
      try {
        const cartState = JSON.parse(savedCartState)
        console.log('✅ Найдено сохраненное состояние корзины:', cartState)
        // Загружаем полное состояние корзины
        dispatch({ type: 'LOAD_FULL_STATE', payload: cartState })
      } catch (error) {
        console.error('❌ Ошибка загрузки корзины из localStorage:', error)
        // Попытаемся загрузить старый формат (только товары)
        const savedCart = localStorage.getItem('cart')
        if (savedCart) {
          try {
            const cartItems = JSON.parse(savedCart)
            console.log('✅ Найдены товары в старом формате:', cartItems)
            dispatch({ type: 'LOAD_CART', payload: cartItems })
          } catch (error) {
            console.error('❌ Ошибка загрузки старой корзины:', error)
          }
        }
      }
    } else {
      console.log('ℹ️ Сохраненное состояние корзины не найдено')
    }
    
    setIsInitialized(true)
  }, [])

  // Сохранение полного состояния корзины в localStorage при изменении (только после инициализации)
  useEffect(() => {
    if (!isInitialized || typeof window === 'undefined') return

    const stateToSave = {
      items: state.items,
      delivery: state.delivery,
      orderComment: state.orderComment
    }
    
    console.log('💾 Сохраняем состояние корзины:', stateToSave)
    localStorage.setItem('cartState', JSON.stringify(stateToSave))
    // Сохраняем также старый формат для совместимости
    localStorage.setItem('cart', JSON.stringify(state.items))
  }, [state.items, state.delivery, state.orderComment, isInitialized])

  // Функции для работы с корзиной
  const addItem = (item: Omit<CartItem, 'id' | 'selected' | 'favorite'>) => {
    dispatch({ type: 'ADD_ITEM', payload: item })
  }

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id })
  }

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
  }

  const toggleSelect = (id: string) => {
    dispatch({ type: 'TOGGLE_SELECT', payload: id })
  }

  const toggleFavorite = (id: string) => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: id })
  }

  const updateComment = (id: string, comment: string) => {
    dispatch({ type: 'UPDATE_COMMENT', payload: { id, comment } })
  }

  const updateOrderComment = (comment: string) => {
    dispatch({ type: 'UPDATE_ORDER_COMMENT', payload: comment })
  }

  const selectAll = () => {
    dispatch({ type: 'SELECT_ALL' })
  }

  const removeAll = () => {
    dispatch({ type: 'REMOVE_ALL' })
  }

  const removeSelected = () => {
    dispatch({ type: 'REMOVE_SELECTED' })
  }

  const updateDelivery = (delivery: Partial<DeliveryInfo>) => {
    dispatch({ type: 'UPDATE_DELIVERY', payload: delivery })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
    // Очищаем localStorage при очистке корзины
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cartState')
      localStorage.removeItem('cart')
    }
  }

  const contextValue: CartContextType = {
    state,
    addItem,
    removeItem,
    updateQuantity,
    toggleSelect,
    toggleFavorite,
    updateComment,
    updateOrderComment,
    selectAll,
    removeAll,
    removeSelected,
    updateDelivery,
    clearCart
  }

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  )
}


// Хук для использования контекста корзины
export const useCart = (): CartContextType => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart должен использоваться внутри CartProvider')
  }
  return context
} 