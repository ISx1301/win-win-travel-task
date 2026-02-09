import { useTranslation } from 'react-i18next'

import { Button } from '../pages/Home/ui/atoms/Button'

interface Props {
	onConfirm: () => void
	onCancel: () => void
}

export const ConfirmationDialog = ({ onConfirm, onCancel }: Props) => {
	const { t } = useTranslation('filter')

	return (
		<div className="z-20 absolute inset-0 flex justify-center items-center bg-white/30 backdrop-blur-md transition-all">
			<div className="flex flex-col items-center bg-white shadow-xl p-8 rounded-2xl w-full">
				<div className="flex justify-between items-center mb-32 w-full">
					<div className="w-1"></div>
					<div>
						<h3 className="font-medium text-brand-gray text-4xl">
							{t('confirmation.title')}
						</h3>
					</div>

					<button
						onClick={onCancel}
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
				</div>

				<div className="flex justify-center gap-4 w-full">
					<Button
						type="button"
						onClick={onCancel}
						className="bg-transparent px-20 border border-border-main text-black"
					>
						{t('confirmation.cancel')}
					</Button>

					<Button
						onClick={onConfirm}
						className="px-20"
					>
						{t('confirmation.confirm')}
					</Button>
				</div>
			</div>
		</div>
	)
}
