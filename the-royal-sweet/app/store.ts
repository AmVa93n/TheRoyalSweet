import { create } from 'zustand'
import { devtools, persist, createJSONStorage, type StateStorage } from 'zustand/middleware'
import type { CartItem, Ingredient, Order, Product, CakeComponent } from './types'

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
    products: Product[]
    setProducts: (products: Product[]) => void
    cakeComponents: CakeComponent[]
    setCakeComponents: (cakeComponents: CakeComponent[]) => void
    cart: CartItem[]
    setCart: (cart: CartItem[]) => void
    isCartOpen: boolean
    setIsCartOpen: (isCartOpen: boolean) => void
    language: 'pt' | 'en'
    setLanguage: (language: 'pt' | 'en') => void
}

export const useStore = create<Store>()(
    devtools(persist(
        (set) => ({
            products: [],
            setProducts: (products) => set({ products }),
            cakeComponents: [],
            setCakeComponents: (cakeComponents) => set({ cakeComponents }),
            cart: [],
            setCart: (cart) => set({ cart }),
            isCartOpen: false,
            setIsCartOpen: (isCartOpen) => set({ isCartOpen }),
            language: 'pt',
            setLanguage: (language) => set({ language }),
        }),
        { name: "store", storage: createJSONStorage(() => storage) }
    )
))

type AdminStore = {
    ingredients: Ingredient[]
    setIngredients: (ingredients: Ingredient[]) => void
    products: Product[]
    setProducts: (products: Product[]) => void
    cakeComponents: CakeComponent[]
    setCakeComponents: (cakeComponents: CakeComponent[]) => void
    orders: Order[]
    setOrders: (orders: Order[]) => void
    sortPreferences: {
        products: { criteria: string, direction: 'asc' | 'desc' },
        ingredients: { criteria: string, direction: 'asc' | 'desc' }
        cakeComponents: { criteria: string, direction: 'asc' | 'desc' }
        orders: { criteria: string, direction: 'asc' | 'desc' }
    }
    setSortPreferences: (section: 'products' | 'ingredients' | 'cakeComponents' | 'orders', sort: { criteria: string, direction: 'asc' | 'desc' }) => void
}

export const useAdminStore = create<AdminStore>()(
    devtools(persist(
        (set) => ({
            ingredients: [],
            setIngredients: (ingredients) => set({ ingredients }),
            products: [],
            setProducts: (products) => set({ products }),
            cakeComponents: [],
            setCakeComponents: (cakeComponents) => set({ cakeComponents }),
            orders: [],
            setOrders: (orders) => set({ orders }),
            sortPreferences: {
                products: { criteria: 'name', direction: 'asc' },
                ingredients: { criteria: 'name', direction: 'asc' },
                cakeComponents: { criteria: 'name', direction: 'asc' },
                orders: { criteria: 'createdAt', direction: 'asc' }
            },
            setSortPreferences: (section, sort) => set((state) => ({
                sortPreferences: {
                    ...state.sortPreferences,
                    [section]: sort
                }
            }))
        }),
        { name: "admin-store", storage: createJSONStorage(() => storage) }
    )
))