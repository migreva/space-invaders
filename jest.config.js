module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	moduleNameMapper: {
		"^@space-invaders(.*)$": "<rootDir>/src$1",
	}
};
 