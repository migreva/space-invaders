module.exports = {
	fakeTimers: {
		enableGlobally: true,
	},
	moduleNameMapper: {
		"^@space-invaders(.*)$": "<rootDir>/src$1",
	},
	preset: 'ts-jest',
	testEnvironment: 'node',
};
 