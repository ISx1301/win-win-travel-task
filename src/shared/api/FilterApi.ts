import filterData from '../temp/filterData.json'
import { FilterItem } from './types'

export const filterApi = {
	getFilterData: async (): Promise<{ filterItems: FilterItem[] }> => {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve(filterData as { filterItems: FilterItem[] })
			}, 300)
		})
	}
}
