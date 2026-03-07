import { useCallback, useState } from 'react'

const generate = () => {
	const a = Math.floor(Math.random() * 5) + 2
	const b = Math.floor(Math.random() * 5) + 2
	return { a, b, solution: a + b }
}

export const useMathCaptcha = () => {
	const [captcha, setCaptcha] = useState(generate)

	const regenerate = useCallback(() => {
		setCaptcha(generate())
	}, [])

	const validate = useCallback(
		(value: string): boolean => {
			const answer = Number(value.trim())
			return Number.isFinite(answer) && answer === captcha.solution
		},
		[captcha.solution],
	)

	return { ...captcha, regenerate, validate }
}
