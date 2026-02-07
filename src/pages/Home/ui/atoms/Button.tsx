import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode
	isLoading?: boolean
	className?: string
}

export const Button = ({
	children,
	isLoading,
	className = '',
	disabled,
	...props
}: ButtonProps) => {
	return (
		<button
			{...props}
			disabled={isLoading || disabled}
			aria-busy={isLoading}
			className={`btn-primary ${className}`}
		>
			<span className="btn-text-wrapper">
				<span
					className={`btn-spinner ${isLoading ? 'opacity-100' : 'opacity-0'}`}
					aria-hidden
				>
					<img
						src="/src/shared/assets/icons/spinner.svg"
						className="w-5 h-5 animate-spin"
						alt=""
					/>
				</span>

				<span className={`btn-text ${isLoading ? 'btn-text-shifted' : ''}`}>
					{children}
				</span>
			</span>
		</button>
	)
}
