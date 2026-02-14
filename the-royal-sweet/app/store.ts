import { create } from 'zustand'
import { devtools, persist, createJSONStorage, type StateStorage } from 'zustand/middleware'
import type { CartItem } from './types'

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