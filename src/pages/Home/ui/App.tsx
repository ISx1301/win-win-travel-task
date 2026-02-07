import { useTranslation } from 'react-i18next'

import { useQuery } from '@tanstack/react-query'

import { filterApi } from '@/shared/api'
import { useFilterStore } from '@/shared/api/FilterStore'

import { Button } from './atoms/Button'

export const App = () => {
	const { t } = useTranslation('filter')

	const { isLoading } = useQuery({
		queryKey: ['filters'],
		queryFn: filterApi.getFilterData
	})

	const appliedFilters = useFilterStore(state => state.appliedFilters)

	return (
		<section className="flex flex-col justify-center items-center w-full h-dvh">
			<div className="bg-white shadow-2xl p-8 rounded-card w-full max-w-sm">
				{/* Title */}
				<h1 className="mb-2 font-semibold text-slate-900 text-2xl text-center">
					{t('title')}
				</h1>

				{/* Action */}
				<Button
					isLoading={isLoading}
					className="w-full"
					onClick={() => console.log('Open modal')}
				>
					{t('open_filters')}
				</Button>
			</div>

			{/* Status */}
			<pre className="bg-slate-100 mt-6 p-4 rounded text-slate-700 text-xs">
				{JSON.stringify(appliedFilters, null, 2)}
			</pre>
		</section>
	)
}
