import { FilterBase } from '@/shared/api/types/Filter/FilterBase'

interface Props {
	option: Omit<FilterBase, 'type'>
	isSelected: boolean
	onToggle: (optionId: string) => void
}

export const FilterOption = ({ option, isSelected, onToggle }: Props) => {
	return (
		<label className="group flex items-center gap-4 mb-3 cursor-pointer">
			<div className="relative flex justify-center items-center">
				<input
					type="checkbox"
					className="peer checked:bg-black border-2 border-black rounded-sm w-5 h-5 transition-all appearance-none cursor-pointer"
					checked={isSelected}
					onChange={() => onToggle(option.id)}
				/>
				<svg
					className="absolute opacity-0 peer-checked:opacity-100 w-3.5 h-3.5 text-white transition-opacity pointer-events-none"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="4"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<polyline points="20 6 9 17 4 12"></polyline>
				</svg>
			</div>

			<div className="flex flex-col">
				<span className="font-normal text-base leading-none">
					{option.name}
				</span>
			</div>
		</label>
	)
}
