import '@testing-library/jest-dom'
import { TextDecoder, TextEncoder } from 'node:util'

// Polyfill TextEncoder/TextDecoder for libraries like react-router
// that expect them in the test environment.
const globalAny = global as unknown as {
	TextEncoder?: typeof TextEncoder
	TextDecoder?: typeof TextDecoder
}

if (!globalAny.TextEncoder) {
	globalAny.TextEncoder = TextEncoder
}

if (!globalAny.TextDecoder) {
	globalAny.TextDecoder = TextDecoder
}

