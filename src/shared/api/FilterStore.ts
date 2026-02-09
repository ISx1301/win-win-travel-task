import { create } from 'zustand'

import { SearchRequestFilter } from './types/SearchRequest/SearchRequestFilter'

interface FilterState {
	appliedFilters: SearchRequestFilter
	setAppliedFilters: (filters: SearchRequestFilter) => void
}

export const useFilterStore = create<FilterState>(set => ({
	appliedFilters: [], // Инициализируем массивом
	setAppliedFilters: filters => set({ appliedFilters: filters })
}))
