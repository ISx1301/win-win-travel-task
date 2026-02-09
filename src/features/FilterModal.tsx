import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useFilterStore } from '@/shared/api/FilterStore'
import { FilterItem } from '@/shared/api/types/Filter/FilterItem'
import { FilterType } from '@/shared/api/types/Filter/FilterType'
import {
	SearchRequestFilter,
	SearchRequestOptions
} from '@/shared/api/types/SearchRequest/SearchRequestFilter'

import { Button } from '../pages/Home/ui/atoms/Button'
import { ConfirmationDialog } from './ConfirmationDialog'
import { FilterOption } from './FilterOption'

interface Props {
	isOpen: boolean
	onClose: () => void
	filterItems: FilterItem[]
}

export const FilterModal = ({ isOpen, onClose, filterItems }: Props) => {
	const { t } = useTranslation('filter')
	const appliedFilters = useFilterStore(state => state.appliedFilters)
	const setAppliedFilters = useFilterStore(state => state.setAppliedFilters)

	const [tempFilters, setTempFilters] = useState<SearchRequestFilter>([])
	const [showConfirm, setShowConfirm] = useState(false)

	useEffect(() => {
		if (isOpen) {
			setTempFilters(appliedFilters)
		}
	}, [isOpen, appliedFilters])

	if (!isOpen) {
		return null
	}

	const handleOptionToggle = (filterId: string, optionId: string) => {
		setTempFilters(prevFilters => {
			const existingFilter = prevFilters.find(item => item.id === filterId) as
				| SearchRequestOptions
				| undefined

			if (existingFilter) {
				const isSelected = existingFilter.optionsIds.includes(optionId)
				const newOptionsIds = isSelected
					? existingFilter.optionsIds.filter(id => id !== optionId)
					: [...existingFilter.optionsIds, optionId]

				return prevFilters.map(item =>
					item.id === filterId
						? ({ ...item, optionsIds: newOptionsIds } as SearchRequestOptions)
						: item
				)
			}

			const newFilter: SearchRequestOptions = {
				id: filterId,
				type: FilterType.OPTION,
				optionsIds: [optionId]
			}
			return [...prevFilters, newFilter]
		})
	}

	const handleConfirmSave = () => {
		setAppliedFilters(tempFilters)
		setShowConfirm(false)
		onClose()
	}

	return (
		<div className="z-50 fixed inset-0 flex justify-center items-center">
			<div className="relative flex flex-col bg-white px-8 py-10 rounded-2xl w-full max-w-4/5 max-h-[85vh] overflow-hidden">
				<header className="flex justify-between pb-6">
					<div className="w-1"></div>
					<h2 className="font-medium text-4xl">{t('modal_title')}</h2>
					<button
						onClick={onClose}
						aria-label="Close modal"
						className="p-1 cursor-pointer"
					>
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<line
								x1="18"
								y1="6"
								x2="6"
								y2="18"
							></line>
							<line
								x1="6"
								y1="6"
								x2="18"
								y2="18"
							></line>
						</svg>
					</button>
				</header>

				<main className="flex-1 mb-7 overflow-y-auto scrollbar-hide">
					{filterItems.map(group => (
						<section
							key={group.id}
							className="py-8 border-border-main border-b-2"
						>
							<h3 className="mb-6 font-medium text-2xl">{group.name}</h3>
							<div className="grid grid-cols-3">
								{group.options.map(option => (
									<FilterOption
										key={option.id}
										option={option}
										isSelected={
											tempFilters
												.find(item => item.id === group.id)
												?.optionsIds.includes(option.id) || false
										}
										onToggle={optionId =>
											handleOptionToggle(group.id, optionId)
										}
									/>
								))}
							</div>
						</section>
					))}
				</main>

				<footer className="flex justify-between items-center gap-2">
					<div className="w-40"></div>
					<Button onClick={() => setShowConfirm(true)}>
						{t('actions.apply')}
					</Button>
					<button
						onClick={onClose}
						className="text-brand-clear border-b font-medium text-base cursor-pointer"
					>
						{t('actions.cancel')}
					</button>
				</footer>

				{showConfirm && (
					<ConfirmationDialog
						onConfirm={handleConfirmSave}
						onCancel={() => setShowConfirm(false)}
					/>
				)}
			</div>
		</div>
	)
}
