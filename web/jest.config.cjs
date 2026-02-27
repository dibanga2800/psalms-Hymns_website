/** @type {import('jest').Config} */
module.exports = {
	testEnvironment: 'jsdom',
	globals: {
		'ts-jest': {
			tsconfig: 'tsconfig.test.json',
			diagnostics: false,
		},
	},
	transform: {
		'^.+\\.(t|j)sx?$': [
			'ts-jest',
			{
				tsconfig: 'tsconfig.test.json',
			},
		],
	},
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
		'\\.(css|less|scss|sass)$': 'identity-obj-proxy',
	},
	setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
	testPathIgnorePatterns: ['/node_modules/', '/dist/'],
}

