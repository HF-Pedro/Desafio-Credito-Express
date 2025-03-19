module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts$', // Define onde o Jest vai procurar os testes
    moduleFileExtensions: ['ts', 'js', 'json'],

};