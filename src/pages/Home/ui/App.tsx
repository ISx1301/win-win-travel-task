import { useTranslation } from 'react-i18next'

import { useQuery } from '@tanstack/react-query'

import { filterApi, useFilterStore } from '../../../shared/api'

export const App = () => {
	const { t } = useTranslation('filter')
	const appliedFilters = useFilterStore(state => state.appliedFilters)

	const { data, isLoading } = useQuery({
		queryKey: ['filterData'],
		queryFn: filterApi.getFilterData
	})

	return (
		<section>
			<div>
				<h1>{t('title')}</h1>

				{isLoading ? (
					<p>{t('loading')}</p>
				) : (
					<button
						type="button"
						onClick={() => {}}
					>
						{t('open_filters')} ({data?.filterItems.length})
					</button>
				)}

				<div>
					<p>{t('current_request')}</p>
					<pre>{JSON.stringify(appliedFilters, null, 2)}</pre>
				</div>
			</div>
		</section>
	)
}
