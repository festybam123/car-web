import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),

  setUser: (user) => set({ user }),
  setToken: (token) => {
    localStorage.setItem('token', token)
    set({ token, isAuthenticated: !!token })
  },
  logout: () => {
    localStorage.removeItem('token')
    set({ user: null, token: null, isAuthenticated: false })
  }
}))

export const useThemeStore = create((set) => ({
  isDark: localStorage.getItem('theme') === 'dark',
  toggleTheme: () => set((state) => {
    const newDark = !state.isDark
    localStorage.setItem('theme', newDark ? 'dark' : 'light')
    return { isDark: newDark }
  })
}))

export const useFilterStore = create((set) => ({
  filters: {
    brand: '',
    priceMin: '',
    priceMax: '',
    fuel: '',
    transmission: '',
    year: '',
    sort: 'newest'
  },
  setFilters: (newFilters) => set((state) => ({
    filters: { ...state.filters, ...newFilters }
  })),
  resetFilters: () => set({
    filters: {
      brand: '',
      priceMin: '',
      priceMax: '',
      fuel: '',
      transmission: '',
      year: '',
      sort: 'newest'
    }
  })
}))
