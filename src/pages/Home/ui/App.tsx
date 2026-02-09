import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useQuery } from '@tanstack/react-query'

import { FilterModal } from '@/features/FilterModal'
import { filterApi } from '@/shared/api'
import { useFilterStore } from '@/shared/api/FilterStore'

import { Button } from './atoms/Button'

export const App = () => {
	const { t } = useTranslation('filter')
	const [isModalOpen, setIsModalOpen] = useState(false)

	const { data, isLoading } = useQuery({
		queryKey: ['filters'],
		queryFn: filterApi.getFilterData
	})

	const appliedFilters = useFilterStore(state => state.appliedFilters)

	return (
		<section className="flex flex-col justify-center items-center bg-slate-50 px-4 w-full h-dvh">
			<div className="bg-white shadow-2xl p-8 rounded-card w-full max-w-sm">
				<h1 className="mb-6 font-semibold text-slate-900 text-2xl text-center">
					{t('title')}
				</h1>

				<Button
					isLoading={isLoading}
					className="w-full"
					onClick={() => setIsModalOpen(true)}
				>
					{t('open_filters')}
				</Button>
			</div>

			<div className="mt-8 w-full max-w-md">
				<pre className="bg-slate-900 shadow-xl p-4 border border-slate-800 rounded-lg max-h-60 overflow-auto text-green-400 text-xs">
					{JSON.stringify(appliedFilters, null, 2)}
				</pre>
			</div>

			<FilterModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				filterItems={data?.filterItems || []}
			/>
		</section>
	)
}
