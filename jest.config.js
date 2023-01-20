module.exports = {
    clearMocks: true,
    coverageDirectory: 'coverage',
    coverageReporters: [
        'json',
        'text',
        'lcov',
        'clover',
        'json-summary',
    ],
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
        },
    },
    moduleNameMapper: {

    },
    testEnvironment: 'node',

    transformIgnorePatterns: [
    ],
};
