import { create } from 'zustand'
import { devtools, persist, createJSONStorage, type StateStorage } from 'zustand/middleware'
import type { CartItem, Ingredient, Order, Product } from './types'

const storage: StateStorage = {
    getItem: (name) => {
        const item = localStorage.getItem(name)
        if (item) {
            return JSON.parse(item)
        }
        return null
    },
    setItem: (name, value) => {
        localStorage.setItem(name, JSON.stringify(value))
    },
    removeItem: (name) => {
        localStorage.removeItem(name)
    }
}

type Store = {
    ingredients: Ingredient[]
    setIngredients: (ingredients: Ingredient[]) => void
    products: Product[]
    setProducts: (products: Product[]) => void
    orders: Order[]
    setOrders: (orders: Order[]) => void
    cart: CartItem[]
    setCart: (cart: CartItem[]) => void
    isCartOpen: boolean
    setIsCartOpen: (isCartOpen: boolean) => void
    language: 'pt' | 'en'
    setLanguage: (language: 'pt' | 'en') => void
    sortPreferences: {
        products: { criteria: string, direction: 'asc' | 'desc' },
        ingredients: { criteria: string, direction: 'asc' | 'desc' }
        orders: { criteria: string, direction: 'asc' | 'desc' }
    }
    setSortPreferences: (section: 'products' | 'ingredients' | 'orders', sort: { criteria: string, direction: 'asc' | 'desc' }) => void
}

export const useStore = create<Store>()(
    devtools(persist(
        (set) => ({
            ingredients: [],
            setIngredients: (ingredients) => set({ ingredients }),
            products: [],
            setProducts: (products) => set({ products }),
            orders: [],
            setOrders: (orders) => set({ orders }),
            cart: [],
            setCart: (cart) => set({ cart }),
            isCartOpen: false,
            setIsCartOpen: (isCartOpen) => set({ isCartOpen }),
            language: 'pt',
            setLanguage: (language) => set({ language }),
            sortPreferences: {
                products: { criteria: 'name', direction: 'asc' },
                ingredients: { criteria: 'name', direction: 'asc' },
                orders: { criteria: 'createdAt', direction: 'asc' }
            },
            setSortPreferences: (section, sort) => set((state) => ({
                sortPreferences: {
                    ...state.sortPreferences,
                    [section]: sort
                }
            }))
        }),
        { name: "store", storage: createJSONStorage(() => storage) }
    )
))